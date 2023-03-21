/// <reference types="sat" resolution-mode="require"/>
import { type BodyOptions, type Response, type Body, type SATVector } from 'detect-collisions';
import Entity from './Entity.js';
export type StatsRock = {
    radius: number;
};
export default class Rock extends Entity {
    stats: StatsRock;
    _stats: StatsRock;
    body: Body;
    constructor(pos: SATVector, bodyOptions?: BodyOptions);
    onCollisionStay(other: Entity, response: Response): void;
}
//# sourceMappingURL=Rock.d.ts.map