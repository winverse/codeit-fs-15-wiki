import { style } from '@vanilla-extract/css';

export const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  borderRadius: 999,
  border: '1px solid var(--color-border)',
  background: 'rgba(255, 255, 255, 0.88)',
  color: 'var(--color-text-secondary)',
  fontSize: 13,
  fontWeight: 600,
  padding: '8px 12px',
});
