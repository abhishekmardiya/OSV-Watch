export const VulnerabilitiesListShimmer = () => {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center flex-col sm:flex-row gap-4 justify-between mb-6 animate-pulse">
        <div className="h-8 w-48 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="h-7 w-24 bg-gray-300 dark:bg-gray-600 rounded-full" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((idx) => (
          <div
            key={idx}
            className="border-2 border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm animate-pulse"
          >
            <div className="w-full px-6 py-5 flex items-center justify-between text-left rounded-2xl cursor-default">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 shrink-0" />
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded" />
                    <div className="h-5 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
                  </div>
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-3 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
                <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded shrink-0 ml-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
