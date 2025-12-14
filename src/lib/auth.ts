/**
 * NextAuth 설정 파일
 *
 * 📚 기초 설명:
 * - NextAuth.js는 인증(로그인)을 쉽게 구현해주는 라이브러리입니다
 * - Google, GitHub 등 OAuth 제공자를 간단히 연동할 수 있습니다
 * - 세션 관리, 토큰 관리를 자동으로 처리해줍니다
 */

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // 사용할 인증 제공자 목록
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // 콜백: 인증 과정에서 특정 시점에 실행되는 함수들
  callbacks: {
    // signIn: 로그인 시 실행 - 사용자 정보를 DB에 저장
    async signIn({ user }) {
      if (!user.email) return false;

      // 이메일로 사용자 찾기, 없으면 생성
      await prisma.user.upsert({
        where: { email: user.email },
        update: {
          name: user.name,
          image: user.image,
        },
        create: {
          email: user.email,
          name: user.name,
          image: user.image,
        },
      });

      return true; // true 반환 = 로그인 허용
    },

    // session: 세션 정보를 가져올 때 실행 - DB에서 역할 정보 추가
    async session({ session }) {
      if (session.user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email },
        });

        if (dbUser) {
          // 세션에 사용자 ID와 역할 추가
          session.user.id = dbUser.id;
          session.user.role = dbUser.role;
        }
      }

      return session;
    },
  },
});
