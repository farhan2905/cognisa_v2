'use client';

const marqueeItems = [
  'React & Next.js',
  'Python & Django',
  'Node.js Architecture',
  'AI Agents',
  'LLM Integration',
  'Cloud Infrastructure',
  'PostgreSQL & Redis',
  'API Development',
  'Docker & CI/CD',
  'Figma to Code',
  'Tailwind & Framer',
  'Serverless Scaling',
];

export default function Marquee() {
  const repeated = [...marqueeItems, ...marqueeItems];

  return (
    <section className="relative bg-transparent py-6 overflow-hidden">
      <div className="glass-surface rounded-none border-y border-indigo-300/40">
        <div className="marquee-mask">
          <div className="animate-marquee flex items-center whitespace-nowrap">
            {repeated.map((item, i) => (
              <span
                key={i}
                className="text-indigo-400 text-lg md:text-xl lg:text-2xl font-bold tracking-tight mx-4 md:mx-8 flex items-center gap-4 md:gap-8"
              >
                {item}
                <span className="text-indigo-400/30 text-2xl">&#x2022;</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
