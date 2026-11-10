import Skeleton from "../common/skeleton";

export default function MovieCardSkeleton() {
  return (
    <div className="w-full max-w-[220px]">
      <Skeleton className="w-full aspect-[4/5] rounded-lg" />
      <Skeleton className="mt-2 h-5 w-3/4" />
      <Skeleton className="mt-1 h-4 w-1/3" />
    </div>
  );
}