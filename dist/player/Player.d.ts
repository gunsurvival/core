/// <reference types="sat" resolution-mode="require"/>
import { SATVector } from 'detect-collisions';
import { AsyncEE } from './../util/AsyncEE.js';
import type { ITickData } from '../types.js';
import type World from '../world/World.js';
import type Entity from '../entity/Entity.js';
import Inventory from '../Inventory.js';
export default abstract class Player<T extends Entity = Entity> {
    isOnline: boolean;
    entity: T;
    fallbackSpeed: number;
    event: AsyncEE;
    inventory: Inventory;
    state: {
        keyboard: {
            w: boolean;
            a: boolean;
            s: boolean;
            d: boolean;
            shift: boolean;
            1: boolean;
            2: boolean;
            3: boolean;
            4: boolean;
            5: boolean;
            6: boolean;
            7: boolean;
            8: boolean;
            9: boolean;
        };
        mouse: {
            left: boolean;
            middle: boolean;
            right: boolean;
        };
    };
    constructor(isOnline?: boolean);
    get isReady(): boolean;
    playAs(entity: T): void;
    bindEvents(entity: Entity): void;
    unbindEvents(entity: Entity): void;
    update(world: World, tickData: ITickData): void;
    getSpeedV(): SATVector;
    get speed(): number;
}
//# sourceMappingURL=Player.d.ts.map