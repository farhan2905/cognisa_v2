'use client';

import PageHero from '@/components/shared/PageHero';
import GlassContentBlock from '@/components/shared/GlassContentBlock';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing and using the Cognisa website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.`,
  },
  {
    title: '2. Services',
    content: `Cognisa provides custom software development, AI automation, system architecture, and cloud infrastructure services. The specific scope, deliverables, and timeline for each project are defined in individual project agreements or statements of work (SOW) that supplement these general terms.`,
  },
  {
    title: '3. Intellectual Property',
    content: `Unless otherwise specified in a project agreement, upon full payment, the client receives full ownership of the custom code and deliverables created specifically for their project.\n\nCognisa retains ownership of any pre-existing code, frameworks, libraries, and proprietary tools used in the development process. The client receives a perpetual, non-exclusive license to use these components as part of their delivered product.\n\nAll content on the Cognisa website, including text, graphics, logos, and design elements, is the property of Cognisa and protected by applicable copyright laws.`,
  },
  {
    title: '4. Payment Terms',
    content: `Payment terms are outlined in individual project agreements. Generally, projects require a deposit before work begins, with remaining payments tied to project milestones. Late payments may result in work suspension until the account is brought current.\n\nAll fees are non-refundable once work has commenced on a milestone, unless otherwise agreed in writing.`,
  },
  {
    title: '5. Confidentiality',
    content: `Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of a project. This includes but is not limited to business strategies, technical specifications, user data, and financial information.\n\nThis obligation survives the termination of any project agreement.`,
  },
  {
    title: '6. Limitation of Liability',
    content: `Cognisa shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from the use or inability to use our services. Our total liability for any claim arising from our services shall not exceed the total amount paid by the client for the specific project in question.\n\nWe do not guarantee specific business outcomes, revenue increases, or performance metrics unless explicitly stated in a project agreement.`,
  },
  {
    title: '7. Termination',
    content: `Either party may terminate a project agreement with 30 days' written notice. Upon termination, the client is responsible for payment of all work completed up to the termination date. Cognisa will deliver all completed work product upon receipt of final payment.`,
  },
  {
    title: '8. Governing Law',
    content: `These terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms or our services shall be resolved through good-faith negotiation, and if necessary, binding arbitration.`,
  },
  {
    title: '9. Changes to Terms',
    content: `We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this page. Your continued use of our services constitutes acceptance of the updated terms.`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <PageHero
        tagText="LEGAL"
        title="Terms of"
        titleAccent="Service"
        description="Last updated: May 15, 2026. These terms govern your use of the Cognisa website and services."
      />

      <section className="relative py-4 md:py-12">
        <div className="w-full max-w-[900px] mx-auto px-4 md:px-8 lg:px-12">
          <GlassContentBlock className="px-6 md:px-12 py-10 md:py-14">
            <div className="space-y-10">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 tracking-tight">
                    {section.title}
                  </h2>
                  <div className="text-foreground/75 leading-relaxed font-medium whitespace-pre-line text-base">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-indigo-300/20 text-foreground/50 text-sm">
              For questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:hello@cognisa.in" className="text-indigo-500 hover:underline">
                hello@cognisa.in
              </a>
            </div>
          </GlassContentBlock>
        </div>
      </section>
    </div>
  );
}
