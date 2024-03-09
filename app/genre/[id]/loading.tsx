import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-[80vw] px-10 flex justify-center mx-auto">
      <div className="flex flex-col space-y-5 mt-32 lg:mt-42 w-full">
        <div className="flex space-x-4">
          <Skeleton className="h-8 w-full rounded-sm" />
        </div>
        <div className="flex space-x-4">
          <Skeleton className="h-72 flex-1 rounded-sm" />
          <div className="flex flex-col gap-4 flex-1">
            <Skeleton className="h-12 w-full rounded-sm" />
            <Skeleton className="h-12 w-full rounded-sm" />
            <Skeleton className="h-12 w-full rounded-sm" />
          </div>
        </div>
        <div className="flex space-x-4">
          <Skeleton className="h-72 flex-1 rounded-sm" />
          <div className="flex flex-col gap-4 flex-1">
            <Skeleton className="h-12 w-full rounded-sm" />
            <Skeleton className="h-12 w-full rounded-sm" />
            <Skeleton className="h-12 w-full rounded-sm" />
          </div>
        </div>
        <div className="flex space-x-4">
          <Skeleton className="h-72 flex-1 rounded-sm" />
          <div className="flex flex-col gap-4 flex-1">
            <Skeleton className="h-12 w-full rounded-sm" />
            <Skeleton className="h-12 w-full rounded-sm" />
            <Skeleton className="h-12 w-full rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
