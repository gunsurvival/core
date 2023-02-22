import {Circle} from 'detect-collisions';
import getStats from '../stats.js';
import Entity from './Entity.js';

export type StatsGunner = {
	health: number;
	speed: number;
	radius: number;
};

export default class Gunner extends Entity {
	stats = getStats<StatsGunner>('Gunner');
	body = new Circle({x: 1, y: 1}, 80, {});
}
