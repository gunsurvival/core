import {getStats} from '../stats.js';
import Gunner, {type StatsGunner} from './Gunner.js';

export type StatsAIGunner = Record<string, unknown> & StatsGunner;

export default class AIGunner extends Gunner {
	stats = getStats('Gunner');
	_stats = getStats('Gunner');
}
