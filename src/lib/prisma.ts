/**
 * Prisma Client 인스턴스
 *
 * 📚 기초 설명:
 * - Prisma Client는 데이터베이스와 통신하는 도구입니다
 * - 이 파일은 앱 전체에서 하나의 Prisma 인스턴스만 사용하도록 합니다
 * - 개발 중 핫 리로드 시 연결이 중복되는 것을 방지합니다
 */

import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// globalThis: 전역 객체 (브라우저의 window, Node.js의 global과 비슷)
// TypeScript에게 prisma 속성이 있을 수 있다고 알려줍니다

const globalForPrisma = globalThis as unknown as {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prisma: any;
};

// better-sqlite3 어댑터 생성 (SQLite 파일 사용)
const adapter = new PrismaBetterSqlite3({
  url: "./prisma/dev.db",
});

// 이미 전역에 prisma가 있으면 재사용, 없으면 새로 생성
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

// 개발 환경에서만 전역에 저장 (프로덕션에서는 매번 새로 생성해도 됨)
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
