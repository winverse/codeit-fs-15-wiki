import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';
import { tokens } from '@/styles/tokens.css.js';

export const buttonBase = style({
  border: '1px solid transparent',
  borderRadius: tokens.radius.md,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: tokens.space.xs,
  fontWeight: 600,
  transition: 'all 0.2s ease',
  ':focus': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: '2px',
  },
  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

export const buttonVariants = styleVariants({
  primary: {
    backgroundColor: vars.color.primary,
    color: '#ffffff',
    ':hover': {
      backgroundColor: vars.color.primaryHover,
    },
  },
  secondary: {
    backgroundColor: vars.color.surface,
    color: vars.color.text,
    borderColor: vars.color.border,
    ':hover': {
      borderColor: vars.color.primary,
      color: vars.color.primary,
    },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: vars.color.text,
    ':hover': {
      backgroundColor: 'rgba(37, 99, 235, 0.08)',
      color: vars.color.primary,
    },
  },
});

export const buttonSizes = styleVariants({
  sm: {
    padding: `${tokens.space.xs} ${tokens.space.sm}`,
    fontSize: '14px',
  },
  md: {
    padding: `${tokens.space.sm} ${tokens.space.md}`,
    fontSize: '15px',
  },
  lg: {
    padding: `${tokens.space.md} ${tokens.space.lg}`,
    fontSize: '16px',
  },
});
