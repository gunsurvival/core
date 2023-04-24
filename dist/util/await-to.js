export async function to(promise, errorExt) {
    try {
        const data = await promise;
        return [undefined, data];
    }
    catch (err) {
        if (errorExt) {
            return [
                { ...err, ...errorExt },
                undefined,
            ];
        }
        return [err, undefined];
    }
}
//# sourceMappingURL=await-to.js.map