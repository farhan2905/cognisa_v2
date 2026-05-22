'use client';

import { useEffect } from 'react';
import FloatingTopNav from '@/components/sections/FloatingTopNav';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Challenges from '@/components/sections/Challenges';
import Solutions from '@/components/sections/Solutions';
import PlatformTabs from '@/components/sections/PlatformTabs';
import MultimodalShowcase from '@/components/sections/MultimodalShowcase';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';
import Stats from '@/components/sections/Stats';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Insights from '@/components/sections/Insights';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';
import GlobalAmbientBackground from '@/components/shared/GlobalAmbientBackground';

export default function Home() {
  useEffect(() => {
    // Disable automatic browser scroll restoration on reload
    if (typeof window !== 'undefined' && window.history && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Force scroll to top on initial page load / mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen pt-0 pb-4 px-2 md:pb-6 md:px-4 lg:px-6 flex justify-center items-start overflow-x-clip text-text-primary relative">
      {/* Global ambient background — noise, orbs, spotlight, grid */}
      <GlobalAmbientBackground />

      <FloatingTopNav />

      {/* Main Content Glass Container */}
      <div className="glass w-full max-w-full 2xl:max-w-[1800px] overflow-x-clip relative pt-0 z-10">
        <Hero />
        <Marquee />
        <Challenges />
        <Solutions />
        <PlatformTabs />
        <MultimodalShowcase />
        <Services />
        <Process />
        <About />
        <Stats />
        <Testimonials />
        <FAQ />
        <Insights />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
