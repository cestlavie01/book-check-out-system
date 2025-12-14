/**
 * NextAuth 타입 확장
 *
 * 📚 기초 설명:
 * - TypeScript는 타입 정보가 필요합니다
 * - NextAuth의 기본 세션에는 'role'이 없어서, 직접 추가해야 합니다
 * - .d.ts 파일은 타입 정의 파일로, 실제 코드는 없고 타입만 정의합니다
 */

import { Role } from "@/generated/prisma";

// NextAuth 모듈의 타입을 확장
declare module "next-auth" {
  // 세션의 user 객체에 추가 필드 정의
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: Role; // 우리가 추가한 역할 필드
    };
  }
}
