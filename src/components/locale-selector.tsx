"use client"

import { setCookieLocaleFromClient } from "@intl-t/next/actions"
import { useLocale } from "@/i18n/navigation"
import { allowedLocales } from "@/i18n/locales"
import { useRouter } from "next/navigation"

export function LocaleSelector() {
  const [currentLocale] = useLocale()
  const router = useRouter()

  const handleSwitch = async (locale: (typeof allowedLocales)[number]) => {
    await setCookieLocaleFromClient(locale)
    router.refresh()
  }

  return (
    <div className="flex items-center gap-0.5">
      {allowedLocales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleSwitch(locale)}
          className={`text-[10px] font-mono font-bold px-2 py-0.5 transition-colors cursor-pointer ${
            currentLocale === locale
              ? "text-green-500"
              : "text-zinc-600 hover:text-zinc-300"
          }`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
