import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import XHR from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translation_EN from "./translation_EN";
import translation_CN from "./translation_CN";

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(reactI18nextModule) // if not using I18nextProvider
  .init({
    fallbackLng: "en",
    debug: true,
    resources: {
      en: {
        translation: translation_EN
      },
      cn: {
        translation: translation_CN
      }
    }
  });

export default i18n;
