export const n = (v: unknown, d = 0) =>
    (typeof v === "number" && !Number.isNaN(v)) ? v : d;

export const round = (v: number | undefined, p = 3) =>
    typeof v === "number" ? Number(v.toFixed(p)) : 0;

export const sum = (xs: Array<number | undefined>) =>
    xs.reduce((a, b) => a + (b ?? 0), 0);
