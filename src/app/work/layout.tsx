import type { Metadata } from 'next';
import SubPageShell from '@/components/shared/SubPageShell';

export const metadata: Metadata = {
  title: 'Our Work | Cognisa',
  description: 'See the digital systems Cognisa has built for real businesses — from travel portals to e-commerce and B2B platforms.',
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <SubPageShell>{children}</SubPageShell>;
}
