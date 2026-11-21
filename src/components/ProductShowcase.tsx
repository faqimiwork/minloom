import { DesktopDemo, INSTALL_HREF } from './Demo';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Cpu, Sliders, PlayCircle, Layers, Tv } from 'lucide-react';

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

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const totalHeight = rect.height;
      const startOffset = viewportHeight * 0.7;
      const endOffset = -totalHeight * 0.1;
      
      const totalRange = startOffset - endOffset;
      const currentVal = startOffset - rect.top;
      
      let progress = currentVal / totalRange;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);

      if (videoRef.current) {
        if (progress > 0.18) {
          if (videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          }
        } else {
          if (!videoRef.current.paused) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const lidAngle = -95 + (scrollProgress * 110);

  const editorFeatures = [
    {
      icon: <Cpu className="w-5 h-5 text-neutral-900" />,
      title: "Tab, Window or Screen",
      desc: "Record one tab with its sound, one app window, or your whole screen. Switch modes in one tap from the same small panel.",
    },
    {
      icon: <Sliders className="w-5 h-5 text-neutral-900" />,
      title: "Your face follows you",
      desc: "In Window and Screen mode, a tiny always-on-top window carries your camera and controls into Sheets, Canva, Figma or any app.",
    },
    {
      icon: <Layers className="w-5 h-5 text-neutral-900" />,
      title: "720p or 1080p, your call",
      desc: "Pick Auto, 720p for small files that send fast, or 1080p for crisp detail. Set an auto-stop timer so you never ramble past 5 minutes.",
    },
  ];


  return (
    <section 
      id="demo" 
      ref={sectionRef} 
      className="py-12 md:py-16 lg:py-24 bg-[#FFF8E7] border-b border-neutral-100 overflow-hidden relative min-h-[140vh]"
    >
      <style>{GOOGLE_FONTS_CSS}</style>
      {/* Left Running Camera Roll */}
      <SectionCameraRolls />

      <div className="absolute top-20 right-10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-50/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-[1180px] 2xl:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-16 2xl:px-24">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionBadge icon={Tv} text="Screen mode" />
          <h2 className="mt-6 text-4xl sm:text-6xl text-neutral-900 font-serif leading-tight">
            Not just tabs. <br />
            <span className="ml-mark">Your whole desktop.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-500 font-normal leading-relaxed">
            Teach a spreadsheet, walk through a design, demo your app. MinLoom records any window or the full screen, and your camera comes along.
          </p>
        </div>

        <div className="flex flex-col gap-6 items-center w-full">
          
          {/* 1. Interactive MacBook Mockup - Full Width at the Top */}
          <div className="w-full lg:sticky lg:top-24 h-[420px] sm:h-[480px] md:h-[520px] flex items-center justify-center relative z-20">
            
            <div 
              className="w-full max-w-4xl flex flex-col items-center justify-center"
              style={{ perspective: '1400px' }}
            >
              <div 
                className="relative w-full flex flex-col items-center transition-transform duration-300"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(10deg) rotateY(0deg) rotateZ(0deg)',
                }}
              >
                
                {/* MacBook Screen Lid */}
                <div 
                  className="relative bg-neutral-900 border-[8px] sm:border-[10px] border-neutral-950 rounded-2xl shadow-2xl transition-all duration-75"
                  style={{
                    transformOrigin: 'bottom',
                    transform: `rotateX(${lidAngle}deg)`,
                    transformStyle: 'preserve-3d',
                    width: '90%',
                    aspectRatio: '16/10',
                    zIndex: 20,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-20" />
                  
                  <div className="absolute inset-0 bg-neutral-950 overflow-hidden rounded-lg flex items-center justify-center">
                    
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-neutral-900 rounded-full flex items-center justify-center z-30">
                      <div className="w-1 h-1 bg-blue-500/80 rounded-full" />
                    </div>
                    
                    <DesktopDemo className="rounded-md" />

                    {scrollProgress < 0.1 && (
                      <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center text-center p-6 z-10">
                        <PlayCircle className="w-12 h-12 text-[#E5382C] mb-2 animate-pulse" />
                        <span className="text-xs font-mono text-neutral-400">Scroll to open</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* MacBook Bottom Base (Chassis) */}
                <div 
                  className="relative bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-400 rounded-b-2xl shadow-2xl"
                  style={{
                    width: '96%',
                    height: '16px',
                    transformStyle: 'preserve-3d',
                    marginTop: '-2px',
                    zIndex: 10,
                  }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-2 bg-neutral-500 rounded-b-md z-20" />
                  <div className="absolute top-0 inset-x-0 h-[1.5px] bg-white/40" />
                  <div className="absolute inset-x-4 top-1 h-[2px] bg-neutral-600/30 rounded-full" />
                </div>

                <div 
                  className="absolute bottom-[-20px] left-[5%] right-[5%] h-10 bg-black/25 rounded-full blur-2xl pointer-events-none -z-10 transition-opacity duration-300"
                  style={{
                    opacity: scrollProgress > 0.15 ? 0.8 : 0.3,
                  }}
                />

              </div>
            </div>

          </div>

          {/* 2. Controls / Info Column */}
          <div className="w-full max-w-5xl space-y-5 text-left relative z-10 mt-4">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {editorFeatures.map((feat, i) => (
                <div 
                  key={i} 
                  className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-neutral-200/80 hover:border-[#FFC83D]/40 hover:shadow-md hover:shadow-amber-500/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FFC83D] border-2 border-neutral-900 flex items-center justify-center shrink-0 group-hover:bg-[#FFC83D]/10 transition-colors">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-neutral-900 group-hover:text-[#E5382C] transition-colors">{feat.title}</h4>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="text-xl sm:text-2xl text-white mb-2">Works where you work.</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Chrome, Edge and Brave on Mac, Windows, ChromeOS and Linux. Your videos are saved on your own computer, never on our servers.
                </p>
              </div>
              <a href={INSTALL_HREF} className="text-sm font-bold bg-[#FFC83D] hover:bg-white px-6 py-3 rounded-full text-neutral-900 border-2 border-[#FFC83D] transition-colors shrink-0">Add to Chrome, free</a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
