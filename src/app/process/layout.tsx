import type { Metadata } from 'next';
import SubPageShell from '@/components/shared/SubPageShell';

export const metadata: Metadata = {
  title: 'Our Process | Cognisa',
  description:
    'From discovery to deployment — learn about Cognisa\'s 5-phase engineering process for building scalable digital systems.',
  openGraph: {
    title: 'Our Process | Cognisa',
    description: 'A structured, transparent approach to building custom software and AI solutions.',
  },
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return <SubPageShell>{children}</SubPageShell>;
}
