'use client';

import SidebarNavigation from '@/components/sections/SidebarNavigation';
import MobileNavigation from '@/components/sections/MobileNavigation';
import Footer from '@/components/sections/Footer';
import BackToTop from '@/components/shared/fragments/BackToTop';

interface SubPageShellProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export default function SubPageShell({ children, showFooter = true }: SubPageShellProps) {
  return (
    <main className="min-h-screen pt-0 pb-4 px-2 md:pb-6 md:px-4 lg:px-6 flex justify-center items-start overflow-x-clip text-text-primary">
      <SidebarNavigation />
      <MobileNavigation />
      <BackToTop />

      <div className="glass w-full max-w-[96vw] 2xl:max-w-[1800px] overflow-x-clip relative lg:ml-24 pt-16 md:pt-20 lg:pt-0 min-h-[90vh]">
        {children}
        {showFooter && <Footer />}
      </div>
    </main>
  );
}
