import { useRouter } from "next/navigation";
import { useToggleFavoriteMutation } from "../hooks/use-toggle-favorite-mutation";
import { useAuthStore } from "../stores/auth-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  // 즐겨찾기 여부는 부르는 쪽에서 내려줌 (목록은 GET /favorites, 상세는 GET /favorites/{movieId})
  isFavorite: boolean;
}

export function BookmarkButton({ movieId, isFavorite }: BookmarkButtonProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const router = useRouter();
  const toggleFavoriteMutation = useToggleFavoriteMutation();

  const handleClick = () => {
    // 즐겨찾기는 로그인한 회원의 데이터라 로그인 전에는 로그인 페이지로 보냄
    if (!accessToken) {
      alert("로그인 후 즐겨찾기할 수 있어요.");
      router.push("/login");
      return;
    }
    if (toggleFavoriteMutation.isPending) return;

    toggleFavoriteMutation.mutate({ movieId, isFavorite });
  };

  return (
    <button
      type="button"
      disabled={toggleFavoriteMutation.isPending}
      className={cn(
        "absolute top-2 right-2 flex size-6 cursor-pointer items-center justify-center rounded border p-0 disabled:cursor-wait",
        isFavorite
          ? "border-blue-600 bg-blue-600"
          : "border-white/40 bg-gray-900/75",
      )}
      aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      aria-pressed={isFavorite}
      onClick={handleClick}
    >
      <img
        src={isFavorite ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
        alt=""
        className="size-3.5 invert"
      />
    </button>
  );
}
