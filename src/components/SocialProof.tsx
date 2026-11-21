import React from 'react';
import { motion } from 'framer-motion';

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

// Left Laurel Wreath SVG Icon
const LaurelLeft = () => (
  <svg viewBox="0 0 120 200" className="w-24 h-40 lg:w-28 lg:h-48 text-neutral-200" fill="currentColor">
    <path d="M100 180 C 70 150, 45 100, 50 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M50 20 C 45 28, 48 35, 54 30 C 60 25, 55 18, 50 20 Z" />
    <path d="M53 40 C 42 45, 40 55, 49 53 C 58 51, 58 42, 53 40 Z" />
    <path d="M63 45 C 72 40, 75 30, 66 32 C 58 34, 58 42, 63 45 Z" />
    <path d="M50 65 C 38 68, 35 78, 44 78 C 53 78, 55 68, 50 65 Z" />
    <path d="M66 70 C 76 68, 80 58, 71 58 C 62 58, 61 68, 66 70 Z" />
    <path d="M49 95 C 36 96, 31 106, 40 108 C 49 110, 52 100, 49 95 Z" />
    <path d="M70 98 C 81 98, 87 88, 78 86 C 69 84, 66 94, 70 98 Z" />
    <path d="M49 125 C 36 125, 29 135, 38 139 C 47 143, 51 133, 49 125 Z" />
    <path d="M75 128 C 86 128, 93 118, 84 116 C 75 114, 71 124, 75 128 Z" />
    <path d="M53 155 C 40 154, 33 164, 42 169 C 51 174, 55 164, 53 155 Z" />
    <path d="M82 158 C 93 158, 100 148, 91 146 C 82 144, 78 154, 82 158 Z" />
  </svg>
);

// Right Laurel Wreath SVG Icon
const LaurelRight = () => (
  <svg viewBox="0 0 120 200" className="w-24 h-40 lg:w-28 lg:h-48 text-neutral-200" fill="currentColor">
    <path d="M20 180 C 50 150, 75 100, 70 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M70 20 C 75 28, 72 35, 66 30 C 60 25, 65 18, 70 20 Z" />
    <path d="M67 40 C 78 45, 80 55, 71 53 C 62 51, 62 42, 67 40 Z" />
    <path d="M57 45 C 48 40, 45 30, 54 32 C 62 34, 62 42, 57 45 Z" />
    <path d="M70 65 C 82 68, 85 78, 76 78 C 67 78, 65 68, 70 65 Z" />
    <path d="M54 70 C 44 68, 40 58, 49 58 C 58 58, 59 68, 54 70 Z" />
    <path d="M71 95 C 84 96, 89 106, 80 108 C 71 110, 68 100, 71 95 Z" />
    <path d="M50 98 C 39 98, 33 88, 42 86 C 51 84, 54 94, 50 98 Z" />
    <path d="M71 125 C 84 125, 91 135, 82 139 C 73 143, 69 133, 71 125 Z" />
    <path d="M45 128 C 34 128, 27 118, 36 116 C 45 114, 49 124, 45 128 Z" />
    <path d="M67 155 C 80 154, 87 164, 78 169 C 69 174, 65 164, 67 155 Z" />
    <path d="M38 158 C 27 158, 20 148, 29 146 C 38 144, 42 154, 38 158 Z" />
  </svg>
);

const EpicuriousLogo = () => (
  <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-800 h-full select-none shrink-0">
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[55%] sm:h-[65%] w-auto">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
    <span className="font-sans font-extrabold text-xs sm:text-sm md:text-base tracking-tight leading-none">epicurious</span>
  </div>
);

const BoltshiftLogo = () => (
  <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-800 h-full select-none shrink-0">
    <div className="h-[50%] sm:h-[60%] aspect-square rounded-full bg-neutral-800 flex items-center justify-center text-white shrink-0">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[60%] h-[60%]">
        <path d="M19 9h-4V3H9v11h4v7z" />
      </svg>
    </div>
    <span className="font-sans font-extrabold text-xs sm:text-sm md:text-base tracking-tight leading-none">Boltshift</span>
  </div>
);

const SegmentLogo = () => (
  <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-800 h-full select-none shrink-0">
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[55%] sm:h-[65%] w-auto text-neutral-800">
      <path d="M19.4 15a1.6 1.6 0 0 1-1.4-2.3l1.8-3.1a6.4 6.4 0 0 0-4.6-3.8l.5-3.5a10 10 0 0 1 7.2 6l-3.5 6.7zm-14.8 0a1.6 1.6 0 0 0 1.4-2.3L4.2 9.6a6.4 6.4 0 0 1 4.6-3.8l-.5-3.5a10 10 0 0 0-7.2 6l3.5 6.7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
    <span className="font-sans font-extrabold text-xs sm:text-sm md:text-base tracking-tight leading-none">Segment</span>
  </div>
);

const AcmeLogo = () => (
  <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-800 h-full select-none shrink-0">
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[55%] sm:h-[65%] w-auto">
      <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
    </svg>
    <span className="font-sans font-extrabold text-xs sm:text-sm md:text-base tracking-tight leading-none">Acme Corp</span>
  </div>
);

const CapsuleLogo = () => (
  <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-800 h-full select-none shrink-0">
    <div className="flex -space-x-1 sm:-space-x-1.5 h-[45%] sm:h-[55%] aspect-video items-center">
      <div className="w-[55%] h-[55%] rounded-full border border-neutral-800 bg-[#FFF8E7] shrink-0" />
      <div className="w-[55%] h-[55%] rounded-full bg-neutral-800 shrink-0" />
    </div>
    <span className="font-sans font-extrabold text-xs sm:text-sm md:text-base tracking-tight leading-none">Capsule</span>
  </div>
);

const SisyphusLogo = () => (
  <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-800 h-full select-none shrink-0">
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[55%] sm:h-[65%] w-auto">
      <path d="M12 22C17.52 22 22 17.52 22 12S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm0-18c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z" />
      <path d="M12 7l3 3h-2v4h-2v-4H9l3-3z" />
    </svg>
    <span className="font-sans font-extrabold text-xs sm:text-sm md:text-base tracking-tight leading-none">Sisyphus</span>
  </div>
);

const FeatherLogo = () => (
  <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-800 h-full select-none shrink-0">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-[50%] sm:h-[60%] w-auto text-neutral-800">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
    </svg>
    <span className="font-sans font-extrabold text-xs sm:text-sm md:text-base tracking-tight leading-none">FeatherDev</span>
  </div>
);

const LuminousLogo = () => (
  <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-800 h-full select-none shrink-0">
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[55%] sm:h-[65%] w-auto">
      <path d="M12 6v-4c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1zm0 12v4c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1zm8-7h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1zM2 12h4c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm14.24-6.83l2.83-2.83c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0l-2.83 2.83c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0zM4.93 17.66l2.83-2.83c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0l-2.83 2.83c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0zm14.14 0l-2.83-2.83c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l2.83 2.83c.39.39 1.02.39 1.41 0zM4.93 6.34l2.83 2.83c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41L6.34 4.93c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41z" />
    </svg>
    <span className="font-sans font-extrabold text-xs sm:text-sm md:text-base tracking-tight leading-none">Luminous</span>
  </div>
);

export default function SocialProof() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const promises = [
    'No watermark',
    'No account',
    'No time limit',
    'Saved every 2 seconds',
    'MP4 that plays everywhere',
    'Camera bubble',
    'Clean recordings',
    'Works without a webcam',
  ];
  const logos = promises.map((t) => (
    <span key={t} className="inline-flex items-center gap-2.5 text-[15px] sm:text-lg font-bold text-neutral-900 whitespace-nowrap">
      <span className="w-6 h-6 rounded-full bg-[#FFC83D] border-2 border-neutral-900 inline-flex items-center justify-center text-[12px]">&#10003;</span>
      {t}
    </span>
  ));

  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-16 bg-white border-b border-neutral-100 overflow-hidden relative">
      <style>{GOOGLE_FONTS_CSS}</style>
      {/* Left Running Camera Roll */}
      <SectionCameraRolls />

      <style>{`
        @keyframes marquee-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.33333%, 0, 0);
          }
        }
        .animate-marquee-slow {
          animation: marquee-scroll 32s linear infinite;
        }
        .animate-marquee-slow:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-[1180px] 2xl:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-16 2xl:px-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center"
        >
          {/* Top layout wrapper with Laurels */}
          <div className="relative w-full flex items-center justify-center py-4 mb-10 sm:mb-14">
            <div className="absolute left-0 lg:left-8 xl:left-16 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none hidden md:block select-none">
              <LaurelLeft />
            </div>

            <div className="text-center max-w-xl z-10 flex flex-col items-center px-4">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-neutral-700 mb-4 select-none bg-white border border-neutral-200 rounded-full px-3.5 py-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-[#FF4B3E] animate-pulse" />
                Built from the reviews of 12 popular screen recorders
              </motion.div>

              <motion.h3
                variants={itemVariants}
                className="text-3xl sm:text-4xl font-serif text-neutral-900 mb-3"
              >
                Everything people hate about screen recorders. <span className="ml-mark">Fixed.</span>
              </motion.h3>

              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed mb-5"
              >
                Lost videos, watermarks, sign-up walls and files that will not play. MinLoom has none of that.
              </motion.p>

              <motion.a
                variants={itemVariants}
                href="#how-it-works"
                className="text-base font-semibold text-neutral-800 hover:text-[#E5382C] flex items-center gap-1.5 transition-colors group cursor-pointer"
              >
                See how it works
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </motion.a>
            </div>

            <div className="absolute right-0 lg:right-8 xl:right-16 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none hidden md:block select-none">
              <LaurelRight />
            </div>
          </div>

          <motion.div variants={itemVariants} className="w-full text-center mt-0">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-1">
              What you get, free
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full relative overflow-hidden py-1"
          >
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex w-max items-center animate-marquee-slow">
              {duplicatedLogos.map((LogoComp, idx) => (
                <div
                  key={idx}
                  className="h-9 sm:h-10 md:h-12 opacity-90 hover:opacity-100 transition-opacity flex items-center justify-center shrink-0 mx-[18px] sm:mx-[24px] md:mx-[32px]"
                >
                  {LogoComp}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
