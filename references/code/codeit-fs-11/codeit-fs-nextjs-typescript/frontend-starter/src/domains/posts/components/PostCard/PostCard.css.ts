import { style } from '@vanilla-extract/css';

export const card = style({
  width: '100%',
  border: '1px solid var(--color-border)',
  borderRadius: '20px',
  background: 'rgba(255, 255, 255, 0.92)',
  padding: '1rem 1.1rem',
  textAlign: 'left',
  cursor: 'pointer',
  transition:
    'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
  selectors: {
    '&:hover': {
      transform: 'translateY(-2px)',
      borderColor: 'rgba(37, 99, 235, 0.4)',
      boxShadow: 'var(--shadow-soft)',
    },
  },
});

export const selected = style({
  borderColor: 'var(--color-primary-500)',
  boxShadow: '0 0 0 4px rgba(37, 99, 235, 0.12)',
});

export const title = style({
  fontSize: '1rem',
  fontWeight: 700,
  marginBottom: '0.5rem',
});

export const content = style({
  color: 'var(--color-text-secondary)',
  lineHeight: 1.6,
  marginBottom: '0.75rem',
});

export const meta = style({
  fontSize: '0.86rem',
  color: 'var(--color-accent)',
  fontWeight: 600,
});
