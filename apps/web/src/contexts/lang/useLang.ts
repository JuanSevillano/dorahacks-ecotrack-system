import { Trans, getCurrentLanguage } from '@ecotrack/lang';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { useCallback } from 'react';

export type UseLang = {
    t: TFunction;
    lang: string;
    setLang: (lng: string) => Promise<void>;
    languages: ReadonlyArray<string>;
    Trans: typeof Trans;
};

export const useLang = (): UseLang => {
    const { t, i18n } = useTranslation('web');
    const lang = i18n.language || getCurrentLanguage();

    const setLang = useCallback(async (lng: string) => {
        if (!lng || lng === lang) return;
        try {
            await i18n.changeLanguage(lng);
        } catch (error) {
            console.error('useLang: Error changing language', error);
        }
    }, [lang, i18n])

    return {
        t,
        lang,
        setLang,
        languages: ['en', 'es'],
        Trans,
    };
};

