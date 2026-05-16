import type { Metadata } from 'next';
import SubPageShell from '@/components/shared/SubPageShell';

export const metadata: Metadata = {
  title: 'Services | Cognisa',
  description: 'Explore Cognisa\'s full range of services — from custom web development and AI automation to system architecture and cloud infrastructure.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <SubPageShell>{children}</SubPageShell>;
}
