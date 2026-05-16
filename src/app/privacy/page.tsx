'use client';

import PageHero from '@/components/shared/PageHero';
import GlassContentBlock from '@/components/shared/GlassContentBlock';

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information that you provide directly to us, such as when you fill out a contact form, request a consultation, or communicate with us via email. This may include your name, email address, company name, phone number, and project details.\n\nWe may also automatically collect certain technical information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed. This data is collected via cookies and similar technologies.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:\n\n• Respond to your inquiries and provide the services you request\n• Communicate with you about projects, updates, and promotional content\n• Improve our website, services, and user experience\n• Comply with legal obligations and protect our rights\n• Analyze website traffic and usage patterns to optimize performance`,
  },
  {
    title: '3. Information Sharing',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, provided that those parties agree to keep this information confidential.\n\nWe may also disclose your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.`,
  },
  {
    title: '4. Data Security',
    content: `We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encrypted data transmission (SSL/TLS), secure server infrastructure, and regular security audits.\n\nHowever, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: '5. Cookies',
    content: `Our website uses cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us understand how you use our website. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of our website may not function properly without cookies.`,
  },
  {
    title: '6. Your Rights',
    content: `You have the right to:\n\n• Access the personal data we hold about you\n• Request correction of inaccurate data\n• Request deletion of your data\n• Opt out of marketing communications at any time\n• Lodge a complaint with a supervisory authority\n\nTo exercise any of these rights, please contact us at hello@cognisa.in.`,
  },
  {
    title: '7. Changes to This Policy',
    content: `We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <PageHero
        tagText="LEGAL"
        title="Privacy"
        titleAccent="Policy"
        description="Last updated: May 15, 2026. This policy describes how Cognisa collects, uses, and protects your personal information."
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
              If you have any questions about this Privacy Policy, please contact us at{' '}
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
