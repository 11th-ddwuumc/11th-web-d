import Skeleton from "../common/skeleton";

export default function SearchResultSkeleton({ count = 6 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-1 gap-x-10 gap-y-6 pt-6 lg:grid-cols-2">
      {Array.from({ length: count }, (_, index) => (
        <li key={index} className="flex gap-4 border-b border-gray-300 pb-6">
          <Skeleton className="h-[200px] w-[144px] shrink-0 rounded-lg" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="mt-1 h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </li>
      ))}
    </ul>
  );
}