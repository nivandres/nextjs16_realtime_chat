import * as en from "./locales/en.json"
import * as es from "./locales/es.json"
import * as ja from "./locales/ja.json"

import { createTranslation } from "intl-t/next";

export const { Translation, useTranslation, t } = createTranslation({
  locales: {
    en, es, ja,
  },
})
