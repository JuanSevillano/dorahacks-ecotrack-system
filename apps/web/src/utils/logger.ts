import type { Enum } from '../types';

const LEVEL = {
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
} as const;

type Level = Enum<typeof LEVEL>;

type Entry = Readonly<{
    timestamp: number;
    logger?: string;
    level: Level;
    message: string;
    data?: ReadonlyArray<unknown>;
}>;

const logs: Array<Entry> = [];

let maxRecords = 1_000;

export const setMaxSize = (count: number) => {
    maxRecords = count;
};

export const getLogs = (): Readonly<typeof logs> => logs;

export const flush = (count: number = logs.length) => {
    logs.splice(0, count);
};

const push = (
    logger: Entry['logger'],
    loggerColor: string | undefined,
    level: Entry['level'],
    message: Entry['message'],
    data: ReadonlyArray<unknown>
) => {
    if (logs.length >= maxRecords) {
        flush(maxRecords * 0.1);
    }

    logs.push({
        timestamp: Date.now(),
        level,
        message,
        ...(logger ? { logger } : undefined),
        ...(data.length ? { data } : undefined),
    });

    const LogRocket = console; // This should be replaced with the actual LogRocket instance if used

    const args = [...(logger ? [`%c[${logger}]`, `color: ${loggerColor ?? 'inherit'}`] : []), message, ...data];
    (import.meta.env.DEV ? console : LogRocket)[level](...args);
};

type LogLevel = (message: string, ...data: ReadonlyArray<unknown>) => void;

export const createLogger = (logger?: string, loggerColor?: string) =>
    Object.fromEntries(
        Object.values(LEVEL).map(level => [
            level,
            ((message, ...data) => push(logger, loggerColor, level, message, data)) satisfies LogLevel,
        ])
    ) as Record<Level, LogLevel>;

export const log = createLogger();
