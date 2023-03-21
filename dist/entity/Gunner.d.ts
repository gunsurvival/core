/// <reference types="sat" resolution-mode="require"/>
import { type Response, Circle } from 'detect-collisions';
import Entity from './Entity.js';
export type StatsGunner = {
    health: number;
    speed: number;
    radius: number;
};
export default class Gunner extends Entity {
    stats: StatsGunner;
    _stats: StatsGunner;
    body: Circle;
    onCollisionEnter(other: Entity, response: Response): void;
    onCollisionStay(other: Entity, response: Response): void;
}
//# sourceMappingURL=Gunner.d.ts.map