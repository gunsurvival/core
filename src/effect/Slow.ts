import {type TickData} from '../types.js';
import type World from '../world/World.js';
import Effect from './Effect.js';

export default class Slow extends Effect {
	calc(stats: unknown, world: World, tickData: TickData) {
		// Calc here
	}
}
