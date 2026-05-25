import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  loadDocumentData, 
  saveDocumentData, 
  formatDateTime, 
  INITIAL_DATA 
} from './utils';
import { AppState, DocumentData } from './types';
import { DocumentCard } from './components/DocumentCard';
import { SettingsPanel } from './components/SettingsPanel';
import { VerificationModal } from './components/VerificationModal';
import { Trident } from './components/Trident';
import { 
  Sliders, 
  Smartphone, 
  BookOpen, 
  User, 
  Bell, 
  Menu, 
  QrCode, 
  CheckCircle2, 
  FileText,
  Compass,
  Cpu,
  Bookmark
} from 'lucide-react';

export default function App() {
  const [data, setData] = useState<DocumentData>(() => loadDocumentData());
  const [showQrModal, setShowQrModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'docs' | 'scan' | 'alerts' | 'menu'>('docs');
  const [showMobileSettings, setShowMobileSettings] = useState(false);

  // Synchronize localStorage
  useEffect(() => {
    saveDocumentData(data);
  }, [data]);

  // Synchronize live clock
  useEffect(() => {
    if (!data.isLiveTime) return;

    const updateClock = () => {
      setData(prev => ({
        ...prev,
        updatedTime: formatDateTime(new Date())
      }));
    };

    updateClock(); // immediately
    const interval = setInterval(updateClock, 10000); // every 10 seconds is precise enough and low on battery
    return () => clearInterval(interval);
  }, [data.isLiveTime]);

  const handleDataChange = (newData: DocumentData) => {
    setData(newData);
  };

  const handleResetData = () => {
    if (window.confirm("Дійсно скинути дані посвідчення до початкових?")) {
      setData(INITIAL_DATA);
    }
  };

  return (
    <div className="min-h-screen bg-[#E0DFCC] flex flex-col md:flex-row md:items-stretch overflow-x-hidden select-none font-sans">
      
      {/* LEFT/CENTER VIEWPORT: The iPhone mockup wrapper */}
      <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 relative">
        
        {/* Floating brand background accents for stunning desktop view */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block opacity-25">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neutral-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FD890A]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        </div>

        {/* The Phone Container */}
        {/* If loaded inside mobile Safari, the frame should vanish for seamless full-screen experience */}
        <div className="w-full max-w-[420px] bg-transparent flex flex-col">
          
          {/* Mock Status Bar for iOS PWA immersion on Safari preview/desktop */}
          <div className="w-full px-5 py-2 flex justify-between items-center text-xs font-semibold text-neutral-800/80 bg-black/5 rounded-t-2xl md:bg-black/10 select-none">
            {/* Dynamic Clock */}
            <span className="font-mono tracking-tighter">
              {new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-3 text-neutral-800" fill="currentColor" viewBox="0 0 16 12">
                <rect x="1" y="8" width="2" height="3" rx="0.5" />
                <rect x="4" y="6" width="2" height="5" rx="0.5" />
                <rect x="7" y="4" width="2" height="7" rx="0.5" />
                <rect x="10" y="2" width="2" height="9" rx="0.5" />
                <rect x="13" y="0" width="2" height="11" rx="0.5" />
              </svg>
              <span className="text-[10px] font-bold">5G</span>
              <div className="w-6 h-3 border border-neutral-800/80 rounded-[3px] p-[1px] flex items-center">
                <div className="h-full w-4/5 bg-neutral-800 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Core Phone App viewport block */}
          <div className="w-full bg-[#E0DFCC] shadow-[0_12px_36px_rgba(0,0,0,0.12)] border-x border-[#959485]/30 min-h-[720px] flex flex-col justify-between py-5 relative px-4 flex-1">
            
            {/* Upper Interactive Area */}
            <div className="flex-1 flex items-center justify-center py-4">
              <AnimatePresence mode="wait">
                {activeTab === 'docs' ? (
                  <motion.div
                    key="doc-card-wrapper"
                    className="w-full flex justify-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                  >
                    <DocumentCard 
                      data={data} 
                      onShowQr={() => setShowQrModal(true)} 
                    />
                  </motion.div>
                ) : activeTab === 'home' ? (
                  <motion.div 
                    key="tab-home"
                    className="w-full max-w-[360px] bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-white/40 space-y-5 text-neutral-800 text-center shadow-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <div className="w-14 h-14 bg-[#FD890A]/10 text-[#FD890A] mx-auto rounded-2xl flex items-center justify-center">
                      <Compass className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-md font-bold text-neutral-900">Головна панель послуг</h3>
                      <p className="text-xs text-neutral-500 mt-1">Доступ до цифрових підписів та авторизованих послуг реєстру</p>
                    </div>
                    <div className="py-2.5 px-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-center gap-3 text-left">
                      <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-ping shrink-0" />
                      <span className="text-xxs font-medium text-orange-900 leading-normal">
                        Державний реєстр працює в режимі підвищеної хмарної безпеки.
                      </span>
                    </div>
                  </motion.div>
                ) : activeTab === 'alerts' ? (
                  <motion.div 
                    key="tab-alerts"
                    className="w-full max-w-[360px] bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-white/40 space-y-4 text-neutral-800 text-center shadow-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <div className="w-14 h-14 bg-red-50 text-red-500 mx-auto rounded-2xl flex items-center justify-center">
                      <Bell className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-md font-bold text-neutral-900">Важливі сповіщення</h3>
                      <p className="text-xs text-neutral-500 mt-1">Наразі немає критичних системних сповіщень чи викликів.</p>
                    </div>
                    <div className="p-3 bg-neutral-100/50 rounded-xl space-y-1.5 text-left text-xxs block text-neutral-500">
                      <p>• Оновлено правила відображення QR кодів</p>
                      <p>• Виправлено локальний кеш офлайн перевірки</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="tab-menu"
                    className="w-full max-w-[360px] bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-white/40 space-y-5 text-neutral-800 text-center shadow-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <div className="w-14 h-14 bg-neutral-100 mx-auto rounded-2xl flex items-center justify-center text-neutral-700">
                      <Menu className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-md font-bold text-neutral-900">Меню налаштувань</h3>
                      <p className="text-xs text-neutral-500">Резерв ID версія 4.1.2-build</p>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={() => setShowMobileSettings(true)}
                        className="w-full py-2.5 px-4 bg-[#FD890A] text-neutral-900 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition text-center"
                      >
                        <Sliders className="w-4 h-4" /> Відкрити редактор картки
                      </button>
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 px-4 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 transition text-center"
                      >
                        <Cpu className="w-4 h-4" /> Код на GitHub
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom App Navigation Bar (Replicating Diia precisely) */}
            <div className="mt-4 bg-white/90 backdrop-blur-md p-2 rounded-2xl border border-neutral-200/50 shadow-sm flex justify-around items-center select-none z-10 mx-1">
              {/* Home Services */}
              <button
                type="button"
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center gap-1 py-1 px-3.5 rounded-xl transition ${
                  activeTab === 'home' ? 'text-[#FD890A] bg-[#FD890A]/5' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                <Compass className="w-5 h-5" />
                <span className="text-[10px] font-bold">Сервіси</span>
              </button>

              {/* Documents tab */}
              <button
                type="button"
                onClick={() => setActiveTab('docs')}
                className={`flex flex-col items-center gap-1 py-1 px-3.5 rounded-xl transition ${
                  activeTab === 'docs' ? 'text-[#FD890A] bg-[#FD890A]/5' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="text-[10px] font-bold">Документи</span>
              </button>

              {/* Scan Shortcut icon */}
              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                className="flex flex-col items-center justify-center -translate-y-4 w-12 h-12 rounded-full bg-[#FD890A] hover:bg-[#e67b07] text-neutral-900 border-4 border-[#E0DFCC] shadow-md transition"
              >
                <QrCode className="w-5 h-5" />
              </button>

              {/* Notifications bell */}
              <button
                type="button"
                onClick={() => setActiveTab('alerts')}
                className={`flex flex-col items-center gap-1 py-1 px-3.5 rounded-xl transition ${
                  activeTab === 'alerts' ? 'text-[#FD890A] bg-[#FD890A]/5' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                <div className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-[#FD890A] rounded-full border border-white" />
                </div>
                <span className="text-[10px] font-bold">Повідомлення</span>
              </button>

              {/* Profile/Menu tab */}
              <button
                type="button"
                onClick={() => setActiveTab('menu')}
                className={`flex flex-col items-center gap-1 py-1 px-3.5 rounded-xl transition ${
                  activeTab === 'menu' ? 'text-[#FD890A] bg-[#FD890A]/5' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                <Menu className="w-5 h-5" />
                <span className="text-[10px] font-bold">Меню</span>
              </button>
            </div>

            {/* Bottom safe indicator bar matching iOS Home Indicator */}
            <div className="w-1/3 h-1 bg-neutral-800/25 rounded-full mx-auto mt-3" />
          </div>

          {/* Floating Settings Button for Mobile screen users */}
          <div className="mt-4 flex justify-center gap-3 md:hidden px-4">
            <button
              onClick={() => setShowMobileSettings(true)}
              className="py-2.5 px-6 bg-neutral-800 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition"
            >
              <Sliders className="w-4 h-4 text-[#FD890A]" /> Налаштувати документ
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR: The live template customization configuration dashboard */}
      {/* On desktop, always visible. On mobile, slides up as a bottom sheet drawers */}
      <div className="hidden md:block w-full md:w-[380px] lg:w-[410px] shrink-0 border-l border-neutral-100/80 shadow-2xl relative bg-white z-20">
        <SettingsPanel 
          data={data} 
          onChange={handleDataChange} 
          onReset={handleResetData}
        />
      </div>

      {/* Slide-out Mobile Settings Drawer sheet */}
      <AnimatePresence>
        {showMobileSettings && (
          <div className="fixed inset-0 z-40 md:hidden flex flex-col justify-end bg-black/60 backdrop-blur-xs">
            {/* Click-out backdrop anchor */}
            <div 
              className="absolute inset-0" 
              onClick={() => setShowMobileSettings(false)} 
            />
            
            <motion.div 
              className="w-full max-h-[85vh] rounded-t-[32px] overflow-hidden bg-white z-50 flex flex-col relative"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
            >
              {/* Drag line */}
              <div className="w-12 h-1 bg-neutral-200 rounded-full mx-auto my-3" />
              
              <div className="flex-1 overflow-hidden h-full">
                <SettingsPanel 
                  data={data} 
                  onChange={handleDataChange} 
                  onReset={handleResetData}
                  onClose={() => setShowMobileSettings(false)}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Verification QR code popup dialog */}
      <AnimatePresence>
        {showQrModal && (
          <VerificationModal 
            data={data} 
            onClose={() => setShowQrModal(false)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}
