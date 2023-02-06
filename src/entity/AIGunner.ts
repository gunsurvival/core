import {type, Schema} from '@colyseus/schema';
import getStats from '../stats.js';
import {type TickData} from '../types.js';
import type World from '../world/World.js';
import Gunner, {StatsGunner} from './Gunner.js';

export class StatsAIGunner extends StatsGunner {}

export default class AIGunner extends Gunner {
	@type(StatsAIGunner) stats = getStats<StatsAIGunner>('AIGunner');
	update(world: World, tickData: TickData): void {}
}
