"use client";

import { useState } from "react";
import { getVulnerabilities } from "@/actions";
import type { OSVQueryResponse } from "@/types";
import { VulnerabilitiesList } from "./VulnerabilitiesList";

const VulnerabilitiesForm = () => {
  const [packageName, setPackageName] = useState("");
  const [packageVersion, setPackageVersion] = useState("");
  const [ecosystem, setEcosystem] = useState("npm");
  const [vulnerabilities, setVulnerabilities] =
    useState<OSVQueryResponse["vulns"]>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { code, vulnerabilities, error } = await getVulnerabilities(
      packageVersion,
      packageName,
      ecosystem
    );

    try {
      if (!code) {
        throw new Error(error!);
      }

      setVulnerabilities(vulnerabilities);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch vulnerabilities"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="ecosystem"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Ecosystem
              </label>
              <select
                id="ecosystem"
                value={ecosystem}
                onChange={(e) => setEcosystem(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 cursor-pointer bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
              >
                <option value="npm">npm</option>
                <option value="PyPI">PyPI</option>
                <option value="Maven">Maven</option>
                <option value="Go">Go</option>
                <option value="NuGet">NuGet</option>
                <option value="RubyGems">RubyGems</option>
                <option value="Cargo">Cargo</option>
                <option value="Packagist">Packagist</option>
              </select>
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
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto px-8 py-3 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer hover:scale-105 disabled:hover:scale-100"
          >
            {isLoading ? "Checking..." : "Check Vulnerabilities"}
          </button>
        </form>
      </div>

      {vulnerabilities?.length && (
        <VulnerabilitiesList
          vulnerabilities={vulnerabilities}
          isLoading={isLoading}
          error={error}
        />
      )}
    </section>
  );
};

export default VulnerabilitiesForm;
