export interface CallBack {
  onsuccess?: (response: any, options: any) => void;
  onerror?: (error: any, options: any) => void;
}
