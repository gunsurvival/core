/// <reference types="sat" resolution-mode="require"/>
import { type BodyOptions, type Body } from 'detect-collisions';
import Entity from './Entity.js';
export type StatsBush = {
    radius: number;
};
export default class Bush extends Entity {
    stats: StatsBush;
    body: Body;
    constructor(pos: SAT.Vector, bodyOptions?: BodyOptions);
}
//# sourceMappingURL=Bush.d.ts.map