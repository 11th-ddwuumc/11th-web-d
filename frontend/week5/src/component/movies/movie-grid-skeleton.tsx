import MovieCardSkeleton from "./movie-card-skeleton";

export default function MovieGridSkeleton({ count = 20 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
        justify-items-center gap-4">
      {Array.from({ length: count }, (_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
}