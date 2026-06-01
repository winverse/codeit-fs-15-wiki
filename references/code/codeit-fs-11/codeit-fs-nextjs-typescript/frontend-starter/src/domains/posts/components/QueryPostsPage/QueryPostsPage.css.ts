import { style } from '@vanilla-extract/css';

export const page = style({
  minHeight: '100vh',
  padding: '3.5rem 1.5rem 5rem',
});

export const container = style({
  width: 'min(1180px, 100%)',
  margin: '0 auto',
  display: 'grid',
  gap: '1.5rem',
});

export const lead = style({
  color: 'var(--color-text-secondary)',
  lineHeight: 1.8,
  maxWidth: '74ch',
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.95fr)',
  gap: '1rem',
  '@media': {
    'screen and (max-width: 960px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const side = style({
  display: 'grid',
  gap: '1rem',
});

export const actions = style({
  display: 'flex',
  gap: '0.75rem',
  flexWrap: 'wrap',
});

export const infiniteList = style({
  display: 'grid',
  gap: '0.75rem',
});

export const status = style({
  color: '#b91c1c',
  fontSize: '0.92rem',
});
