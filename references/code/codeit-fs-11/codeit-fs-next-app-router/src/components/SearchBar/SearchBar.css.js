import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
});

export const input = style({
  flex: 1,
  padding: '8px 10px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  fontSize: '14px',
});

export const button = style({
  padding: '8px 12px',
  borderRadius: '6px',
  border: '1px solid #111827',
  backgroundColor: '#111827',
  color: '#ffffff',
  cursor: 'pointer',
  fontSize: '14px',
});
