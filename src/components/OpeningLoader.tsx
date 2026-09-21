import { AnimatePresence, motion } from 'motion/react';

type OpeningLoaderProps = {
  visible: boolean;
};

type ButterflyConfig = {
  id: number;
  top: string;
  left?: string;
  right?: string;
  size: number;
  delay: number;
  x: number[];
  y: number[];
  rotate: number[];
};

const butterflies: ButterflyConfig[] = [
  { id: 1, top: '14%', left: '18%', size: 34, delay: 0.0, x: [0, 16, 0], y: [0, -14, 0], rotate: [-8, 8, -8] },
  { id: 2, top: '21%', left: '31%', size: 24, delay: 0.12, x: [0, -12, 0], y: [0, 10, 0], rotate: [8, -10, 8] },
  { id: 3, top: '17%', right: '20%', size: 32, delay: 0.2, x: [0, -16, 0], y: [0, -12, 0], rotate: [10, -8, 10] },
  { id: 4, top: '31%', left: '11%', size: 22, delay: 0.28, x: [0, 10, 0], y: [0, -14, 0], rotate: [-10, 12, -10] },
  { id: 5, top: '33%', right: '13%', size: 30, delay: 0.36, x: [0, -14, 0], y: [0, 12, 0], rotate: [10, -12, 10] },
  { id: 6, top: '40%', left: '18%', size: 28, delay: 0.44, x: [0, 14, 0], y: [0, -16, 0], rotate: [-12, 10, -12] },
  { id: 7, top: '42%', right: '20%', size: 22, delay: 0.52, x: [0, -10, 0], y: [0, -10, 0], rotate: [8, -10, 8] },
  { id: 8, top: '56%', left: '13%', size: 30, delay: 0.6, x: [0, 12, 0], y: [0, 12, 0], rotate: [-8, 8, -8] },
  { id: 9, top: '58%', left: '30%', size: 22, delay: 0.68, x: [0, 10, 0], y: [0, -10, 0], rotate: [10, -8, 10] },
  { id: 10, top: '56%', right: '14%', size: 36, delay: 0.76, x: [0, -18, 0], y: [0, 14, 0], rotate: [12, -10, 12] },
  { id: 11, top: '71%', left: '22%', size: 28, delay: 0.84, x: [0, 14, 0], y: [0, -10, 0], rotate: [-8, 10, -8] },
  { id: 12, top: '68%', right: '24%', size: 24, delay: 0.92, x: [0, -10, 0], y: [0, 10, 0], rotate: [8, -10, 8] },
];

const ButterflySvg = ({ size = 36 }: { size?: number }) => {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      aria-hidden="true"
      className="butterfly-svg"
    >
      <defs>
        <linearGradient id="wingGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe9a8" />
          <stop offset="35%" stopColor="#d9a441" />
          <stop offset="70%" stopColor="#b8621e" />
          <stop offset="100%" stopColor="#7c0014" />
        </linearGradient>
        <linearGradient id="wingRose" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f2b45c" />
          <stop offset="45%" stopColor="#7c0014" />
          <stop offset="100%" stopColor="#4a0d16" />
        </linearGradient>
        <linearGradient id="bodyTone" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f5d98a" />
          <stop offset="35%" stopColor="#b88a44" />
          <stop offset="100%" stopColor="#4a0d16" />
        </linearGradient>
      </defs>

      <g>
        <path
          d="M57 52C41 42 26 28 19 12C37 10 52 18 61 36C64 44 63 49 57 52Z"
          fill="url(#wingGold)"
          stroke="rgba(124,0,20,0.4)"
          strokeWidth="1.5"
        />
        <path
          d="M63 52C79 42 94 28 101 12C83 10 68 18 59 36C56 44 57 49 63 52Z"
          fill="url(#wingGold)"
          stroke="rgba(124,0,20,0.4)"
          strokeWidth="1.5"
        />
        <path
          d="M57 61C45 63 34 75 31 93C44 92 54 84 58 72C59 67 59 63 57 61Z"
          fill="url(#wingRose)"
          stroke="rgba(74,13,22,0.4)"
          strokeWidth="1.2"
        />
        <path
          d="M63 61C75 63 86 75 89 93C76 92 66 84 62 72C61 67 61 63 63 61Z"
          fill="url(#wingRose)"
          stroke="rgba(74,13,22,0.4)"
          strokeWidth="1.2"
        />

        <path d="M59 28C60 20 61 15 64 10" stroke="#4a0d16" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M61 28C62 20 66 15 72 11" stroke="#4a0d16" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M61 28C60 20 56 15 48 11" stroke="#4a0d16" strokeWidth="1.6" strokeLinecap="round" />

        <rect x="56" y="28" width="8" height="40" rx="5" fill="url(#bodyTone)" />
        <ellipse cx="60" cy="72" rx="5" ry="10" fill="#4a0d16" />
        <circle cx="60" cy="25" r="5.5" fill="#b8621e" />

        <circle cx="45" cy="27" r="4" fill="rgba(184,138,68,0.4)" />
        <circle cx="75" cy="27" r="4" fill="rgba(184,138,68,0.4)" />
        <circle cx="46" cy="77" r="3" fill="rgba(124,0,20,0.3)" />
        <circle cx="74" cy="77" r="3" fill="rgba(124,0,20,0.3)" />
      </g>
    </svg>
  );
};

export const OpeningLoader = ({ visible }: OpeningLoaderProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeOut' } }}
          className="fixed inset-0 z-120 flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-brand-sand" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 35%, rgba(184,138,68,0.16), transparent 55%), radial-gradient(circle at 15% 80%, rgba(124,0,20,0.12), transparent 45%)',
            }}
          />
          <div className="butterfly-screen-aura absolute inset-0" />
          <div className="butterfly-vignette absolute inset-0" />

          {butterflies.map((butterfly) => (
            <motion.div
              key={butterfly.id}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.45, 1, 0.45],
                x: butterfly.x,
                y: butterfly.y,
                rotate: butterfly.rotate
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: butterfly.delay
              }}
              className="butterfly-cluster"
              style={{
                top: butterfly.top,
                left: butterfly.left,
                right: butterfly.right
              }}
            >
              <motion.div
                animate={{ scaleY: [1, 0.86, 1], scaleX: [1, 1.04, 1] }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: butterfly.delay
                }}
                className="butterfly-flutter"
              >
                <ButterflySvg size={butterfly.size} />
              </motion.div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative z-10 px-6"
          >
            <img
              src="/gallery/mglogo.png"
              alt="Mangalgatha"
              className="h-28 md:h-36 w-auto object-contain mx-auto drop-shadow-[0_12px_34px_rgba(124,0,20,0.22)]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
