import { Skeleton } from "@/components/ui/skeleton";

export default function StatisticsLoading() {
  return (
    <section className="w-full py-6 md:py-8 lg:py-12">
      <div className="container mx-auto px-3 md:px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <Skeleton className="h-10 md:h-12 lg:h-14 w-64 md:w-80 mx-auto mb-4" />
          <Skeleton className="h-5 md:h-6 w-80 md:w-96 mx-auto" />
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-background border border-border rounded-xl shadow-sm p-4 md:p-6"
            >
              <Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-lg mb-3 md:mb-4" />
              <Skeleton className="h-8 md:h-10 w-16 mb-1" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          {/* Overall Progress */}
          <div className="bg-background border border-border rounded-xl shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Skeleton className="w-6 h-6 rounded" />
              <Skeleton className="h-7 md:h-8 w-48" />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-8 w-16" />
              </div>

              <Skeleton className="w-full h-6 rounded-full" />

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-lg">
                  <Skeleton className="h-8 w-16 mx-auto mb-2" />
                  <Skeleton className="h-4 w-12 mx-auto" />
                </div>
                <div className="p-4 rounded-lg">
                  <Skeleton className="h-8 w-16 mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Active Days List */}
          <div className="bg-background border border-border rounded-xl shadow-sm p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div className="flex items-center gap-2 md:gap-3">
                <Skeleton className="w-5 h-5 md:w-6 md:h-6 rounded" />
                <Skeleton className="h-6 md:h-7 lg:h-8 w-32" />
              </div>
              <Skeleton className="h-9 w-full sm:w-36" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-4 w-48 mb-4" />

              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="bg-background border border-border rounded-xl shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Skeleton className="w-6 h-6 rounded" />
            <Skeleton className="h-7 md:h-8 w-48" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl p-6 border-2">
                <div className="flex items-center gap-2 mb-4">
                  <Skeleton className="w-5 h-5 rounded" />
                  <Skeleton className="h-6 w-32" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-6 w-8" />
                  </div>

                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-8" />
                  </div>

                  <Skeleton className="w-full h-2 rounded-full" />

                  <Skeleton className="h-4 w-32 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
