import { style } from '@vanilla-extract/css';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '20px 0',
});

export const input = style({
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ddd',
});

export const textarea = style({
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  resize: 'vertical',
  minHeight: '100px',
});

export const submitBtn = style({
  padding: '10px',
  fontSize: '16px',
  backgroundColor: 'black',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#333',
  },
  ':disabled': {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
});
