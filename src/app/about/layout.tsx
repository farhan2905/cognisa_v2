import type { Metadata } from 'next';
import SubPageShell from '@/components/shared/SubPageShell';

export const metadata: Metadata = {
  title: 'About Us | Cognisa',
  description:
    'Learn about Cognisa — the anti-agency expert building custom software, AI automations, and scalable digital systems for modern businesses.',
  openGraph: {
    title: 'About Us | Cognisa',
    description:
      'We don\'t just write code. We build systems that scale. Learn about the team and philosophy behind Cognisa.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <SubPageShell>{children}</SubPageShell>;
}
