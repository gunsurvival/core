import {Circle, type Response, SATVector, type Body} from 'detect-collisions';
import {type EntityStats, getStats} from '../stats.js';
import Entity from './Entity.js';
import Bullet from './Bullet.js';
import type World from '../world/World.js';
import {type ITickData} from '../types.js';

export default abstract class Mob extends Entity {
	lastMoveTimeStamp = 0;

	abstract body: Body; // Server state: This is relate to physic so no need to use custom mutate variable, changes auto assign it at end of update
	abstract stats: typeof EntityStats ; // Dynamic stats, this is used to calculate new stats with effects that have a duration
	abstract _stats: typeof EntityStats; // Base stats, this is used to calculate dynamic stats, changed permanently

	update(world: World, tickData: ITickData) {
		if (world.isOnline) {
			return;
		}

		if (tickData.elapsedMs - this.lastMoveTimeStamp > Math.random() * 1000 + 800) {
			this.vel.x = 0;
			this.vel.y = 0;
			switch (Math.floor(Math.random() * 5)) {
				case 0: // Only change angle
					this.body.angle = Math.random() * Math.PI * 2;
					break;

				case 1: { // Change angle and move
					this.body.angle = Math.random() * Math.PI * 2;
					this.vel.x = Math.cos(this.body.angle) * this.stats.speed;
					this.vel.y = Math.sin(this.body.angle) * this.stats.speed;
					break;
				}

				case 2: { // Only move
					this.vel.x = Math.cos(this.body.angle) * this.stats.speed;
					this.vel.y = Math.sin(this.body.angle) * this.stats.speed;
					break;
				}

				default:
					break;
			}

			this.lastMoveTimeStamp = tickData.elapsedMs;
		}
	}

	onCollisionEnter(other: Entity, response: Response) {
		if (other instanceof Bullet) {
			this._stats.health -= other.speed / 5;
			this.body.setScale(this._stats.health / 100);
			if (this._stats.health <= 30) {
				this.destroy();
			}
		}
	}

	onCollisionStay(other: Entity, response: Response) {
		other.body.setPosition(
			other.body.pos.x + response.overlapV.x,
			other.body.pos.y + response.overlapV.y,
		);
	}
}
