'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] md:h-[3px] origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500"
      style={{ scaleX }}
    />
  );
}
