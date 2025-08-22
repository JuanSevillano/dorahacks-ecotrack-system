
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isUndefined = (value: any): value is undefined => typeof value === 'undefined';

export const isDefined = <Value>(value: Value): value is NonNullable<Value> => !isUndefined(value) && !isNull(value);

export const obfuscateAccountNumber = (accountNumber: string) =>
    `****  ${accountNumber.substring(accountNumber.length - 4)}`;

export const obfuscateEmail = (email: string) => email.replace(/^(.{1,3})(.*)@(.{1})(.*)(\..{2,3})$/, '$1***@$3***$5');

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isNumber = (value: unknown): value is number => typeof value === 'number';

export const isFunction = (value: unknown): value is (...args: any) => any => typeof value === 'function';

export const isDate = (value: unknown): value is Date => value instanceof Date;

