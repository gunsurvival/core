import type { ITickData } from '../types.js';
import type World from '../world/World.js';
import type Entity from '../entity/Entity.js';
export default abstract class Effect {
    id: number;
    markAsRemove: boolean;
    destroy(): void;
    abstract calc(entity: Entity, world: World, tickData: ITickData): void;
}
//# sourceMappingURL=Effect.d.ts.map