/**
 * 루트 레이아웃 (Root Layout)
 *
 * 📚 기초 설명:
 * - layout.tsx는 모든 페이지에 공통으로 적용되는 "틀"입니다
 * - HTML 구조(<html>, <body>)를 정의합니다
 * - 네비게이션 바, 푸터 등 공통 UI를 여기에 넣습니다
 * - {children}은 각 페이지의 내용이 들어가는 자리입니다
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 폰트 설정 - Google Fonts에서 Geist 폰트를 가져옵니다
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 메타데이터 - 브라우저 탭 제목, 검색엔진 설명 등
export const metadata: Metadata = {
  title: "도서 대출 시스템",
  description: "회사 내부 도서 대출 관리 시스템",
};

// RootLayout 컴포넌트
// Readonly<{children: React.ReactNode}> = children prop의 타입 정의
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
