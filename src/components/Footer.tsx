import { Bubble, RADII } from './Faces';
import { Logo, CHROME_STORE_URL } from './Demo';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

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
      className="hidden md:block select-none pointer-events-none"
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
      className={`block md:hidden select-none pointer-events-none ${isRight ? 'scale-x-[-1]' : ''}`}
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

function AnimatedHeading({ text }: { text: string }) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
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
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.h2
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      className="relative z-10 text-3xl sm:text-4xl lg:text-[46px] font-serif font-bold text-neutral-900 tracking-tight leading-[1.18] max-w-2xl mx-auto flex flex-wrap justify-center gap-x-2.5 sm:gap-x-3 gap-y-1"
    >
      {words.map((word, i) => (
        <motion.span key={`${word}-${i}`} variants={child} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}

export default function Footer() {
  return (
    <footer id="get" className="bg-[#F6F6F7] border-t border-neutral-100 overflow-hidden relative select-none pt-12 pb-6">
      <style>{GOOGLE_FONTS_CSS}</style>
      {/* Left Running Camera Roll */}

      <div className="max-w-[1180px] 2xl:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-16 2xl:px-24">
        
        {/* Top CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative w-full rounded-[32px] sm:rounded-[40px] bg-[url('/hero-light.jpg')] bg-cover bg-center border border-black/5 shadow-[0_1px_2px_rgba(17,17,19,0.04)] p-10 sm:p-16 lg:p-20 overflow-hidden text-center flex flex-col items-center justify-center mb-10 sm:mb-12"
        >
          <div 
            className="absolute inset-0 opacity-[0.25] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(23, 20, 15, 0.08) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(23, 20, 15, 0.08) 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />

          <div className="relative z-10 mb-6"><Bubble name="leo" size={84} ring={5} shape={RADII.blob} /></div>

          <AnimatedHeading text="Your next video takes one click." />

          <p className="relative z-10 mt-3 text-base sm:text-lg text-neutral-800 font-medium max-w-xl mx-auto leading-relaxed">
            Free forever. No watermark, no account, no time limit.
          </p>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-6">
            <span className="px-4 py-1.5 rounded-full bg-white text-xs sm:text-sm text-neutral-900 font-bold border border-black/10">
              Camera bubble
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white text-xs sm:text-sm text-neutral-900 font-bold border border-black/10">
              Clean recordings
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white text-xs sm:text-sm text-neutral-900 font-bold border border-black/10">
              MP4 download
            </span>
          </div>

          <div className="relative z-10 mt-8">
            {CHROME_STORE_URL ? (
              <AnimatedInteractiveButton
                href={CHROME_STORE_URL}
                text="Add to Chrome, it's free"
                className="px-8 py-4 sm:px-10 rounded-full bg-neutral-900 text-white font-semibold text-base sm:text-lg hover:bg-neutral-700 border border-neutral-900 active:scale-95 transition-all duration-300 cursor-pointer inline-flex items-center justify-center"
              />
            ) : (
              <div className="flex flex-col items-center gap-3">
                <span className="px-8 py-4 rounded-full bg-neutral-900 text-white font-semibold text-base sm:text-lg border border-neutral-900">Launching soon on the Chrome Web Store</span>
                <a href="mailto:support@minloom.com?subject=Tell%20me%20when%20MinLoom%20launches" className="text-sm font-bold text-neutral-900 underline underline-offset-4">Email me on launch day</a>
              </div>
            )}
          </div>

          <div className="relative z-10 flex items-center justify-center gap-1.5 mt-10 sm:mt-11 text-xs sm:text-sm font-bold text-neutral-900 bg-white px-4 py-1.5 rounded-full border border-black/10">
            <Star className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900" />
            <span>Works on Chrome, Edge and Brave</span>
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-4"
        >
          <div className="space-y-3">
            <span className="inline-block group">
              <Logo />
            </span>

            <p className="text-sm text-neutral-500 font-normal">
              The minimal screen recorder for Chrome.
            </p>

            <p className="text-xs text-neutral-400 font-normal pt-1">
              © {new Date().getFullYear()} Nota Tech. All rights reserved.
            </p>
          </div>

          <div className="flex items-start gap-14 sm:gap-20">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-neutral-900">
                Pages
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-500">
                <li>
                  <a href="#features" className="hover:text-[#A86F05] transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#faqs" className="hover:text-[#A86F05] transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-neutral-900">
                Company
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-500">
                <li>
                  <a href="/privacy" className="hover:text-[#A86F05] transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-[#A86F05] transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="mailto:support@minloom.com" className="hover:text-[#A86F05] transition-colors">
                    support@minloom.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </motion.div>

      </div>
    </footer>
  );
}
