import SAT from 'sat';
import type {ITickData} from '../types.js';
import type World from '../world/World.js';
import type Entity from '../entity/Entity.js';
import Player from './Player.js';

export default class Casual<T extends Entity> extends Player<T> {}
