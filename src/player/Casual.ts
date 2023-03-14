import type Entity from '../entity/Entity.js';
import type {ITickData} from '../types.js';
import type World from '../world/World.js';
import Bullet from '../entity/Bullet.js';
import Player from './Player.js';
import {SATVector} from 'detect-collisions';

export default class Casual<T extends Entity> extends Player<T> {
	update(world: World, tickData: ITickData) {
		super.update(world, tickData);
		const vel = this.getSpeedV().scale(tickData.delta);
		this.entity.body.setPosition(
			this.entity.body.x + vel.x,
			this.entity.body.y + vel.y,
		);
		if (this.state.mouse.left) {
			this.shoot(world);
		}
	}

	getSpeedV() {
		const speed = (this.entity.stats as {speed: number}).speed || this.fallbackSpeed;
		return new SATVector(
			this.state.keyboard.a ? -1 : this.state.keyboard.d ? 1 : 0,
			this.state.keyboard.w ? -1 : this.state.keyboard.s ? 1 : 0,
		).scale(
			(1 / Math.sqrt(2)) * speed,
		);
	}

	shoot(world: World) {
		if (this.coolDownSystem.isCoolingDown('shoot')) {
			return;
		}

		this.coolDownSystem.add('shoot', 100);

		// TODO: Xai Vector cua Sat2d co may ham co san thay vi math amogus
		const vel = {
			x: Math.cos(this.entity.body.angle) * 30,
			y: Math.sin(this.entity.body.angle) * 30,
		};
		const bullet = new Bullet({
			x: this.entity.body.pos.x + vel.x * 2,
			y: this.entity.body.pos.y + vel.y * 2,
		}, vel);
		world.add(bullet);
	}
}
