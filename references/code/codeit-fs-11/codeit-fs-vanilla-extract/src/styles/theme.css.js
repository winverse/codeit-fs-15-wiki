import { createTheme, createThemeContract } from '@vanilla-extract/css';

export const vars = createThemeContract({
  color: {
    primary: null,
    primaryHover: null,
    surface: null,
    background: null,
    border: null,
    text: null,
    muted: null,
  },
});

export const lightTheme = createTheme(vars, {
  color: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    surface: '#ffffff',
    background: '#f8fafc',
    border: '#e5e7eb',
    text: '#111827',
    muted: '#6b7280',
  },
});

export const darkTheme = createTheme(vars, {
  color: {
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    surface: '#111827',
    background: '#0b1120',
    border: '#334155',
    text: '#f8fafc',
    muted: '#94a3b8',
  },
});
