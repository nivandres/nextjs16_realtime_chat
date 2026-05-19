export const allowedLocales = ["en", "es", "ja"] as const;

export type Locale = typeof allowedLocales[number];

export const defaultLocale: Locale = "en";
