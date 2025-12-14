/**
 * NextAuth API 라우트
 *
 * 📚 기초 설명:
 * - [...nextauth]는 "동적 라우트"입니다 (여러 경로를 한 파일에서 처리)
 * - /api/auth/signin, /api/auth/callback/google 등 모든 인증 관련 경로를 처리합니다
 * - handlers에는 GET과 POST 함수가 있어서 그대로 내보냅니다
 */

import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
