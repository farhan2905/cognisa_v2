import type { Metadata } from 'next';
import SubPageShell from '@/components/shared/SubPageShell';

export const metadata: Metadata = {
  title: 'Terms of Service | Cognisa',
  description: 'Read Cognisa\'s terms of service governing the use of our website and services.',
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <SubPageShell>{children}</SubPageShell>;
}
