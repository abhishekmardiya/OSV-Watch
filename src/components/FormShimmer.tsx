export const FormShimmer = () => {
  return (
    <section>
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8 mb-8">
        <div className="space-y-4 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
              <div className="h-11 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
            <div>
              <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
              <div className="h-11 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
            <div>
              <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
              <div className="h-11 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 md:flex-none h-12 bg-gray-200 dark:bg-gray-700 rounded-xl w-48" />
          </div>
        </div>
      </div>
    </section>
  );
};
