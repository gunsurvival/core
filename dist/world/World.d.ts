/// <reference types="sat" />
import { Schema, MapSchema } from '@colyseus/schema';
import { System, type Response } from 'detect-collisions';
import Entity from '../entity/Entity.js';
import { type TickData } from '../types.js';
export default class World extends Schema {
    entities: MapSchema<Entity, string>;
    collisionHashMap: Map<string, Response>;
    newCollisionHashMap: Map<string, Response>;
    physics: System;
    nextTick(tickData: TickData): void;
    add(entity: Entity): void;
    remove(entity: Entity): void;
}
//# sourceMappingURL=World.d.ts.map