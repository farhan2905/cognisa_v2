import type { Metadata } from 'next';
import SubPageShell from '@/components/shared/SubPageShell';

export const metadata: Metadata = {
  title: 'Privacy Policy | Cognisa',
  description: 'Read Cognisa\'s privacy policy to understand how we collect, use, and protect your information.',
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <SubPageShell>{children}</SubPageShell>;
}
