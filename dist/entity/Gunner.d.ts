/// <reference types="sat" resolution-mode="require"/>
import { type Response, SATVector, type Body } from 'detect-collisions';
import Entity from './Entity.js';
export type StatsGunner = {
    health: number;
    speed: number;
    radius: number;
};
export default class Gunner extends Entity {
    stats: {
        health: number;
        speed: number;
        radius: number;
    };
    _stats: {
        health: number;
        speed: number;
        radius: number;
    };
    body: Body;
    constructor(pos?: SATVector);
    onCollisionEnter(other: Entity, response: Response): void;
    onCollisionStay(other: Entity, response: Response): void;
}
//# sourceMappingURL=Gunner.d.ts.map