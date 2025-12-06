import Link from "next/link";
import { Suspense } from "react";
import { FaGithub } from "react-icons/fa";
import {
  HiArrowTopRightOnSquare,
  HiBolt,
  HiCheckCircle,
  HiCube,
  HiExclamationTriangle,
  HiInformationCircle,
  HiShieldCheck,
  HiWrenchScrewdriver,
} from "react-icons/hi2";
import { FormShimmer } from "@/components/FormShimmer";
import VulnerabilitiesForm from "@/components/VulnerabilitiesForm";
import { VulnerabilitiesList } from "@/components/VulnerabilitiesList";
import { VulnerabilitiesListShimmer } from "@/components/VulnerabilitiesListShimmer";
import { VulnerabilitiesScroll } from "@/components/VulnerabilitiesScroll";
import { ECOSYSTEM_COLORS, PACKAGE_MANAGERS } from "@/constants";
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
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50">
              <HiShieldCheck
                className="w-5 h-5 text-blue-600 dark:text-blue-400"
                aria-label="Security shield icon"
              />
              <span className="font-medium">Powered by OSV.dev API</span>
            </div>
            <Link
              href="https://github.com/abhishekmardiya/OSV-Watch"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 text-sm text-gray-700 dark:text-gray-300 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all duration-300 hover:scale-105"
              prefetch={false}
            >
              <FaGithub
                className="w-5 h-5 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                aria-label="GitHub icon"
              />
              <span className="font-medium">View on GitHub</span>
              <HiArrowTopRightOnSquare
                className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                aria-label="External link icon"
              />
            </Link>
          </div>
        </div>

        {/* Vulnerability Scanner Form */}
        <Suspense fallback={<FormShimmer />}>
          <VulnerabilitiesForm />
        </Suspense>
        <br />
        <br />

        {/* Vulnerabilities scroll */}
        <Suspense>
          <VulnerabilitiesScroll />
        </Suspense>

        <Suspense fallback={<VulnerabilitiesListShimmer />}>
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
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Real-time Scanning
              </h2>
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
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Multi-Ecosystem Support
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Supports {PACKAGE_MANAGERS.length}+ ecosystems including npm,
                PyPI, Maven, Go, NuGet, RubyGems, Cargo, Packagist, and more
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
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Detailed Reports
              </h2>
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {PACKAGE_MANAGERS.map((ecosystem, index) => {
              const color = ECOSYSTEM_COLORS[index % ECOSYSTEM_COLORS.length];
              return (
                <div
                  key={ecosystem.value}
                  className="group flex items-center gap-2 p-3 bg-linear-to-br from-gray-50 to-gray-100/50 dark:from-gray-700 dark:to-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-600/50 hover:shadow-md hover:scale-105 transition-all duration-300"
                >
                  <div
                    className={`w-2 h-2 rounded-full bg-linear-to-r ${color} group-hover:scale-150 transition-transform duration-300`}
                  />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {ecosystem.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Understanding Vulnerabilities Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <HiExclamationTriangle
                className="w-6 h-6 text-white"
                aria-label="Warning icon"
              />
            </div>
            <h2 className="text-2xl font-bold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Understanding Vulnerabilities
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              A security vulnerability is a weakness or flaw in software that
              can be exploited by attackers to gain unauthorized access, steal
              data, or cause damage to systems. Vulnerabilities can exist in any
              software component, including dependencies and third-party
              libraries.
            </p>
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 dark:text-orange-200 mb-2">
                Common Types of Vulnerabilities:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-orange-800 dark:text-orange-300">
                <li>
                  <strong>SQL Injection:</strong> Allows attackers to manipulate
                  database queries
                </li>
                <li>
                  <strong>Cross-Site Scripting (XSS):</strong> Enables injection
                  of malicious scripts into web pages
                </li>
                <li>
                  <strong>Remote Code Execution (RCE):</strong> Allows attackers
                  to execute arbitrary code on your system
                </li>
                <li>
                  <strong>Denial of Service (DoS):</strong> Can crash or
                  overwhelm your application
                </li>
                <li>
                  <strong>Authentication Bypass:</strong> Allows unauthorized
                  access to protected resources
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How to Resolve Vulnerabilities Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <HiWrenchScrewdriver
                className="w-6 h-6 text-white"
                aria-label="Tool icon"
              />
            </div>
            <h2 className="text-2xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              How to Resolve Vulnerabilities
            </h2>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
                <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 flex items-center gap-2">
                  <HiInformationCircle className="w-5 h-5" />
                  Step 1: Review the Vulnerability Details
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
                  Click on any vulnerability to see detailed information
                  including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-blue-800 dark:text-blue-300">
                  <li>Affected version ranges</li>
                  <li>Severity level and CVSS scores</li>
                  <li>Detailed description and impact</li>
                  <li>References to security advisories</li>
                  <li>Patched versions or workarounds</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-5">
                <h3 className="font-semibold text-green-900 dark:text-green-200 mb-3 flex items-center gap-2">
                  <HiCheckCircle className="w-5 h-5" />
                  Step 2: Update to a Secure Version
                </h3>
                <p className="text-sm text-green-800 dark:text-green-300 mb-3">
                  The most common and recommended solution is to update the
                  affected package to a version that has the vulnerability
                  patched. Check the vulnerability details to see which versions
                  are safe.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <HiBolt
                className="w-6 h-6 text-white"
                aria-label="Best practices icon"
              />
            </div>
            <h2 className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Security Best Practices
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-2">
                🔄 Regular Updates
              </h3>
              <p className="text-sm text-indigo-800 dark:text-indigo-300">
                Keep all dependencies updated to their latest secure versions.
                Schedule regular security audits at least monthly or before
                major releases.
              </p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-2">
                🤖 Automated Scanning
              </h3>
              <p className="text-sm text-indigo-800 dark:text-indigo-300">
                Integrate vulnerability scanning into your CI/CD pipeline using
                tools like Dependabot, Snyk, or npm audit.
              </p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-2">
                📌 Dependency Pinning
              </h3>
              <p className="text-sm text-indigo-800 dark:text-indigo-300">
                Use exact version numbers or lock files to prevent unexpected
                updates and maintain version control over your dependencies.
              </p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-2">
                🚨 Prioritize Critical Issues
              </h3>
              <p className="text-sm text-indigo-800 dark:text-indigo-300">
                Focus on high and critical severity vulnerabilities first. These
                pose the greatest risk to your application and users.
              </p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-2">
                📧 Security Advisories
              </h3>
              <p className="text-sm text-indigo-800 dark:text-indigo-300">
                Subscribe to security mailing lists for your dependencies to
                stay informed about new vulnerabilities and patches.
              </p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-2">
                👀 Code Review
              </h3>
              <p className="text-sm text-indigo-800 dark:text-indigo-300">
                Review dependency updates before merging to production to ensure
                compatibility and security.
              </p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-2">
                📦 Minimize Dependencies
              </h3>
              <p className="text-sm text-indigo-800 dark:text-indigo-300">
                Only include dependencies you actually need. Fewer dependencies
                mean fewer potential vulnerabilities to manage.
              </p>
            </div>
          </div>
        </div>

        {/* About OSV Section */}
        <div className="relative bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 rounded-2xl p-8 mt-12 border border-blue-200/50 dark:border-blue-800/50 shadow-lg overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              About OSV (Open Source Vulnerabilities)
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 mb-6">
              <p className="leading-relaxed">
                OSV is a distributed vulnerability database and service that
                aggregates security advisories from multiple sources. It
                provides a standardized format for vulnerability information,
                making it easier for developers to check if their dependencies
                are affected by known security issues.
              </p>
              <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4 border border-blue-200/50 dark:border-blue-800/50">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Why OSV Matters:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>
                    <strong>Unified Database:</strong> Aggregates
                    vulnerabilities from multiple sources (GitHub, npm, PyPI,
                    etc.)
                  </li>
                  <li>
                    <strong>Standardized Format:</strong> Uses a consistent
                    schema across all ecosystems
                  </li>
                  <li>
                    <strong>Real-time Updates:</strong> Continuously updated
                    with the latest security advisories
                  </li>
                  <li>
                    <strong>Open Source:</strong> Free and open for everyone to
                    use and contribute
                  </li>
                  <li>
                    <strong>API Access:</strong> Easy integration with automated
                    security tools
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link
                href="https://osv.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                prefetch={false}
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
                prefetch={false}
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
