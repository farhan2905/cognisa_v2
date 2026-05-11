'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Zap, Code } from 'lucide-react';

const headingWords = ['We', 'think,', 'you', 'grow', '—', "that's", 'the', 'deal.'];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};



export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const ringRotation = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const ringRotation2 = useTransform(scrollYProgress, [0, 1], [45, -135]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.2], [0, -60]);

  // Step-by-step fades
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const paragraphOpacity = useTransform(scrollYProgress, [0.03, 0.12], [1, 0]);
  const buttonsOpacity = useTransform(scrollYProgress, [0.06, 0.15], [1, 0]);

  return (
    <section id="hero" ref={heroRef} className="section-anchor relative min-h-screen flex items-center bg-transparent overflow-hidden pt-8 pb-12 md:pt-12 md:pb-16 lg:pt-0 lg:pb-0">
      {/* Decorative gradient orbs — lavender/indigo */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-indigo-100 rounded-full blur-[120px] opacity-[0.30] animate-orb-1" />
      <div className="absolute bottom-1/4 right-0 w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-violet-50 rounded-full blur-[120px] opacity-[0.25] animate-orb-2" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djI2SDI0VjM0SDBWMjRoMjRWMGgxMnYyNGgyNHYxMEgzNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-[0.15] pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 mt-[-10vh]">
        <motion.div
           animate={{ 
            rotate: [45, 65, 45], 
            y: [-15, 15, -15],
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
          className="w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] opacity-[0.9]"
          style={{
            background: 'conic-gradient(from 180deg at 50% 50%, #FFB1ee 0deg, #A8C0FF 120deg, #C2A1E5 240deg, #FFB1ee 360deg)',
            boxShadow: '0 0 80px rgba(194, 161, 229, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: '4px'
          }}
        />
        <div className="absolute w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-white/20 mix-blend-overlay rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Second smaller spinning ring — opposite direction */}
      <motion.div
        style={{ rotate: ringRotation2 }}
        className="absolute bottom-[15%] left-[8%] md:left-[10%] w-[120px] h-[120px] md:w-[180px] md:h-[180px] pointer-events-none z-[2]"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
          <circle cx="100" cy="100" r="90" stroke="rgba(92,99,120,0.1)" strokeWidth="1" />
          <circle cx="100" cy="100" r="70" stroke="rgba(99,102,241,0.06)" strokeWidth="0.5" strokeDasharray="6 12" />
        </svg>
      </motion.div>

      <motion.div 
        style={{ y: contentY }}
        className="relative z-20 w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col items-center text-center justify-center pt-4 pb-6 md:pt-8 md:pb-8 lg:pt-48"
      >
        <div className="w-full max-w-4xl pt-2 lg:pt-24 flex flex-col items-center">
          {/* Status Badge */}
          <motion.div
            style={{ opacity: badgeOpacity }}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center justify-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full mb-8 shadow-sm"
          >
            <span className="text-foreground/80 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-bold">
              SOFTWARE · DEVELOPMENT · AUTOMATION · AI
            </span>
          </motion.div>

          {/* Word-by-word hero heading */}
          <motion.div style={{ opacity: headingOpacity }}>
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#94a3b8] via-[#e2e8f0] to-[#f8fafc] leading-[1.1] tracking-[-0.04em] mb-6 drop-shadow-xl text-center"
            >
              {headingWords.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  className="inline-block whitespace-pre"
                >
                  {['think,', 'grow', '—'].includes(word) ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#c084fc] via-[#60a5fa] to-[#38bdf8] drop-shadow-[0_0_25px_rgba(168,85,247,0.3)]">{word}</span>
                  ) : (
                    word
                  )}
                  {index !== headingWords.length - 1 && ' '}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>

          <motion.p
            style={{ opacity: paragraphOpacity }}
            variants={fadeUpVariants}
            className="text-lg md:text-xl lg:text-2xl text-foreground/70 mb-10 max-w-3xl leading-relaxed text-center font-medium"
          >
            End-to-end AI automation and software development that
            transforms your business. From strategy to deployment, we build
            systems that scale.
          </motion.p>

          <motion.div
            style={{ opacity: buttonsOpacity }}
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center w-full"
          >
            <a
              href="#contact"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#6366f1] text-white px-8 py-3.5 md:py-4 rounded-full text-base font-semibold transition-all hover:bg-[#4f46e5] shadow-[0_8px_30px_rgba(99,102,241,0.4)]"
            >
              Get Started
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#work"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-foreground px-8 py-3.5 md:py-4 rounded-full text-base font-medium transition-all hover:bg-white/10"
            >
              Our Work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 opacity-60" />
            </a>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll indicator - Only visible on desktop */}
      <motion.div
        style={{ opacity: contentOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
