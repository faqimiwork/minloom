import React from 'react';

// Illustrated people for MinLoom (no stock photos, no real people).
// Each fills its box; place inside a rounded/clipped container.
export type FaceName = 'aina' | 'ravi' | 'mei' | 'leo' | 'sara';


export function Face({ name = 'aina', className = '' }: { name?: FaceName; bg?: string; className?: string }) {
  // Photorealistic fictional people generated for MinLoom (not real persons).
  return <img src={`/people/${name}.jpg`} alt="" loading="lazy" draggable={false} className={`object-cover scale-[1.18] origin-[50%_36%] ${className}`} />;
}

// The MinLoom camera bubble: a face inside a soft shape with an ink ring.
export function Bubble({ name = 'aina', size = 120, shape = '50%', className = '', ring = 6 }: { name?: FaceName; size?: number | string; shape?: string; className?: string; ring?: number }) {
  return (
    <div
      className={`overflow-hidden bg-neutral-800 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_10px_30px_rgba(0,0,0,0.22)] ${className}`}
      style={{ width: size, height: size, borderRadius: shape, border: `${Math.max(2, Math.round(ring * 0.6))}px solid #FFFFFF` }}
    >
      <Face name={name} className="w-full h-full block" />
    </div>
  );
}

export const RADII = { circle: '50%', squircle: '38%', rounded: '22%', blob: '58% 42% 52% 48% / 46% 56% 44% 54%' };

// Small "what they record" scenes for the use-case cards.
export type SceneKind = 'teacher' | 'freelancer' | 'support' | 'creator' | 'team' | 'student';
export function Scene({ kind, face }: { kind: SceneKind; face: FaceName }) {
  const body: Record<SceneKind, React.ReactNode> = {
    teacher: (
      <div className="absolute inset-[10%] rounded-lg bg-[#2F4A3A] border border-black/10 p-[8%] text-[#F6F6F7] font-serif">
        <div className="text-[clamp(14px,2.2vw,26px)] leading-tight">3x + 5 = 20</div>
        <div className="text-[clamp(12px,1.8vw,22px)] mt-2 opacity-80">x = 5 ✓</div>
        <svg viewBox="0 0 100 30" className="w-2/3 mt-3" fill="none"><path d="M3 22c20-18 40-18 94-8" stroke="#F5B83D" strokeWidth="4" strokeLinecap="round" /></svg>
      </div>
    ),
    freelancer: (
      <div className="absolute inset-[10%] rounded-lg bg-white border border-black/10 p-[6%]">
        <div className="h-[22%] rounded bg-[#5B4BC4]" />
        <div className="mt-[6%] grid grid-cols-3 gap-[5%]">{[0, 1, 2].map((i) => <div key={i} className={`aspect-square rounded ${i === 1 ? 'bg-[#FFF3D6] ring-2 ring-neutral-900' : 'bg-neutral-100'}`} />)}</div>
        <div className="mt-[6%] text-[clamp(9px,1vw,12px)] font-bold text-neutral-800">Homepage v3: feedback walkthrough</div>
      </div>
    ),
    support: (
      <div className="absolute inset-[10%] rounded-lg bg-white border border-black/10 p-[6%] space-y-[5%]">
        <div className="text-[clamp(9px,1vw,12px)] font-bold">Ticket #4182: Can't export invoice</div>
        <div className="h-2 rounded bg-neutral-100 w-4/5" /><div className="h-2 rounded bg-neutral-100 w-3/5" />
        <div className="inline-flex items-center gap-1 bg-[#E8F4EA] border border-black/10 rounded-full px-2 py-0.5 text-[clamp(8px,0.9vw,11px)] font-bold">▶ Here is how, 0:48</div>
      </div>
    ),
    creator: (
      <div className="absolute inset-[10%] rounded-lg bg-neutral-900 border border-black/10 p-[6%] text-white">
        <div className="text-[clamp(10px,1.2vw,15px)] font-bold">Lesson 4: Color grading</div>
        <div className="mt-[8%] h-[30%] rounded" style={{ background: 'linear-gradient(90deg,#3D6FB6,#F5B83D,#FF453A)' }} />
        <div className="mt-[8%] h-1.5 rounded-full bg-white/20"><div className="h-full w-2/3 rounded-full bg-[#FFF3D6]" /></div>
      </div>
    ),
    team: (
      <div className="absolute inset-[10%] rounded-lg bg-white border border-black/10 p-[6%] flex items-end gap-[5%]">
        {[40, 62, 55, 80, 72].map((h, i) => <div key={i} className={`flex-1 rounded-t ${i === 3 ? 'bg-[#FF453A]' : 'bg-neutral-900'}`} style={{ height: `${h}%` }} />)}
      </div>
    ),
    student: (
      <div className="absolute inset-[10%] rounded-lg bg-[#F6F6F7] border border-black/10 p-[6%]">
        <div className="text-[clamp(10px,1.2vw,15px)] font-serif">Final project demo</div>
        <div className="mt-[6%] space-y-1.5">{[90, 70, 80, 50].map((w, i) => <div key={i} className="h-2 rounded bg-neutral-200" style={{ width: `${w}%` }} />)}</div>
        <div className="mt-[8%] inline-block bg-[#FFF3D6] border border-black/10 rounded px-1.5 text-[clamp(8px,0.9vw,11px)] font-bold">Due Friday</div>
      </div>
    ),
  };
  return (
    <div className="absolute inset-0">
      {body[kind]}
      <div className="absolute right-[5%] bottom-[5%] w-[34%] aspect-square rounded-full overflow-hidden border border-black/10 bg-white shadow-lg">
        <Face name={face} className="w-full h-full block" />
      </div>
    </div>
  );
}
