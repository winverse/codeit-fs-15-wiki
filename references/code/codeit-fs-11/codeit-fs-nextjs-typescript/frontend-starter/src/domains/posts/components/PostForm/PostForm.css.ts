import { style } from '@vanilla-extract/css';

export const form = style({
  display: 'grid',
  gap: '1rem',
});

export const textareaField = style({
  display: 'grid',
  gap: '0.5rem',
});

export const label = style({
  fontSize: '0.92rem',
  fontWeight: 700,
  color: 'var(--color-text-secondary)',
});

export const textarea = style({
  minHeight: '160px',
  width: '100%',
  border: '1px solid var(--color-border)',
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.92)',
  padding: '0.9rem 1rem',
  resize: 'vertical',
  color: 'var(--color-text-primary)',
  outline: 'none',
  selectors: {
    '&:focus': {
      borderColor: 'var(--color-primary-500)',
      boxShadow: '0 0 0 4px rgba(37, 99, 235, 0.12)',
    },
  },
});

export const actions = style({
  display: 'flex',
  gap: '0.75rem',
  flexWrap: 'wrap',
});

export const message = style({
  fontSize: '0.88rem',
  color: '#b91c1c',
});
