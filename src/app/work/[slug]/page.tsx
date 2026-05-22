import { notFound } from 'next/navigation';
import { worksData } from '@/data/work';
import DetailHero from '@/components/shared/DetailHero';
import GlassContentBlock from '@/components/shared/GlassContentBlock';
import RelatedContent from '@/components/shared/fragments/RelatedContent';
import { ExternalLink, CheckCircle2, Award } from 'lucide-react';
import Link from 'next/link';
import DetailWorkShowcase from '@/components/shared/DetailWorkShowcase';
import OutcomeCard from '@/components/shared/OutcomeCard';

export async function generateStaticParams() {
  return worksData.map((work) => ({
    slug: work.slug,
  }));
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const work = worksData.find((w) => w.slug === params.slug);

  if (!work) {
    notFound();
  }

  // Emoji to component mapping for the hero
  const iconMap: Record<string, string> = {
    '✈️': 'http://www.w3.org/2000/svg',
    '🧩': 'http://www.w3.org/2000/svg',
    '🌊': 'http://www.w3.org/2000/svg',
    '🛒': 'http://www.w3.org/2000/svg',
    '🏗️': 'http://www.w3.org/2000/svg',
  };

  return (
    <>
      <DetailHero
        tagText={work.category}
        title={work.title}
        description={work.fullDescription}
        color={work.color}
        backHref="/work"
        backText="Back to Work"
        emoji={work.icon}
      />

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 py-12 md:py-20">
        {/* Bento Grid Layout for Outcomes & Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Main Showcase */}
          <DetailWorkShowcase work={work} />

          {/* Metrics Column */}
          <div className="flex flex-col gap-6">
            {work.outcomes.map((outcome, idx) => (
              <OutcomeCard 
                key={idx} 
                metric={outcome.metric} 
                label={outcome.label} 
                color={work.color} 
              />
            ))}
          </div>
        </div>

        {/* Technical Details & Next Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <GlassContentBlock className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-cyan-600" />
              Project Architecture
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              For {work.title}, we engineered a production-grade architecture optimized for
              performance, scalability, and conversion. This included decoupled services,
              edge-accelerated delivery, and rigorous load testing prior to launch.
            </p>
            <h3 className="font-semibold text-slate-900 mb-4">Core Technologies Used:</h3>
            <ul className="flex flex-col gap-3">
              {work.techStack.map((tech, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 opacity-60" style={{ color: work.color }} />
                  {tech}
                </li>
              ))}
            </ul>
          </GlassContentBlock>

          <GlassContentBlock className="flex flex-col justify-center">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Ready to build something similar?</h3>
            <p className="text-sm text-slate-600 mb-8 leading-relaxed">
              We apply the exact same rigorous engineering standards to every project we take on.
            </p>
            <Link
              href="/contact"
              className="w-full text-center py-2.5 bg-slate-950 text-white rounded-full font-bold text-xs hover:bg-cyan-700 transition-all shadow-sm block"
            >
              Let&apos;s Discuss Your Project
            </Link>
          </GlassContentBlock>
        </div>
      </div>

      {/* Related Work */}
      <RelatedContent
        items={worksData.map(w => ({ slug: w.slug, title: w.title, description: w.shortDescription, color: w.color }))}
        type="work"
        currentSlug={work.slug}
      />
    </>
  );
}
