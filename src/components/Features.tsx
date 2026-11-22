import { Bubble, Face, RADII } from './Faces';
import { INSTALL_HREF } from './Demo';
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VolumeX, Sparkles, MoveRight, CheckCircle, Volume2, Video, RefreshCw, Wand2 } from 'lucide-react';

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

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  shortTitle: string;
  desc: string;
  circleColor: string;
  badge: string;
  graphic: ReactNode;
}

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 6);
    }, 4500);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    resetTimer();
  };

  const services: ServiceItem[] = [
    {
      id: 'bubble',
      num: '01',
      title: 'Camera Bubble',
      shortTitle: 'Bubble',
      circleColor: 'bg-amber-100',
      badge: 'FAVORITE',
      desc: 'Your face in a soft bubble: circle, squircle, soft square or blob, in three sizes. Drag it anywhere and it snaps to a corner with a gentle spring.',
      graphic: (
        <div className="w-full h-full bg-[#F6F6F7] rounded-xl border border-black/10 p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#A86F05] bg-[#FFF3D6] px-2 py-0.5 rounded-full">4 shapes, 3 sizes</span>
            <span className="text-[9px] text-neutral-500 font-medium">Snaps to corners</span>
          </div>
          <div className="grid grid-cols-2 gap-3 place-items-center my-2">
            <Bubble name="aina" size={62} ring={4} shape={RADII.circle} />
            <Bubble name="ravi" size={62} ring={4} shape={RADII.squircle} />
            <Bubble name="mei" size={62} ring={4} shape={RADII.rounded} />
            <motion.div animate={{ rotate: [0, 4, -4, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
              <Bubble name="leo" size={62} ring={4} shape={RADII.blob} />
            </motion.div>
          </div>
          <div className="bg-white border border-neutral-200 rounded-xl p-2 flex items-center justify-between">
            <span className="text-[10px] font-bold text-neutral-800">Hide or show: Alt + Shift + C</span>
            <span className="w-6 h-3.5 rounded-full bg-neutral-900 relative"><span className="absolute right-0.5 top-0.5 w-2.5 h-2.5 rounded-full bg-[#F5B83D]" /></span>
          </div>
        </div>
      ),
    },
    {
      id: 'clean',
      num: '02',
      title: 'Clean Recordings',
      shortTitle: 'Clean',
      circleColor: 'bg-purple-100',
      badge: 'NEW',
      desc: 'While you record, the page shows only your face. Toolbars, tips and buttons step aside, so your video never fills up with our controls.',
      graphic: (
        <div className="w-full h-full bg-white rounded-xl border border-black/10 p-4 flex flex-col gap-3 relative overflow-hidden">
          <div className="grid grid-cols-2 gap-3 flex-1">
            {[{ l: 'What you see', tools: true }, { l: 'What gets recorded', tools: false }].map((c) => (
              <div key={c.l} className="flex flex-col gap-1.5">
                <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-wider">{c.l}</span>
                <div className="relative flex-1 rounded-lg border border-neutral-200 bg-neutral-50 overflow-hidden min-h-[120px]">
                  <img src="/sites/pocketview-home.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-top" draggable={false} />
                  <div className="absolute left-2 bottom-2"><Bubble name="mei" size={40} ring={3} /></div>
                  {c.tools && (
                    <motion.div animate={{ opacity: [1, 0.6, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute left-2 bottom-12 bg-neutral-900 rounded-full px-1.5 py-1 flex gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/70" /><span className="w-2.5 h-2.5 rounded-full bg-white/70" /><span className="w-2.5 h-2.5 rounded-full bg-white/70" />
                    </motion.div>
                  )}
                  {!c.tools && <span className="absolute top-1.5 right-1.5 text-[8px] font-bold bg-[#FFF3D6] text-neutral-900 px-1.5 rounded">REC</span>}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#F6F6F7] border border-neutral-200 rounded-xl p-2 text-[10px] font-bold text-neutral-800 text-center">Controls come back when you pause</div>
        </div>
      ),
    },
    {
      id: 'float',
      num: '03',
      title: 'Floating Controls',
      shortTitle: 'Floating',
      circleColor: 'bg-blue-100',
      badge: 'POPULAR',
      desc: 'A tiny window that stays on top of every app, with timer, pause, camera, pen and stop. In Screen mode it carries your camera too, so your face follows you to Canva, Excel or anywhere.',
      graphic: (
        <div className="w-full h-full bg-[#F6F6F7] rounded-xl border border-black/10 p-4 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
          <div className="w-[150px] bg-neutral-900 rounded-2xl p-2.5 shadow-xl">
            <div className="rounded-full overflow-hidden border border-[#F5B83D] mx-auto w-[110px] h-[110px]"><Face name="leo" className="w-full h-full block" /></div>
            <div className="mt-2.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF453A] animate-pulse" />
              <span className="text-white text-[11px] font-bold mr-auto">2:41</span>
              {[0, 1, 2].map((i) => <span key={i} className={`w-5 h-5 rounded-full ${i === 1 ? 'bg-[#F5B83D]' : 'bg-white/15'}`} />)}
              <span className="w-5 h-5 rounded-full bg-[#F5B83D] flex items-center justify-center"><span className="w-2 h-2 rounded-[2px] bg-neutral-900" /></span>
            </div>
          </div>
          <span className="text-[10px] font-bold bg-white border border-black/10 rounded-full px-2.5 py-1">Always on top, any app</span>
        </div>
      ),
    },
    {
      id: 'draw',
      num: '04',
      title: 'Draw and Highlight',
      shortTitle: 'Draw',
      circleColor: 'bg-emerald-100',
      badge: 'HANDY',
      desc: 'Circle what matters with a pen that fades by itself, so you never stop to erase. Every click gets a soft ring, so viewers always know where you clicked.',
      graphic: (
        <div className="w-full h-full bg-white rounded-xl border border-black/10 p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-2"><div className="h-3 w-2/5 rounded bg-neutral-200" /><div className="h-2 w-4/5 rounded bg-neutral-100" /><div className="h-2 w-3/5 rounded bg-neutral-100" /></div>
          <svg viewBox="0 0 200 80" className="w-full" fill="none">
            <motion.path d="M20 55c25-35 60-45 90-25s45 25 70-10" stroke="#111113" strokeWidth="9" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }} transition={{ repeat: Infinity, duration: 3.2, times: [0, 0.4, 1] }} />
            <motion.path d="M20 55c25-35 60-45 90-25s45 25 70-10" stroke="#FF453A" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }} transition={{ repeat: Infinity, duration: 3.2, times: [0, 0.4, 1] }} />
          </svg>
          <div className="flex items-center justify-between">
            <div className="relative w-14 h-8">
              <motion.span animate={{ scale: [0.3, 1.4], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} className="absolute left-3 top-0 w-8 h-8 rounded-full border border-black/10 bg-[#FFF3D6]/60" />
            </div>
            <span className="text-[10px] font-bold text-neutral-700">Pen: Alt + Shift + D</span>
          </div>
        </div>
      ),
    },
    {
      id: 'blur',
      num: '05',
      title: 'Blur Private Info',
      shortTitle: 'Blur',
      circleColor: 'bg-sky-100',
      badge: 'NEW',
      desc: 'Drag over an email, a balance or a client name and it turns to frosted glass. It stays blurred while you scroll, so nothing private ends up in your video.',
      graphic: (
        <div className="w-full h-full bg-white rounded-xl border border-black/10 p-4 flex flex-col gap-3 relative overflow-hidden">
          <div className="text-[11px] font-semibold text-neutral-800">Invoice #2041</div>
          {[['Client', 'Aminah Yusof'], ['Email', 'aminah@studio.my'], ['Amount', 'RM 4,850.00']].map(([k, v], i) => (
            <div key={k} className="flex items-center justify-between text-[11px] border-b border-black/5 pb-2">
              <span className="text-neutral-500">{k}</span>
              <span className="relative font-medium text-neutral-800">
                {v}
                {i > 0 && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ repeat: Infinity, duration: 4, times: [0, 0.2, 0.85, 1], delay: i * 0.4 }}
                    className="absolute -inset-1 rounded-md backdrop-blur-[5px] bg-white/30 ring-1 ring-[#F5B83D]/60" />
                )}
              </span>
            </div>
          ))}
          <span className="mt-auto self-start text-[10px] font-semibold text-[#A86F05] bg-[#FFF3D6] px-2 py-0.5 rounded-full">Drag to blur, Esc when done</span>
        </div>
      ),
    },
    {
      id: 'shot',
      num: '06',
      title: 'Beautiful Screenshots',
      shortTitle: 'Screenshot',
      circleColor: 'bg-amber-100',
      badge: 'NEW',
      desc: 'One click grabs the page. Add a soft background, padding, rounded corners and a shadow, then copy it straight into Slack, Docs or an email.',
      graphic: (
        <div className="w-full h-full rounded-xl border border-black/10 p-5 flex items-center justify-center relative overflow-hidden bg-[url('/hero-light.jpg')] bg-cover bg-center">
          <motion.div animate={{ scale: [0.96, 1, 1, 0.96] }} transition={{ repeat: Infinity, duration: 4 }} className="w-[78%] aspect-[16/10] rounded-xl overflow-hidden bg-white shadow-[0_18px_40px_rgba(17,17,19,0.22)]">
            <img src="/sites/pocketview-home.jpg" alt="" className="w-full h-full object-cover object-top" />
          </motion.div>
          <span className="absolute bottom-3 right-3 text-[10px] font-semibold bg-neutral-900 text-white px-2 py-1 rounded-md">Copied</span>
        </div>
      ),
    },
    {
      id: 'trim',
      num: '07',
      title: 'Trim and Cut',
      shortTitle: 'Trim',
      circleColor: 'bg-pink-100',
      badge: 'EASY',
      desc: 'Keep the good part, or cut a mistake out of the middle. Two handles, one button, a new copy saved. No editor to learn.',
      graphic: (
        <div className="w-full h-full bg-[#F6F6F7] rounded-xl border border-black/10 p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="grid grid-cols-2 bg-white border border-black/10 rounded-lg p-0.5 text-[10px] font-bold text-center w-fit">
            <span className="px-2.5 py-1">Keep part</span><span className="px-2.5 py-1 bg-neutral-900 text-[#F5B83D] rounded-md">Cut out part</span>
          </div>
          <div className="relative h-8 my-3">
            <div className="absolute inset-x-0 top-3 h-2.5 rounded-full bg-neutral-200" />
            <motion.div animate={{ left: ['38%', '42%', '38%'] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute top-3 h-2.5 right-[34%] rounded-full" style={{ background: 'repeating-linear-gradient(45deg,#FF453A 0 5px,#FFB3AC 5px 10px)' }} />
            <span className="absolute top-0.5 left-[37%] w-4 h-7 rounded-md bg-white border border-black/10" />
            <span className="absolute top-0.5 right-[33%] w-4 h-7 rounded-md bg-white border border-black/10" />
          </div>
          <div className="flex items-center justify-between text-[10px]"><span className="font-bold">Cut out 1:48 to 2:24</span><span className="bg-[#FFF3D6] border border-black/10 rounded-md px-2 py-0.5 font-bold">Save copy</span></div>
        </div>
      ),
    },
    {
      id: 'safe',
      num: '08',
      title: 'Never Lose a Take',
      shortTitle: 'Safe',
      circleColor: 'bg-amber-100',
      badge: 'PEACE OF MIND',
      desc: 'MinLoom saves your video every 2 seconds. If Chrome crashes or the laptop dies, open MinLoom and recover it in one click. It also warns you if your mic goes silent.',
      graphic: (
        <div className="w-full h-full bg-white rounded-xl border border-black/10 p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#A86F05] bg-[#FFF3D6] px-2 py-0.5 rounded-full">Autosave</span>
            <span className="text-[9px] text-neutral-500">every 2 s</span>
          </div>
          <div className="flex items-end gap-1 h-16 my-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.span key={i} initial={{ opacity: 0.2 }} animate={{ opacity: [0.2, 1, 1] }} transition={{ repeat: Infinity, duration: 3.2, delay: i * 0.18 }} className="flex-1 h-full rounded bg-neutral-900" />
            ))}
          </div>
          <div className="bg-[#F6F6F7] border border-black/10 rounded-xl p-2 flex items-center justify-between">
            <span className="text-[10px] font-bold text-neutral-800">Recording interrupted</span>
            <span className="text-[9px] font-bold bg-[#FFF3D6] border border-black/10 rounded px-1.5 py-0.5">Recover video</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-12 md:py-16 lg:py-24 bg-white border-b border-neutral-100 overflow-hidden relative">
      <style>{GOOGLE_FONTS_CSS}</style>
      {/* Left Running Camera Roll */}

      <div className="max-w-[1180px] 2xl:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-16 2xl:px-24">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7 space-y-4 text-left">
            <SectionBadge icon={Wand2} text="Features" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-neutral-900 leading-[1.1] tracking-tight">
              Full-featured.<br /><span className="ml-mark">Still minimal.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 space-y-6 text-left">
            <p className="text-base sm:text-lg text-neutral-500 font-normal leading-relaxed">
              Everything you need for tutorials, lessons and quick updates, without menus inside menus. Eight things MinLoom does better.
            </p>
            <div>
              <AnimatedInteractiveButton
                href="#get"
                text="Add to Chrome"
                icon={<span className="ml-2.5">→</span>}
                iconPosition="right"
                className="inline-flex items-center px-6 py-3.5 bg-neutral-950 hover:bg-[#FFF3D6] hover:text-neutral-900 text-white font-semibold text-sm rounded-full transition-all duration-300 shadow-md shadow-neutral-950/5 group"
              />
            </div>
          </div>
        </div>

        {/* 1. Desktop Accordion / Panel view (lg:flex hidden) */}
        <div className="hidden lg:flex gap-3.5 h-[480px] w-full items-stretch select-none">
          {services.map((service, idx) => {
            const isActive = activeIndex === idx;
            const firstLetter = service.title.charAt(0);
            const remainingTitle = service.title.slice(1);

            return (
              <div
                key={service.id}
                onClick={() => handleCardClick(idx)}
                className={`transition-all duration-700 ease-[0.16,1,0.3,1] relative overflow-hidden border rounded-2xl ${
                  isActive
                    ? 'flex-1 bg-neutral-50/40 border-neutral-300 shadow-sm p-8 flex gap-8 items-center cursor-default'
                    : 'w-[58px] bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50 flex flex-col justify-between items-center py-8 cursor-pointer'
                }`}
              >
                {isActive ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-12 gap-6 w-full h-full items-center"
                  >
                    <div className="col-span-6 flex flex-col justify-between h-full py-2">
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-sm font-bold text-neutral-400 font-mono">Feature {service.num}</span>
                          <span className="text-[9px] font-mono font-bold bg-amber-100 text-[#A86F05] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {service.badge}
                          </span>
                        </div>

                        <h3 className="text-4xl font-bold font-serif text-neutral-900 tracking-tight mb-5 relative leading-[1.05]">
                          {service.title}
                        </h3>

                        <p className="text-sm text-neutral-500 leading-relaxed font-normal max-w-md">
                          {service.desc}
                        </p>
                      </div>

                      <div>
                        <AnimatedInteractiveButton
                          href={INSTALL_HREF}
                          text="Try it free"
                          icon={<MoveRight className="w-4 h-4 ml-1.5" />}
                          iconPosition="right"
                          className="text-sm font-bold text-neutral-800 hover:text-[#A86F05] inline-flex items-center border-b border-neutral-800 hover:border-[#F5B83D] pb-0.5 transition-colors group"
                        />
                      </div>
                    </div>

                    <div className="col-span-6 h-full flex items-center justify-center">
                      <div className="w-full aspect-square max-h-[360px]">
                        {service.graphic}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <span className="text-xs font-bold text-neutral-400 font-mono tracking-wider">
                      {service.num}
                    </span>
                    <span className="text-sm font-bold text-neutral-700 [writing-mode:vertical-rl] rotate-180 tracking-wide font-sans">
                      {service.shortTitle}
                    </span>
                    <span className={`w-2.5 h-2.5 rounded-full ${service.circleColor} border border-neutral-300/40`} />
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* 2. Tablet Grid view (hidden md:grid lg:hidden) */}
        <div className="hidden md:grid lg:hidden grid-cols-1 gap-6">
          {services.map((service) => {
            const firstLetter = service.title.charAt(0);
            const remainingTitle = service.title.slice(1);

            return (
              <div
                key={`tab-${service.id}`}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex flex-col justify-between h-full flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-bold text-neutral-400 font-mono">Feature {service.num}</span>
                      <span className="text-[8px] font-mono font-bold bg-amber-100 text-[#A86F05] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold font-serif text-neutral-900 tracking-tight mb-3 leading-tight">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-normal">
                      {service.desc}
                    </p>
                  </div>

                  <div className="mt-6">
                    <AnimatedInteractiveButton
                      href={INSTALL_HREF}
                      text="Try it free"
                      icon={<MoveRight className="w-3.5 h-3.5 ml-1.5" />}
                      iconPosition="right"
                      className="text-xs sm:text-sm font-bold text-neutral-800 hover:text-[#A86F05] inline-flex items-center border-b border-neutral-800 hover:border-[#F5B83D] pb-0.5 transition-colors group"
                    />
                  </div>
                </div>

                <div className="w-[220px] aspect-square flex items-center justify-center shrink-0">
                  {service.graphic}
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Mobile Horizontal Slider view (flex md:hidden) */}
        <div className="flex md:hidden gap-5 overflow-x-auto snap-x snap-mandatory py-4 px-1 scrollbar-hide">
          {services.map((service) => {
            const firstLetter = service.title.charAt(0);
            const remainingTitle = service.title.slice(1);

            return (
              <div
                key={`mob-${service.id}`}
                className="w-[290px] shrink-0 snap-center bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex flex-col gap-5"
              >
                <div className="h-[180px] w-full flex items-center justify-center shrink-0">
                  {service.graphic}
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-neutral-400 font-mono">Feature {service.num}</span>
                      <span className="text-[8px] font-mono font-bold bg-amber-100 text-[#A86F05] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-neutral-900 tracking-tight mb-3 leading-tight">
                      {service.title}
                    </h3>

                    <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                      {service.desc}
                    </p>
                  </div>

                  <div className="mt-4">
                    <AnimatedInteractiveButton
                      href={INSTALL_HREF}
                      text="Try it free"
                      icon={<MoveRight className="w-3 h-3 ml-1.5" />}
                      iconPosition="right"
                      className="text-xs font-bold text-neutral-800 hover:text-[#A86F05] inline-flex items-center border-b border-neutral-800 hover:border-[#F5B83D] pb-0.5 transition-colors group"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
