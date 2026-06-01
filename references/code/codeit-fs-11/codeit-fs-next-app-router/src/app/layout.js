import '@/styles/globals.css.js';
import GlobalLayout from '@/components/layouts/GlobalLayout';

export const metadata = {
  title: 'App Router Starter',
  description: 'App Router basic setup',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <GlobalLayout>{children}</GlobalLayout>
      </body>
    </html>
  );
}
