/// <reference types="sat" resolution-mode="require"/>
import { type BodyOptions, type Response, type Body } from 'detect-collisions';
import type { ITickData } from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';
export type StatsRock = {
    radius: number;
};
export default class Rock extends Entity {
    stats: StatsRock;
    body: Body;
    constructor(pos: SAT.Vector, bodyOptions?: BodyOptions);
    update(world: World, tickData: ITickData): void;
    onInit(): void;
    onDestroy(): void;
    onCollisionEnter(other: Entity, response: Response): void;
    onCollisionStay(other: Entity, response: Response): void;
    onCollisionExit(other: Entity, response: Response): void;
}
//# sourceMappingURL=Rock.d.ts.map