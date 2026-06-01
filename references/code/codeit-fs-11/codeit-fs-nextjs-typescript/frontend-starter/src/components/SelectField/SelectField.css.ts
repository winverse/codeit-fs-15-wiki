import { style } from '@vanilla-extract/css';

export const field = style({
  display: 'grid',
  gap: '0.5rem',
});

export const label = style({
  fontSize: '0.92rem',
  fontWeight: 700,
  color: 'var(--color-text-secondary)',
});

export const select = style({
  width: '100%',
  border: '1px solid var(--color-border)',
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.92)',
  padding: '0.9rem 1rem',
  color: 'var(--color-text-primary)',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  selectors: {
    '&:focus': {
      borderColor: 'var(--color-primary-500)',
      boxShadow: '0 0 0 4px rgba(37, 99, 235, 0.12)',
    },
  },
});
