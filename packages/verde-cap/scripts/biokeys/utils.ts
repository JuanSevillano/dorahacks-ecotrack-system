// TODO: this could be calling our own SC and get its value
export const generateUniqueBioKey = (): Promise<number> => new Promise((resolve) => {
    const timestamp = Date.now();
    const randomHex = Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, '0');
    const bioKey = `BIO-${timestamp}-${randomHex}`.toUpperCase();
    resolve(+bioKey);
});