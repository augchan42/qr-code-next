import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QR Code Generator with Logo | Free Online Tool by Augustin Chan",
  description: "Generate custom QR codes with logo overlays. Upload your logo and create professional QR codes for business cards, marketing materials, and more. Built by Augustin Chan - check out more tools at augustinchan.dev",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
