import { I18nextProvider, initReactI18next } from 'react-i18next';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import * as en from './en';

import type { ExistsFunction } from 'i18next';

export { Trans } from 'react-i18next';

export const t = i18next.t;
export const translationExists: ExistsFunction = i18next.exists;

i18next
    // Detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector) // TODO: Enable this code in production
    // Pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // Init i18next
    // For all options read: https://www.i18next.com/overview/configuration-options
    .init({
        lng: 'es',
        fallbackLng: 'es',
        react: { useSuspense: false },
        resources: {
            en: {
                translation: en,
            },
        },
        interpolation: {
            escapeValue: false, // react already safe from xss
        },
    });

type Props = {
    children: React.ReactNode;
};

export const getCurrentLanguage = () => i18next.language;
export const languages = i18next.languages;
export const changeLanguage: typeof i18next.changeLanguage = i18next.changeLanguage;

export const services: typeof i18next.services = i18next.services;

export const LangProvider = ({ children }: Props) => <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
