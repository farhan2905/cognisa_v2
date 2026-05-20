'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SubPageShell from '@/components/shared/SubPageShell';
import PageHero from '@/components/shared/PageHero';
import PageCTA from '@/components/shared/PageCTA';
import ProcessTimeline from '@/components/shared/ProcessTimeline';
import GlassContentBlock from '@/components/shared/GlassContentBlock';
import SectionTag from '@/components/shared/SectionTag';

const techCategories = [
  {
    title: 'Frontend',
    tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    tools: ['Node.js', 'Go', 'Python', 'GraphQL', 'REST APIs'],
  },
  {
    title: 'AI & ML',
    tools: ['OpenAI API', 'LangChain', 'Vercel AI SDK', 'Custom LLMs', 'Python ML'],
  },
  {
    title: 'Infrastructure',
    tools: ['AWS', 'Google Cloud', 'Vercel', 'Docker', 'Terraform'],
  },
  {
    title: 'Databases',
    tools: ['PostgreSQL', 'Redis', 'MongoDB', 'Prisma ORM', 'Supabase'],
  },
  {
    title: 'Tools & CI/CD',
    tools: ['GitHub Actions', 'Jest', 'Playwright', 'Sentry', 'Analytics'],
  },
];

export default function ProcessPage() {
  const techRef = useRef<HTMLDivElement>(null);
  const techInView = useInView(techRef, { once: true, margin: '-80px' });

  return (
    <SubPageShell showFooter={false}>
      <PageHero
        tagText="OUR PROCESS"
        title="From concept to deployment"
        titleAccent="in 5 phases."
        description="We follow a structured, transparent engineering process that ensures every project is delivered on time, on budget, and to the highest quality standard."
        orbColor="#8b5cf6"
        orbColor2="#3b82f6"
      />

      {/* Timeline */}
      <section className="relative py-8 md:py-16 overflow-hidden">
        <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none animate-orb-1" />
        <div className="w-full max-w-[1000px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <ProcessTimeline />
        </div>
      </section>

      {/* Tech Stack Bento */}
      <section className="relative py-12 md:py-20 overflow-hidden" ref={techRef}>
        <div className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] bg-violet-200/30 rounded-full blur-[120px] pointer-events-none animate-orb-2" />

        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <div className="text-center mb-12">
            <SectionTag text="TECH STACK" variant="light" className="justify-center" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-2xl md:text-4xl font-bold text-foreground mt-6 tracking-tight"
            >
              Tools &{' '}
              <span className="bg-indigo-500/10 border border-indigo-300/40 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-2 py-0.5 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">technologies</span> we use
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={techInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlassContentBlock hoverEffect className="h-full">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-2 h-5 rounded-full bg-gradient-to-b from-indigo-400 to-violet-500" />
                    {cat.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1.5 text-sm font-medium bg-foreground/5 border border-foreground/10 rounded-lg text-foreground/70"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </GlassContentBlock>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title="Ready to start your"
        titleAccent="project?"
        description="Let's walk through the process together. Book a free discovery call to discuss your requirements."
      />
    </SubPageShell>
  );
}
