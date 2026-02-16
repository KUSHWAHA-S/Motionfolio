// src/lib/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import translationEN from '@/locales/en/translation.json';
import translationES from '@/locales/es/translation.json';
import translationFR from '@/locales/fr/translation.json';
import translationDE from '@/locales/de/translation.json';
import translationIT from '@/locales/it/translation.json';
import translationPT from '@/locales/pt/translation.json';
import translationJA from '@/locales/ja/translation.json';
import translationZH from '@/locales/zh/translation.json';
import translationKO from '@/locales/ko/translation.json';

const resources = {
    en: {
        translation: translationEN,
    },
    es: {
        translation: translationES,
    },
    fr: {
        translation: translationFR,
    },
    de: {
        translation: translationDE,
    },
    it: {
        translation: translationIT,
    },
    pt: {
        translation: translationPT,
    },
    ja: {
        translation: translationJA,
    },
    zh: {
        translation: translationZH,
    },
    ko: {
        translation: translationKO,
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false, // React already escapes values
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nextLng',
        },
    });

export default i18n;
