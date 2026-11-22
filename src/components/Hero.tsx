import { Logo, ProductDemo, INSTALL_HREF } from './Demo';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Play, ArrowRight, Video, Sparkles, CheckCircle } from 'lucide-react';

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

// Self-contained Header / Navbar Component
function NavbarHeader({ onStartInteractive }: { onStartInteractive: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Who it is for', href: '#usecases' },
    { name: 'FAQ', href: '#faqs' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl py-2.5 border-b border-black/5'
            : 'bg-transparent py-3.5'
        }`}
      >
        <div className="max-w-[1180px] 2xl:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-16 2xl:px-24 flex justify-between items-center relative">
          <a href="#" className="flex items-center group shrink-0">
            <Logo className="transition-transform group-hover:scale-[1.02]" />
          </a>

          <div className="hidden lg:flex items-center gap-8 opacity-85">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[15px] font-medium text-neutral-600/80 hover:text-[#A86F05] transition-colors flex items-center gap-1"
              >
                {link.name}
                {link.hasDropdown && (
                  <span className="text-xs text-neutral-400 font-sans">&#9662;</span>
                )}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <AnimatedInteractiveButton
              href={INSTALL_HREF}
              text="Add to Chrome, free"
              className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-700 text-white border border-neutral-900 shadow-[0_1px_2px_rgba(17,17,19,0.12),0_8px_20px_rgba(17,17,19,0.12)] rounded-full text-sm font-bold transition-all cursor-pointer inline-flex items-center justify-center"
            />
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-[42px] px-3 bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl text-neutral-700 flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 hidden sm:inline leading-none">Menu</span>
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#A86F05] shrink-0" /> : <Menu className="w-5 h-5 shrink-0" />}
          </button>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute top-full left-0 right-0 w-full mt-3 bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-2xl rounded-2xl z-50 p-6 lg:hidden flex flex-col gap-4"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-semibold text-neutral-700 hover:text-[#A86F05] transition-colors py-1 flex justify-between items-center"
                  >
                    <span>{link.name}</span>
                    {link.hasDropdown && <span className="text-xs text-neutral-400">&#9656;</span>}
                  </a>
                ))}
                <div className="h-px bg-neutral-100 my-2" />
                <div className="flex flex-col gap-3">
                  <a
                    href={INSTALL_HREF}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-700 text-white border border-neutral-900 shadow-[0_1px_2px_rgba(17,17,19,0.12),0_8px_20px_rgba(17,17,19,0.12)] rounded-full font-bold text-center"
                  >
                    Add to Chrome, it's free
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-neutral-900/10 backdrop-blur-md z-40 lg:hidden pointer-events-auto"
          />
        )}
      </AnimatePresence>
    </>
  );
}

interface HeroProps {
  onStartInteractive?: () => void;
}

export default function Hero({ onStartInteractive = () => {} }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.42, 0.75, 1], [40, 0, 0, -12]);
  const scale = useTransform(scrollYProgress, [0, 0.42, 1], [0.93, 1, 0.96]);
  const translateZ = useTransform(scrollYProgress, [0, 0.42, 1], [-40, 0, -15]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <>
      <style>{GOOGLE_FONTS_CSS}</style>
      
      {/* 1. Header / Navbar Embedded */}
      <NavbarHeader onStartInteractive={onStartInteractive} />

      {/* 2. Hero Section */}
      <section className="relative bg-white pt-[68px] px-3 sm:px-4 pb-6">
        <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[url('/hero-light.jpg')] bg-cover bg-center pt-16 sm:pt-24 pb-10 px-4 sm:px-6 lg:px-8 ring-1 ring-black/5">

        <div className="w-full max-w-[1180px] 2xl:max-w-[1380px] mx-auto px-0 sm:px-6 lg:px-16 2xl:px-24 text-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="flex flex-col items-center"
          >
            {/* Tagline Badge */}
            <motion.div
              variants={itemVariants}
              className="mb-7 inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-black/5 rounded-full px-3.5 py-1.5 text-[13px] text-neutral-800 shadow-[0_1px_2px_rgba(17,17,19,0.05)]"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#FF453A] animate-pulse" />
              <span className="font-medium tracking-tight">Now with Camera mode, Blur and Screenshots</span>
            </motion.div>

            {/* Majestic Hero Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-[44px] sm:text-6xl md:text-[72px] lg:text-[80px] leading-[1.04] text-neutral-900 font-serif max-w-4xl"
            >
              Show it. Say it.<br />
              <span className="ml-mark">Send the MP4.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-[17px] sm:text-[19px] md:text-[20px] text-neutral-700 max-w-2xl font-sans font-normal leading-relaxed"
            >
              The screen recorder for Chrome that stays out of your way. Your screen, your voice and your face in a soft bubble. No watermark, no account, no time limit.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto px-4 sm:px-0"
            >
              <AnimatedInteractiveButton
                href={INSTALL_HREF}
                text="Add to Chrome, it's free"
                className="px-6 sm:px-10 py-4 bg-neutral-900 hover:bg-neutral-700 text-white border border-neutral-900 shadow-[0_1px_2px_rgba(17,17,19,0.12),0_8px_20px_rgba(17,17,19,0.12)] rounded-full font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center cursor-pointer w-full sm:min-w-[260px] sm:whitespace-nowrap"
              />

              <AnimatedInteractiveButton
                href="#how-it-works"
                text="See how it works"
                className="px-6 sm:px-10 py-4 bg-white hover:bg-neutral-50 text-neutral-900 border border-black/10 rounded-full font-bold text-base transition-all duration-300 flex items-center justify-center cursor-pointer w-full sm:min-w-[220px] sm:whitespace-nowrap"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold text-neutral-700">
              {['Works on Chrome, Edge and Brave', 'Mac and Windows', 'Videos stay on your computer'].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-neutral-900 text-[#F5B83D] text-[10px] flex items-center justify-center">✓</span>{t}</span>
              ))}
            </motion.div>
          </motion.div>

          {/* Floating Creative Element / Mockup Preview with 3D Scroll Rotation */}
          <motion.div
            ref={containerRef}
            style={{
              perspective: 1200,
              rotateX: rotateX,
              scale: scale,
              z: translateZ,
              transformStyle: "preserve-3d",
            }}
            className="mt-2 sm:mt-3 relative mx-auto w-full max-w-5xl"
          >
            <div className="relative px-2 sm:px-6 pt-12 pb-6">
              <ProductDemo />
            </div>
          </motion.div>
        </div>
        </div>
      </section>
    </>
  );
}
