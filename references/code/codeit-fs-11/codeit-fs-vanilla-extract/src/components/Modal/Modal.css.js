import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';
import { tokens } from '@/styles/tokens.css.js';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(15, 23, 42, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: tokens.space.lg,
  zIndex: 20,
});

export const modal = style({
  width: '100%',
  maxWidth: '420px',
  backgroundColor: vars.color.surface,
  borderRadius: tokens.radius.lg,
  padding: tokens.space.lg,
  boxShadow: tokens.shadow.sm,
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.md,
});

export const modalTitle = style({
  fontSize: '18px',
  fontWeight: 700,
});

export const modalBody = style({
  color: vars.color.muted,
  lineHeight: 1.5,
});

export const modalActions = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: tokens.space.sm,
});
