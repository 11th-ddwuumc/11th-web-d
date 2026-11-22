import { Link } from "@tanstack/react-router";
import { FavoriteMovieList } from "../../components/movies/favorite-movie-list";
import { useMeQuery } from "../../hooks/use-me-query";

export function MyPage() {
  const meQuery = useMeQuery();

  if (meQuery.isPending) {
    return (
      <main className="mx-auto w-full max-w-xl flex-1 px-4 pt-8 pb-12">
        내 정보를 불러오는 중이에요.
      </main>
    );
  }

  if (meQuery.isError) {
    return (
      <main className="mx-auto w-full max-w-xl flex-1 px-4 pt-8 pb-12">
        내 정보를 불러오지 못했어요. 다시 로그인해 주세요.
      </main>
    );
  }

  const member = meQuery.data;

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 pt-8 pb-12">
      <h1 className="mb-6 text-2xl font-bold">내 정보</h1>

      <section className="flex flex-col gap-6 rounded-[10px] bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-gray-100">
            <img src="/icons/person.svg" alt="" className="size-7" />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-lg font-bold">{member.nickname}</p>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>
        </div>

        <dl className="flex flex-col gap-3 border-t border-gray-100 pt-5 text-sm">
          <div className="flex gap-4">
            <dt className="w-16 shrink-0 text-gray-500">이메일</dt>
            <dd>{member.email}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-16 shrink-0 text-gray-500">닉네임</dt>
            <dd>{member.nickname}</dd>
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

      <section className="mt-6 flex flex-col gap-4 rounded-[10px] bg-white p-6">
        <h2 className="text-lg font-bold">내 즐겨찾기</h2>
        <FavoriteMovieList />
      </section>
    </main>
  );
}
