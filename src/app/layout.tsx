import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEO Practice Site",
  description: "A simple SEO practice site built with Next.js and Supabase",
  keywords: ["Next.js", "Supabase", "SEO", "Web Development"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "SEO Practice Site",
    description: "A simple SEO practice site built with Next.js and Supabase",
    url: "https://your-domain.com",
    siteName: "SEO Practice Site",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SEO Practice Site",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Practice Site",
    description: "A simple SEO practice site built with Next.js and Supabase",
    images: ["https://your-domain.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}
