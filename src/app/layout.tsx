import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import "./globals.css";

const BASE_URL = "https://osv-watch.vercel.app";
const title = "OSV Watch - Security Vulnerability Scanner";
const description =
  "Check for security vulnerabilities in your packages using the OSV API";
const opengraphImageUrl = `${BASE_URL}/opengraph-image.png`;

export const metadata: Metadata = {
  title,
  description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: BASE_URL,
    images: [
      {
        url: opengraphImageUrl,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    images: [
      {
        url: opengraphImageUrl,
        width: 1200,
        height: 630,
        type: "image/webp",
      },
    ],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
