export async function to<T, U = Error>(
	promise: Promise<T>,
	errorExt?: Record<string, unknown>,
): Promise<[U, undefined] | [undefined, T]> {
	try {
		const data = await promise;
		return [undefined, data];
	} catch (err) {
		if (errorExt) {
			return [{...(err as U), ...errorExt}, undefined];
		}

		return [err as U, undefined];
	}
}
