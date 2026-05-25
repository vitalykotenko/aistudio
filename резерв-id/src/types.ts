export interface DocumentData {
  surname: string;
  name: string;
  patronymic: string;
  dob: string;
  deferredUntil: string;
  statusText: string;
  statusCode: string; // e.g. 'MILITARY_LIABLE', 'EXEMPT', 'RESERVED'
  updatedTime: string;
  isLiveTime: boolean;
  photoUrl: string; // Base64 or standard URL
  qrCodeValue: string;
  uniqueId: string; // e.g., "19983011-2322"
}

export interface AppState {
  data: DocumentData;
  showQrModal: boolean;
  activeTab: 'home' | 'docs' | 'scan' | 'alerts' | 'menu';
  showSettings: boolean;
}
