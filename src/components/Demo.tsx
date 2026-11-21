import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Face, RADII } from './Faces';

// Set this once the extension is live on the Chrome Web Store.
export const CHROME_STORE_URL = '';
export const INSTALL_HREF = CHROME_STORE_URL || '#get';

export function Logo({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 font-serif ${dark ? 'text-white' : 'text-neutral-900'} ${className}`}>
      <img src="/icon-128.png" alt="" className="w-8 h-8 rounded-[10px]" />
      <span className="text-[22px] leading-none tracking-tight">
        minlo<span className="inline-block w-[0.42em] h-[0.42em] rounded-full bg-[#FF4B3E] border-[2.5px] border-neutral-900 mx-[0.03em] translate-y-[0.02em]" />m
      </span>
    </span>
  );
}

const SHAPES = [RADII.circle, RADII.squircle, RADII.rounded, RADII.blob];
const CORNERS = [
  { left: '4%', top: '58%' },
  { left: '75%', top: '58%' },
  { left: '75%', top: '14%' },
  { left: '4%', top: '58%' },
];

// Animated product demo: a browser page being recorded with MinLoom.
export function ProductDemo({ className = '' }: { className?: string }) {
  const [step, setStep] = useState(0);
  const [secs, setSecs] = useState(83);

  useEffect(() => {
    const a = setInterval(() => setStep((s) => (s + 1) % 4), 3200);
    const b = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);

  const mm = Math.floor(secs / 60);
  const ss = String(secs % 60).padStart(2, '0');

  return (
    <div className={`relative w-full aspect-[16/10] rounded-[22px] border-[3px] border-neutral-900 bg-white overflow-hidden shadow-[0_10px_0_#17140F] ${className}`}>
      {/* browser chrome */}
      <div className="h-[7%] min-h-[26px] bg-[#F3EEDF] border-b-[3px] border-neutral-900 flex items-center gap-2 px-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF4B3E] border border-neutral-900" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFC83D] border border-neutral-900" />
        <span className="w-2.5 h-2.5 rounded-full bg-white border border-neutral-900" />
        <span className="ml-3 flex-1 max-w-[46%] h-[60%] rounded-full bg-white border border-neutral-300 text-[10px] sm:text-xs text-neutral-500 flex items-center px-3 truncate">getpocketview.com</span>
        <span className="ml-auto flex items-center gap-1.5 bg-neutral-900 text-white text-[10px] sm:text-xs font-bold rounded-full pl-2 pr-2.5 py-0.5">
          <span className="w-2 h-2 rounded-full bg-[#FF4B3E] animate-pulse" /> REC
        </span>
      </div>

      {/* page body: a real website (getpocketview.com) */}
      <div className="absolute inset-x-0 bottom-0 top-[7%] overflow-hidden bg-white">
        <img src="/sites/pocketview-home.jpg" alt="getpocketview.com being recorded" className="w-full h-full object-cover object-top select-none" draggable={false} />
        {/* pen stroke around the call to action */}
        <AnimatePresence>
          {step % 2 === 1 && (
            <motion.svg key={step} viewBox="0 0 200 100" preserveAspectRatio="none" className="absolute left-[46%] top-[51%] w-[20%] h-[15%] pointer-events-none" fill="none"
              initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.8 } }}>
              <motion.ellipse cx="100" cy="50" rx="94" ry="42" stroke="#17140F" strokeWidth="9" strokeLinecap="round" vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: 'easeInOut' }} />
              <motion.ellipse cx="100" cy="50" rx="94" ry="42" stroke="#FF4B3E" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: 'easeInOut' }} />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>

      {/* click ripple */}
      <AnimatePresence>
        {step === 2 && (
          <motion.span key="ripple" className="absolute w-12 h-12 rounded-full border-[3px] border-neutral-900 bg-[#FFC83D]/50"
            style={{ left: '54%', top: '57%' }}
            initial={{ scale: 0.2, opacity: 1 }} animate={{ scale: 1.5, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }} />
        )}
      </AnimatePresence>

      {/* camera bubble */}
      <motion.div
        className="absolute w-[21%] aspect-square overflow-hidden border-[4px] border-neutral-900 bg-white shadow-[0_12px_30px_rgba(23,20,15,0.3)]"
        initial={false}
        animate={{ borderRadius: SHAPES[step], ...CORNERS[step] }}
        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
      >
        <Face name="aina" className="w-full h-full block" />
      </motion.div>

      {/* floating control pill */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[5%] bg-neutral-900 text-white rounded-full pl-3 pr-1.5 py-1.5 flex items-center gap-2 shadow-xl">
        <span className="w-2 h-2 rounded-full bg-[#FF4B3E] animate-pulse" />
        <span className="text-xs sm:text-sm font-bold tabular-nums w-9">{mm}:{ss}</span>
        <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center"><span className="w-1 h-2.5 bg-white rounded-sm mr-0.5" /><span className="w-1 h-2.5 bg-white rounded-sm" /></span>
        <span className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${step % 2 === 1 ? 'bg-[#FFC83D]' : 'bg-white/15'}`}>
          <svg viewBox="0 0 24 24" className={`w-3.5 h-3.5 ${step % 2 === 1 ? 'text-neutral-900' : 'text-white'}`} fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 20l4-1 11-11-3-3L5 16z" /></svg>
        </span>
        <span className="w-6 h-6 rounded-full bg-[#FFC83D] flex items-center justify-center"><span className="w-2.5 h-2.5 rounded-[3px] bg-neutral-900" /></span>
      </div>
    </div>
  );
}

// Screen mode demo: a whole desktop, with the floating MinLoom window carrying the camera.
export function DesktopDemo({ className = '' }: { className?: string }) {
  const [secs, setSecs] = useState(201);
  const [app, setApp] = useState(0);
  useEffect(() => {
    const a = setInterval(() => setSecs((s) => s + 1), 1000);
    const b = setInterval(() => setApp((x) => (x + 1) % 2), 3600);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);
  const mm = Math.floor(secs / 60);
  const ss = String(secs % 60).padStart(2, '0');
  return (
    <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-[#FFD98A] via-[#FFC83D] to-[#FF8A3D] ${className}`}>
      {/* menu bar */}
      <div className="absolute top-0 inset-x-0 h-[5%] bg-white/50 backdrop-blur flex items-center px-3 gap-3 text-[8px] sm:text-[10px] font-bold text-neutral-800">
        <span>●</span><span>Chrome</span><span className="font-medium">File</span><span className="font-medium">Edit</span>
        <span className="ml-auto flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#FF4B3E] animate-pulse" />MinLoom</span>
      </div>
      {/* real website windows */}
      <motion.div animate={{ zIndex: app === 0 ? 2 : 1, scale: app === 0 ? 1 : 0.97 }} className="absolute left-[4%] top-[10%] w-[60%] h-[66%] bg-white rounded-lg border-2 border-neutral-900 shadow-xl overflow-hidden">
        <div className="h-[8%] bg-[#F3EEDF] border-b border-neutral-300 flex items-center gap-1 px-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF4B3E]" /><span className="w-1.5 h-1.5 rounded-full bg-[#FFC83D]" /><span className="w-1.5 h-1.5 rounded-full bg-neutral-300" /><span className="ml-2 text-[7px] sm:text-[9px] text-neutral-500">getpocketview.com</span></div>
        <img src="/sites/pocketview-home.jpg" alt="" className="w-full h-[92%] object-cover object-top" draggable={false} />
      </motion.div>
      <motion.div animate={{ zIndex: app === 1 ? 2 : 1, scale: app === 1 ? 1 : 0.97 }} className="absolute left-[28%] top-[24%] w-[54%] h-[62%] bg-white rounded-lg border-2 border-neutral-900 shadow-xl overflow-hidden">
        <div className="h-[8%] bg-[#F3EEDF] border-b border-neutral-300 flex items-center gap-1 px-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF4B3E]" /><span className="w-1.5 h-1.5 rounded-full bg-[#FFC83D]" /><span className="w-1.5 h-1.5 rounded-full bg-neutral-300" /><span className="ml-2 text-[7px] sm:text-[9px] text-neutral-500">getpocketview.com/pro</span></div>
        <img src="/sites/pocketview-pro.jpg" alt="" className="w-full h-[92%] object-cover object-top" draggable={false} />
      </motion.div>
      {/* floating MinLoom window with camera */}
      <motion.div drag dragMomentum={false} className="absolute right-[4%] top-[12%] w-[23%] bg-neutral-900 rounded-xl p-[1.2%] shadow-2xl z-10 cursor-grab">
        <div className="text-[7px] sm:text-[9px] text-white/60 font-bold mb-1 px-0.5">MinLoom · always on top</div>
        <div className="aspect-square rounded-full overflow-hidden border-[3px] border-[#FFC83D] w-[88%] mx-auto"><Face name="ravi" className="w-full h-full block" /></div>
        <div className="mt-[6%] flex items-center gap-1 px-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B3E] animate-pulse" />
          <span className="text-white text-[8px] sm:text-[11px] font-bold mr-auto tabular-nums">{mm}:{ss}</span>
          <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white/15" />
          <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#FFC83D] flex items-center justify-center"><span className="w-1.5 h-1.5 rounded-[2px] bg-neutral-900" /></span>
        </div>
      </motion.div>
      {/* dock */}
      <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2 bg-white/50 backdrop-blur rounded-xl px-2 py-1 flex gap-1.5 border border-white/60">
        {['#34A853', '#5B4BC4', '#FF4B3E', '#17140F', '#3D6FB6'].map((c) => <span key={c} className="w-4 h-4 sm:w-6 sm:h-6 rounded-md" style={{ background: c }} />)}
      </div>
    </div>
  );
}
