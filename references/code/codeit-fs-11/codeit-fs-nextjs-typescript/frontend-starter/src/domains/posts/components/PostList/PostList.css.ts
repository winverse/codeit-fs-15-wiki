import { style } from '@vanilla-extract/css';

export const list = style({
  display: 'grid',
  gap: '0.9rem',
});

export const empty = style({
  color: 'var(--color-text-secondary)',
  lineHeight: 1.7,
});
