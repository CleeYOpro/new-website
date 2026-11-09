// Pulls the Medium RSS feed and merges it into src/lib/medium-posts.json.
// Run with `npm run sync:medium`. The feed only carries the 10 newest posts,
// so posts already in the JSON are kept even after they drop out of the feed.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const FEED_URL = 'https://medium.com/feed/@cleobala';
const OUT_FILE = fileURLToPath(new URL('../src/lib/medium-posts.json', import.meta.url));

const decodeEntities = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');

const stripTags = (html) => decodeEntities(html.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '');

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

function tag(xml, name) {
  const m = xml.match(new RegExp(`<${name}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`));
  return m ? m[1].trim() : '';
}

function tags(xml, name) {
  return [...xml.matchAll(new RegExp(`<${name}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`, 'g'))].map((m) => m[1].trim());
}

// Medium wraps every embed in an embedly iframe; swap YouTube ones for a direct player.
function rewriteEmbed(iframeTag) {
  const src = decodeEntities(iframeTag.match(/src="([^"]*)"/)?.[1] ?? '');
  const params = new URL(src).searchParams;
  const inner = params.get('src') ?? '';
  const pageUrl = params.get('url') ?? '';
  const youtubeId = inner.match(/youtube\.com\/embed\/([\w-]{11})/)?.[1];

  if (youtubeId) {
    const vertical = pageUrl.includes('/shorts/');
    return (
      `<figure class="medium-embed${vertical ? ' medium-embed--vertical' : ''}">` +
      `<iframe src="https://www.youtube.com/embed/${youtubeId}" title="YouTube video" loading="lazy" ` +
      `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` +
      `</figure>`
    );
  }

  const width = Number(iframeTag.match(/width="(\d+)"/)?.[1] ?? 16);
  const height = Number(iframeTag.match(/height="(\d+)"/)?.[1] ?? 9);
  return (
    `<figure class="medium-embed" style="aspect-ratio: ${width} / ${height}">` +
    `<iframe src="${src.replace(/&/g, '&amp;')}" title="Embedded content" loading="lazy" allowfullscreen></iframe>` +
    `</figure>`
  );
}

function cleanContent(html, title) {
  let publication = null;

  // Publication footer: "<hr><p><a>Title</a> was originally published in <a>Pub</a> on Medium…</p>"
  html = html.replace(/<hr>\s*<p>(?:(?!<p>)[\s\S])*?was originally published in ([\s\S]*?)<\/p>\s*$/, (_, rest) => {
    const m = rest.match(/<a href="([^"]+)">([\s\S]*?)<\/a>/);
    if (m) publication = { name: stripTags(m[2]), url: decodeEntities(m[1]) };
    return '';
  });

  html = html
    // Medium's view-tracking pixel
    .replace(/<img src="https:\/\/medium\.com\/_\/stat[^>]*>/g, '')
    // Defensive: nothing executable from the feed
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/g, (m) => rewriteEmbed(m.match(/<iframe[^>]*>/)[0]))
    .replace(/<img /g, '<img loading="lazy" decoding="async" ')
    .replace(/<a href="(https?:[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');

  // The article body repeats the title as its first heading.
  html = html.replace(/^\s*<h3>([\s\S]*?)<\/h3>/, (m, inner) => (normalize(stripTags(inner)) === normalize(title) ? '' : m));

  // Give section headings ids so the table of contents can link to them.
  const headings = [];
  const used = new Set();
  html = html.replace(/<(h3|h4)>([\s\S]*?)<\/\1>/g, (_, level, inner) => {
    const label = stripTags(inner);
    let id = slugify(label) || 'section';
    for (let i = 2; used.has(id); i++) id = `${slugify(label)}-${i}`;
    used.add(id);
    headings.push({ id, label, depth: level === 'h3' ? 1 : 2 });
    return `<${level} id="${id}">${inner}</${level}>`;
  });

  return { html: html.trim(), publication, headings };
}

// Medium's estimate: 265 wpm, plus 12s for the first image, 11s for the next, down to 3s each.
function readingMinutes(html) {
  const words = stripTags(html).split(' ').filter(Boolean).length;
  const images = (html.match(/<img /g) ?? []).length;
  let imageSeconds = 0;
  for (let i = 0; i < images; i++) imageSeconds += Math.max(12 - i, 3);
  return Math.max(1, Math.round(words / 265 + imageSeconds / 60));
}

function excerpt(html) {
  for (const m of html.matchAll(/<p>([\s\S]*?)<\/p>/g)) {
    const text = stripTags(m[1]);
    if (text.length > 40) return text.length > 220 ? `${text.slice(0, 217).replace(/\s+\S*$/, '')}…` : text;
  }
  return '';
}

function parseItem(xml) {
  const title = decodeEntities(tag(xml, 'title'));
  const id = tag(xml, 'guid').split('/').pop();
  const url = tag(xml, 'link').split('?')[0];
  const pathSlug = new URL(url).pathname.split('/').pop() ?? '';
  const slug = pathSlug.replace(new RegExp(`-?${id}$`), '') || id;
  const { html, publication, headings } = cleanContent(tag(xml, 'content:encoded'), title);

  return {
    id,
    slug,
    title,
    url,
    publication,
    publishedAt: new Date(tag(xml, 'pubDate')).toISOString(),
    updatedAt: tag(xml, 'atom:updated'),
    tags: tags(xml, 'category'),
    cover: html.match(/<img [^>]*src="([^"]+)"/)?.[1] ?? null,
    excerpt: excerpt(html),
    readingMinutes: readingMinutes(html),
    headings,
    html,
  };
}

const res = await fetch(FEED_URL);
if (!res.ok) throw new Error(`Feed request failed: ${res.status} ${res.statusText}`);
const xml = await res.text();
const fresh = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => parseItem(m[1]));

let existing = [];
try {
  existing = JSON.parse(await readFile(OUT_FILE, 'utf8'));
} catch {
  // first run
}

const byId = new Map(existing.map((p) => [p.id, p]));
const added = fresh.filter((p) => !byId.has(p.id));
for (const p of fresh) byId.set(p.id, p);

const posts = [...byId.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
await writeFile(OUT_FILE, `${JSON.stringify(posts, null, 2)}\n`);

console.log(`Synced ${fresh.length} posts from the feed (${posts.length} total).`);
for (const p of added) console.log(`  new: ${p.slug}`);
if (added.length) console.log('Add clap counts for new posts in src/lib/medium.ts.');
