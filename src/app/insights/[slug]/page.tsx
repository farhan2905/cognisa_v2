import { notFound } from 'next/navigation';
import { insightsData } from '@/data/insights';
import DetailHero from '@/components/shared/DetailHero';
import GlassContentBlock from '@/components/shared/GlassContentBlock';
import MiniNeuralConstellation from '@/components/shared/fragments/MiniNeuralConstellation';
import RelatedContent from '@/components/shared/fragments/RelatedContent';
import ReadingProgress from '@/components/shared/ReadingProgress';
import TableOfContents from '@/components/shared/TableOfContents';
import { Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

const customPrismStyle = {
  ...prism,
  'pre[class*="language-"]': {
    ...prism['pre[class*="language-"]'],
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '1.25rem',
    padding: '1.5rem',
    margin: '1.5rem 0',
  },
  'code[class*="language-"]': {
    ...prism['code[class*="language-"]'],
    background: 'transparent',
    color: '#0f172a',
    fontFamily: 'monospace',
  }
};

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

  // Extract headings
  const headings = post.content
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => {
      const text = line.replace('## ', '').trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return { text, id };
    });

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

      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 py-12 md:py-20 flex flex-col lg:flex-row gap-8 items-start">
        {/* Table of contents sidebar */}
        <TableOfContents headings={headings} />

        {/* Main Content */}
        <div className="flex-grow w-full min-w-0">
          <GlassContentBlock className="px-6 md:px-12 py-10 md:py-16">
            <div className="flex items-center gap-6 text-slate-500 text-sm font-medium mb-12 border-b border-slate-200 pb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>

            <div className="prose max-w-none prose-h1:text-3xl prose-h1:font-bold prose-h1:text-slate-900 prose-h1:mb-8 prose-h2:text-2xl prose-h2:font-bold prose-h2:text-slate-900 prose-h2:mt-12 prose-h2:mb-6 prose-p:text-slate-650 prose-p:leading-relaxed prose-p:mb-6 prose-ul:text-slate-650 prose-ul:mb-6 prose-li:mb-2 prose-strong:text-slate-950 prose-code:text-cyan-600 prose-code:bg-cyan-50/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-transparent prose-pre:p-0">
              <ReactMarkdown
                components={{
                  h2({ children }) {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    return (
                      <h2 id={id} className="text-2xl font-bold text-slate-800 mt-12 mb-6 scroll-mt-24">
                        {children}
                      </h2>
                    );
                  },
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const isInline = !match;
                    return !isInline ? (
                      <SyntaxHighlighter
                        style={customPrismStyle}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-xl overflow-hidden my-6"
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className="text-cyan-700 bg-cyan-50/50 px-1.5 py-0.5 rounded text-xs font-mono border border-cyan-100">
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
