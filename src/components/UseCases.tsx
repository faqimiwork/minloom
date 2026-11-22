import { Scene, FaceName, SceneKind } from './Faces';
import { INSTALL_HREF } from './Demo';
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles, ArrowRight, Users } from "lucide-react";

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

export default function UseCases({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const _isInView = useInView(sectionRef, { once: false, amount: 0.05 });
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFocused(entry.isIntersecting);
      },
      {
        threshold: 0.01,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 25,
    mass: 0.5
  });
  
  const y1 = 0;
  const opacity1 = 1;
  const scale1 = 1;

  const y2 = useTransform(smoothProgress, [0.05, 0.22], [650, 16]);
  const opacity2 = useTransform(smoothProgress, [0.05, 0.18], [0, 1]);
  const scale2 = useTransform(smoothProgress, [0.05, 0.22], [0.94, 1.0]);

  const y3 = useTransform(smoothProgress, [0.22, 0.40], [750, 32]);
  const opacity3 = useTransform(smoothProgress, [0.22, 0.35], [0, 1]);
  const scale3 = useTransform(smoothProgress, [0.22, 0.40], [0.94, 1.0]);

  const y4 = useTransform(smoothProgress, [0.40, 0.58], [850, 48]);
  const opacity4 = useTransform(smoothProgress, [0.40, 0.52], [0, 1]);
  const scale4 = useTransform(smoothProgress, [0.40, 0.58], [0.94, 1.0]);

  const y5 = useTransform(smoothProgress, [0.58, 0.76], [950, 64]);
  const opacity5 = useTransform(smoothProgress, [0.58, 0.70], [0, 1]);
  const scale5 = useTransform(smoothProgress, [0.58, 0.76], [0.94, 1.0]);

  const y6 = useTransform(smoothProgress, [0.76, 0.94], [1050, 80]);
  const opacity6 = useTransform(smoothProgress, [0.76, 0.88], [0, 1]);
  const scale6 = useTransform(smoothProgress, [0.76, 0.94], [0.94, 1.0]);

  const testimonialsData = [
    {
      heading: 'Teachers',
      desc: 'Explain a lesson once, share it all term. Record your slides or a worksheet with your face in the corner, so students feel you are right there.',
      buttonText: 'Record your first lesson',
      scene: 'teacher' as SceneKind,
      face: 'aina' as FaceName,
      bgColor: '#FFFFFF',
      rotation: 2.5,
      zIndex: 10,
      yVal: y1,
      opacityVal: opacity1,
      scaleVal: scale1,
    },
    {
      heading: 'Freelancers and agencies',
      desc: 'Walk clients through a design or a report instead of writing a long email. They see your screen, hear your voice and get it in one play.',
      buttonText: 'Send a walkthrough',
      scene: 'freelancer' as SceneKind,
      face: 'ravi' as FaceName,
      bgColor: '#FBFBFC',
      rotation: -2.2,
      zIndex: 20,
      yVal: y2,
      opacityVal: opacity2,
      scaleVal: scale2,
    },
    {
      heading: 'Support and QA',
      desc: 'Show the fix in 40 seconds, or record the bug exactly as it happened. Click rings show every step, so nobody has to guess.',
      buttonText: 'Answer with a video',
      scene: 'support' as SceneKind,
      face: 'mei' as FaceName,
      bgColor: '#FFFFFF',
      rotation: 1.8,
      zIndex: 30,
      yVal: y3,
      opacityVal: opacity3,
      scaleVal: scale3,
    },
    {
      heading: 'Creators and course makers',
      desc: 'Film tutorials and course lessons with a clean screen. Our buttons never show up in your video, and there is no watermark to crop out.',
      buttonText: 'Make a clean tutorial',
      scene: 'creator' as SceneKind,
      face: 'leo' as FaceName,
      bgColor: '#FBFBFC',
      rotation: -1.6,
      zIndex: 40,
      yVal: y4,
      opacityVal: opacity4,
      scaleVal: scale4,
    },
    {
      heading: 'Remote teams',
      desc: 'Skip the meeting. Record a quick update on the numbers, drop the MP4 in Slack or WhatsApp, and let people watch when it suits them.',
      buttonText: 'Record an update',
      scene: 'team' as SceneKind,
      face: 'sara' as FaceName,
      bgColor: '#FFFFFF',
      rotation: 2.2,
      zIndex: 50,
      yVal: y5,
      opacityVal: opacity5,
      scaleVal: scale5,
    },
    {
      heading: 'Students',
      desc: 'Present a project, explain your code or rehearse a talk. Free with no time limit, and nothing to sign up for.',
      buttonText: 'Record your demo',
      scene: 'student' as SceneKind,
      face: 'mei' as FaceName,
      bgColor: '#FBFBFC',
      rotation: -2.4,
      zIndex: 60,
      yVal: y6,
      opacityVal: opacity6,
      scaleVal: scale6,
    },
  ];


  return (
    <section
      id="usecases"
      ref={sectionRef}
      className={
        "relative w-full overflow-visible select-none transition-all duration-1000 ease-out px-4 sm:px-6 lg:px-8 bg-[#F6F6F7] py-12 md:py-16 lg:py-24 min-h-none lg:min-h-[520vh] border-b border-neutral-100 " +
        (isFocused ? "blur-0 opacity-100 scale-100 " : "lg:blur-[8px] lg:opacity-75 lg:scale-[0.99] ") +
        (className || "")
      }
    >
      <style>{GOOGLE_FONTS_CSS}</style>
      {/* Left Running Camera Roll */}

      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl -z-10" />

      {/* Sticky container for card stacking preview */}
      <div className="w-full bg-transparent lg:sticky lg:top-[40px] lg:h-[calc(100vh-60px)] min-h-[640px] relative flex flex-col justify-center overflow-visible py-10 lg:py-0">
        
        {/* Header Title inside UseCases */}
        <div className="w-full max-w-[1180px] 2xl:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-16 2xl:px-24 flex flex-col items-center text-center mb-8 lg:mb-12 shrink-0">
          <div className="flex justify-center mb-3">
            <SectionBadge icon={Users} text="Who is it for?" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-[52px] text-neutral-900 font-serif font-bold tracking-tight leading-none">
            Made for people who <br />
            <span className="ml-mark">explain things for a living.</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-500 font-normal max-w-2xl mx-auto leading-relaxed">
            Teachers, freelancers, support teams and creators. If a video saves you a long message or a meeting, MinLoom is for you.
          </p>
        </div>

        {/* Stacked Cards Layout */}
        <div className="w-full max-w-[960px] mx-auto flex flex-col items-center justify-center relative px-2 sm:px-4">

          {/* Desktop Layout */}
          <div className="hidden lg:block relative w-full h-[420px] max-w-[920px]">
            {testimonialsData.map((item, index: number) => (
              <motion.div
                key={index}
                style={{
                  y: item.yVal,
                  rotate: item.rotation,
                  zIndex: item.zIndex,
                  opacity: item.opacityVal,
                  scale: item.scaleVal,
                }}
                className="absolute inset-x-0 mx-auto flex items-center justify-center w-[920px]"
              >
                <div 
                  className="w-[920px] h-[340px] rounded-3xl p-10 flex items-center justify-between gap-12 shadow-[0_1px_2px_rgba(17,17,19,0.05),0_24px_60px_rgba(17,17,19,0.10)] border border-black/[0.07] relative overflow-hidden transition-all duration-300"
                  style={{ backgroundColor: item.bgColor }}
                >
                  
                  <div className="flex flex-col justify-between h-full max-w-[500px] text-left">
                    
                    <h3 className="text-4xl font-serif font-bold text-neutral-900 tracking-tight leading-none">
                      {item.heading}
                    </h3>
                    
                    <div className="space-y-6">
                      <p className="text-neutral-800 text-base sm:text-lg font-medium leading-relaxed font-sans max-w-[440px]">
                        {item.desc}
                      </p>
                      <div>
                        <AnimatedInteractiveButton 
                          href={INSTALL_HREF} 
                          text={item.buttonText}
                          icon={<ArrowRight className="w-4 h-4 shrink-0 ml-2" />}
                          iconPosition="right"
                          className="inline-flex items-center text-neutral-900 font-bold text-base hover:text-[#A86F05] transition-colors pb-1 border-b-2 border-black/10 hover:border-[#F5B83D] cursor-pointer"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="w-[280px] h-full rounded-2xl overflow-hidden relative border border-neutral-950/10 shadow-xs shrink-0 bg-white">
                    <Scene kind={item.scene} face={item.face} />
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:flex lg:hidden flex-col gap-6 w-full max-w-[760px] items-center">
            {testimonialsData.map((item, index: number) => (
              <div
                key={index}
                className="w-full rounded-2xl p-8 flex items-center justify-between gap-8 shadow-md border border-black/10 relative overflow-hidden"
                style={{ backgroundColor: item.bgColor }}
              >
                <div className="flex flex-col justify-between text-left flex-1">
                  <h3 className="text-3xl font-serif font-bold text-neutral-900 tracking-tight">
                    {item.heading}
                  </h3>
                  <div className="mt-8 space-y-4">
                    <p className="text-neutral-800 text-sm font-medium leading-relaxed">
                      {item.desc}
                    </p>
                    <div>
                      <AnimatedInteractiveButton 
                        href={INSTALL_HREF} 
                        text={item.buttonText}
                        icon={<ArrowRight className="w-3.5 h-3.5 ml-1.5" />}
                        iconPosition="right"
                        className="inline-flex items-center text-neutral-900 font-bold text-sm pb-1 border-b border-black/10 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-[180px] h-[180px] rounded-xl overflow-hidden relative border border-neutral-950/10 shadow-xs shrink-0 bg-white">
                  <Scene kind={item.scene} face={item.face} />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="flex md:hidden flex-col gap-5 w-full max-w-md">
            {testimonialsData.map((item, index: number) => (
              <div
                key={index}
                className="w-full rounded-2xl p-6 flex flex-col gap-5 shadow-sm border border-black/10 relative overflow-hidden text-left"
                style={{ backgroundColor: item.bgColor }}
              >
                <div>
                  <h3 className="text-2xl font-serif font-bold text-neutral-900 tracking-tight">
                    {item.heading}
                  </h3>
                  <p className="text-neutral-800 text-xs sm:text-sm font-medium leading-relaxed mt-3">
                    {item.desc}
                  </p>
                </div>

                <div className="w-full h-[150px] rounded-xl overflow-hidden relative border border-neutral-950/5 bg-white">
                  <Scene kind={item.scene} face={item.face} />
                </div>

                <div className="mt-2">
                  <AnimatedInteractiveButton 
                    href={INSTALL_HREF} 
                    text={item.buttonText}
                    icon={<ArrowRight className="w-3 h-3 ml-1" />}
                    iconPosition="right"
                    className="inline-flex items-center text-neutral-900 font-bold text-xs pb-1 border-b border-black/10 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
