import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'grid',
  gap: '1rem',
});

export const title = style({
  fontSize: '1.4rem',
  lineHeight: 1.3,
});

export const body = style({
  color: 'var(--color-text-secondary)',
  lineHeight: 1.8,
  whiteSpace: 'pre-wrap',
});

export const meta = style({
  fontSize: '0.92rem',
  color: 'var(--color-accent)',
  fontWeight: 700,
});

export const empty = style({
  color: 'var(--color-text-secondary)',
  lineHeight: 1.7,
});
