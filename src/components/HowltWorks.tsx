import { Bubble } from './Faces';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Upload, ArrowRight, Play, Download, Workflow } from 'lucide-react';

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

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yTranslation = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const smoothY = useSpring(yTranslation, { stiffness: 55, damping: 18, mass: 0.8 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="how-it-works" ref={sectionRef} className="py-12 md:py-16 lg:py-24 bg-[#FFF8E7] border-b border-neutral-100 overflow-hidden relative">
      <style>{GOOGLE_FONTS_CSS}</style>
      {/* Left Running Camera Roll */}
      <SectionCameraRolls />

      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1180px] 2xl:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-16 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
          
          {/* Left Column: Heading, Subheading & Pill */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start space-y-6 pt-0 mt-0"
          >
            <SectionBadge icon={Workflow} text="How it works" />

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-neutral-900 leading-[1.15] tracking-tight max-w-md">
              From click to MP4 <span className="ml-mark">in four steps.</span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-500 font-normal leading-relaxed max-w-md">
              No account to make, no editor to learn. If you can click a button, you can record a video people will actually watch.
            </p>
          </motion.div>

          {/* Right Column: 4 Vertical cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            style={{ y: smoothY }}
            className="lg:col-span-7 space-y-6 pt-0 mt-0"
          >
            {/* Step 1 Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <span className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-neutral-200" />
              <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-neutral-200" />
              <span className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-neutral-200" />
              <span className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-neutral-200" />

              <div className="md:col-span-6 space-y-3 pr-2">
                <span className="block font-serif text-6xl sm:text-7xl font-extrabold select-none leading-none bg-gradient-to-b from-[#FFC83D] via-[#FFC83D]/80 to-[#FFC83D]/10 bg-clip-text text-transparent">01</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">Click MinLoom</h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-normal">
                  Open MinLoom from your toolbar, or press Alt + Shift + R from any page. Your camera and mic are ready in the same small panel.
                </p>
              </div>

              <div className="md:col-span-6 bg-neutral-50 border border-neutral-100 rounded-2xl p-5 aspect-[4/3] flex flex-col justify-center items-center relative overflow-hidden select-none">
                <div className="absolute top-4 left-4 flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FFC83D]/70" />
                  <span className="w-2 h-2 rounded-full bg-neutral-200" />
                </div>
                
                <div className="relative z-10 w-full max-w-[230px] bg-white border-2 border-neutral-900 rounded-2xl p-3 shadow-[0_5px_0_#17140F] text-left">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-serif text-[15px]">minlo<span className="inline-block w-[9px] h-[9px] rounded-full bg-[#FF4B3E] border-2 border-neutral-900 mx-[1px] translate-y-[1px]" />m</span>
                    <span className="w-4 h-1 rounded-full bg-neutral-200" />
                  </div>
                  <div className="grid grid-cols-3 gap-1 bg-[#F3EEDF] rounded-lg p-1 text-[10px] font-bold text-center mb-2.5">
                    <span className="bg-neutral-900 text-[#FFC83D] rounded-md py-1">Tab</span><span className="py-1">Window</span><span className="py-1">Screen</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-neutral-700 mb-1.5"><span>Microphone</span><span className="w-6 h-3.5 rounded-full bg-neutral-900 relative"><span className="absolute right-0.5 top-0.5 w-2.5 h-2.5 rounded-full bg-[#FFC83D]" /></span></div>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-neutral-700 mb-2.5"><span>Camera bubble</span><span className="w-6 h-3.5 rounded-full bg-neutral-900 relative"><span className="absolute right-0.5 top-0.5 w-2.5 h-2.5 rounded-full bg-[#FFC83D]" /></span></div>
                  <div className="w-full py-1.5 bg-[#FFC83D] border-2 border-neutral-900 rounded-lg text-[11px] font-bold text-center flex items-center justify-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FF4B3E] border border-neutral-900" />Start recording</div>
                </div>
              </div>
            </motion.div>

            {/* Step 2 Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <span className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-neutral-200" />
              <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-neutral-200" />
              <span className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-neutral-200" />
              <span className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-neutral-200" />

              <div className="md:col-span-6 space-y-3 pr-2">
                <span className="block font-serif text-6xl sm:text-7xl font-extrabold select-none leading-none bg-gradient-to-b from-[#FFC83D] via-[#FFC83D]/80 to-[#FFC83D]/10 bg-clip-text text-transparent">02</span>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">Pick what to share</h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-normal">
                  One tab with its sound, a single app window, or your whole screen. Then a 3 second countdown you can hold or cancel.
                </p>
              </div>

              <div className="md:col-span-6 bg-neutral-50 border border-neutral-100 rounded-2xl p-4 aspect-[4/3] flex flex-col justify-center relative overflow-hidden select-none">
                <div className="absolute top-4 left-4 flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-neutral-200" />
                  <span className="w-2 h-2 rounded-full bg-[#FFC83D]/70" />
                </div>

                <div className="grid grid-cols-3 gap-2.5 w-full">
                  {[
                    { t: 'Tab', d: 'With sound', on: true },
                    { t: 'Window', d: 'One app', on: false },
                    { t: 'Screen', d: 'Everything', on: false },
                  ].map((x) => (
                    <div key={x.t} className={`rounded-xl border-2 p-2.5 flex flex-col items-center gap-2 ${x.on ? 'border-neutral-900 bg-[#FFC83D] shadow-[0_4px_0_#17140F]' : 'border-neutral-200 bg-white'}`}>
                      <div className={`w-full aspect-[4/3] rounded-md border-2 ${x.on ? 'border-neutral-900 bg-white' : 'border-neutral-300 bg-neutral-50'} relative overflow-hidden`}>
                        <span className={`absolute top-0 left-0 right-0 h-1.5 ${x.on ? 'bg-neutral-900' : 'bg-neutral-300'}`} />
                        {x.t === 'Window' && <span className="absolute left-1.5 top-3 right-3 bottom-1.5 rounded-sm border-2 border-neutral-300" />}
                      </div>
                      <span className="text-[12px] font-bold text-neutral-900 leading-none">{x.t}</span>
                      <span className="text-[9px] text-neutral-600 leading-none">{x.d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Step 3 Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <span className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-neutral-200" />
              <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-neutral-200" />
              <span className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-neutral-200" />
              <span className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-neutral-200" />

              <div className="md:col-span-6 space-y-3 pr-2">
                <span className="block font-serif text-6xl sm:text-7xl font-extrabold select-none leading-none bg-gradient-to-b from-[#FFC83D] via-[#FFC83D]/80 to-[#FFC83D]/10 bg-clip-text text-transparent">03</span>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">Talk and show</h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-normal">
                  Your face sits in a soft bubble. Pause, draw or hide the camera any time. The buttons stay out of your video.
                </p>
              </div>

              <div className="md:col-span-6 bg-neutral-50 border border-neutral-100 rounded-2xl p-4 aspect-[4/3] flex flex-col justify-center relative overflow-hidden select-none">
                <div className="absolute top-4 left-4 flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-neutral-200" />
                  <span className="w-2 h-2 rounded-full bg-[#FFC83D]/70" />
                </div>

                <div className="relative border-2 border-neutral-900 bg-white rounded-xl overflow-hidden aspect-[4/3]">
                  <div className="h-4 bg-neutral-100 border-b border-neutral-200 flex items-center gap-1 px-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neutral-300" /><span className="w-1.5 h-1.5 rounded-full bg-neutral-300" /><span className="w-1.5 h-1.5 rounded-full bg-neutral-300" /></div>
                  <img src="/sites/pocketview-home.jpg" alt="" className="absolute inset-x-0 bottom-0 top-4 w-full h-[calc(100%-1rem)] object-cover object-top" draggable={false} />
                  <svg viewBox="0 0 120 40" className="absolute right-3 top-12 w-1/2" fill="none"><path d="M5 30c15-20 35-25 50-15s25 15 40-5" stroke="#17140F" strokeWidth="6" strokeLinecap="round" /><path d="M5 30c15-20 35-25 50-15s25 15 40-5" stroke="#FF4B3E" strokeWidth="3" strokeLinecap="round" /></svg>
                  <div className="absolute left-2.5 bottom-2.5"><Bubble name="ravi" size={64} ring={4} /></div>
                  <div className="absolute right-2.5 bottom-3 bg-neutral-900 text-white rounded-full pl-2 pr-1 py-1 flex items-center gap-1.5 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B3E] animate-pulse" />1:24
                    <span className="w-4 h-4 rounded-full bg-[#FFC83D] flex items-center justify-center"><span className="w-1.5 h-1.5 bg-neutral-900 rounded-[1px]" /></span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 4 Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <span className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-neutral-200" />
              <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-neutral-200" />
              <span className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-neutral-200" />
              <span className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-neutral-200" />

              <div className="md:col-span-6 space-y-3 pr-2">
                <span className="block font-serif text-6xl sm:text-7xl font-extrabold select-none leading-none bg-gradient-to-b from-[#FFC83D] via-[#FFC83D]/80 to-[#FFC83D]/10 bg-clip-text text-transparent">04</span>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">Download MP4</h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-normal">
                  Stop, trim if you like, and download an MP4 that plays in WhatsApp, QuickTime, Windows and every editor.
                </p>
              </div>

              <div className="md:col-span-6 bg-neutral-50 border border-neutral-100 rounded-2xl p-4 aspect-[4/3] flex flex-col justify-center relative overflow-hidden select-none">
                <div className="absolute top-4 left-4 flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-neutral-200" />
                  <span className="w-2 h-2 rounded-full bg-[#FFC83D]/70" />
                </div>

                <div className="relative border-2 border-neutral-900 bg-white rounded-xl overflow-hidden p-3 flex flex-col gap-2.5">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-[#BFD7F2] border border-neutral-200">
                    <div className="absolute inset-2.5 space-y-1.5"><div className="h-2 w-2/5 rounded bg-white/80" /><div className="flex items-end gap-1 h-10 pt-2">{[40,65,50,90,70].map((h,i)=>(<span key={i} className={`flex-1 rounded-t ${i===3?'bg-[#FFC83D]':'bg-white/80'}`} style={{height:`${h}%`}} />))}</div></div>
                    <div className="absolute right-2 bottom-2"><Bubble name="aina" size={38} ring={3} /></div>
                    <span className="absolute top-2 right-2 bg-neutral-900 text-[#FFC83D] text-[9px] font-bold px-1.5 py-0.5 rounded">MP4</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]"><span className="font-bold text-neutral-900">Q4 walkthrough.mp4</span><span className="text-neutral-500">4:18 &middot; 38 MB</span></div>
                  <button className="w-full py-1.5 bg-[#FFC83D] border-2 border-neutral-900 text-neutral-900 text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5">
                    <Download className="w-3 h-3" /> Download MP4
                  </button>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
