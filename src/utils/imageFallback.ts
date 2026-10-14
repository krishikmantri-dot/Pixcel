/**
 * ============================================================================
 * pixcel.gg — Image Fallback Utility
 * Generates an SVG data-URL fallback artwork in the black and yellow arcade
 * style when remote or external game covers fail to load.
 * ============================================================================
 */

export function getGameCoverFallback(title: string, genre: string): string {
  const safeTitle = (title || 'Game Review')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const safeGenre = (genre || 'Video Game')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a0a0a" />
        <stop offset="50%" stop-color="#141410" />
        <stop offset="100%" stop-color="#050505" />
      </linearGradient>
      <linearGradient id="accentYellow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ffe600" />
        <stop offset="100%" stop-color="#fff04d" />
      </linearGradient>
      <pattern id="arcadeGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#222218" stroke-width="0.75" stroke-opacity="0.6" />
      </pattern>
    </defs>
    <rect width="800" height="450" fill="url(#bg)" />
    <rect width="800" height="450" fill="url(#arcadeGrid)" />
    
    <!-- Retro Arcade Yellow Accent Lines -->
    <path d="M 0 440 L 800 440" stroke="url(#accentYellow)" stroke-width="6" />
    <circle cx="700" cy="80" r="140" fill="#ffe600" fill-opacity="0.04" />
    <circle cx="100" cy="380" r="90" fill="#ffe600" fill-opacity="0.03" />

    <!-- Game Controller Icon in Yellow -->
    <g transform="translate(360, 130) scale(1.6)" fill="none" stroke="#ffe600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 11H10M8 9V13" />
      <circle cx="15" cy="12" r="1" fill="#ffe600" />
      <circle cx="18" cy="10" r="1" fill="#ffe600" />
      <rect x="2" y="6" width="20" height="12" rx="4" />
    </g>

    <!-- Typography -->
    <text x="400" y="270" text-anchor="middle" font-family="'Inter', system-ui, sans-serif" font-size="28" font-weight="700" fill="#ffffff" letter-spacing="0.5">${safeTitle}</text>
    <text x="400" y="305" text-anchor="middle" font-family="'Inter', system-ui, sans-serif" font-size="14" font-weight="700" fill="#ffe600" letter-spacing="2" text-transform="uppercase">${safeGenre}</text>
    <text x="400" y="360" text-anchor="middle" font-family="'Inter', system-ui, sans-serif" font-size="12" font-weight="600" fill="#999999" letter-spacing="1.5">PIXCEL.GG ARCHIVE</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
