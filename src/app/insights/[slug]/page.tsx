import { notFound } from 'next/navigation';
import { insightsData } from '@/data/insights';
import DetailHero from '@/components/shared/DetailHero';
import GlassContentBlock from '@/components/shared/GlassContentBlock';
import { Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  return insightsData.map((post) => ({
    slug: post.slug,
  }));
}

export default function InsightDetailPage({ params }: { params: { slug: string } }) {
  const post = insightsData.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const Icon = post.icon;

  return (
    <main className="min-h-screen bg-transparent pb-24">
      <DetailHero 
        tagText={post.category}
        title={post.title}
        description={post.shortDescription}
        icon={Icon}
        color={post.color}
        backHref="/#insights"
        backText="Back to Insights"
      />
      
      <div className="w-full max-w-[900px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <GlassContentBlock className="px-6 md:px-12 py-10 md:py-16">
          <div className="flex items-center gap-6 text-foreground/60 text-sm font-medium mb-12 border-b border-indigo-300/20 pb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none prose-h1:text-3xl prose-h1:font-bold prose-h1:text-foreground prose-h1:mb-8 prose-h2:text-2xl prose-h2:font-bold prose-h2:text-foreground prose-h2:mt-12 prose-h2:mb-6 prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-6 prose-ul:text-foreground/80 prose-ul:mb-6 prose-li:mb-2 prose-strong:text-foreground">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </GlassContentBlock>
      </div>
    </main>
  );
}
