/// <reference types="sat" resolution-mode="require"/>
import { type BodyOptions, type Body, type SATVector } from 'detect-collisions';
import Entity from './Entity.js';
export type StatsBush = {
    radius: number;
};
export default class Bush extends Entity {
    stats: StatsBush;
    _stats: StatsBush;
    body: Body;
    constructor(pos: SATVector, bodyOptions?: BodyOptions);
}
//# sourceMappingURL=Bush.d.ts.map