import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { pharmacyConfig } from "@/lib/pharmacy-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(pharmacyConfig.website),
  applicationName: "JM.CAP Pharmacy",
  referrer: "origin-when-cross-origin",
  title: "JM.CAP Pharmacy | Coming Soon",
  description:
    "JM.CAP Pharmacy is preparing a modern pharmacy experience focused on trusted care, quality products, and convenient support.",
  keywords: [
    "JM.CAP Pharmacy",
    "pharmacy in Ghana",
    "pharmaceutical wholesale Ghana",
    "medicine supplier Ghana",
    "Agona Swedru pharmacy",
    "healthcare products",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "healthcare",
  creator: "JM.CAP Pharmacy LTD",
  publisher: "JM.CAP Pharmacy LTD",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: pharmacyConfig.website,
    title: "JM.CAP Pharmacy | Coming Soon",
    description:
      "JM.CAP Pharmacy is preparing a modern pharmacy experience focused on trusted care, quality products, and convenient support.",
    siteName: "JM.CAP Pharmacy",
    countryName: "Ghana",
  },
  twitter: {
    card: "summary_large_image",
    title: "JM.CAP Pharmacy | Coming Soon",
    description:
      "JM.CAP Pharmacy is preparing a modern pharmacy experience focused on trusted care, quality products, and convenient support.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
