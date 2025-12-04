import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js 16 Clean Template",
  description:
    "Next.js 16 Clean Template — Featuring Biome, React Compiler, Tailwind CSS, and TypeScript",
};

export default function Home() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <h1 className="text-2xl font-bold">
        Next.js 16 Clean Template — Featuring Biome, React Compiler, Tailwind
        CSS, and TypeScript
      </h1>
    </main>
  );
}
