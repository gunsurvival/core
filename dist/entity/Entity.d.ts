/// <reference types="sat" resolution-mode="require"/>
import { type stats } from './../stats.js';
import { type Vector2D } from 'visibility-polygon';
import { type Body, type Response, SATVector } from 'detect-collisions';
import type { ITickData } from '../types.js';
import { AsyncEE } from '../util/AsyncEE.js';
import type Effect from '../effect/Effect.js';
import type World from '../world/World.js';
export default abstract class Entity {
    id: string;
    name: string;
    markAsRemove: boolean;
    elapsedTick: number;
    effects: Map<string, Effect>;
    event: AsyncEE;
    vel: SATVector;
    visibility: Vector2D[];
    abstract body: Body;
    abstract stats: typeof stats[keyof typeof stats];
    abstract _stats: typeof stats[keyof typeof stats];
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
//# sourceMappingURL=Entity.d.ts.map