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

export default function Home() {
  return (
    <>
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
