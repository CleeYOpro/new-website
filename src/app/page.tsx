import HomeClient from '@/components/HomeClient';
import { getGithubContributions } from '@/lib/github';

export default async function HomePage() {
  const contributions = await getGithubContributions('CleeYOpro');

  return <HomeClient contributions={contributions} />;
}
