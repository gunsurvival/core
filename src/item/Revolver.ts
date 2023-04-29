import random from 'random';
import {SATVector} from 'detect-collisions';
import Bullet from '../entity/Bullet.js';
import {type ITickData} from '../types.js';
import type World from '../world/World.js';
import Gun from './Gun.js';
import {getStats} from '../stats.js';

export default class Revolver extends Gun {
	stats = getStats('Revolver');
	_stats = getStats('Revolver');
}
