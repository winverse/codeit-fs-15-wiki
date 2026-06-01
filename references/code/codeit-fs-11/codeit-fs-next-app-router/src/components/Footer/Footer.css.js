import { style } from '@vanilla-extract/css';

export const container = style({
  marginTop: '40px',
  padding: '16px 0',
  borderTop: '1px solid #e5e7eb',
  color: '#6b7280',
  fontSize: '14px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
});

export const count = style({
  color: '#374151',
  fontWeight: 600,
});
