/// <reference types="sat" resolution-mode="require"/>
import { System, type Response } from 'detect-collisions';
import { AsyncEE } from '../util/AsyncEE.js';
import type Entity from '../entity/Entity.js';
import { type ITickData } from '../types.js';
export default abstract class World {
    entities: Map<string, Entity>;
    collisionHashMap: Map<string, Response>;
    newCollisionHashMap: Map<string, Response>;
    physics: System;
    event: AsyncEE;
    nextTick(tickData: ITickData): void;
    add(entity: Entity): void;
    remove(entity: Entity): void;
}
//# sourceMappingURL=World.d.ts.map