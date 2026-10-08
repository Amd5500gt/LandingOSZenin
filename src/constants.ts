/**
 * Zenin OS - Central Configuration & Constants
 */

// Configurable APK URL as requested:
export const APK_URL = "/assets/ZeninOS_2.0.apk";
export const APK_FILENAME = "ZeninOS_2.0.apk";
export const APP_VERSION = "2.0";
export const MIN_ANDROID_VERSION = "Android 10.0+";
export const APK_SIZE = "14.8 MB";

export const SITE_META = {
  name: "Zenin OS",
  domain: "https://zo.n11hub.in",
  headline: "Your day, intentionally designed.",
  subheadline:
    "A focused productivity system built to turn your time, tasks and habits into a clear daily rhythm.",
  downloadStatement: "Build your day.",
  supportingDownload: "Android • Lightweight • Built for focused days",
  trustBadge: "Official Zenin OS Android download",
  apkFormatBadge: "Android APK",
};

export const SECTIONS = {
  HERO: "hero",
  RHYTHM: "rhythm",
  INTENTION: "intention",
  DOWNLOAD: "download",
  DETAILS: "details",
} as const;
