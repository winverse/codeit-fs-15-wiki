import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { clsx } from "clsx";
import "@/styles/globals.css.js";
import AppProviders from "@/providers/AppProviders";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata = {
  title: "React Query Auth",
  description: "React Query 기반 로그인/회원가입 실습",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={clsx(plusJakartaSans.variable, spaceGrotesk.variable)}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
