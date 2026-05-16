import { notFound } from 'next/navigation';
import { worksData } from '@/data/work';
import DetailHero from '@/components/shared/DetailHero';
import GlassContentBlock from '@/components/shared/GlassContentBlock';
import { ExternalLink, CheckCircle2, Award } from 'lucide-react';
import Link from 'next/link';
import WorkBrowserPreview from '@/components/shared/WorkBrowserPreview';

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

  return (
    <main className="min-h-screen bg-transparent pb-24">
      <DetailHero 
        tagText={work.category}
        title={work.title}
        description={work.fullDescription}
        color={work.color}
        backHref="/work"
        backText="Back to Work"
      />
      
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        
        {/* Bento Grid Layout for Outcomes & Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Main Showcase */}
          <div className="md:col-span-2 min-h-[350px] flex flex-col relative group overflow-hidden rounded-[2rem] border border-indigo-300/40 shadow-[0_20px_60px_rgba(0,0,0,0.4)] bg-zinc-950">
            {/* Browser Header */}
            <div className="h-10 w-full glass-surface border-b border-indigo-300/40 flex items-center px-4 gap-2 absolute top-0 left-0 right-0 z-20">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              </div>
              <div className="text-[10px] font-mono text-foreground/40 mx-auto max-w-[50%] truncate">
                {work.link.replace('https://', '')}
              </div>
            </div>

            {/* Showcase Live Site (Interactive) */}
            <WorkBrowserPreview work={work} />
          </div>
          
          {/* Metrics Column */}
          <div className="flex flex-col gap-6">
            {work.outcomes.map((outcome, idx) => (
              <GlassContentBlock key={idx} className="flex-1 flex flex-col justify-center items-center text-center p-6 border-indigo-300/30" hoverEffect>
                <div className="text-3xl md:text-5xl font-bold mb-3 tracking-tight drop-shadow-sm" style={{ color: work.color }}>
                  {outcome.metric}
                </div>
                <div className="text-xs md:text-sm font-semibold uppercase tracking-wider text-foreground/60">
                  {outcome.label}
                </div>
              </GlassContentBlock>
            ))}
          </div>
        </div>

        {/* Technical Details & Next Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <GlassContentBlock className="lg:col-span-2">
             <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
               <Award className="w-6 h-6 text-indigo-400" />
               Project Architecture
             </h2>
             <p className="text-foreground/80 leading-relaxed mb-6">
               For {work.title}, the architecture was designed to maximize performance and conversion rates. We decoupled the front-end from the back-end using a headless approach, ensuring sub-second page loads and seamless integration with their existing APIs.
             </p>
             <h3 className="font-semibold text-foreground mb-4">Core Technologies Used:</h3>
             <ul className="flex flex-col gap-3">
               {work.techStack.map((tech, idx) => (
                 <li key={idx} className="flex items-center gap-3 text-foreground/70">
                   <CheckCircle2 className="w-5 h-5 opacity-60" style={{ color: work.color }} />
                   {tech}
                 </li>
               ))}
             </ul>
          </GlassContentBlock>

          <GlassContentBlock className="flex flex-col justify-center">
            <h3 className="text-xl font-bold text-foreground mb-4">Ready to build something similar?</h3>
            <p className="text-sm text-foreground/70 mb-8 leading-relaxed">
              We apply the exact same rigorous engineering standards to every project we take on.
            </p>
            <Link 
              href="/contact"
              className="w-full text-center py-3 bg-gradient-to-r from-blue-600/[0.1] to-indigo-500/[0.1] border border-indigo-400/30 rounded-xl font-semibold hover:from-blue-600/[0.2] hover:to-indigo-500/[0.2] transition-colors"
            >
              Let's Discuss Your Project
            </Link>
          </GlassContentBlock>
        </div>

      </div>
    </main>
  );
}
