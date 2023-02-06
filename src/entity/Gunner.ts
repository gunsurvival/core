import {type, Schema} from '@colyseus/schema';
import {Body, Circle, type Response} from 'detect-collisions';
import getStats from '../stats.js';
import type {TickData} from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';

export class StatsGunner extends Schema {
	@type('number') health: number;
	@type('number') speed: number;
	@type('number') radius: number;
}

export default class Gunner extends Entity {
	@type(StatsGunner) stats = getStats<StatsGunner>('Gunner');
	body = new Circle({x: 1, y: 1}, 80, {});

	update(world: World, tickData: TickData): void {}
	onInit() {}
	onDestroy() {}
	onCollisionEnter(other: Entity, response: Response) {}
	onCollisionStay(other: Entity, response: Response) {}
	onCollisionExit(other: Entity, response: Response) {}
}
