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
  title: "JM.CAP Pharmacy | Coming Soon",
  description:
    "JM.CAP Pharmacy is preparing a modern pharmacy experience focused on trusted care, quality products, and convenient support.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: pharmacyConfig.website,
    title: "JM.CAP Pharmacy | Coming Soon",
    description:
      "JM.CAP Pharmacy is preparing a modern pharmacy experience focused on trusted care, quality products, and convenient support.",
    siteName: "JM.CAP Pharmacy",
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
