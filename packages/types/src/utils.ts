// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Enum<Map extends Record<string, any>> = Map extends Record<string, infer Value> ? Value : never;