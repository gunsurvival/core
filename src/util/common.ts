import type Entity from '../entity/Entity.js';

export function lerp(start: number, end: number, amt: number) {
	return (1 - amt) * start + amt * end;
}

export function lerpAngle(start: number, end: number, amt: number) {
	start %= 2 * Math.PI;
	const alpha = start;
	const beta = end;
	const rotates = [
		// Tất cả trường hợp quay
		{
			result: Math.abs(alpha - beta),
			beta,
		},
		{
			result: Math.abs(alpha - (beta + 2 * Math.PI)),
			beta: beta + 2 * Math.PI,
		},
		{
			result: Math.abs(alpha - (beta - 2 * Math.PI)),
			beta: beta - 2 * Math.PI,
		},
	];
	rotates.sort((a, b) => a.result - b.result);
	return lerp(start, rotates[0].beta, amt); // Lấy giá trị nhỏ nhất của góc quay
}

export function genId(e1: Entity, e2: Entity) {
	return e1.id + e2.id;
}
