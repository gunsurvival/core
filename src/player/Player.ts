import {SATVector} from 'detect-collisions';
import {AsyncEE} from './../util/AsyncEE.js';
import type {ITickData} from '../types.js';
import type World from '../world/World.js';
import type Entity from '../entity/Entity.js';

export default abstract class Player<T extends Entity = Entity> {
	entity: T;
	event = new AsyncEE<PlayerEventMap>();
	state = {};

	constructor(public isOnline = false) {}

	get isReady() {
		return Boolean(this.entity);
	}

	playAs(entity: T) {
		this.entity = entity;
		this.event.emit('ready').catch(console.error);
	}

	update(world: World, tickData: ITickData) {}
}

export type PlayerEventMap = {
	'ready': () => void;
};
