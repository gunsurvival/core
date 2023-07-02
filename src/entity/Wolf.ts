import {Circle, type Response, SATVector} from 'detect-collisions';
import {getStats} from '../stats.js';
import Bullet from './Bullet.js';
import type World from '../world/World.js';
import {type ITickData} from '../types.js';
import Mob from './Mob.js';

export default class Wolf extends Mob {
	stats = getStats('Wolf');
	_stats = getStats('Wolf');
	body = new Circle(new SATVector(0, 0), this.stats.radius);
}
