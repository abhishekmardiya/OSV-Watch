import { HiCheckCircle } from "react-icons/hi2";

export const NoVulnFound = () => {
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
};
