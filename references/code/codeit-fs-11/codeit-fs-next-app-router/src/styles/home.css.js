import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
});

export const section = style({
  width: '100%',
  marginBottom: '30px',
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginTop: '10px',
});
