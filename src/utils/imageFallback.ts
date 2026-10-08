/**
 * Generates an elegant SVG data-URL fallback image for a game
 * ensuring the Zero-Broken-Image Policy is always upheld.
 */
export function getGameCoverFallback(title: string, genre: string): string {
  const safeTitle = (title || 'Game Review').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeGenre = (genre || 'Video Game').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#141724" />
        <stop offset="50%" stop-color="#1a1d2e" />
        <stop offset="100%" stop-color="#0f111a" />
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ff4655" />
        <stop offset="100%" stop-color="#ff7582" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2b3048" stroke-width="0.75" stroke-opacity="0.5" />
      </pattern>
    </defs>
    <rect width="800" height="450" fill="url(#bg)" />
    <rect width="800" height="450" fill="url(#grid)" />
    
    <!-- Decorative geometric accent lines -->
    <path d="M 0 440 L 800 440" stroke="url(#accent)" stroke-width="4" />
    <circle cx="700" cy="80" r="140" fill="#ff4655" fill-opacity="0.05" />
    <circle cx="100" cy="380" r="90" fill="#2b3048" fill-opacity="0.3" />

    <!-- Game Controller icon -->
    <g transform="translate(360, 130) scale(1.6)" fill="none" stroke="#ff4655" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 11H10M8 9V13" />
      <circle cx="15" cy="12" r="1" fill="#ff4655" />
      <circle cx="18" cy="10" r="1" fill="#ff4655" />
      <rect x="2" y="6" width="20" height="12" rx="4" />
    </g>

    <!-- Text -->
    <text x="400" y="270" text-anchor="middle" font-family="system-ui, sans-serif" font-size="28" font-weight="700" fill="#ffffff" letter-spacing="0.5">${safeTitle}</text>
    <text x="400" y="305" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#9da3af" letter-spacing="2" text-transform="uppercase">${safeGenre}</text>
    <text x="400" y="360" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#ff4655" letter-spacing="1">PIXCEL.GG ARCHIVE</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
