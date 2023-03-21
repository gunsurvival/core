import structuredClone from '@ungap/structured-clone';

export const stats: Record<string, Record<string, string | number | boolean>> = {
	AIGunner: {
		health: 100,
		speed: 5,
	},
	Bush: {
		radius: 50,
	},
	Gunner: {
		health: 100,
		speed: 4,
		radius: 40,
	},
	Rock: {
		radius: 90,
	},
	Bullet: {
		radius: 10,
	},
};

export function getStats<T>(name: string): T {
	if (!stats[name]) {
		throw new Error(`Stats for ${name} not found`);
	}

	return structuredClone(stats[name]) as T;
}
