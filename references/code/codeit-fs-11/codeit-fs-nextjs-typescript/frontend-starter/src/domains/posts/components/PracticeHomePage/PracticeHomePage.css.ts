import { style } from '@vanilla-extract/css';

export const page = style({
  minHeight: '100vh',
  padding: '4rem 1.5rem 5rem',
});

export const container = style({
  width: 'min(1120px, 100%)',
  margin: '0 auto',
  display: 'grid',
  gap: '1.5rem',
});

export const hero = style({
  display: 'grid',
  gap: '1rem',
});

export const eyebrow = style({
  fontSize: '0.82rem',
  fontWeight: 800,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--color-accent)',
});

export const title = style({
  fontSize: 'clamp(2rem, 3vw, 3.2rem)',
  lineHeight: 1.1,
});

export const lead = style({
  maxWidth: '72ch',
  color: 'var(--color-text-secondary)',
  lineHeight: 1.8,
});

export const steps = style({
  paddingLeft: '1.25rem',
  lineHeight: 1.8,
  color: 'var(--color-text-secondary)',
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '1rem',
});

export const linkCard = style({
  display: 'grid',
  gap: '0.75rem',
  minHeight: '220px',
});

export const linkTitle = style({
  fontSize: '1.1rem',
  lineHeight: 1.4,
});

export const linkDescription = style({
  color: 'var(--color-text-secondary)',
  lineHeight: 1.7,
});
