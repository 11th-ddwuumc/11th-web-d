import { Link } from "@tanstack/react-router";
import { MOCK_MEMBER } from "./mock-member";

export function MyPage() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 pt-8 pb-12">
      <h1 className="mb-6 text-2xl font-bold">내 정보</h1>

      <section className="flex flex-col gap-6 rounded-[10px] bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-gray-100">
            <img src="/icons/person.svg" alt="" className="size-7" />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-lg font-bold">{MOCK_MEMBER.nickname}</p>
            <p className="text-sm text-gray-500">{MOCK_MEMBER.email}</p>
          </div>
        </div>

        <dl className="flex flex-col gap-3 border-t border-gray-100 pt-5 text-sm">
          <div className="flex gap-4">
            <dt className="w-16 shrink-0 text-gray-500">이메일</dt>
            <dd>{MOCK_MEMBER.email}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-16 shrink-0 text-gray-500">닉네임</dt>
            <dd>{MOCK_MEMBER.nickname}</dd>
          </div>
        </dl>

        <Link
          to="/my/edit"
          className="flex h-10 items-center justify-center gap-1.5 rounded-md border border-gray-200 text-sm font-semibold text-gray-700"
        >
          <img src="/icons/edit.svg" alt="" className="size-4" />
          정보 수정
        </Link>
      </section>
    </main>
  );
}
