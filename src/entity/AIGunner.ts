import getStats from '../stats.js';
import {type TickData} from '../types.js';
import type World from '../world/World.js';
import Gunner from './Gunner.js';

export type IStatsAIgunner = {
	health: number;
	speed: number;
};

export default class AIGunner extends Gunner {
	stats = getStats('AIGunner');
	update(world: World, tickData: TickData): void {

	}
}
