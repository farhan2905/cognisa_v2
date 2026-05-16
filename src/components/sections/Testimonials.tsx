'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Elevate Digital completely transformed our online presence. Their data-driven approach led to a 340% increase in organic traffic within just 6 months. The team is incredibly talented and responsive.',
    name: 'Sarah Chen',
    role: 'CEO, TechFlow Inc.',
    initials: 'SC',
    color: 'bg-blue-500/20 text-blue-400',
  },
  {
    quote:
      'Working with Elevate was a game-changer for our brand. They understood our vision from day one and delivered a website and marketing strategy that truly represents who we are. Revenue up 200%.',
    name: 'Marcus Rodriguez',
    role: 'Founder, GreenLeaf Co.',
    initials: 'MR',
    color: 'bg-indigo-400/15 text-indigo-300',
  },
  {
    quote:
      'The AI solutions Elevate implemented in our customer service workflow reduced response times by 80% and increased customer satisfaction scores dramatically. Best investment we\'ve made.',
    name: 'Emily Watson',
    role: 'VP of Operations, DataSphere',
    initials: 'EW',
    color: 'bg-blue-500/15 text-blue-400',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative bg-transparent py-24 md:py-32 overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-foreground/80 text-xs uppercase tracking-[0.2em] mb-4">
            Client Stories
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Loved by <span className="bg-blue-600 text-white px-2 rounded-lg">leaders</span> worldwide
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="glass-surface-strong rounded-2xl p-8 border border-indigo-300/40 hover:border-white/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1 flex flex-col"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-blue-500 mb-6 flex-shrink-0" />

              {/* Quote text */}
              <p className="text-foreground text-base leading-relaxed mb-8 flex-grow">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-foreground/5">
                <div
                  className={`w-11 h-11 rounded-full ${testimonial.color} flex items-center justify-center text-sm font-bold flex-shrink-0`}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-foreground/80 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
