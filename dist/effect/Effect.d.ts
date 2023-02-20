import type { ITickData } from '../types.js';
import type World from '../world/World.js';
export default abstract class Effect {
    id: number;
    markAsRemove: boolean;
    destroy(): void;
    abstract calc(stats: unknown, world: World, tickData: ITickData): void;
}
//# sourceMappingURL=Effect.d.ts.map