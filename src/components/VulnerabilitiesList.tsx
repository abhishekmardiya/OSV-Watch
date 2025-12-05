import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi2";
import { getVulnerabilities } from "@/actions";
import type { OSVVulnerability, VulnerabilitiesListProps } from "@/types";
import { VulnerabilityCard } from "./VulnerabilityCard";

export const VulnerabilitiesList = async ({
  formInputs,
}: VulnerabilitiesListProps) => {
  const { ecosystem, packageName, packageVersion } = await formInputs;
  const isSearchActive = Boolean(ecosystem && packageName && packageVersion);

  let finalCode: number = 0;
  let finalVulnerabilities: OSVVulnerability[] = [];
  let finalMessage: string | null = null;
  if (packageName && packageVersion) {
    const { code, vulnerabilities, message } = await getVulnerabilities(
      packageVersion,
      packageName,
      ecosystem
    );

    finalCode = code;
    finalVulnerabilities = vulnerabilities;
    finalMessage = message;
  }

  if (isSearchActive && !finalCode) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
        <HiExclamationCircle
          className="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-4"
          aria-label="Error"
        />
        <p className="text-red-800 dark:text-red-200 font-medium">
          {finalMessage}
        </p>
      </div>
    );
  }

  if (isSearchActive && !finalVulnerabilities?.length) {
    return (
      <div>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
          <HiCheckCircle
            className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4"
            aria-label="No vulnerabilities found"
          />
          <p className="text-green-800 dark:text-green-200 font-medium">
            No vulnerabilities found!
          </p>
          <p className="text-green-700 dark:text-green-300 text-sm mt-2">
            Your package version appears to be secure.
          </p>
        </div>
        <br />
        <br />
      </div>
    );
  }

  return (
    <>
      {isSearchActive && (
        <div className="space-y-4">
          <div className="flex items-center flex-col sm:flex-row gap-4 xs:gap-0 justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Vulnerabilities Found
            </h2>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              {finalVulnerabilities?.length}{" "}
              {finalVulnerabilities.length === 1
                ? "vulnerability"
                : "finalVulnerabilities"}
            </span>
          </div>
          <div className="space-y-4">
            {finalVulnerabilities.map((vuln, idx) => (
              <VulnerabilityCard key={vuln.id || idx} vulnerability={vuln} />
            ))}
          </div>
          <br />
          <br />
        </div>
      )}
    </>
  );
};
