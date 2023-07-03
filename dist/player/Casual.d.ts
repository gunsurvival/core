/// <reference types="sat" resolution-mode="require"/>
import type { ITickData } from '../types.js';
import type World from '../world/World.js';
import Player, { type PlayerEventMap } from './Player.js';
import { SATVector } from 'detect-collisions';
import { type AsyncEE } from '../util/AsyncEE.js';
import type Entity from '../entity/Entity.js';
export default class Casual<T extends Entity = Entity> extends Player<T> {
    event: AsyncEE<CasualPlayerEventMap>;
    fallbackSpeed: number;
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
    update(world: World, tickData: ITickData): void;
    getSpeedV(): SATVector;
    get speed(): number;
}
type CasualPlayerEventMap = PlayerEventMap & {
    shoot: () => void;
};
export {};
//# sourceMappingURL=Casual.d.ts.map