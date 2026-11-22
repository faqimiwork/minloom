import { Face } from './Faces';
import React, { useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Zap, Heart, Clock, Users, BarChart3 } from 'lucide-react';

// Standalone SectionBadge helper component
function SectionBadge({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  const formattedText = text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : '';
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-neutral-200/80 shadow-xs rounded-full select-none">
      <span className="inline-flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5 text-neutral-800/80 icon-line-draw" />
      </span>
      <span className="text-xs font-semibold text-neutral-800/80 leading-none">
        {formattedText}
      </span>
    </div>
  );
}

// Google Fonts stylesheet injection for 100% standalone reliability
const GOOGLE_FONTS_CSS = ``;

// Self-contained Camera Roll Strip Component
const FRAME_H = 160;
const REPEAT_FRAMES = 8;
const LOOP_H = FRAME_H * 4;

function DesktopStripSvg() {
  return (
    <svg
      width="56"
      height={FRAME_H * REPEAT_FRAMES}
      viewBox={`0 0 56 ${FRAME_H * REPEAT_FRAMES}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hidden lg:block select-none pointer-events-none"
    >
      {Array.from({ length: REPEAT_FRAMES }).map((_, idx) => {
        const y = idx * FRAME_H;
        return (
          <g key={idx} transform={`translate(0, ${y})`}>
            <rect width="56" height={FRAME_H} fill="#010100" />
            <rect x="13" y="7" width="30" height="146" rx="4.5" fill="#FFFEFF" />
            {[9, 47, 85, 123].map((sY, sIdx) => (
              <rect key={`l-sp-${sIdx}`} x="3.2" y={sY} width="6" height="11" rx="1.8" fill="#FFFEFF" />
            ))}
            {[9, 47, 85, 123].map((sY, sIdx) => (
              <rect key={`r-sp-${sIdx}`} x="46.8" y={sY} width="6" height="11" rx="1.8" fill="#FFFEFF" />
            ))}
            <rect x="0" y="0" width="56" height="3" fill="#010100" />
            <rect x="0" y="157" width="56" height="3" fill="#010100" />
          </g>
        );
      })}
    </svg>
  );
}

function MobileStripSvg({ isRight = false }: { isRight?: boolean }) {
  return (
    <svg
      width="11"
      height={FRAME_H * REPEAT_FRAMES}
      viewBox={`0 0 11 ${FRAME_H * REPEAT_FRAMES}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`block lg:hidden select-none pointer-events-none ${isRight ? 'scale-x-[-1]' : ''}`}
    >
      {Array.from({ length: REPEAT_FRAMES }).map((_, idx) => {
        const y = idx * FRAME_H;
        return (
          <g key={idx} transform={`translate(0, ${y})`}>
            <rect width="11" height={FRAME_H} fill="#010100" />
            {[9, 47, 85, 123].map((sY, sIdx) => (
              <rect key={`m-sp-${sIdx}`} x="1.5" y={sY} width="4.2" height="10" rx="1.2" fill="#FFFEFF" />
            ))}
            <path d="M 7.5 7 Q 7.5 7 7.5 10 L 7.5 150 Q 7.5 153 7.5 153 L 11 153 L 11 7 Z" fill="#FFFEFF" />
            <polygon points="7.5,75 10.5,80 7.5,85" fill="#010100" />
            <rect x="0" y="0" width="11" height="3" fill="#010100" />
            <rect x="0" y="157" width="11" height="3" fill="#010100" />
          </g>
        );
      })}
    </svg>
  );
}

function CameraRoll({
  side,
  speed = 60,
  opacity = 0.10,
  className = '',
}: {
  side: 'left' | 'right';
  speed?: number;
  opacity?: number;
  className?: string;
}) {
  const isRight = side === 'right';
  const animateY = isRight ? [-LOOP_H, 0] : [0, -LOOP_H];

  return (
    <div
      aria-hidden="true"
      className={`absolute top-0 bottom-0 z-20 overflow-hidden pointer-events-none ${
        isRight ? 'right-0' : 'left-0'
      } ${className}`}
      style={{ opacity }}
    >
      <motion.div
        animate={{ y: animateY }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        className="flex flex-col will-change-transform"
      >
        <div className="flex flex-col">
          <DesktopStripSvg />
          <MobileStripSvg isRight={isRight} />
        </div>
        <div className="flex flex-col">
          <DesktopStripSvg />
          <MobileStripSvg isRight={isRight} />
        </div>
        <div className="flex flex-col">
          <DesktopStripSvg />
          <MobileStripSvg isRight={isRight} />
        </div>
      </motion.div>
    </div>
  );
}

function SectionCameraRolls({ speed = 60, opacity = 0.10, className = '' }: { speed?: number; opacity?: number; className?: string }) {
  return (
    <>
      <CameraRoll side="left" speed={speed} opacity={opacity} className={className} />
      <CameraRoll side="right" speed={speed} opacity={opacity} className={className} />
    </>
  );
}

interface AnimatedCounterProps {
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ from = 0, to, prefix = '', suffix = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const spring = useSpring(from, {
    mass: 0.8,
    stiffness: 75,
    damping: 18,
  });

  const display = useTransform(spring, (current) => {
    return `${prefix}${Math.round(current).toLocaleString()}${suffix}`;
  });

  if (isInView && spring.get() !== to) {
    spring.set(to);
  }

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
    </span>
  );
}

function AnimatedLetterHeading({ text }: { text: string }) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: 0.15,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      x: -16,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.45,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    },
  };

  return (
    <motion.h3
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-bold text-white tracking-tight leading-[1.2] flex flex-wrap gap-x-2.5 gap-y-1"
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex overflow-hidden">
          {Array.from(word).map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={child}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h3>
  );
}

export default function Matrics() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="metrics" className="py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FFFEFF] border-b border-neutral-100 overflow-hidden relative">
      <style>{GOOGLE_FONTS_CSS}</style>
      {/* Left Running Camera Roll */}

      <div className="max-w-[1180px] 2xl:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-16 2xl:px-24">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="flex justify-center mb-4">
            <SectionBadge icon={BarChart3} text="By the numbers" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[56px] text-neutral-900 font-serif font-bold tracking-tight leading-[1.15]">
            Small app. <br />
            <span className="ml-mark">Honest numbers.</span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed font-normal">
            No made-up user counts. Just what MinLoom does, every time you press record.
          </p>
        </div>

        {/* Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
        >
          
          {/* Left Hero Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 rounded-[28px] overflow-hidden relative bg-neutral-950 p-8 sm:p-10 flex flex-col justify-between min-h-[460px] lg:min-h-[520px] shadow-xl border border-neutral-800 group"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="absolute -right-16 -top-10 w-[360px] h-[360px] rounded-full overflow-hidden border-[6px] border-[#F5B83D] opacity-70 group-hover:scale-105 transition-transform duration-700"><Face name="leo" className="w-full h-full block" /></div>
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5B83D]" />
                <span className="text-xs sm:text-sm font-medium text-neutral-300 tracking-wide">
                  Built by Nota Tech
                </span>
              </div>
              
              <AnimatedLetterHeading text="Everything stays on your computer" />
            </div>

            <div className="relative z-10 mt-12 sm:mt-16">
              <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed">
                No account, no upload, no tracking. Your recordings live in your browser until you download them. We could not see them even if we wanted to.
              </p>
            </div>
          </motion.div>

          {/* Right 2x2 Metric Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            
            {/* Card 1: 84% */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-[26px] p-7 sm:p-8 border border-black/10 shadow-[0_1px_2px_rgba(17,17,19,0.06),0_12px_32px_rgba(17,17,19,0.08)] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(246,70,10,0.08)] hover:border-amber-200/70 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <span className="text-5xl sm:text-6xl font-serif font-bold text-neutral-900 tracking-tight">
                  <AnimatedCounter from={0} to={2} suffix="s" />
                </span>
                <div className="w-11 h-11 rounded-2xl bg-[#FFF3D6] border border-black/10 flex items-center justify-center shrink-0 shadow-xs">
                  <Zap className="w-5 h-5 text-neutral-900" strokeWidth={2.2} />
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-xl sm:text-[22px] font-serif font-bold text-neutral-900 tracking-tight mb-2.5">
                  Autosave
                </h4>
                <p className="text-sm text-neutral-600 font-normal leading-relaxed">
                  Your video is written to disk every 2 seconds, so a crash never costs you a take.
                </p>
              </div>
            </motion.div>

            {/* Card 2: 3 in 5 */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-[26px] p-7 sm:p-8 border border-black/10 shadow-[0_1px_2px_rgba(17,17,19,0.06),0_12px_32px_rgba(17,17,19,0.08)] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(246,70,10,0.08)] hover:border-amber-200/70 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <span className="text-5xl sm:text-6xl font-serif font-bold text-neutral-900 tracking-tight flex items-center gap-1.5">
                  <AnimatedCounter from={0} to={0} />
                </span>
                <div className="w-11 h-11 rounded-2xl bg-[#FFF3D6] border border-black/10 flex items-center justify-center shrink-0 shadow-xs">
                  <Heart className="w-5 h-5 text-neutral-900" strokeWidth={2.2} />
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-xl sm:text-[22px] font-serif font-bold text-neutral-900 tracking-tight mb-2.5">
                  Watermarks
                </h4>
                <p className="text-sm text-neutral-600 font-normal leading-relaxed">
                  Your video is yours. No logo stamped in the corner, ever, on the free plan too.
                </p>
              </div>
            </motion.div>

            {/* Card 3: $5M+ */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-[26px] p-7 sm:p-8 border border-black/10 shadow-[0_1px_2px_rgba(17,17,19,0.06),0_12px_32px_rgba(17,17,19,0.08)] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(246,70,10,0.08)] hover:border-amber-200/70 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <span className="text-5xl sm:text-6xl font-serif font-bold text-neutral-900 tracking-tight">
                  <span>∞</span>
                </span>
                <div className="w-11 h-11 rounded-2xl bg-[#FFF3D6] border border-black/10 flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-5 h-5 text-neutral-900" strokeWidth={2.2} />
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-xl sm:text-[22px] font-serif font-bold text-neutral-900 tracking-tight mb-2.5">
                  Time limit
                </h4>
                <p className="text-sm text-neutral-600 font-normal leading-relaxed">
                  Record for as long as you need. Set an auto-stop timer only if you want one.
                </p>
              </div>
            </motion.div>

            {/* Card 4: 95% */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-[26px] p-7 sm:p-8 border border-black/10 shadow-[0_1px_2px_rgba(17,17,19,0.06),0_12px_32px_rgba(17,17,19,0.08)] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(246,70,10,0.08)] hover:border-amber-200/70 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <span className="text-5xl sm:text-6xl font-serif font-bold text-neutral-900 tracking-tight">
                  <AnimatedCounter from={0} to={4} />
                </span>
                <div className="w-11 h-11 rounded-2xl bg-[#FFF3D6] border border-black/10 flex items-center justify-center shrink-0 shadow-xs">
                  <Users className="w-5 h-5 text-neutral-900" strokeWidth={2.2} />
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-xl sm:text-[22px] font-serif font-bold text-neutral-900 tracking-tight mb-2.5">
                  Bubble shapes
                </h4>
                <p className="text-sm text-neutral-600 font-normal leading-relaxed">
                  Circle, squircle, soft square or blob, in three sizes. Snap it to any corner.
                </p>
              </div>
            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
