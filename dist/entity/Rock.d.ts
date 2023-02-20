/// <reference types="sat" resolution-mode="require"/>
import { type BodyOptions, type Response, type Body } from 'detect-collisions';
import Entity from './Entity.js';
export type StatsRock = {
    radius: number;
};
export default class Rock extends Entity {
    stats: StatsRock;
    body: Body;
    constructor(pos: SAT.Vector, bodyOptions?: BodyOptions);
    onCollisionStay(other: Entity, response: Response): void;
}
//# sourceMappingURL=Rock.d.ts.map