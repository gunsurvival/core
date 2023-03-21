import {type BodyOptions, type Body, Circle, type SATVector} from 'detect-collisions';
import {getStats} from '../stats.js';
import Entity from './Entity.js';

export type StatsBush = {
	radius: number;
};

export default class Bush extends Entity {
	stats = getStats<StatsBush>('Bush');
	_stats = getStats<StatsBush>('Bush');
	body: Body;

	constructor(pos: SATVector, bodyOptions: BodyOptions = {}) {
		super();
		this.body = new Circle(pos, this.stats.radius, bodyOptions);
	}
}
