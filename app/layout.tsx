import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Mundo Creadores — Where Creators Meet Agencies",
  description:
    "The premium marketplace connecting content creators with top talent agencies. Grow your brand, find the right management team.",
  keywords: ["content creators", "agency", "OnlyFans", "management", "marketplace"],
  openGraph: {
    title: "Mundo Creadores — Where Creators Meet Agencies",
    description: "The premium marketplace connecting content creators with top talent agencies.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0f] text-white antialiased font-sans">
        <Providers>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
