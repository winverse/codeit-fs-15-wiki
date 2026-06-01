import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';
import { tokens } from '@/styles/tokens.css.js';

export const inputBase = style({
  width: '100%',
  padding: `${tokens.space.sm} ${tokens.space.md}`,
  borderRadius: tokens.radius.md,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  fontSize: '15px',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  ':focus': {
    borderColor: vars.color.primary,
  },
  ':disabled': {
    backgroundColor: vars.color.surface,
    color: vars.color.muted,
  },
});
