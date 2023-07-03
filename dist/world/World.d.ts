/// <reference types="sat" resolution-mode="require"/>
import { System, type Response } from 'detect-collisions';
import * as Entity from '../entity/index.js';
import { type ITickData } from '../types.js';
import { AsyncEE } from '../util/index.js';
export type IEvent = {
    type: string;
    args: any[];
};
export default abstract class World {
    entities: Map<string, import("../entity/Entity.js").default>;
    collisionHashMap: Map<string, Response>;
    newCollisionHashMap: Map<string, Response>;
    physics: System;
    event: AsyncEE<WorldEventMap>;
    events: IEvent[];
    lockApi: boolean;
    isOnline: boolean;
    constructor();
    nextTick(tickData: ITickData): void;
    setupEvents(): void;
    add(entity: Entity.default): void;
    remove(entity: Entity.default): void;
    api<Ev extends keyof WorldEventMap>(type: Ev, ...args: Parameters<WorldEventMap[Ev]>): Promise<ReturnType<WorldEventMap[Ev]> | undefined>;
}
export type WorldEventMap = {
    'api:+entities': (className: string, initial: Record<string, unknown>) => Entity.default;
    'api:-entities': (id: string) => void;
    '+entities': (entity: Entity.default) => void;
    '-entities': (entity: Entity.default) => void;
    '+events': (event: IEvent) => void;
};
//# sourceMappingURL=World.d.ts.map