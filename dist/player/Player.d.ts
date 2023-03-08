import type { ITickData } from '../types.js';
import CoolDownSystem from '../util/CoolDownSystem.js';
import type World from '../world/World.js';
import type Entity from '../entity/Entity.js';
export default abstract class Player<T extends Entity> {
    entity: T;
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
    coolDownSystem: CoolDownSystem;
    playAs(entity: T): void;
    update(world: World, tickData: ITickData): void;
}
//# sourceMappingURL=Player.d.ts.map