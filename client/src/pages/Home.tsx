import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedPoolsMarquee from "@/components/FeaturedPoolsMarquee";
import OurStorySection from "@/components/OurStorySection";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import ExitIntentModal from "@/components/ExitIntentModal";
import StickyQuoteCTA from "@/components/StickyQuoteCTA";
import AISalesBot from "@/components/AISalesBot";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <FeaturedPoolsMarquee />
      <OurStorySection />
      <PortfolioSection />
      <ProcessSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <MobileBottomNav />
      <ExitIntentModal />
      <StickyQuoteCTA />
      <AISalesBot />
    </div>
  );
}
