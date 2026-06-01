import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  gap: '15px',
  padding: '20px 0',
  borderBottom: '1px solid #e5e5e5',
});

export const coverImg = style({
  width: '80px',
  height: '105px',
  backgroundColor: '#f2f2f2',
});

export const info = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  flex: 1,
});

export const title = style({
  width: '150px',
  height: '20px',
  backgroundColor: '#f2f2f2',
});

export const subtitle = style({
  width: '200px',
  height: '15px',
  backgroundColor: '#f2f2f2',
});

export const author = style({
  width: '80px',
  height: '15px',
  backgroundColor: '#f2f2f2',
});
