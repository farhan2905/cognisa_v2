import { notFound } from 'next/navigation';
import { worksData } from '@/data/work';
import DetailHero from '@/components/shared/DetailHero';
import GlassContentBlock from '@/components/shared/GlassContentBlock';
import { ExternalLink, CheckCircle2, Award } from 'lucide-react';
import Link from 'next/link';

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
      />
      
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        
        {/* Bento Grid Layout for Outcomes & Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Main Showcase */}
          <GlassContentBlock className="md:col-span-2 min-h-[300px] flex flex-col justify-center items-center relative group p-0">
            {/* Pseudo-browser window */}
            <div className="absolute inset-0 bg-background/50 flex flex-col items-center justify-center">
               <div className="text-4xl md:text-8xl opacity-10 font-bold blur-[2px]">{work.number}</div>
               <a 
                 href={work.link} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]"
               >
                 <span className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full shadow-2xl hover:scale-105 transition-transform">
                   Visit Live Site <ExternalLink className="w-4 h-4" />
                 </span>
               </a>
            </div>
          </GlassContentBlock>
          
          {/* Metrics Column */}
          <div className="flex flex-col gap-6">
            {work.outcomes.map((outcome, idx) => (
              <GlassContentBlock key={idx} className="flex-1 flex flex-col justify-center items-center text-center p-6" hoverEffect>
                <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: work.color }}>
                  {outcome.metric}
                </div>
                <div className="text-sm font-medium text-foreground/70">
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
              href="/#contact"
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
