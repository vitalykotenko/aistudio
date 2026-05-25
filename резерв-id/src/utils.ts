import { DocumentData } from './types';

export const INITIAL_DATA: DocumentData = {
  surname: "ВІТТ",
  name: "ПАВЛО",
  patronymic: "ПАВЛОВИЧ",
  dob: "30.11.1998",
  deferredUntil: "21.11.2026",
  statusText: "Військовозобов'язаний",
  statusCode: "MILITARY_LIABLE", // MILITARY_LIABLE, EXEMPT, RESERVED, CRITICAL
  updatedTime: "15:25 | 06.05.2026",
  isLiveTime: true,
  photoUrl: "", // Empty defaults to vector Tryzub or stock avatar
  qrCodeValue: "https://reserve-plus.gov.ua/verify/19983011-2322",
  uniqueId: "19983011-2322"
};

export function loadDocumentData(): DocumentData {
  try {
    const saved = localStorage.getItem('reserve_id_data_v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure all fields exist
      return { ...INITIAL_DATA, ...parsed };
    }
  } catch (e) {
    console.error("Failed to load document data from localStorage", e);
  }
  return INITIAL_DATA;
}

export function saveDocumentData(data: DocumentData): void {
  try {
    localStorage.setItem('reserve_id_data_v2', JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save document data to localStorage", e);
  }
}

export function formatDateTime(date: Date): string {
  const pad = (num: number) => String(num).padStart(2, '0');
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${hours}:${minutes} | ${day}.${month}.${year}`;
}
