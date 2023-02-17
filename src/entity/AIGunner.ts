import getStats from '../stats.js';
import {type ITickData} from '../types.js';
import type World from '../world/World.js';
import Gunner, {type StatsGunner} from './Gunner.js';

export type StatsAIGunner = Record<string, unknown> & StatsGunner;

export default class AIGunner extends Gunner {
	stats = getStats<StatsAIGunner>('AIGunner');
	update(world: World, tickData: ITickData): void {}
}
