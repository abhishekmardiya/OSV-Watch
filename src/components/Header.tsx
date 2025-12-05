import Link from "next/link";
import { HiShieldCheck } from "react-icons/hi2";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-b border-gradient-to-r from-blue-200/50 via-purple-200/50 to-pink-200/50 dark:from-blue-800/30 dark:via-purple-800/30 dark:to-pink-800/30 shadow-lg shadow-gray-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600/20 dark:bg-blue-400/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-500 dark:via-indigo-500 dark:to-purple-500 p-2.5 rounded-xl shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                <HiShieldCheck className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-blue-700 dark:group-hover:from-blue-400 dark:group-hover:to-blue-500 transition-all duration-300">
                OSV Watch
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Security Scanner
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
