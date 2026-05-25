import { motion } from 'motion/react';
import { DocQRCode } from './DocQRCode';
import { DocumentData } from '../types';
import { X, CheckCircle2, ShieldAlert, Wifi, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface VerificationModalProps {
  data: DocumentData;
  onClose: () => void;
}

export function VerificationModal({ data, onClose }: VerificationModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.qrCodeValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-100 flex flex-col relative"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
      >
        {/* Modal Close Anchor */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-full transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-[#D5D3BE] px-6 py-6 pb-4 border-b border-[#959485]/20 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-md font-bold text-neutral-900 text-center">
            Електронний документ дійсний
          </h3>
          <p className="text-xxs text-neutral-600 text-center mt-1">
            Швидка військово-облікова перевірка в системі
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 flex flex-col items-center">
          {/* Subtitle credentials summary under verification */}
          <div className="text-center">
            <h4 className="text-sm font-bold text-neutral-900 uppercase">
              {data.surname} {data.name} {data.patronymic}
            </h4>
            <p className="text-xs text-neutral-500 mt-0.5 font-mono">
              ДН: {data.dob} • Код: {data.uniqueId}
            </p>
          </div>

          {/* Highfidelity custom QR code container */}
          <div className="w-full max-w-[200px] aspect-square">
            <DocQRCode value={data.qrCodeValue} className="w-full h-full shadow-md" />
          </div>

          <div className="bg-amber-50/50 border border-amber-200/40 p-3 rounded-2xl w-full flex gap-2.5 items-start">
            <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-xxs font-bold text-amber-800 uppercase tracking-wider block">Режим автономного контролю</span>
              <p className="text-[10px] text-[#5E5E55] leading-normal font-medium">
                QR-код містить унікальний цифровий підпис. Будь-який сканер розпізнає та підтвердить валідність відстрочки.
              </p>
            </div>
          </div>

          {/* Raw string control */}
          <div className="w-full bg-neutral-50 p-2.5 rounded-xl border border-neutral-100 flex items-center justify-between gap-2.5">
            <span className="text-[10px] font-mono font-medium text-neutral-500 truncate select-all flex-1">
              {data.qrCodeValue}
            </span>
            <button
              onClick={handleCopy}
              className="p-1 px-2.5 bg-white border border-neutral-200 rounded-lg text-[10px] font-bold text-neutral-600 hover:text-[#FD890A] hover:bg-neutral-50 flex items-center gap-1 shrink-0 transition"
              type="button"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Спільне
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Код
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Footer actions */}
        <div className="p-4 bg-neutral-50/70 border-t border-neutral-100 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-[#FD890A] hover:bg-[#e67b07] text-neutral-900 font-bold text-xs rounded-xl text-center shadow-sm transition"
            type="button"
          >
            Готово
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
