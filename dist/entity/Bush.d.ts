/// <reference types="sat" resolution-mode="require"/>
import { type Body, SATVector } from 'detect-collisions';
import Entity from './Entity.js';
export type StatsBush = {
    radius: number;
};
export default class Bush extends Entity {
    stats: {
        radius: number;
        speed: number;
        health: number;
    };
    _stats: {
        radius: number;
        speed: number;
        health: number;
    };
    body: Body;
    constructor(pos?: SATVector);
}
//# sourceMappingURL=Bush.d.ts.map