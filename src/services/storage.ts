import { Enum } from "../types";

const PREFIX = 'kzzv-portfolio:';

export const KEYS = {
    VAULT: `${PREFIX}VAULT`,
    FEATURES: `${PREFIX}FEATURES`,
    THEME: `${PREFIX}THEME`,
} as const;

export type Key = Enum<typeof KEYS>;

declare global {
    interface WindowEventMap {
        'x-kzzv-storage': Event;
    }
}

const STORAGE_CHANGE_EVENT_NAME: keyof WindowEventMap = 'x-kzzv-storage';

export interface StorageItemOptions {
    readonly key: Key;
    readonly storage: 'local' | 'session';
}

class StorageItemChangeEvent extends Event implements StorageItemOptions {
    public readonly key: Key;
    public readonly storage: 'local' | 'session';

    constructor(options: StorageItemOptions) {
        super(STORAGE_CHANGE_EVENT_NAME);
        this.key = options.key;
        this.storage = options.storage;
    }
}

export const dispatchChange = (options: StorageItemOptions) => {
    window.dispatchEvent(new StorageItemChangeEvent(options));
};

export const subscribe = (options: StorageItemOptions, onStoreChange: () => void) => {
    const callback = (event: Event) => {
        if (event instanceof StorageItemChangeEvent && event.key === options.key && event.storage === options.storage) {
            onStoreChange();
        }
    };
    window.addEventListener(STORAGE_CHANGE_EVENT_NAME, callback);
    return () => window.removeEventListener(STORAGE_CHANGE_EVENT_NAME, callback);
};

// #endregion events

export const getRaw = (key: Key) => localStorage.getItem(key);

export const get = (key: Key) => {
    try {
        const item = getRaw(key);
        return item ? (JSON.parse(item)) : null;
    } catch {
        return null;
    }
};

export const has = (key: Key) => localStorage.getItem(key) !== null;

const logger = console

export const remove = (key: Key) => {
    if (localStorage.getItem(key) === null) {
        return;
    }

    localStorage.removeItem(key);
    logger.info('remove', key);
    dispatchChange({ key, storage: 'local' });
};

export const setRaw = (key: Key, value: string) => {
    const current = getRaw(key);
    if (current === value) {
        return;
    }

    try {
        localStorage.setItem(key, value);
        logger.info('set', key);
        dispatchChange({ key, storage: 'local' });
    } catch {
        //
    }
};

export const set = (key: Key, value: unknown) => setRaw(key, JSON.stringify(value));
