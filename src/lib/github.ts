export type GithubContributions = {
  weeks: (number | null)[][];
  total: number;
  monthLabels: { index: number; label: string }[];
};

type ApiDay = { date: string; count: number; level: number };
type ApiResponse = { total: Record<string, number>; contributions: ApiDay[] };

const EMPTY: GithubContributions = { weeks: [], total: 0, monthLabels: [] };
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export async function getGithubContributions(username: string): Promise<GithubContributions> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!res.ok) return EMPTY;

    const data: ApiResponse = await res.json();
    if (!Array.isArray(data.contributions) || data.contributions.length === 0) return EMPTY;

    const days = data.contributions;
    const leadingGap = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
    const padded: (number | null)[] = [
      ...Array(leadingGap).fill(null),
      ...days.map((d) => d.level),
    ];
    while (padded.length % 7 !== 0) padded.push(null);

    const weeks: (number | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));

    const monthLabels: { index: number; label: string }[] = [];
    let lastMonth = -1;
    let lastLabelIndex = -Infinity;
    const MIN_COLUMN_GAP = 3;
    for (let w = 0; w < weeks.length; w++) {
      const firstDayIndex = w * 7 - leadingGap;
      const day = days[Math.max(firstDayIndex, 0)];
      if (!day) continue;
      const month = new Date(`${day.date}T00:00:00Z`).getUTCMonth();
      if (month !== lastMonth) {
        lastMonth = month;
        if (w - lastLabelIndex >= MIN_COLUMN_GAP) {
          monthLabels.push({ index: w, label: MONTH_NAMES[month] });
          lastLabelIndex = w;
        }
      }
    }

    const total = Object.values(data.total).reduce((sum, n) => sum + n, 0);

    return { weeks, total, monthLabels };
  } catch {
    return EMPTY;
  }
}
