import type { Metadata } from 'next';
import SubPageShell from '@/components/shared/SubPageShell';

export const metadata: Metadata = {
  title: 'Contact Us | Cognisa',
  description:
    'Get in touch with Cognisa to discuss your project. We build custom software, AI automations, and scalable digital systems.',
  openGraph: {
    title: 'Contact Us | Cognisa',
    description:
      'Start a conversation about your digital goals. Custom software, AI solutions, and more.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <SubPageShell>{children}</SubPageShell>;
}
