import { notFound } from 'next/navigation';
import { insightsData } from '@/data/insights';
import DetailHero from '@/components/shared/DetailHero';
import GlassContentBlock from '@/components/shared/GlassContentBlock';
import MiniNeuralConstellation from '@/components/shared/fragments/MiniNeuralConstellation';
import RelatedContent from '@/components/shared/fragments/RelatedContent';
import ReadingProgress from '@/components/shared/ReadingProgress';
import { Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
    <>
      <ReadingProgress />
      <div className="relative overflow-hidden">
        <MiniNeuralConstellation className="z-10 opacity-15" />
        <DetailHero
          tagText={post.category}
          title={post.title}
          description={post.shortDescription}
          icon={Icon}
          color={post.color}
          backHref="/insights"
          backText="Back to Insights"
        />
      </div>

      <div className="w-full max-w-[900px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 py-12 md:py-20">
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

          <div className="prose max-w-none prose-h1:text-3xl prose-h1:font-bold prose-h1:text-foreground prose-h1:mb-8 prose-h2:text-2xl prose-h2:font-bold prose-h2:text-foreground prose-h2:mt-12 prose-h2:mb-6 prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-6 prose-ul:text-foreground/80 prose-ul:mb-6 prose-li:mb-2 prose-strong:text-foreground prose-code:text-indigo-500 prose-code:bg-indigo-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-transparent prose-pre:p-0">
            <ReactMarkdown
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const isInline = !match;
                  return !isInline ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-xl overflow-hidden my-6"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="text-indigo-500 bg-indigo-500/10 px-1.5 py-0.5 rounded text-sm font-mono">
                      {children}
                    </code>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </GlassContentBlock>
      </div>

      {/* Related Insights */}
      <RelatedContent
        items={insightsData.map(p => ({ slug: p.slug, title: p.title, description: p.shortDescription, color: p.color }))}
        type="insights"
        currentSlug={post.slug}
      />
    </>
  );
}
