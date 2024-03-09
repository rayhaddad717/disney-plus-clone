import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-[80vw] px-10 flex justify-center mx-auto">
      <div className="flex flex-col space-y-5 mt-32 lg:mt-42 w-full">
        <div className="flex space-x-4">
          <Skeleton className="h-96 w-96 rounded-sm" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
        <Skeleton className="h-72 w-full rounded-sm" />
      </div>
    </div>
  );
}
