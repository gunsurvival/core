import { AsyncEE } from './../util/AsyncEE.js';
import type { ITickData } from '../types.js';
import type World from '../world/World.js';
import type Entity from '../entity/Entity.js';
export default abstract class Player<T extends Entity = Entity> {
    entity: T;
    event: AsyncEE<PlayerEventMap>;
    state: {};
    get isReady(): boolean;
    playAs(entity: T): void;
    update(world: World, tickData: ITickData): void;
}
export type PlayerEventMap = {
    ready: () => void;
};
//# sourceMappingURL=Player.d.ts.map