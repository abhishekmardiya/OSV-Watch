import VulnerabilitiesForm from "@/components/VulnerabilitiesForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            OSV Watch
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Check for security vulnerabilities in your packages
          </p>
        </div>

        <VulnerabilitiesForm />
      </div>
    </main>
  );
}
