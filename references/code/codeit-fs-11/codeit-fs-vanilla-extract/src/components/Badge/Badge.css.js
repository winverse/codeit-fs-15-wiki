import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/styles/theme.css.js';
import { tokens } from '@/styles/tokens.css.js';

export const badge = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    borderRadius: tokens.radius.md,
    transition: 'all 0.2s ease',
  },

  variants: {
    color: {
      primary: {
        backgroundColor: vars.color.primary,
        color: '#ffffff',
      },
      secondary: {
        backgroundColor: vars.color.surface,
        color: vars.color.text,
        border: `1px solid ${vars.color.border}`,
      },
      success: {
        backgroundColor: '#10b981',
        color: '#ffffff',
      },
      warning: {
        backgroundColor: '#f59e0b',
        color: '#ffffff',
      },
      danger: {
        backgroundColor: '#ef4444',
        color: '#ffffff',
      },
    },

    size: {
      sm: {
        padding: `${tokens.space.xs} ${tokens.space.sm}`,
        fontSize: '12px',
      },
      md: {
        padding: `${tokens.space.xs} ${tokens.space.md}`,
        fontSize: '14px',
      },
      lg: {
        padding: `${tokens.space.sm} ${tokens.space.lg}`,
        fontSize: '16px',
      },
    },

    rounded: {
      false: {},
      true: {
        borderRadius: '9999px',
      },
    },
  },

  compoundVariants: [
    {
      variants: {
        color: 'secondary',
        size: 'lg',
      },
      style: {
        fontWeight: 700,
      },
    },
  ],

  defaultVariants: {
    color: 'primary',
    size: 'md',
    rounded: false,
  },
});
