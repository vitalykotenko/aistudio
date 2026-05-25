import { motion } from 'motion/react';

export function Trident({ className = "w-16 h-18 text-[#171717]" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 320 380"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* High-fidelity vector recreation of the Coat of Arms of Ukraine (Trident) */}
      <g stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Central column */}
        <path d="M160 30 V290" strokeWidth="14" />
        <path d="M160 290 C160 315, 145 330, 115 330 H100 M160 290 C160 315, 175 330, 205 330 H220" strokeWidth="12" />
        <path d="M160 180 L140 130 M160 180 L180 130" strokeWidth="12" />
        <circle cx="160" cy="30" r="4" fill="currentColor" />

        {/* Left wing curve */}
        <path d="M100 80 C100 180, 85 240, 120 280 C135 295, 145 295, 160 290" strokeWidth="12" />
        <path d="M100 80 L80 110 C70 125, 70 150, 85 230 C90 250, 100 270, 120 280" strokeWidth="10" />
        <path d="M80 110 C60 130, 50 160, 50 200 C50 240, 60 260, 90 275" strokeWidth="8" />
        
        {/* Right wing curve */}
        <path d="M220 80 C220 180, 235 240, 200 280 C185 295, 175 295, 160 290" strokeWidth="12" />
        <path d="M220 80 L240 110 C250 125, 250 150, 235 230 C230 250, 220 270, 200 280" strokeWidth="10" />
        <path d="M240 110 C260 130, 270 160, 270 200 C270 240, 260 260, 230 275" strokeWidth="8" />

        {/* Top diamond/points left & right */}
        <path d="M100 80 L115 130 M220 80 L205 130" strokeWidth="10" />
        <path d="M100 80 L100 50 L115 50 L115 130" strokeWidth="10" />
        <path d="M220 80 L220 50 L205 50 L205 130" strokeWidth="10" />
      </g>
    </motion.svg>
  );
}
