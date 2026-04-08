import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FanConnect — Where Creators Meet Agencies",
  description:
    "The premium marketplace connecting content creators with top talent agencies. Grow your brand, find the right management team.",
  keywords: ["content creators", "agency", "OnlyFans", "management", "marketplace"],
  openGraph: {
    title: "FanConnect — Where Creators Meet Agencies",
    description: "The premium marketplace connecting content creators with top talent agencies.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0a0f] text-white antialiased`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
