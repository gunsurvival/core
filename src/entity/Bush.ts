import {type BodyOptions, type Body, Circle, SATVector} from 'detect-collisions';
import {getStats} from '../stats.js';
import Entity from './Entity.js';

export default class Bush extends Entity {
	stats = getStats('Bush');
	_stats = getStats('Bush');
	isStatic = true;
	body = new Circle(new SATVector(0, 0), this.stats.radius);
}
