import Link from "next/link";
import {
  HiArrowTopRightOnSquare,
  HiBolt,
  HiCheckCircle,
  HiCube,
  HiShieldCheck,
} from "react-icons/hi2";
import VulnerabilitiesForm from "@/components/VulnerabilitiesForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            OSV Watch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Check for security vulnerabilities in your packages using the OSV
            (Open Source Vulnerabilities) database
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-500">
            <HiShieldCheck
              className="w-5 h-5"
              aria-label="Security shield icon"
            />
            <span>Powered by OSV.dev API</span>
          </div>
        </div>

        {/* Vulnerability Scanner Form */}
        <VulnerabilitiesForm />
        <br />
        <br />

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <HiCheckCircle
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                aria-label="Checkmark icon"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Real-time Scanning
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Instantly check your package versions against the latest
              vulnerability database
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <HiCube
                className="w-6 h-6 text-green-600 dark:text-green-400"
                aria-label="Package icon"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Multi-Ecosystem Support
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Supports npm, PyPI, Maven, Go, NuGet, RubyGems, Cargo, and more
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <HiBolt
                className="w-6 h-6 text-purple-600 dark:text-purple-400"
                aria-label="Lightning bolt icon"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Detailed Reports
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get comprehensive vulnerability details including CVEs, affected
              versions, and references
            </p>
          </div>
        </div>

        {/* Supported Ecosystems */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Supported Ecosystems
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "npm",
              "PyPI",
              "Maven",
              "Go",
              "NuGet",
              "RubyGems",
              "Cargo",
              "Packagist",
            ].map((ecosystem) => (
              <div
                key={ecosystem}
                className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <HiCheckCircle
                  className="w-5 h-5 text-blue-600 dark:text-blue-400"
                  aria-label="Checkmark icon"
                />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {ecosystem}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* About OSV Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            About OSV (Open Source Vulnerabilities)
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            OSV is a distributed vulnerability database and service that
            aggregates security advisories from multiple sources. It provides a
            standardized format for vulnerability information, making it easier
            for developers to check if their dependencies are affected by known
            security issues.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href="https://osv.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <HiArrowTopRightOnSquare
                className="w-4 h-4"
                aria-label="External link icon"
              />
              Visit OSV.dev
            </Link>
            <Link
              href="https://osv.dev/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <HiArrowTopRightOnSquare
                className="w-4 h-4"
                aria-label="External link icon"
              />
              API Documentation
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
