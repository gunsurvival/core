// Node_modules\@types\poly-decomp\index.d.ts:

declare module 'poly-decomp' {
	export function decomp(points: number[][]): number[][][];
	export function quickDecomp(points: number[][]): number[][][];
	export function isSimple(points: number[][]): boolean;
	export function removeCollinearPoints(points: number[][]): number[][];
	export function removeDuplicatePoints(points: number[][]): number[][];
	export function makeCCW(points: number[][]): number[][];
}
