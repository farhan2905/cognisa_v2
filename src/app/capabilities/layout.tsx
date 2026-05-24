import type { Metadata } from 'next';
import SubPageShell from '@/components/shared/SubPageShell';

export const metadata: Metadata = {
  title: 'Capabilities | Cognisa',
  description:
    'Explore our specialized engineering capabilities, interactive simulations, and client delivery tools.',
  openGraph: {
    title: 'Capabilities | Cognisa',
    description:
      'Explore our specialized engineering capabilities, interactive simulations, and client delivery tools.',
  },
};

export default function CapabilitiesLayout({ children }: { children: React.ReactNode }) {
  return <SubPageShell>{children}</SubPageShell>;
}
