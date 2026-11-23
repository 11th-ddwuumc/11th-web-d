import MovieCardSkeleton from "./movie-card-skeleton";

interface MovieGridSkeletonProps {
  columns: number;
  count: number;
}

export default function MovieGridSkeleton({ columns, count }: MovieGridSkeletonProps) {
  return (
    <div className="grid justify-items-center gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {Array.from({ length: count }, (_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
}
