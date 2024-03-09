import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-[80vw] px-10 flex justify-center mx-auto">
      <div className="flex flex-col space-y-5 mt-32 lg:mt-42 w-full">
        <div className="flex space-x-4">
          <Skeleton className="h-96 w-full rounded-sm" />
        </div>
        <div className="flex gap-4 flex-wrap">
          <Skeleton className="aspect-square flex-1 rounded-sm" />
          <Skeleton className="aspect-square flex-1 rounded-sm" />
          <Skeleton className="aspect-square flex-1 rounded-sm" />
          <Skeleton className="aspect-square flex-1 rounded-sm" />
          <Skeleton className="aspect-square flex-1 rounded-sm" />
        </div>
        <div className="flex gap-4 flex-wrap mt-10">
          <Skeleton className="aspect-square flex-1 rounded-sm" />
          <Skeleton className="aspect-square flex-1 rounded-sm" />
          <Skeleton className="aspect-square flex-1 rounded-sm" />
          <Skeleton className="aspect-square flex-1 rounded-sm" />
          <Skeleton className="aspect-square flex-1 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
