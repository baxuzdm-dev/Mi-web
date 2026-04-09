import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "Mundo Creadores — Conecta Creadores con Agencias",
  description:
    "El marketplace premium que conecta creadores de contenido con las mejores agencias de talento. Haz crecer tu marca y encuentra el equipo de gestión ideal.",
  keywords: [
    "creadores de contenido",
    "agencias de talento",
    "marketplace creadores",
    "OnlyFans management",
    "gestión de creadores",
    "Mundo Creadores",
  ],
  alternates: {
    canonical: "https://mundocreadores.com",
  },
  openGraph: {
    title: "Mundo Creadores — Conecta Creadores con Agencias",
    description:
      "El marketplace premium que conecta creadores de contenido con las mejores agencias de talento.",
    type: "website",
    url: "https://mundocreadores.com",
    siteName: "Mundo Creadores",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mundo Creadores — Conecta Creadores con Agencias",
    description:
      "El marketplace premium que conecta creadores de contenido con las mejores agencias de talento.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://mundocreadores.com/#organization",
      name: "Mundo Creadores",
      url: "https://mundocreadores.com",
      description:
        "El marketplace premium que conecta creadores de contenido con las mejores agencias de talento.",
      sameAs: [
        "https://twitter.com/mundocreadores",
        "https://instagram.com/mundocreadores",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://mundocreadores.com/#website",
      url: "https://mundocreadores.com",
      name: "Mundo Creadores",
      publisher: { "@id": "https://mundocreadores.com/#organization" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0a0a0f] text-white antialiased font-sans">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        <Providers>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
