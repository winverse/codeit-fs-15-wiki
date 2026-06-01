import { style } from '@vanilla-extract/css';

export const panel = style({
  background: 'var(--color-surface)',
  backdropFilter: 'blur(12px)',
  border: '1px solid var(--color-border)',
  borderRadius: 28,
  boxShadow: 'var(--shadow-soft)',
  padding: 24,
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginBottom: 20,
});

export const title = style({
  fontSize: 24,
  fontWeight: 700,
});

export const description = style({
  color: 'var(--color-text-secondary)',
  lineHeight: 1.6,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});
