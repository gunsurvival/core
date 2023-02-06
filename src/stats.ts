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

// Function setStats(name: string, value: Record<string, PrimitiveType>) {
// 	Object.assign(stats[name], value);
// }

export default function getStats<T>(name: string): T {
	return structuredClone(stats[name]) as T;
}
