import { Skeleton } from "@/components/ui/skeleton";

export default function DayDetailLoading() {
  return (
    <section className="w-full py-6 md:py-8 lg:py-12">
      <div className="container mx-auto px-3 md:px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          {/* Date Header */}
          <div className="text-center mb-4 md:mb-6">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
              <Skeleton className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded" />
              <Skeleton className="h-8 md:h-10 lg:h-12 xl:h-14 w-64 md:w-96" />
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 lg:gap-4 mb-4 md:mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-background border border-border rounded-lg p-2.5 md:p-3 lg:p-4 text-center"
              >
                <Skeleton className="h-7 md:h-8 w-12 mx-auto mb-1" />
                <Skeleton className="h-3 md:h-4 w-16 mx-auto" />
              </div>
            ))}
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-between items-center">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-9 w-28 md:w-36 rounded-md" />
              ))}
            </div>

            <Skeleton className="h-10 w-full sm:w-32 rounded-md" />
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-background border rounded-xl shadow-sm p-4 md:p-5 lg:p-6"
                >
                  {/* Top Section */}
                  <div className="flex items-center gap-3 md:gap-4 mb-3">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="flex-1 h-6 md:h-7" />
                    <Skeleton className="w-8 h-8 rounded" />
                  </div>

                  {/* Description */}
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-3" />

                  {/* Bottom Section */}
                  <div className="flex items-center gap-3 md:gap-4">
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 md:space-y-6">
            {/* Progress Chart */}
            <div className="bg-background border border-border rounded-xl shadow-sm p-4 md:p-5 lg:p-6">
              <Skeleton className="h-6 w-24 mb-3 md:mb-4" />
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-12" />
                </div>
                <Skeleton className="w-full h-3 rounded-full" />
              </div>
            </div>

            {/* Priority Breakdown */}
            <div className="bg-background border border-border rounded-xl shadow-sm p-4 md:p-5 lg:p-6">
              <Skeleton className="h-6 w-36 mb-3 md:mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-3 h-3 rounded-full" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-5 w-8" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
