"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { HiXMark } from "react-icons/hi2";
import { PACKAGE_MANAGERS } from "@/constants";
import Combobox from "./Combobox";

const VulnerabilitiesForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const initialEcosystem = searchParams.get("ecosystem") || "npm";
  const initialPackageName = searchParams.get("package") || "next";
  const initialPackageVersion = searchParams.get("version") || "16.0.6";

  const [packageName, setPackageName] = useState(initialPackageName);
  const [packageVersion, setPackageVersion] = useState(initialPackageVersion);
  const [ecosystem, setEcosystem] = useState(initialEcosystem);

  useEffect(() => {
    const ecosystemParam = searchParams.get("ecosystem");
    const packageParam = searchParams.get("package");
    const versionParam = searchParams.get("version");

    if (ecosystemParam) setEcosystem(ecosystemParam);
    if (packageParam) setPackageName(packageParam);
    if (versionParam) setPackageVersion(versionParam);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (ecosystem) params.set("ecosystem", ecosystem);
    if (packageName) params.set("package", packageName);
    if (packageVersion) params.set("version", packageVersion);

    startTransition(() => {
      router.push(`/?${params.toString()}`, {
        scroll: false,
      });
    });
  };

  const handleReset = () => {
    setEcosystem("npm");
    setPackageName("");
    setPackageVersion("");

    startTransition(() => {
      router.push("/");
    });
  };

  const hasSearchParams = Boolean(
    searchParams.get("ecosystem") ||
      searchParams.get("package") ||
      searchParams.get("version")
  );

  return (
    <section>
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8 mb-8 overflow-visible">
        <form onSubmit={handleSubmit} className="space-y-4 overflow-visible">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative z-10">
              <Combobox
                id="ecosystem"
                label="Ecosystem"
                value={ecosystem}
                options={PACKAGE_MANAGERS}
                onChange={(value) => setEcosystem(value)}
                placeholder="Search ecosystem..."
                required
              />
            </div>
            <div>
              <label
                htmlFor="packageName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Package Name
              </label>
              <input
                id="packageName"
                type="text"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                required
                placeholder="e.g., next"
                className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="packageVersion"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Version
              </label>
              <input
                id="packageVersion"
                type="text"
                value={packageVersion}
                onChange={(e) => setPackageVersion(e.target.value)}
                required
                placeholder="e.g., 16.0.6"
                className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 md:flex-none px-8 py-3 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer hover:scale-105 disabled:hover:scale-100"
            >
              {isPending ? "Checking..." : "Check Vulnerabilities"}
            </button>
            {hasSearchParams && (
              <button
                type="button"
                onClick={handleReset}
                disabled={isPending}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 cursor-pointer hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                <HiXMark className="w-5 h-5" />
                Reset
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default VulnerabilitiesForm;
