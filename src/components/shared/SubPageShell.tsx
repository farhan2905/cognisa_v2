'use client';

import FloatingTopNav from '@/components/sections/FloatingTopNav';
import Footer from '@/components/sections/Footer';
import BackToTop from '@/components/shared/fragments/BackToTop';
import GlobalAmbientBackground from '@/components/shared/GlobalAmbientBackground';

interface SubPageShellProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export default function SubPageShell({ children, showFooter = true }: SubPageShellProps) {
  return (
    <main className="min-h-screen pt-0 pb-4 px-2 md:pb-6 md:px-4 lg:px-6 flex justify-center items-start overflow-x-clip text-text-primary relative">
      <GlobalAmbientBackground />
      <FloatingTopNav />
      <BackToTop />

      <div className="glass w-full max-w-full 2xl:max-w-[1800px] overflow-x-clip relative z-10 pt-24 sm:pt-28 lg:pt-0 min-h-[90vh]">
        {children}
        {showFooter && <Footer />}
      </div>
    </main>
  );
}
