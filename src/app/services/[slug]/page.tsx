import { notFound } from 'next/navigation';
import { servicesData } from '@/data/services';
import DetailHero from '@/components/shared/DetailHero';
import GlassContentBlock from '@/components/shared/GlassContentBlock';
import MiniNeuralConstellation from '@/components/shared/fragments/MiniNeuralConstellation';
import RelatedContent from '@/components/shared/fragments/RelatedContent';
import LiveMetric from '@/components/shared/LiveMetric';
import RadarScanner from '@/components/shared/RadarScanner';
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
    <>
      <div className="relative overflow-hidden">
        <MiniNeuralConstellation className="z-10 opacity-20" />
        <DetailHero
          tagText={service.category}
          title={service.title}
          description={service.fullDescription}
          icon={Icon}
          color={service.color}
          backHref="/services"
          backText="Back to Services"
        />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 py-12 md:py-20">
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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Why Choose Us for {service.title}?</h2>
            <p className="text-foreground/80 leading-relaxed mb-6">
              {service.slug === 'web-development' && "We don't just build websites — we engineer scalable web applications that grow with your business. Every project receives senior-level architecture oversight, pixel-perfect design execution, and rigorous performance testing before launch."}
              {service.slug === 'ai-automation' && "AI is not a buzzword to us — it's a precision tool. We build custom automation agents that integrate seamlessly with your existing stack, handling repetitive tasks with human-level accuracy while you focus on strategy."}
              {service.slug === 'system-architecture' && "Poor architecture costs more in rewrites than getting it right the first time. We design for your 10x future, not your MVP — fault-tolerant, horizontally scalable, and documented for every developer who inherits it."}
              {service.slug === 'cloud-infrastructure' && "We manage the servers so you don't have to. From CI/CD pipelines to zero-downtime deployments, our infrastructure handles millions of requests while keeping your costs predictable and your data secure."}
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
          {/* Live Metrics */}
          <GlassContentBlock className="p-5">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-indigo-300/20">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-wider">Live Status</span>
            </div>
            <div className="space-y-3">
              <LiveMetric label="Active Deployments" baseValue={5} variance={1} />
              <LiveMetric label="Uptime" baseValue={99.99} suffix="%" variance={0} interval={8000} />
              <LiveMetric label="Response Time" baseValue={42} suffix="ms" variance={5} interval={3000} />
            </div>
          </GlassContentBlock>

          <GlassContentBlock className="lg:sticky lg:top-32">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-2 h-6 rounded-full" style={{ backgroundColor: service.color }} />
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {service.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm font-medium bg-foreground/5 border border-foreground/10 rounded-lg text-foreground/80 hover:border-indigo-300/40 hover:bg-indigo-500/5 transition-all cursor-default"
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

      {/* Related Services */}
      <RelatedContent
        items={servicesData.map(s => ({ slug: s.slug, title: s.title, description: s.shortDescription, color: s.color }))}
        type="services"
        currentSlug={service.slug}
      />
    </>
  );
}
