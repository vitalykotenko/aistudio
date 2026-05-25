import { motion } from 'motion/react';
import { Trident } from './Trident';
import { DocumentData } from '../types';
import { QrCode, Shield, Calendar, RefreshCcw, CheckCircle2 } from 'lucide-react';

interface DocumentCardProps {
  data: DocumentData;
  onShowQr: () => void;
}

export function DocumentCard({ data, onShowQr }: DocumentCardProps) {
  // Determine card header icon/photo.
  // If a photoUrl exists, we render a professional clipping of the photo.
  // Otherwise, we load the gorgeous Vector Trident (Tryzub).
  const hasPhoto = !!data.photoUrl;

  // Determine status display styles
  const getStatusStyles = (code: string) => {
    switch (code) {
      case 'RESERVED':
        return {
          textColor: 'text-emerald-800',
          borderColor: 'border-emerald-600/40',
          bgColor: 'bg-emerald-50',
          dotColor: 'bg-emerald-500'
        };
      case 'EXEMPT':
        return {
          textColor: 'text-neutral-600',
          borderColor: 'border-neutral-400/30',
          bgColor: 'bg-neutral-100',
          dotColor: 'bg-neutral-500'
        };
      case 'CRITICAL':
        return {
          textColor: 'text-rose-700 font-semibold',
          borderColor: 'border-rose-500/30',
          bgColor: 'bg-rose-50',
          dotColor: 'bg-rose-500 animate-pulse'
        };
      case 'MILITARY_LIABLE':
      default:
        return {
          textColor: 'text-[#171717]',
          borderColor: 'border-[#959485]/50',
          bgColor: 'bg-transparent',
          dotColor: 'bg-[#FD890A]'
        };
    }
  };

  const statusStyle = getStatusStyles(data.statusCode);

  return (
    <motion.div 
      id="document-main-card"
      className="w-full max-w-[420px] aspect-[9/16] bg-[#D5D3BE] border border-[#959485] rounded-[18px] shadow-[0_4px_12px_rgba(0,0,0,0.08),_0_2px_4px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col justify-between relative cursor-pointer"
      whileTap={{ scale: 0.985 }}
      onClick={onShowQr}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Upper Content Box */}
      <div className="p-6 pb-2 space-y-6 flex-1 flex flex-col justify-between">
        
        {/* Header Block: Title & Trident/Avatar */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <h3 className="text-[26.4px] font-bold text-[#171717] font-sans antialiased tracking-tight leading-tight">
              Резерв ID
            </h3>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/5 text-[#5D5D4E] text-[10px] font-semibold tracking-wider font-mono">
              UA-GOV-ID • {data.uniqueId}
            </span>
          </div>

          {/* Photo Frame or Trident symbol */}
          <div className="relative">
            {hasPhoto ? (
              <div className="w-[66px] h-[82px] bg-white rounded-xl border border-[#959485] p-[2px] overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
                <img 
                  src={data.photoUrl} 
                  alt="Avatar" 
                  className="w-full h-full object-cover rounded-[10px]"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="w-[64px] h-[71px] bg-transparent flex items-center justify-center p-1 border border-[#9d9c8c]/50 rounded-lg">
                <Trident className="w-11 h-13 text-[#171717]" />
              </div>
            )}
            
            {/* Live Secure Watermark Emblem indicator */}
            <div className="absolute -bottom-1.5 -right-1.5 bg-[#FD890A] text-white p-1 rounded-full border-2 border-[#D5D3BE] shadow-sm transform rotate-12">
              <Shield className="w-3.5 h-3.5" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Mid Block: Essential Fields */}
        <div className="space-y-4 pt-4">
          
          {/* DOB Field */}
          <div className="space-y-0.5 group">
            <span className="text-[15px] font-medium text-[#5E5E55] tracking-wide block transition-colors group-hover:text-neutral-900">
              Дата народження:
            </span>
            <p className="text-[19px] font-semibold text-[#171717] tracking-tight">
              {data.dob}
            </p>
          </div>

          {/* Deferral Date Field */}
          <div className="space-y-0.5 group">
            <span className="text-[15px] font-medium text-[#5E5E55] tracking-wide block transition-colors group-hover:text-neutral-900">
              Відстрочка до:
            </span>
            <p className="text-[19px] font-semibold text-[#171717] tracking-tight">
              {data.deferredUntil}
            </p>
          </div>
        </div>

        {/* Card Flip QR Hint Anchor */}
        <div className="flex-1 flex items-end justify-center pb-2">
          <motion.div 
            className="px-4 py-2 rounded-xl bg-black/5 hover:bg-black/10 border border-black/5 flex items-center gap-2 text-[#5E5E55] text-xs font-semibold text-center mt-4 transition"
            whileHover={{ y: -2 }}
          >
            <QrCode className="w-4 h-4 text-[#FD890A]" />
            <span>Натисніть для перегляду QR коду</span>
          </motion.div>
        </div>

      </div>

      {/* Ribbon Banner: Live Synchronized Status Strip */}
      <div className="relative h-[28px] bg-[#6B4B1A] overflow-hidden flex items-center justify-center">
        {/* Glowing/Live indicator dots */}
        <motion.div 
          className="absolute left-3 w-1.5 h-1.5 bg-emerald-400 rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
        <p className="text-white text-[11px] font-medium font-sans select-none tracking-wide text-center flex items-center justify-center gap-1.5 px-6">
          <span>Документ оновлено: {data.updatedTime}</span>
          <span className="text-emerald-400 text-xs font-bold leading-none animate-pulse">•</span>
        </p>
      </div>

      {/* Lower / Footer Info Box */}
      <div 
        className="p-6 bg-[#D5D3BE] border-t border-[#959485]/40 flex flex-col gap-3 min-h-[160px] relative justify-between"
      >
        <div className="flex justify-between items-end gap-2 w-full">
          <div>
            {/* Status Type text badge */}
            <div className={`text-[15px] font-medium ${statusStyle.textColor} mb-2 flex items-center gap-1.5`}>
              <span className={`w-2 h-2 rounded-full ${statusStyle.dotColor}`} />
              <span>{data.statusText}</span>
            </div>

            {/* Structured Names list as in Figma code */}
            <div className="flex flex-col text-[#171717] font-semibold text-[23.5px] leading-[1.1] tracking-tight font-sans mt-1">
              <span className="uppercase">{data.surname}</span>
              <span className="uppercase">{data.name}</span>
              <span className="uppercase">{data.patronymic}</span>
            </div>
          </div>

          {/* Large Amber button to flip/show verification */}
          <motion.div 
            className="w-[52px] h-[52px] rounded-full bg-[#FD890A] flex items-center justify-center text-[#23221E] font-bold text-[36px] shadow-[0_2.5px_6px_rgba(253,137,10,0.35)] cursor-pointer select-none border border-white/10"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onShowQr();
            }}
          >
            <span className="relative bottom-[2px] font-sans">+</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
