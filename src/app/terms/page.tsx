'use client';

import SubPageShell from '@/components/shared/SubPageShell';
import PageHero from '@/components/shared/PageHero';
import GlassContentBlock from '@/components/shared/GlassContentBlock';
import MiniNeuralConstellation from '@/components/shared/fragments/MiniNeuralConstellation';
import TableOfContents from '@/components/shared/fragments/TableOfContents';

const sections = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'services', title: '2. Services' },
  { id: 'intellectual-property', title: '3. Intellectual Property' },
  { id: 'payment-terms', title: '4. Payment Terms' },
  { id: 'confidentiality', title: '5. Confidentiality' },
  { id: 'liability', title: '6. Limitation of Liability' },
  { id: 'termination', title: '7. Termination' },
  { id: 'changes', title: '8. Changes to Terms' },
  { id: 'governing-law', title: '9. Governing Law' },
];

const content = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    body: `By accessing and using the Cognisa website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.`,
  },
  {
    id: 'services',
    title: '2. Services',
    body: `Cognisa provides custom software development, AI automation, system architecture, and cloud infrastructure services. The specific scope, deliverables, and timeline for each project are defined in individual project agreements or statements of work (SOW) that supplement these general terms.`,
  },
  {
    id: 'intellectual-property',
    title: '3. Intellectual Property',
    body: `Unless otherwise specified in a project agreement, upon full payment, the client receives full ownership of the custom code and deliverables created specifically for their project.\n\nCognisa retains ownership of any pre-existing code, frameworks, libraries, and proprietary tools used in the development process. The client receives a perpetual, non-exclusive license to use these components as part of their delivered product.\n\nAll content on the Cognisa website, including text, graphics, logos, and design elements, is the property of Cognisa and protected by applicable copyright laws.`,
  },
  {
    id: 'payment-terms',
    title: '4. Payment Terms',
    body: `Payment terms are outlined in individual project agreements. Generally, projects require a deposit before work begins, with remaining payments tied to project milestones. Late payments may result in work suspension until the account is brought current.\n\nAll fees are non-refundable once work has commenced on a milestone, unless otherwise agreed in writing.`,
  },
  {
    id: 'confidentiality',
    title: '5. Confidentiality',
    body: `Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of a project. This includes but is not limited to business strategies, technical specifications, user data, and financial information.\n\nThis obligation survives the termination of any project agreement.`,
  },
  {
    id: 'liability',
    title: '6. Limitation of Liability',
    body: `Cognisa shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from the use or inability to use our services. Our total liability for any claim arising from our services shall not exceed the total amount paid by the client for the specific project in question.\n\nWe do not guarantee specific business outcomes, revenue increases, or performance metrics unless explicitly stated in a project agreement.`,
  },
  {
    id: 'termination',
    title: '7. Termination',
    body: `Either party may terminate a project agreement with written notice. Upon termination, the client shall pay for all work completed up to the termination date. Cognisa will deliver all completed work and materials to the client.\n\nCognisa reserves the right to terminate access to our website or services for any user who violates these terms.`,
  },
  {
    id: 'changes',
    title: '8. Changes to Terms',
    body: `We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Continued use of our services after changes constitutes acceptance of the modified terms.`,
  },
  {
    id: 'governing-law',
    title: '9. Governing Law',
    body: `These terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the courts of New York, NY.`,
  },
];

export default function TermsPage() {
  return (
    <SubPageShell>
      <div className="relative overflow-hidden">
        <MiniNeuralConstellation className="z-10 opacity-15" />
      <PageHero
        tagText="LEGAL"
        title="Terms of"
        titleAccent="Service"
        description="The rules and guidelines for using our website and services. Please read them carefully."
        orbColor="#6366f1"
        orbColor2="#a78bfa"
      />
      </div>

      <section className="relative py-12 md:py-20">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* TOC Sidebar */}
            <div className="lg:col-span-1">
              <TableOfContents sections={sections} />
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <GlassContentBlock className="px-6 md:px-12 py-10 md:py-16">
                <div className="max-w-[900px]">
                  <p className="text-foreground/60 text-sm mb-8">Last updated: January 2026</p>
                  <div className="space-y-10">
                    {content.map((section) => (
                      <div key={section.id} id={section.id} className="scroll-mt-24">
                        <h2 className="text-xl font-bold text-foreground mb-4">{section.title}</h2>
                        {section.body.split('\n\n').map((para, j) => (
                          <p key={j} className="text-foreground/70 leading-relaxed mb-4">
                            {para}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </GlassContentBlock>
            </div>
          </div>
        </div>
      </section>
    </SubPageShell>
  );
}
