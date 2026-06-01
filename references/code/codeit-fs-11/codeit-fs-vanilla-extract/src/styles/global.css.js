import { globalStyle } from '@vanilla-extract/css';

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif",
});

globalStyle('#root', {
  minHeight: '100vh',
});

globalStyle('button, input, textarea', {
  fontFamily: 'inherit',
});
