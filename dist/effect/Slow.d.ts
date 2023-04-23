import type Entity from '../entity/Entity.js';
import type { ITickData } from '../types.js';
import type World from '../world/World.js';
import Effect from './Effect.js';
export default class Slow extends Effect {
    strength: number;
    constructor(strength?: number);
    calc(entity: Entity, world: World, tickData: ITickData): void;
}
//# sourceMappingURL=Slow.d.ts.map