import { serverEnv } from "../../../../config/env.server";

// 브라우저는 /api/tmdb/... 로 요청하고, 이 서버 코드가 토큰을 붙여 TMDB를 대신 호출해요.
// 아무 경로나 전달하면 토큰이 오용될 수 있어서 쓰는 경로와 쿼리만 허용해요.
const ALLOWED_PATHS = [/^movie\/popular$/, /^search\/movie$/, /^movie\/\d+$/];
const ALLOWED_PARAMS = ["language", "page", "query", "include_adult"];
const REVALIDATE_SECONDS = 60;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const tmdbPath = path.join("/");

  if (!ALLOWED_PATHS.some((pattern) => pattern.test(tmdbPath))) {
    return Response.json({ message: "허용되지 않은 경로예요." }, { status: 404 });
  }

  const incoming = new URL(request.url).searchParams;
  const searchParams = new URLSearchParams();
  for (const key of ALLOWED_PARAMS) {
    const value = incoming.get(key);
    if (value !== null) searchParams.set(key, value);
  }

  const tmdbResponse = await fetch(
    `${serverEnv.tmdbApiBaseUrl}/${tmdbPath}?${searchParams}`,
    {
      headers: { Authorization: `Bearer ${serverEnv.tmdbAccessToken}` },
      next: { revalidate: REVALIDATE_SECONDS },
    },
  );

  // TMDB의 상태 코드와 본문을 그대로 돌려줘서 클라이언트의 오류 처리가 달라지지 않아요.
  return new Response(tmdbResponse.body, {
    status: tmdbResponse.status,
    headers: {
      "Content-Type": tmdbResponse.headers.get("Content-Type") ?? "application/json",
    },
  });
}
