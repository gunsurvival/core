import type SAT from 'sat';
import { type Vector, type Body } from 'detect-collisions';
import { type ITickData } from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';
export type StatsBullet = {
    radius: number;
};
export default class Bullet extends Entity {
    body: Body;
    stats: StatsBullet;
    vel: Vector;
    constructor(pos: Vector, vel?: Vector);
    update(world: World, tickData: ITickData): void;
    onCollisionEnter(other: Entity, response: SAT.Response): void;
    init(data: {
        vel: Vector;
    }): void;
}
//# sourceMappingURL=Bullet.d.ts.map