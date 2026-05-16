import { notFound } from 'next/navigation';
import { servicesData } from '@/data/services';
import DetailHero from '@/components/shared/DetailHero';
import GlassContentBlock from '@/components/shared/GlassContentBlock';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <main className="min-h-screen bg-transparent pb-24">
      <DetailHero 
        tagText={service.category}
        title={service.title}
        description={service.fullDescription}
        icon={Icon}
        color={service.color}
        backHref="/services"
        backText="Back to Services"
      />
      
      <div className="w-full max-w-[1000px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <GlassContentBlock>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Key Deliverables</h2>
            <div className="flex flex-col gap-6">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" style={{ color: service.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-foreground/70 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassContentBlock>
          
          <GlassContentBlock>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Why Choose Us?</h2>
            <p className="text-foreground/80 leading-relaxed mb-6">
              Unlike traditional agencies, we treat every project like our own product. We focus heavily on scalability, zero-downtime architecture, and perfect design fidelity. The transition from our Figma designs to the actual codebase is practically pixel-perfect.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-600/[0.08] via-indigo-500/[0.04] to-transparent border border-indigo-300/40 rounded-full font-semibold text-foreground hover:from-blue-600/[0.15] hover:via-indigo-500/[0.08] transition-all shadow-[0_4px_12px_rgba(59,130,246,0.08),inset_0_1px_0_rgba(255,255,255,1)]"
            >
              Start Your Project
              <ChevronRight className="w-4 h-4" />
            </Link>
          </GlassContentBlock>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-8">
          <GlassContentBlock className="lg:sticky lg:top-32">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-2 h-6 rounded-full" style={{ backgroundColor: service.color }} />
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1.5 text-sm font-medium bg-foreground/5 border border-foreground/10 rounded-lg text-foreground/80"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <hr className="my-8 border-indigo-300/20" />
            
            <h4 className="font-semibold text-foreground mb-4">Other Services</h4>
            <div className="flex flex-col gap-3">
              {servicesData.filter(s => s.slug !== service.slug).map(s => (
                <Link 
                  key={s.slug} 
                  href={`/services/${s.slug}`}
                  className="text-sm font-medium text-foreground/60 hover:text-indigo-500 transition-colors flex items-center gap-2"
                >
                  <s.icon className="w-4 h-4" />
                  {s.title}
                </Link>
              ))}
            </div>
          </GlassContentBlock>
        </div>

      </div>
    </main>
  );
}
