import { globalStyle } from '@vanilla-extract/css';

globalStyle(':root', {
  vars: {
    '--color-text-primary': '#0f172a',
    '--color-text-secondary': '#334155',
    '--color-surface': 'rgba(255, 255, 255, 0.92)',
    '--color-surface-strong': '#ffffff',
    '--color-surface-muted': '#eef4ff',
    '--color-border': 'rgba(37, 99, 235, 0.18)',
    '--color-primary-100': '#dbeafe',
    '--color-primary-500': '#2563eb',
    '--color-primary-600': '#1d4ed8',
    '--color-primary-700': '#1e40af',
    '--color-accent': '#0f766e',
    '--shadow-soft': '0 24px 60px rgba(37, 99, 235, 0.12)',
  },
});

globalStyle('html, body', {
  maxWidth: '100vw',
  overflowX: 'hidden',
});

globalStyle('body', {
  color: 'var(--color-text-primary)',
  background:
    'radial-gradient(circle at top left, rgba(191, 219, 254, 0.8), transparent 30%), linear-gradient(135deg, #f8fbff 0%, #eef4ff 55%, #f8fafc 100%)',
  fontFamily: "var(--font-plus-jakarta-sans), 'Noto Sans KR', sans-serif",
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('*', {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
});

globalStyle('h1, h2, h3', {
  fontFamily:
    'var(--font-space-grotesk), var(--font-plus-jakarta-sans), sans-serif',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('button, input', {
  font: 'inherit',
});
