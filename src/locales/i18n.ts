import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation_en from "./en.json";
import translation_it from "./it.json";

const resources = {
  it: {
    ns1: translation_it,
  },
  en: {
    ns1: translation_en,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "it", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    fallbackLng: "en",
    ns: ['ns1'],
    defaultNS: 'ns1',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;