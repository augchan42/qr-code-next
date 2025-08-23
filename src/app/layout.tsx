import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from "./GoogleAnalytics";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../fonts/Inter/InterVariable.ttf",
      style: "normal",
    },
    {
      path: "../fonts/Inter/InterVariable-Italic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QR Code Generator with Logo | Free Online Tool by Augustin Chan",
  description: "Generate custom QR codes with logo overlays. Upload your logo and create professional QR codes for business cards, marketing materials, and more. Built by Augustin Chan - augustinchan.dev",
  keywords: "QR code generator, logo QR code, custom QR codes, business QR codes, marketing QR codes, free QR generator",
  authors: [{ name: "Augustin Chan", url: "https://augustinchan.dev" }],
  creator: "Augustin Chan",
  publisher: "Augustin Chan",
  robots: "index, follow",
  openGraph: {
    title: "QR Code Generator with Logo | Free Online Tool",
    description: "Generate custom QR codes with logo overlays. Professional QR codes for business and marketing.",
    url: "https://junz.ai",
    siteName: "QR Code Generator",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QR Code Generator with Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator with Logo | Free Online Tool",
    description: "Generate custom QR codes with logo overlays. Built by Augustin Chan.",
    images: ["/og-image.jpg"],
    creator: "@augustinchan",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
  alternates: {
    canonical: "https://junz.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
