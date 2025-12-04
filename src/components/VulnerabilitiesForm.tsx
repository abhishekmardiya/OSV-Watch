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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
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
