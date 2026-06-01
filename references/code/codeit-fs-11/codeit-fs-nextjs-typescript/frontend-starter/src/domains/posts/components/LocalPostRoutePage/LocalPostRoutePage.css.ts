import { style } from '@vanilla-extract/css';

export const page = style({
  minHeight: '100vh',
  padding: '3.5rem 1.5rem 5rem',
});

export const container = style({
  width: 'min(840px, 100%)',
  margin: '0 auto',
  display: 'grid',
  gap: '1.25rem',
});

export const lead = style({
  color: 'var(--color-text-secondary)',
  lineHeight: 1.8,
});

export const status = style({
  color: '#b91c1c',
  fontSize: '0.92rem',
});
