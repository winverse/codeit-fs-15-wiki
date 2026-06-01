import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import { clsx } from 'clsx';
import '@/styles/globals.css';
import AppProviders from '@/providers/AppProviders';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next.js TypeScript Practice',
  description: '자료 1~7 기준의 Next.js TypeScript 실습 코드',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={clsx(plusJakartaSans.variable, spaceGrotesk.variable)}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
