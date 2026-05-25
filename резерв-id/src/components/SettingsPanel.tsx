import React, { useRef } from 'react';
import { 
  Settings, 
  User, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Smartphone, 
  QrCode, 
  Upload, 
  RefreshCw, 
  Trash2, 
  Sparkles,
  Info
} from 'lucide-react';
import { DocumentData } from '../types';

interface SettingsPanelProps {
  data: DocumentData;
  onChange: (newData: DocumentData) => void;
  onReset: () => void;
  onClose?: () => void;
}

export function SettingsPanel({ data, onChange, onReset, onClose }: SettingsPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      onChange({
        ...data,
        [name]: checked
      });
    } else {
      onChange({
        ...data,
        [name]: value
      });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({
        ...data,
        photoUrl: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const triggerPhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = () => {
    onChange({
      ...data,
      photoUrl: ""
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const loadPreset = (preset: 'vitt' | 'petrenko' | 'military') => {
    if (preset === 'vitt') {
      onChange({
        surname: "ВІТТ",
        name: "ПАВЛО",
        patronymic: "ПАВЛОВИЧ",
        dob: "30.11.1998",
        deferredUntil: "21.11.2026",
        statusText: "Військовозобов'язаний",
        statusCode: "MILITARY_LIABLE",
        updatedTime: "15:25 | 06.05.2026",
        isLiveTime: true,
        photoUrl: "",
        qrCodeValue: "https://reserve-plus.gov.ua/verify/19983011-2322",
        uniqueId: "19983011-2322"
      });
    } else if (preset === 'petrenko') {
      // Ukrainian typical mock setup
      onChange({
        surname: "ШЕВЧЕНКО",
        name: "ОЛЕКСАНДР",
        patronymic: "ВАСИЛЬОВИЧ",
        dob: "14.08.1993",
        deferredUntil: "30.09.2026",
        statusText: "Знятий з військового обліку",
        statusCode: "EXEMPT",
        updatedTime: "10:14 | 23.05.2026",
        isLiveTime: true,
        photoUrl: "",
        qrCodeValue: "https://reserve-plus.gov.ua/verify/19930814-4112",
        uniqueId: "19930814-4112"
      });
    } else if (preset === 'military') {
      onChange({
        surname: "ГРИЦЕНКО",
        name: "АРТЕМ",
        patronymic: "СТЕПАНОВИЧ",
        dob: "05.12.1990",
        deferredUntil: "15.01.2027",
        statusText: "Заброньований працівник",
        statusCode: "RESERVED",
        updatedTime: "08:30 | 12.05.2026",
        isLiveTime: false,
        photoUrl: "",
        qrCodeValue: "https://reserve-plus.gov.ua/verify/19901205-5981",
        uniqueId: "19901205-5981"
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white text-neutral-800">
      {/* Settings Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/50">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#FD890A]" />
          <h2 className="text-lg font-bold tracking-tight text-neutral-900">Редактор карти</h2>
        </div>
        {onClose && (
          <button 
            type="button" 
            onClick={onClose}
            className="md:hidden p-1.5 hover:bg-neutral-100 rounded-full text-neutral-400 transition"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Presets */}
        <div className="space-y-2">
          <label className="text-xs font-semibold tracking-wider text-neutral-400 uppercase flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FD890A]" /> Швидкі пресети
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => loadPreset('vitt')}
              className="px-2 py-2 text-xs border border-neutral-200 rounded-xl hover:border-[#FD890A] hover:bg-neutral-50 font-medium transition text-center"
            >
              ВІТТ П. П.
            </button>
            <button
              type="button"
              onClick={() => loadPreset('petrenko')}
              className="px-2 py-2 text-xs border border-neutral-200 rounded-xl hover:border-[#FD890A] hover:bg-neutral-50 font-medium transition text-center"
            >
              ШЕВЧЕНКО
            </button>
            <button
              type="button"
              onClick={() => loadPreset('military')}
              className="px-2 py-2 text-xs border border-neutral-200 rounded-xl hover:border-[#FD890A] hover:bg-neutral-50 font-medium transition text-center"
            >
              ГРИЦЕНКО
            </button>
          </div>
        </div>

        {/* Name Fields Section */}
        <div className="space-y-4">
          <label className="text-xs font-semibold tracking-wider text-neutral-400 uppercase flex items-center gap-1">
            <User className="w-3.5 h-3.5" /> Особисті дані
          </label>
          
          <div className="space-y-3">
            <div>
              <span className="text-xs font-medium text-neutral-500 block mb-1">Прізвище</span>
              <input
                type="text"
                name="surname"
                value={data.surname}
                onChange={handleInputChange}
                placeholder="ВІТТ"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FD890A]/20 focus:border-[#FD890A] transition"
              />
            </div>

            <div>
              <span className="text-xs font-medium text-neutral-500 block mb-1">Ім'я</span>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleInputChange}
                placeholder="ПАВЛО"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FD890A]/20 focus:border-[#FD890A] transition"
              />
            </div>

            <div>
              <span className="text-xs font-medium text-neutral-500 block mb-1">По батькові</span>
              <input
                type="text"
                name="patronymic"
                value={data.patronymic}
                onChange={handleInputChange}
                placeholder="ПАВЛОВИЧ"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FD890A]/20 focus:border-[#FD890A] transition"
              />
            </div>
          </div>
        </div>

        {/* Date Fields Section */}
        <div className="space-y-4">
          <label className="text-xs font-semibold tracking-wider text-neutral-400 uppercase flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> Дати та терміни
          </label>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-xs font-medium text-neutral-500 block mb-1">Дата народження</span>
              <input
                type="text"
                name="dob"
                value={data.dob}
                onChange={handleInputChange}
                placeholder="30.11.1998"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FD890A]/20 focus:border-[#FD890A] transition"
              />
            </div>

            <div>
              <span className="text-xs font-medium text-neutral-500 block mb-1">Відстрочка до</span>
              <input
                type="text"
                name="deferredUntil"
                value={data.deferredUntil}
                onChange={handleInputChange}
                placeholder="21.11.2026"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FD890A]/20 focus:border-[#FD890A] transition"
              />
            </div>
          </div>
        </div>

        {/* Status Fields */}
        <div className="space-y-4">
          <label className="text-xs font-semibold tracking-wider text-neutral-400 uppercase flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Військовий статус
          </label>

          <div className="space-y-3">
            <div>
              <span className="text-xs font-medium text-neutral-500 block mb-1">Тип статусу</span>
              <select
                name="statusCode"
                value={data.statusCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FD890A]/20 focus:border-[#FD890A] transition"
              >
                <option value="MILITARY_LIABLE">Військовозобов'язаний (Золотий)</option>
                <option value="RESERVED">Заброньований (Зелений)</option>
                <option value="EXEMPT">Виключений з обліку (Сірий)</option>
                <option value="CRITICAL">Увага / Потребує уточнення (Червоний)</option>
              </select>
            </div>

            <div>
              <span className="text-xs font-medium text-neutral-500 block mb-1">Текст статусу</span>
              <input
                type="text"
                name="statusText"
                value={data.statusText}
                onChange={handleInputChange}
                placeholder="Військовозобов'язаний"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FD890A]/20 focus:border-[#FD890A] transition"
              />
            </div>
          </div>
        </div>

        {/* Update Time Settings */}
        <div className="space-y-4">
          <label className="text-xs font-semibold tracking-wider text-neutral-400 uppercase flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Час оновлення
          </label>

          <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100 space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-medium text-neutral-600">Авто-синхронізація (реальний час)</span>
              <div className="relative">
                <input
                  type="checkbox"
                  name="isLiveTime"
                  checked={data.isLiveTime}
                  onChange={onChange as any} // handeled manually by setting name/checked
                  onClick={() => onChange({ ...data, isLiveTime: !data.isLiveTime })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-neutral-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-[#FD890A]/30 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FD890A]" />
              </div>
            </label>

            {!data.isLiveTime && (
              <div>
                <span className="text-xs font-medium text-neutral-400 block mb-1">Точний текст часу</span>
                <input
                  type="text"
                  name="updatedTime"
                  value={data.updatedTime}
                  onChange={handleInputChange}
                  placeholder="15:25 | 06.05.2026"
                  className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#FD890A] transition"
                />
              </div>
            )}
          </div>
        </div>

        {/* Photographic setup */}
        <div className="space-y-4">
          <label className="text-xs font-semibold tracking-wider text-neutral-400 uppercase flex items-center gap-1">
            <User className="w-3.5 h-3.5" /> Фотографія профілю
          </label>

          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 flex items-center gap-4">
            <div className="w-16 h-20 bg-neutral-200/50 rounded-xl border border-neutral-200/80 flex items-center justify-center overflow-hidden relative shadow-sm">
              {data.photoUrl ? (
                <img 
                  src={data.photoUrl} 
                  alt="Profile Preview" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="text-neutral-400 flex flex-col items-center justify-center">
                  <User className="w-6 h-6" />
                  <span className="text-xxs text-neutral-400 font-medium">Tryzub</span>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={triggerPhotoUpload}
                className="w-full px-3 py-1.5 bg-white border border-neutral-200 hover:border-[#FD890A] hover:text-[#FD890A] hover:bg-neutral-50 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <Upload className="w-3.5 h-3.5" /> Завантажити фото
              </button>
              
              {data.photoUrl && (
                <button
                  type="button"
                  onClick={removePhoto}
                  className="w-full px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Видалити фото
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Verification Settings */}
        <div className="space-y-4">
          <label className="text-xs font-semibold tracking-wider text-neutral-400 uppercase flex items-center gap-1">
            <QrCode className="w-3.5 h-3.5" /> Верифікація / QR
          </label>

          <div className="space-y-3">
            <div>
              <span className="text-xs font-medium text-neutral-500 block mb-1 font-mono">Вміст QR коду (URL/Текст)</span>
              <input
                type="text"
                name="qrCodeValue"
                value={data.qrCodeValue}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#FD890A]/20 focus:border-[#FD890A] transition"
              />
            </div>

            <div>
              <span className="text-xs font-medium text-neutral-500 block mb-1">Унікальний ID документу</span>
              <input
                type="text"
                name="uniqueId"
                value={data.uniqueId}
                onChange={handleInputChange}
                placeholder="19983011-2322"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#FD890A]/20 focus:border-[#FD890A] transition"
              />
            </div>
          </div>
        </div>

        {/* iPhone PWA Installation Guideline cards */}
        <div className="pt-2">
          <div className="p-4 bg-orange-50/70 border border-orange-100 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-[#6B4B1A] flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#FD890A]" /> Встановлення на iPhone:
            </h4>
            <ol className="text-xxs leading-relaxed text-neutral-600 list-decimal pl-4 space-y-1.5">
              <li>Відкрийте цю сторінку в браузері <strong className="text-neutral-900 font-semibold">Safari</strong> на вашому iPhone.</li>
              <li>Натисніть кнопку <strong className="text-neutral-900 font-semibold">"Поділитися"</strong> (квадрат зі стрілкою вгору) внизу.</li>
              <li>Прокрутіть меню вниз та оберіть <strong className="text-neutral-900 font-semibold">"Додати на початковий екран"</strong> ("Add to Home Screen").</li>
              <li>Введіть назву <span className="font-semibold text-[#FD890A]">Резерв ID</span> та натисніть кнопку <strong className="text-neutral-900 font-semibold">"Додати"</strong>.</li>
              <li>Ярлик з'явиться на робочому столі вашого iPhone та запускатиметься як справжній додаток!</li>
            </ol>
            <div className="flex gap-1.5 items-start mt-2 pt-2 border-t border-orange-200/30 text-[10px] text-neutral-500">
              <Info className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
              <span>Ми використовуємо Локальну Базу Даних. Усі внесені зміни зберігаються виключно у вас у браузері.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer operations */}
      <div className="p-4 border-t border-neutral-100 flex gap-2">
        <button
          type="button"
          onClick={onReset}
          className="flex-1 py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Скинути дані
        </button>
      </div>
    </div>
  );
}
