import structuredClone from '@ungap/structured-clone';

const stats: Record<string, Record<string, string | number | boolean>> = {
	AIGunner: {
		health: 100,
		speed: 5,
	},
	Bush: {
		radius: 50,
	},
	Gunner: {
		health: 100,
		speed: 5,
		radius: 50,
	},
	Rock: {
		radius: 55,
	},
};

export default function getStats<T>(name: string): T {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	return structuredClone(stats[name]) as T;
}
