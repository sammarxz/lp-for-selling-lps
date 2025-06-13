export {};

declare global {
  interface Window {
    fbq: (action: string, eventName: string, parameters?: Record<string, any>) => void;
    _fbq: any;
  }
}
