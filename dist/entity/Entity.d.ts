/// <reference types="sat" resolution-mode="require"/>
import { type Vector2D } from 'visibility-polygon';
import { type Body, type Response, SATVector } from 'detect-collisions';
import type { EntityStats } from './../stats.js';
import type { ITickData } from '../types.js';
import { AsyncEE } from '../util/AsyncEE.js';
import type Effect from '../effect/Effect.js';
import type World from '../world/World.js';
import Inventory from '../Inventory.js';
export default abstract class Entity {
    id: string;
    name: string;
    markAsRemove: boolean;
    elapsedTick: number;
    effects: Map<string, Effect>;
    vel: SATVector;
    visibility: Vector2D[];
    event: AsyncEE<EntityEventMap>;
    inventory: Inventory;
    isStatic: boolean;
    abstract body: Body;
    abstract stats: typeof EntityStats;
    abstract _stats: typeof EntityStats;
    beforeUpdate(world: World, tickData: ITickData): void;
    afterUpdate(world: World, tickData: ITickData): void;
    destroy(): void;
    update(world: World, tickData: ITickData): void;
    onAdd(world: World): void;
    onRemove(world: World): void;
    onCollisionEnter(other: Entity, response: Response): void;
    onCollisionStay(other: Entity, response: Response): void;
    onCollisionExit(other: Entity, response: Response): void;
    init(data: Record<string, unknown>): void;
    assign(initData: Record<string, unknown>): void;
    addEffect(id: string, effect: Effect): void;
    removeEffect(id: string): void;
}
export type EntityEventMap = {
    '+effects': (effect: Effect) => void;
    '-effects': (effect: Effect) => void;
    'collision-enter': (entity: Entity) => void;
    'collision-stay': (entity: Entity) => void;
    'collision-exit': (entity: Entity) => void;
};
//# sourceMappingURL=Entity.d.ts.map