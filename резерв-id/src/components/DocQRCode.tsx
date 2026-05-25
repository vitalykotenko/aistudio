import { motion } from 'motion/react';

interface DocQRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export function DocQRCode({ value, className = "" }: DocQRCodeProps) {
  // Generate a mock deterministic grid representing a high-fidelity QR code based on the value string
  const generateGrid = (str: string) => {
    const size = 25; // 25x25 grid for a sharp QR representation
    const grid: boolean[][] = [];
    
    // Simple hash function to generate deterministic pseudo-random blocks
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    for (let r = 0; r < size; r++) {
      const row: boolean[] = [];
      for (let c = 0; c < size; c++) {
        // Standard QR code finder patterns in 3 corners
        const isFinderTopLeft = r < 7 && c < 7;
        const isFinderTopRight = r < 7 && c >= size - 7;
        const isFinderBottomLeft = r >= size - 7 && c < 7;
        
        if (isFinderTopLeft) {
          // Inner/outer finder design
          const edge = r === 0 || r === 6 || c === 0 || c === 6;
          const center = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          row.push(edge || center);
        } else if (isFinderTopRight) {
          const edge = r === 0 || r === 6 || c === size - 1 || c === size - 7;
          const center = r >= 2 && r <= 4 && c >= size - 5 && c <= size - 3;
          row.push(edge || center);
        } else if (isFinderBottomLeft) {
          const edge = r === size - 1 || r === size - 7 || c === 0 || c === 6;
          const center = r >= size - 5 && r <= size - 3 && c >= 2 && c <= 4;
          row.push(edge || center);
        } else {
          // Deterministic QR noise filled based on hash
          const val = Math.abs(Math.sin(hash + (r * 13) + (c * 37)));
          row.push(val > 0.45);
        }
      }
      grid.push(row);
    }
    return grid;
  };

  const qrGrid = generateGrid(value || "RESERVE-ID-VERIFIED-DATA");

  return (
    <div className={`relative bg-white p-3 rounded-2xl flex items-center justify-center ${className} shadow-sm border border-neutral-200/50`}>
      <div className="grid grid-cols-25 gap-[1px] w-full aspect-square">
        {qrGrid.map((row, rIdx) =>
          row.map((active, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              className={`aspect-square rounded-[1px] transition-colors duration-300 ${
                active ? 'bg-neutral-900' : 'bg-transparent'
              }`}
            />
          ))
        )}
      </div>

      {/* Decorative center logo to look premium */}
      <div className="absolute w-[22%] h-[22%] bg-white rounded-lg shadow-md border border-neutral-100 flex items-center justify-center p-1 overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#FD890A]" fill="currentColor">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" fill="none" />
          <path d="M35 50 L45 60 L65 40" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>

      {/* Futuristic animated scanning beam */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FD890A] to-transparent shadow-[0_0_8px_#FD890A]"
        initial={{ top: '5%' }}
        animate={{ top: '95%' }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 3,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
