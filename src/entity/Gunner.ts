import {type Response, Circle, SATVector, type Body} from 'detect-collisions';
import Bush from './Bush.js';
import Bullet from './Bullet.js';
import {getStats} from '../stats.js';
import Entity from './Entity.js';
import Slow from '../effect/Slow.js';
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

	update(world: World, tickData: ITickData): void {}

	onCollisionEnter(other: Entity, response: Response) {
		if (other instanceof Bullet) {
			this._stats.health -= other.speed;
			if (this._stats.health <= 0) {
				this._stats.health = 0;
			}

			other.destroy();
		}

		if (other instanceof Bush) {
			if (!this.effects.get('slow-on-bush')) {
				this.addEffect('slow-on-bush', new Slow(0.5));
			}
		}
	}

	onCollisionStay(other: Entity, response: Response) {
		if (other instanceof Gunner) {
			this.body.setPosition(
				this.body.pos.x - (response.overlapV.x + response.overlapN.x) / 2,
				this.body.pos.y - (response.overlapV.y + response.overlapN.y) / 2,
			);
		}
	}

	onCollisionExit(other: Entity, response: Response) {
		if (other instanceof Bush) {
			this.removeEffect('slow-on-bush');
		}
	}
}

export type GunnerEventMap = EntityEventMap;
