# 도서 대출 시스템

회사 내부 도서 대출 관리 시스템입니다.

## 기술 스택

- **Frontend & Backend**: Next.js 15 (App Router)
- **언어**: TypeScript
- **데이터베이스**: SQLite + Prisma ORM
- **인증**: NextAuth.js (Google OAuth)
- **스타일링**: Tailwind CSS

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env` 파일을 열어 Google OAuth 설정을 추가하세요:

```env
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

> Google Cloud Console에서 OAuth 2.0 클라이언트 ID를 발급받으세요.
> Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### 3. 데이터베이스 초기화

```bash
npx prisma migrate dev
```

### 4. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인하세요.

## 프로젝트 구조

```
src/
├── app/                    # 페이지 및 API 라우트
│   ├── api/auth/          # 인증 API
│   ├── page.tsx           # 메인 페이지
│   └── layout.tsx         # 공통 레이아웃
├── lib/                    # 유틸리티
│   ├── auth.ts            # NextAuth 설정
│   └── prisma.ts          # Prisma 클라이언트
├── components/            # 재사용 컴포넌트
├── types/                 # TypeScript 타입 정의
└── generated/prisma/      # Prisma 생성 코드

prisma/
├── schema.prisma          # 데이터베이스 스키마
└── migrations/            # 마이그레이션 파일
```

## 주요 기능

- Google OAuth 로그인
- 이용자: 도서 목록 조회, 대출/반납
- 관리자: 도서 등록, 선반 관리
