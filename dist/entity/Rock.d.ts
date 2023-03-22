/// <reference types="sat" resolution-mode="require"/>
import { type Response, SATVector, type Body } from 'detect-collisions';
import Entity from './Entity.js';
import { type stats } from '../stats.js';
export type StatsRock = typeof stats.Rock;
export default class Rock extends Entity {
    stats: {
        radius: number;
        health: number;
    };
    _stats: {
        radius: number;
        health: number;
    };
    body: Body;
    constructor(pos?: SATVector);
    onCollisionStay(other: Entity, response: Response): void;
}
//# sourceMappingURL=Rock.d.ts.map