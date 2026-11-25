import { SearchPage } from "../../views/movies/search-page";

// searchParams는 서버에서 Promise로 전달돼요.
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string | string[] }>;
}) {
  const { query } = await searchParams;
  return <SearchPage query={typeof query === "string" ? query : undefined} />;
}
