import HomeClient from '@/components/HomeClient';
import { getGithubContributions } from '@/lib/github';
import { articles } from '@/lib/medium';

export default async function HomePage() {
  const contributions = await getGithubContributions('CleeYOpro');
  // Only the list fields go to the client component, not the article HTML.
  const blogs = articles.slice(0, 3).map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    date: a.publishedAt.slice(0, 10),
  }));

  return <HomeClient contributions={contributions} blogs={blogs} />;
}
