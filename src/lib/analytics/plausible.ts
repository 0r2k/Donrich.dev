type PlausibleValue = string | number | boolean;

export type PlausibleProps = Record<string, PlausibleValue>;

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: PlausibleProps }) => void;
  }
}

export function trackPlausibleEvent(eventName: string, props?: PlausibleProps) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.plausible !== "function") {
    return;
  }

  window.plausible(eventName, props ? { props } : undefined);
}
