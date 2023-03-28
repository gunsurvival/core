import type Player from '../player/Player.js';
import CoolDownSystem from '../util/CoolDownSystem.js';
import type World from '../world/World.js';
import type {ITickData} from '../types.js';
import Item from './Item.js';

export default class Gun extends Item {
	coolDownSystem = new CoolDownSystem();

	constructor(public coolDownPrimary: number) {
		super();
	}

	update(tickData: ITickData) {
		this.coolDownSystem.update(tickData);
	}

	primaryAction(player: Player, world: World, tickData: ITickData) {
		if (this.coolDownSystem.isReady('primary')) {
			this.coolDownSystem.add('primary', this.coolDownPrimary);
			this.fire(player, world, tickData);
		}
	}

	fire(player: Player, world: World, tickData: ITickData) {
	}
}
