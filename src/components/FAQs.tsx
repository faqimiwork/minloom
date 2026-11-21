import { Bubble } from './Faces';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp, ChevronRight, HelpCircle } from 'lucide-react';

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

interface FAQItem {
  number: string;
  question: string;
  answer: string;
}

function TypingAnswer({ text }: { text: string; key?: React.Key }) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.04,
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
    <motion.p
      variants={container}
      initial="hidden"
      animate="visible"
      className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed flex flex-wrap gap-x-1.5 gap-y-1"
    >
      {words.map((word, i) => (
        <motion.span key={`${word}-${i}`} variants={child} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      number: '1.',
      question: "Is MinLoom really free?",
      answer: "Yes. Recording, the camera bubble, drawing, trimming and MP4 download are all free with no watermark and no time limit. A paid Pro plan for share links may come later, and the free features will stay free.",
    },
    {
      number: '2.',
      question: "Do I need to sign up or make an account?",
      answer: "No. Install the extension and press record. There is no account, no email and no login.",
    },
    {
      number: '3.',
      question: "Where are my videos saved?",
      answer: "On your own computer, inside your browser, until you download them. Nothing is uploaded to us. Open MinLoom and click Library to see every recording.",
    },
    {
      number: '4.',
      question: "What happens if Chrome crashes while I record?",
      answer: "MinLoom saves your video every 2 seconds. Open MinLoom again and you will see a Recover button for the interrupted take.",
    },
    {
      number: '5.',
      question: "Can I record my whole screen, not just a tab?",
      answer: "Yes. Pick Tab, Window or Screen before you start. In Window and Screen mode a small floating window keeps your camera and controls on top of every app.",
    },
    {
      number: '6.',
      question: "Will the buttons show up in my video?",
      answer: "No. While you record, only your camera bubble stays on the page. The toolbar and tips hide, and come back when you pause.",
    },
    {
      number: '7.',
      question: "Does it work without a webcam or microphone?",
      answer: "Yes. MinLoom notices which devices you have and skips the ones that are missing, so you can record screen only, voice only, or everything.",
    },
    {
      number: '8.',
      question: "Which browsers and computers does it work on?",
      answer: "Chrome, Edge, Brave and other Chromium browsers, version 116 or newer, on Windows, Mac, ChromeOS and Linux.",
    },
    {
      number: '9.',
      question: "What format are the videos?",
      answer: "MP4 by default, which plays in WhatsApp, QuickTime, Windows, Google Drive and every editor. You can switch to WebM in settings.",
    },
  ];


  return (
    <section id="faqs" className="py-12 md:py-16 lg:py-24 bg-white border-b border-neutral-100 overflow-hidden relative select-none">
      <style>{GOOGLE_FONTS_CSS}</style>
      {/* Left Running Camera Roll */}
      <SectionCameraRolls />

      <div className="max-w-[1180px] 2xl:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-16 2xl:px-24">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="flex justify-center mb-4">
            <SectionBadge icon={HelpCircle} text="Help" />
          </div>
          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-[56px] font-serif font-bold text-neutral-900 tracking-tight leading-[1.12]">
            Questions? <span className="ml-mark">Answered.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 font-normal max-w-2xl mx-auto leading-relaxed">
            The short version: free, private, no account. The long version is below.
          </p>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Support Card & Profile */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="bg-[#FFC83D] rounded-3xl p-8 sm:p-10 border-[3px] border-neutral-900 shadow-[0_6px_0_#17140F] shadow-[0_4px_24px_rgba(0,0,0,0.03)] text-center flex flex-col items-center justify-center min-h-[260px]">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 tracking-tight leading-snug max-w-[240px]">
                Still stuck? A real person reads every email.
              </h3>

              <AnimatedInteractiveButton
                href="mailto:support@minloom.com"
                text="Email support"
                icon={<ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors ml-1.5" />}
                iconPosition="right"
                className="mt-6 px-6 py-3.5 rounded-full bg-[#171412] text-white text-sm font-semibold hover:bg-[#FFC83D] hover:text-neutral-900 transition-all duration-300 flex items-center shadow-md hover:shadow-[0_8px_20px_rgba(246,70,10,0.25)] group cursor-pointer active:scale-95"
              />
            </div>

            <div className="flex items-center gap-3.5 px-3 py-2">
              <Bubble name="aina" size={46} ring={3} />
              <div>
                <h4 className="font-serif font-bold text-neutral-900 text-sm tracking-tight leading-tight">support@minloom.com</h4>
                <p className="text-xs text-neutral-500 font-normal mt-0.5">We reply within 1 to 2 working days</p>
              </div>
            </div>

          </div>

          {/* Right Column: FAQ Accordion List */}
          <div className="lg:col-span-8 space-y-2.5 sm:space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`bg-[#FFF8E7] rounded-2xl sm:rounded-3xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-neutral-200 shadow-[0_6px_24px_rgba(0,0,0,0.03)]'
                      : 'border-neutral-200/70 hover:border-neutral-300 shadow-2xs'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className={`w-full text-left flex items-start justify-between gap-4 cursor-pointer select-none group transition-all duration-200 ${
                      isOpen
                        ? 'p-5 sm:p-6 pb-2 sm:pb-2.5'
                        : 'p-5 sm:p-6'
                    }`}
                  >
                    <div className="flex items-baseline gap-3 sm:gap-4 flex-1">
                      <span className={`text-base sm:text-lg font-serif font-bold shrink-0 transition-colors duration-200 ${
                        isOpen ? 'text-[#E5382C]' : 'text-neutral-900 group-hover:text-[#E5382C]'
                      }`}>
                        {faq.number}
                      </span>

                      <span className={`text-lg sm:text-xl md:text-[21px] font-serif font-bold tracking-tight leading-snug transition-colors duration-200 ${
                        isOpen ? 'text-[#E5382C]' : 'text-neutral-900 group-hover:text-[#E5382C]'
                      }`}>
                        {faq.question}
                      </span>
                    </div>

                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen
                        ? 'bg-[#FFC83D] text-white shadow-sm'
                        : 'bg-[#171412] text-white group-hover:bg-[#FFC83D]'
                    }`}>
                      {isOpen ? (
                        <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <ArrowDown className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as const }}
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 pl-[38px] sm:pl-[44px]">
                          <TypingAnswer key={`answer-${index}`} text={faq.answer} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
