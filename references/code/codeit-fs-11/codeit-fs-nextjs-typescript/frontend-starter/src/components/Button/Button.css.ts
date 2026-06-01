import { style, styleVariants } from '@vanilla-extract/css';

export const base = style({
  border: '1px solid transparent',
  borderRadius: 999,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  fontWeight: 600,
  padding: '10px 16px',
  transition: 'all 0.2s ease',
  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.45,
    },
  },
});

export const variant = styleVariants({
  primary: {
    background: 'var(--color-primary-600)',
    color: '#ffffff',
    boxShadow: '0 12px 30px rgba(37, 99, 235, 0.22)',
  },
  danger: {
    background: '#b91c1c',
    color: '#ffffff',
    boxShadow: '0 12px 30px rgba(185, 28, 28, 0.2)',
  },
  secondary: {
    background: 'var(--color-surface-strong)',
    borderColor: 'var(--color-border)',
    color: 'var(--color-text-primary)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-primary-700)',
  },
});
