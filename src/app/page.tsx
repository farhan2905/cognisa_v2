'use client';

import SidebarNavigation from '@/components/sections/SidebarNavigation';
import MobileNavigation from '@/components/sections/MobileNavigation';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Challenges from '@/components/sections/Challenges';
import Solutions from '@/components/sections/Solutions';
import PlatformTabs from '@/components/sections/PlatformTabs';
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
  return (
    <main className="min-h-screen pt-0 pb-4 px-2 md:pb-6 md:px-4 lg:pl-28 lg:pr-6 flex justify-center items-start overflow-x-clip text-text-primary relative">
      {/* Global ambient background — noise, orbs, spotlight, grid */}
      <GlobalAmbientBackground />

      <SidebarNavigation />
      <MobileNavigation />

      {/* Main Content Glass Container */}
      <div className="glass w-full max-w-full 2xl:max-w-[1800px] overflow-x-clip relative pt-0 z-10">
        <Hero />
        <Marquee />
        <Challenges />
        <Solutions />
        <PlatformTabs />
        <About />
        <Services />
        <Process />
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
