import { createGlobalTheme } from '@vanilla-extract/css';

export const tokens = createGlobalTheme(':root', {
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radius: {
    md: '12px',
    lg: '16px',
  },
  shadow: {
    sm: '0 8px 20px rgba(15, 23, 42, 0.08)',
  },
});

export const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
};
