import {type Response, Circle, SATVector, type Body} from 'detect-collisions';
import type Bullet from './Bullet.js';
import {getStats} from '../stats.js';
import Entity from './Entity.js';
import Slow from '../effect/Slow.js';
import Inventory from '../Inventory.js';
import {type ITickData} from '../types.js';
import type World from '../world/World.js';
import {type EntityEventMap} from './Entity.js';
import {type AsyncEE} from '../index.js';
import * as Item from '../item/index.js';

export default class Gunner extends Entity {
	declare event: AsyncEE<GunnerEventMap>;
	stats = getStats('Gunner');
	_stats = getStats('Gunner');
	body = new Circle(new SATVector(0, 0), this.stats.radius);

	constructor() {
		super();
		this.inventory.addItem(new Item.Ak47()).catch(console.error);
		this.inventory.addItem(new Item.Revolver()).catch(console.error);
	}

	update(world: World, tickData: ITickData): void {

	}

	onCollisionEnter(other: Entity, response: Response) {
		switch (other.constructor.name) {
			case 'Bullet':
				this._stats.health -= (other as Bullet).speed;
				if (this._stats.health <= 0) {
					this._stats.health = 0;
				}

				break;
			case 'Bush':
				if (!this.effects.get('slow-on-bush')) {
					this.addEffect('slow-on-bush', new Slow(0.5));
				}

				break;
			default:
				break;
		}
	}

	onCollisionStay(other: Entity, response: Response) {
		switch (other.constructor.name) {
			case 'Gunner':
				this.body.setPosition(
					this.body.pos.x - (response.overlapV.x + response.overlapN.x) / 2,
					this.body.pos.y - (response.overlapV.y + response.overlapN.y) / 2,
				);
				break;
			default:
				break;
		}
	}

	onCollisionExit(other: Entity, response: Response) {
		switch (other.constructor.name) {
			case 'Bush':
				this.removeEffect('slow-on-bush');

				break;
			default:
				break;
		}
	}
}

export type GunnerEventMap = EntityEventMap & {
	shoot: () => void;
};
