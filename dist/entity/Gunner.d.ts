/// <reference types="sat" resolution-mode="require"/>
import { Circle, type Response } from 'detect-collisions';
import type { ITickData } from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';
export type StatsGunner = {
    health: number;
    speed: number;
    radius: number;
};
export default class Gunner extends Entity {
    stats: StatsGunner;
    body: Circle;
    update(world: World, tickData: ITickData): void;
    onInit(): void;
    onDestroy(): void;
    onCollisionEnter(other: Entity, response: Response): void;
    onCollisionStay(other: Entity, response: Response): void;
    onCollisionExit(other: Entity, response: Response): void;
}
//# sourceMappingURL=Gunner.d.ts.map