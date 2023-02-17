import {Circle, type Response} from 'detect-collisions';
import getStats from '../stats';
import type {ITickData} from '../types';
import type World from '../world/World';
import Entity from './Entity.js';

export type StatsGunner = {
	health: number;
	speed: number;
	radius: number;
};

export default class Gunner extends Entity {
	stats = getStats<StatsGunner>('Gunner');
	rigid = new Circle({x: 1, y: 1}, 80, {});

	update(world: World, tickData: ITickData): void {}
	onInit() {}
	onDestroy() {}
	onCollisionEnter(other: Entity, response: Response) {}
	onCollisionStay(other: Entity, response: Response) {}
	onCollisionExit(other: Entity, response: Response) {}
}
