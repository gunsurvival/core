import {Body, Circle, type Response} from 'detect-collisions';
import getStats from '../stats.js';
import type {TickData} from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';

export type IStatsGunner = {
	health: number;
	speed: number;
	radius: number;
};

export default class Gunner extends Entity {
	body = new Circle({x: 1, y: 1}, 80, {});
	stats = getStats('Gunner');

	update(world: World, tickData: TickData): void {
		// This.body.x = 100.0 + (Math.cos(tickData.elapsedMs / 200.0) * 100.0);
		// this.body.y = 100.0 + (Math.sin(tickData.elapsedMs / 200.0) * 100.0);
	}

	onCreate(): void {

	}

	onCollisionEnter(other: Entity, response: Response) {}

	onCollisionStay(other: Entity, response: Response) {}

	onCollisionExit(other: Entity, response: Response) {}
}
