// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Enum<Map extends Record<string, any>> = Map extends Record<string, infer Value> ? Value : never;

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type Only<T, U> = {
    [P in keyof T]: T[P];
} & {
    [P in keyof U]?: never;
};

export type Either<T, U> = Only<T, U> | Only<U, T>;