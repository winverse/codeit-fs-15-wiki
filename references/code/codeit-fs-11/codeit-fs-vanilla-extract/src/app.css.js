import { style } from '@vanilla-extract/css';
import { breakpoints, tokens } from '@/styles/tokens.css.js';
import { vars } from '@/styles/theme.css.js';

export const page = style({
  minHeight: '100vh',
  padding: tokens.space.xl,
  backgroundColor: vars.color.background,
  color: vars.color.text,
  transition: 'background-color 0.3s ease, color 0.3s ease',
});

export const container = style({
  maxWidth: '960px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.lg,
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.sm,
});

export const grid = style({
  display: 'grid',
  gap: tokens.space.md,
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

export const card = style({
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: tokens.radius.lg,
  padding: tokens.space.lg,
  boxShadow: tokens.shadow.sm,
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.sm,
});

export const buttonRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: tokens.space.sm,
});

export const formRow = style({
  display: 'grid',
  gap: tokens.space.sm,
});
