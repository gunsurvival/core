import {Circle, type Response} from 'detect-collisions';
import getStats from '../stats.js';
import type {ITickData} from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';

export type StatsGunner = {
	health: number;
	speed: number;
	radius: number;
};

export default class Gunner extends Entity {
	stats = getStats<StatsGunner>('Gunner');
	body = new Circle({x: 1, y: 1}, 80, {});

	update(world: World, tickData: ITickData): void {}
	onInit() {}
	onDestroy() {}
	onCollisionEnter(other: Entity, response: Response) {}
	onCollisionStay(other: Entity, response: Response) {}
	onCollisionExit(other: Entity, response: Response) {}
}
