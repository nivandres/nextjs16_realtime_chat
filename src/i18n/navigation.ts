import { allowedLocales, defaultLocale } from "./locales";
import { createNavigation } from "intl-t/next";

export const { withProxy: withI18nProxy,  useRouter, Link, useLocale } = createNavigation({
    allowedLocales,
    defaultLocale,
    strategy: "request",
    pathPrefix: "hidden"
})
