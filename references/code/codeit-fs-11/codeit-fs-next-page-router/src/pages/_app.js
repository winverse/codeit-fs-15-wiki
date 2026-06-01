import GlobalLayout from '@/components/layouts/GlobalLayout';
import '@/styles/reset.css.js';
import '@/styles/globals.css.js';

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
