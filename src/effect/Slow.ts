import type {ITickData} from '../types';
import type World from '../world/World';
import Effect from './Effect';

export default class Slow extends Effect {
	calc(stats: unknown, world: World, tickData: ITickData) {
		// Calc here
	}
}
