import { globalStyle } from '@vanilla-extract/css';

globalStyle('body', {
  backgroundColor: 'rgb(250, 250, 250)',
});

globalStyle('a', {
  textDecoration: 'none',
  color: 'inherit',
});

globalStyle('*', {
  boxSizing: 'border-box',
});
