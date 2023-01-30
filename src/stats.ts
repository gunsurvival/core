import {type IStatsBush} from './entity/Bush.js';
import {type IStatsAIgunner} from './entity/AIGunner.js';
import {type IStatsGunner} from './entity/Gunner.js';
import {type IStatsRock} from './entity/Rock.js';

const stats: Record<string, unknown> = {};

setStats<IStatsAIgunner>('AIGunner', {
	health: 100,
	speed: 5,
});
setStats<IStatsBush>('Bush', {
	radius: 50,
});
setStats<IStatsGunner>('Gunner', {
	health: 100,
	speed: 5,
	radius: 50,
});
setStats<IStatsRock>('Rock', {
	radius: 55,
});

function setStats<T>(name: string, value: T) {
	stats[name] = value;
}

export default function getStats<T>(name: string): T {
	return structuredClone(stats[name]) as T;
}
