import type { Metadata } from "next";
import { Footer } from "@/components/footer/Footer";
import { Hero } from "@/components/hero/Hero";
import { MobileActionBar } from "@/components/mobile/MobileActionBar";
import { AnnouncementBar } from "@/components/navigation/AnnouncementBar";
import { Header } from "@/components/navigation/Header";
import { BrandStory } from "@/components/sections/BrandStory";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { ContactSection } from "@/components/sections/ContactSection";
import { Services } from "@/components/sections/Services";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhyJMCAP } from "@/components/sections/WhyJMCAP";
import { pharmacyConfig } from "@/lib/pharmacy-config";

export const metadata: Metadata = {
  title: "JM.CAP Pharmacy LTD | Trusted Wholesale Pharmacy in Ghana",
  description:
    "JM.CAP Pharmacy LTD in Agona Swedru provides trusted wholesale pharmaceutical supply, product sourcing, and business support for healthcare buyers across Ghana.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    name: pharmacyConfig.name,
    url: pharmacyConfig.website,
    email: pharmacyConfig.email,
    telephone: pharmacyConfig.callPhoneInternational,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        pharmacyConfig.address || pharmacyConfig.physicalAddress || "Ankyease, Agona Swedru",
      addressLocality: "Agona Swedru",
      addressCountry: "GH",
    },
    openingHours: pharmacyConfig.openingHours,
    sameAs: Object.values(pharmacyConfig.social).filter((value) => Boolean(value)),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: pharmacyConfig.callPhoneInternational,
      email: pharmacyConfig.email,
      areaServed: "GH",
      availableLanguage: ["en"],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <BrandStory />
        <Services />
        <WhyJMCAP />
        <ComingSoon />
        <ContactSection />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
