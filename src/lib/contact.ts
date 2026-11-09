// Contact page links. Icons live in src/app/contact/page.tsx, keyed by label.
// The site AI reads this too (src/lib/ai-context.ts).

export type ContactLink = { label: string; value: string; href: string };

export const contactEmails: ContactLink[] = [
  { label: 'E-mail', value: 'cbalaranjith@gmail.com', href: 'mailto:cbalaranjith@gmail.com' },
  { label: 'School E-mail', value: '1056935@lwsd.org', href: 'mailto:1056935@lwsd.org' },
  { label: 'Collegiate E-mail', value: 'cleofus.balaranjith@bellevuecollege.edu', href: 'mailto:cleofus.balaranjith@bellevuecollege.edu' },
];

export const socialLinks: ContactLink[] = [
  { label: 'Instagram', value: 'cleobalaranjith', href: 'https://www.instagram.com/cleobalaranjith/' },
  { label: 'GitHub', value: 'CleeYOpro', href: 'https://github.com/CleeYOpro' },
  { label: 'LinkedIn', value: 'cleofus', href: 'https://www.linkedin.com/in/cleofus/' },
  { label: 'Discord', value: 'View my Discord profile', href: 'https://discord.com/users/1287117811482628286' },
];
