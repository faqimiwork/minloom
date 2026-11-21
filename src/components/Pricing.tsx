import { INSTALL_HREF } from './Demo';
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Tag } from 'lucide-react';

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

// Self-contained Animated Interactive Button Component
function AnimatedInteractiveText({
  text,
  isHovered,
  className = '',
}: {
  text: string;
  isHovered: boolean;
  className?: string;
}) {
  const letters = Array.from(text);

  return (
    <span className={`inline-flex items-center overflow-hidden leading-tight ${className}`}>
      {letters.map((char, index) => {
        if (char === ' ') {
          return (
            <span key={index} className="inline-block">
              &nbsp;
            </span>
          );
        }

        return (
          <span key={index} className="inline-block relative overflow-hidden h-[1.25em]">
            <motion.span
              className="inline-block"
              initial={false}
              animate={
                isHovered
                  ? {
                      y: ['0%', '115%', '-115%', '0%'],
                      rotateX: [0, 90, -90, 0],
                      x: [0, 2, -2, 0],
                      opacity: [1, 0.4, 0.4, 1],
                    }
                  : {
                      y: '0%',
                      rotateX: 0,
                      x: 0,
                      opacity: 1,
                    }
              }
              transition={{
                duration: 0.48,
                ease: [0.33, 1, 0.68, 1] as const,
                delay: index * 0.022,
              }}
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

function AnimatedInteractiveButton({
  children,
  text,
  onClick,
  className = '',
  type = 'button',
  icon,
  iconPosition = 'right',
  href,
  target,
  rel,
}: {
  children?: React.ReactNode;
  text?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  target?: string;
  rel?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const rawText = text || (typeof children === 'string' ? children : '');

  const iconMotionLeft = (
    <span className="relative overflow-hidden inline-flex items-center justify-center">
      <motion.span
        className="inline-flex items-center justify-center"
        initial={false}
        animate={
          isHovered
            ? {
                x: ['0%', '150%', '-150%', '0%'],
                opacity: [1, 0, 0, 1],
              }
            : {
                x: '0%',
                opacity: 1,
              }
        }
        transition={{ duration: 0.42, ease: [0.33, 1, 0.68, 1] as const }}
      >
        {icon}
      </motion.span>
    </span>
  );

  const iconMotionRight = (
    <span className="relative overflow-hidden inline-flex items-center justify-center">
      <motion.span
        className="inline-flex items-center justify-center"
        initial={false}
        animate={
          isHovered
            ? {
                x: ['0%', '150%', '-150%', '0%'],
                opacity: [1, 0, 0, 1],
              }
            : {
                x: '0%',
                opacity: 1,
              }
        }
        transition={{
          duration: 0.42,
          ease: [0.33, 1, 0.68, 1] as const,
          delay: (rawText ? rawText.length * 0.022 : 0) + 0.05,
        }}
      >
        {icon}
      </motion.span>
    </span>
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && iconMotionLeft}
      {rawText ? (
        <AnimatedInteractiveText text={rawText} isHovered={isHovered} />
      ) : (
        children
      )}
      {icon && iconPosition === 'right' && iconMotionRight}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
    >
      {content}
    </button>
  );
}

// Word-by-word staggered reveal animation component
function TypingText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      x: -6,
      filter: "blur(2px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.25,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, i) => (
        <motion.span key={`${word}-${i}`} variants={child} className="inline-block mr-1.5 last:mr-0">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Animated counter component
function AnimatedPrice({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1100;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.round(start + (value - start) * easeProgress);

      setDisplayValue(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-bold font-sans tracking-tight">
      ${displayValue}
    </span>
  );
}

export default function Pricing() {
  const plans = [
    {
      id: 'free',
      name: 'Free, forever',
      description: 'Everything you need to record, trim and download. No account, no card, no catch.',
      priceNum: 0,
      priceText: '$0',
      period: 'forever',
      isDark: false,
      btnLabel: "Add to Chrome, it's free",
      href: INSTALL_HREF,
      featuresLeft: [
        'Tab, Window and Screen modes',
        'Camera bubble, 4 shapes',
        'Mic and tab audio',
        'Draw, highlight and click rings',
        'Floating controls',
        'Up to 1080p',
      ],
      featuresRight: [
        'No watermark',
        'No time limit',
        'MP4 or WebM download',
        'Trim and cut out',
        'Autosave and crash recovery',
        'Keyboard shortcuts',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For when you want to share a link instead of a file. Join the list and we will tell you first.',
      priceNum: 0,
      priceText: 'Soon',
      period: '',
      isDark: true,
      btnLabel: 'Tell me when Pro is ready',
      href: 'mailto:support@minloom.com?subject=MinLoom%20Pro%20waitlist',
      featuresLeft: [
        'Everything in Free',
        'Share links on minloom.com',
      ],
      featuresRight: [
        'See who watched',
        'Priority support',
      ],
    },
  ];


  return (
    <section id="pricing" className="py-12 md:py-16 lg:py-24 bg-[#FFF8E7] border-b border-neutral-100 overflow-hidden relative select-none">
      <style>{GOOGLE_FONTS_CSS}</style>
      {/* Left Running Camera Roll */}
      <SectionCameraRolls />

      <div className="max-w-[1180px] 2xl:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-16 2xl:px-24">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="flex justify-center mb-4">
            <SectionBadge icon={Tag} text="Pricing" />
          </div>
          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-[56px] font-serif font-bold text-neutral-900 tracking-tight leading-[1.12]">
            Free means <span className="ml-mark">free.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 font-normal max-w-2xl mx-auto leading-relaxed">
            Every recording feature is in the free plan, with no watermark and no time limit. Pro will add sharing links later, for people who want them.
          </p>
        </div>

        {/* 2-Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full max-w-7xl mx-auto items-stretch">
          {plans.map((plan, index) => {
            const isDark = plan.isDark;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className={`w-full rounded-[32px] p-8 sm:p-12 flex flex-col justify-between transition-all duration-300 ${
                  isDark
                    ? 'bg-[#17140F] text-white shadow-2xl border-[3px] border-neutral-900'
                    : 'bg-white text-neutral-900 border-[3px] border-neutral-900 shadow-[0_8px_0_#17140F]'
                }`}
              >
                <div>
                  <div className="flex flex-row items-end justify-between gap-4">
                    <div className="flex-1 pr-2">
                      <h3 className="text-2xl sm:text-[28px] font-serif font-bold tracking-tight">
                        <TypingText text={plan.name} delay={index * 0.15} />
                      </h3>
                      <p className={`mt-2 text-sm sm:text-[15px] leading-relaxed max-w-[290px] ${
                        isDark ? 'text-neutral-400/80' : 'text-neutral-500/85'
                      }`}>
                        <TypingText text={plan.description} delay={index * 0.15 + 0.1} />
                      </p>
                    </div>

                    <div className="flex items-baseline shrink-0 text-right pb-0.5">
                      <span className="text-3xl sm:text-4xl lg:text-[46px] font-bold font-sans tracking-tight leading-none">
                        {plan.priceText}
                      </span>
                      <span className={`text-xs sm:text-sm font-normal ml-1.5 leading-none ${
                        isDark ? 'text-neutral-400/80' : 'text-neutral-500/85'
                      }`}>
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <AnimatedInteractiveButton
                      href={plan.href}
                      text={plan.btnLabel}
                      className={`w-full py-4 rounded-full font-bold text-base transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-[0.99] ${
                        isDark
                          ? 'bg-white text-neutral-900 hover:bg-[#FFC83D]'
                          : 'bg-[#FFC83D] text-neutral-900 border-[3px] border-neutral-900 shadow-[0_5px_0_#17140F] hover:bg-neutral-900 hover:text-[#FFC83D]'
                      }`}
                    />
                  </div>

                  <div className="mt-12">
                    <h4 className={`text-sm font-semibold tracking-wide ${
                      isDark ? 'text-neutral-200' : 'text-neutral-900'
                    }`}>
                      {isDark ? 'Planned' : 'Included'}
                    </h4>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                      <div className="space-y-3.5">
                        {plan.featuresLeft.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2.5">
                            <Check className={`w-4 h-4 shrink-0 stroke-[2.5] ${
                              isDark ? 'text-[#FFC83D]' : 'text-neutral-900'
                            }`} />
                            <span className={`text-sm font-normal leading-tight ${
                              isDark ? 'text-neutral-300/80' : 'text-neutral-600/90'
                            }`}>
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3.5">
                        {plan.featuresRight.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2.5">
                            <Check className={`w-4 h-4 shrink-0 stroke-[2.5] ${
                              isDark ? 'text-[#FFC83D]' : 'text-neutral-900'
                            }`} />
                            <span className={`text-sm font-normal leading-tight ${
                              isDark ? 'text-neutral-300/80' : 'text-neutral-600/90'
                            }`}>
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
