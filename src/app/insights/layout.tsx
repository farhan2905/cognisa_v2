import type { Metadata } from 'next';
import SubPageShell from '@/components/shared/SubPageShell';

export const metadata: Metadata = {
  title: 'Insights | Cognisa',
  description: 'Read Cognisa\'s insights on AI automation, modern web architecture, and business strategy for growing companies.',
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return <SubPageShell>{children}</SubPageShell>;
}
