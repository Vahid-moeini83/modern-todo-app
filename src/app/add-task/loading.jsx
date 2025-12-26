import { Skeleton } from "@/components/ui/skeleton";

export default function AddTaskLoading() {
  return (
    <section className="w-full py-6 md:py-8 lg:py-12">
      <div className="container mx-auto px-3 md:px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <Skeleton className="h-8 md:h-10 lg:h-12 w-48 md:w-64 mx-auto mb-3 md:mb-4" />
          <Skeleton className="h-4 md:h-5 w-64 md:w-80 mx-auto" />
        </div>

        {/* Manual Add Button */}
        <div className="mb-6 md:mb-8 text-center">
          <Skeleton className="h-12 w-48 mx-auto" />
        </div>

        {/* Calendar Component Skeleton */}
        <div className="w-full mx-auto space-y-6">
          {/* Priority Legend */}
          <div className="bg-white dark:bg-gray-800 border border-border/50 rounded-xl shadow-sm p-4 md:p-6">
            <Skeleton className="h-5 w-40 mb-3" />
            <div className="flex flex-wrap gap-4 md:gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="w-3 h-3 md:w-4 md:h-4 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>

          {/* Calendar Container */}
          <div className="bg-linear-to-br from-background to-primary-100/20 dark:to-primary-900/10 border border-border/50 rounded-2xl shadow-lg backdrop-blur-sm p-6 md:p-10">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-8 md:h-10 w-48 md:w-64" />
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>

            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-2 md:gap-4 mb-6">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <Skeleton key={i} className="h-12 md:h-14 rounded-lg" />
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 md:gap-4 min-h-[300px] md:min-h-[400px] lg:min-h-[480px]">
              {Array.from({ length: 35 }).map((_, i) => (
                <Skeleton key={i} className="h-12 md:h-16 lg:h-20 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
