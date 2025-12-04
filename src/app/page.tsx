import Link from "next/link";
import { Suspense } from "react";
import {
  HiArrowTopRightOnSquare,
  HiBolt,
  HiCheckCircle,
  HiCube,
  HiShieldCheck,
} from "react-icons/hi2";
import VulnerabilitiesForm from "@/components/VulnerabilitiesForm";
import { VulnerabilitiesList } from "@/components/VulnerabilitiesList";
import type { HomeProps } from "@/types";

export default async function Home({ searchParams }: HomeProps) {
  const formInputs = searchParams.then((sp) => ({
    ecosystem: sp.ecosystem || "",
    packageName: sp.package || "",
    packageVersion: sp.version || "",
  }));

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-2xl opacity-30 animate-pulse" />
              <h1 className="relative text-6xl font-extrabold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 mt-8">
                OSV Watch
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto font-medium">
            Check for security vulnerabilities in your packages using the OSV
            (Open Source Vulnerabilities) database
          </p>
          <div className="inline-flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50">
            <HiShieldCheck
              className="w-5 h-5 text-blue-600 dark:text-blue-400"
              aria-label="Security shield icon"
            />
            <span className="font-medium">Powered by OSV.dev API</span>
          </div>
        </div>

        {/* Vulnerability Scanner Form */}
        <Suspense>
          <VulnerabilitiesForm />
        </Suspense>
        <br />
        <br />

        {/* Vulnerabilities Results */}
        <Suspense>
          <VulnerabilitiesList formInputs={formInputs} />
        </Suspense>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-200/50 dark:border-blue-800/50 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <HiCheckCircle
                  className="w-7 h-7 text-white"
                  aria-label="Checkmark icon"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Real-time Scanning
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Instantly check your package versions against the latest
                vulnerability database
              </p>
            </div>
          </div>

          <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <HiCube
                  className="w-7 h-7 text-white"
                  aria-label="Package icon"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Multi-Ecosystem Support
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Supports npm, PyPI, Maven, Go, NuGet, RubyGems, Cargo, and more
              </p>
            </div>
          </div>

          <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-200/50 dark:border-purple-800/50 hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <HiBolt
                  className="w-7 h-7 text-white"
                  aria-label="Lightning bolt icon"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Detailed Reports
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Get comprehensive vulnerability details including CVEs, affected
                versions, and references
              </p>
            </div>
          </div>
        </div>

        {/* Supported Ecosystems */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8 mb-12">
          <h2 className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Supported Ecosystems
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "npm", color: "from-red-500 to-orange-500" },
              { name: "PyPI", color: "from-blue-500 to-cyan-500" },
              { name: "Maven", color: "from-yellow-500 to-orange-500" },
              { name: "Go", color: "from-cyan-500 to-blue-500" },
              { name: "NuGet", color: "from-purple-500 to-pink-500" },
              { name: "RubyGems", color: "from-red-500 to-pink-500" },
              { name: "Cargo", color: "from-orange-500 to-red-500" },
              { name: "Packagist", color: "from-indigo-500 to-purple-500" },
            ].map((ecosystem) => (
              <div
                key={ecosystem.name}
                className="group flex items-center gap-2 p-3 bg-linear-to-br from-gray-50 to-gray-100/50 dark:from-gray-700 dark:to-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-600/50 hover:shadow-md hover:scale-105 transition-all duration-300"
              >
                <div
                  className={`w-2 h-2 rounded-full bg-linear-to-r ${ecosystem.color} group-hover:scale-150 transition-transform duration-300`}
                />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {ecosystem.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* About OSV Section */}
        <div className="relative bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 rounded-2xl p-8 mt-12 border border-blue-200/50 dark:border-blue-800/50 shadow-lg overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              About OSV (Open Source Vulnerabilities)
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              OSV is a distributed vulnerability database and service that
              aggregates security advisories from multiple sources. It provides
              a standardized format for vulnerability information, making it
              easier for developers to check if their dependencies are affected
              by known security issues.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link
                href="https://osv.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <HiArrowTopRightOnSquare
                  className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  aria-label="External link icon"
                />
                Visit OSV.dev
              </Link>
              <Link
                href="https://osv.dev/api"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <HiArrowTopRightOnSquare
                  className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  aria-label="External link icon"
                />
                API Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
