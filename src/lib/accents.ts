// Accent palettes. The CSS for each one lives in globals.css under
// :root[data-accent="..."]; `hex` here feeds the canvas dot grid, which
// can't read CSS variables, and the swatch buttons in the settings menu.
export const ACCENTS = [
  { id: 'orange', label: 'Ember', hex: '#D5674F' },
  { id: 'white', label: 'Frost', hex: '#f4f4f5' },
  { id: 'blue', label: 'Ice blue', hex: '#4da8ff' },
  { id: 'green', label: 'Matrix', hex: '#00ff41' },
  { id: 'gold', label: 'Gold', hex: '#f0c14b' },
] as const;

export type AccentId = (typeof ACCENTS)[number]['id'];

export const DEFAULT_ACCENT: AccentId = 'orange';
export const ACCENT_STORAGE_KEY = 'accent';

export function isAccentId(value: unknown): value is AccentId {
  return ACCENTS.some((a) => a.id === value);
}

// Runs in <head> while the HTML is still parsing, so a saved accent is on
// <html> before first paint and the page never flashes orange first.
export const accentInitScript = `(function(){try{var a=localStorage.getItem(${JSON.stringify(
  ACCENT_STORAGE_KEY,
)});if(${JSON.stringify(ACCENTS.map((a) => a.id))}.indexOf(a)>-1)document.documentElement.setAttribute("data-accent",a)}catch(e){}})()`;
