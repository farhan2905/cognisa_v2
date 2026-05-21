'use client';

import SidebarNavigation from '@/components/sections/SidebarNavigation';
import MobileNavigation from '@/components/sections/MobileNavigation';
import Footer from '@/components/sections/Footer';
import BackToTop from '@/components/shared/fragments/BackToTop';
import Logo from '@/components/shared/Logo';
import Link from 'next/link';

interface SubPageShellProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export default function SubPageShell({ children, showFooter = true }: SubPageShellProps) {
  return (
    <main className="min-h-screen pt-0 pb-4 px-2 md:pb-6 md:px-4 lg:pl-28 lg:pr-6 flex justify-center items-start overflow-x-clip text-text-primary">
      <SidebarNavigation />
      <MobileNavigation />
      <BackToTop />

      <div className="glass w-full max-w-full 2xl:max-w-[1800px] overflow-x-clip relative pt-24 sm:pt-28 lg:pt-0 min-h-[90vh]">
        {/* Mobile Logo on subpages */}
        <div className="absolute top-6 left-6 z-30 lg:hidden">
          <Link href="/">
            <Logo className="h-8 sm:h-10 w-auto" />
          </Link>
        </div>
        {children}
        {showFooter && <Footer />}
      </div>
    </main>
  );
}
