import Skeleton from "../common/skeleton";

export default function MovieDetailSkeleton() {
  return (
    <div className="-mx-4 -mb-16 bg-white sm:-mx-6 md:-mx-10 lg:-mx-20">
      <div className="relative h-80 w-full overflow-hidden">
        <Skeleton className="h-full w-full rounded-none" />
        <div className="absolute bottom-8 left-4 flex w-1/2 flex-col gap-2 sm:left-6 md:left-10 lg:left-20">
          <Skeleton className="h-9 w-3/4 bg-gray-300" />
          <Skeleton className="h-4 w-1/3 bg-gray-300" />
          <Skeleton className="h-4 w-1/2 bg-gray-300" />
        </div>
      </div>

      <div className="flex flex-col gap-10 px-4 py-10 sm:px-6 md:px-10 lg:flex-row lg:px-20">
        <div className="flex flex-1 gap-6 border-b border-gray-200 pb-10 lg:border-b-0 lg:border-r lg:pr-10 lg:pb-0">
          <Skeleton className="h-[200px] w-[144px] shrink-0 rounded-lg" />
          <div className="flex flex-1 flex-col gap-3">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="mt-2 h-9 w-28 rounded-lg" />
          </div>
        </div>

        <div className="flex w-full flex-col lg:w-[280px] lg:shrink-0">
          <Skeleton className="mb-2 h-6 w-20" />
          <Skeleton className="mb-3 h-3 w-40" />
          <Skeleton className="mb-4 h-6 w-36" />
          <Skeleton className="mb-4 h-24 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
