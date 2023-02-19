/// <reference types="sat" resolution-mode="require"/>
import { System, type Response } from 'detect-collisions';
import type Entity from '../entity/Entity.js';
import { type ITickData } from '../types.js';
import { MutateMap } from '../util/index.js';
export default abstract class World {
    entities: MutateMap<string, Entity>;
    collisionHashMap: Map<string, Response>;
    newCollisionHashMap: Map<string, Response>;
    physics: System;
    nextTick(tickData: ITickData): void;
    add(entity: Entity): void;
    remove(entity: Entity): void;
}
//# sourceMappingURL=World.d.ts.map