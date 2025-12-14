/**
 * 메인 페이지 (홈)
 *
 * 📚 기초 설명:
 * - page.tsx는 해당 경로의 "페이지" 컴포넌트입니다
 * - src/app/page.tsx = "/" (루트 경로)
 * - src/app/books/page.tsx = "/books" (books 경로)
 *
 * - async 함수: 비동기 함수로, 서버에서 데이터를 가져올 수 있습니다
 * - auth(): 현재 로그인한 사용자 세션을 가져옵니다
 */

import { auth, signIn, signOut } from "@/lib/auth";

// 📌 async를 붙이면 서버 컴포넌트에서 await 사용 가능
export default async function Home() {
  // 현재 로그인 세션 가져오기
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 네비게이션 바 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            도서 대출 시스템
          </h1>

          {/* 로그인 상태에 따라 다른 UI 표시 */}
          {session?.user ? (
            <div className="flex items-center gap-4">
              {/* 프로필 이미지 */}
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt="프로필"
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-gray-700">{session.user.name}</span>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                {session.user.role === "ADMIN" ? "관리자" : "이용자"}
              </span>

              {/* 로그아웃 폼 */}
              <form
                action={async () => {
                  "use server"; // 서버 액션임을 표시
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  로그아웃
                </button>
              </form>
            </div>
          ) : (
            // 로그인 폼
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Google로 로그인
              </button>
            </form>
          )}
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {session?.user ? (
          // 로그인된 상태
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              환영합니다, {session.user.name}님!
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 책 목록 카드 */}
              <a
                href="/books"
                className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  도서 목록
                </h3>
                <p className="mt-2 text-gray-600">
                  대출 가능한 책들을 확인하세요
                </p>
              </a>

              {/* 내 대출 현황 카드 */}
              <a
                href="/my-checkouts"
                className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  내 대출 현황
                </h3>
                <p className="mt-2 text-gray-600">
                  현재 빌린 책과 반납 예정일 확인
                </p>
              </a>

              {/* 관리자 전용 카드 */}
              {session.user.role === "ADMIN" && (
                <a
                  href="/admin"
                  className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition border-2 border-blue-200"
                >
                  <h3 className="text-lg font-semibold text-blue-900">
                    관리자 메뉴
                  </h3>
                  <p className="mt-2 text-blue-600">
                    책과 선반 등록 및 관리
                  </p>
                </a>
              )}
            </div>
          </div>
        ) : (
          // 로그인 안된 상태
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              도서 대출 시스템
            </h2>
            <p className="text-gray-600 mb-8">
              회사 내부 도서를 편리하게 대출하고 관리하세요.
            </p>
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg"
              >
                Google 계정으로 시작하기
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
