import web from '../src/es/public_web.json';
import fallback from '../src/en/public_web.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'web';
        resources: {
            web: typeof web;
            fallback: typeof fallback
        }
    }
}