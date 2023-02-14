import { Schema } from '@colyseus/schema';
import { type TickData } from '../types';
import type World from '../world/World';
export default abstract class Effect extends Schema {
    id: number;
    markAsRemove: boolean;
    destroy(): void;
    abstract calc(stats: unknown, world: World, tickData: TickData): void;
}
//# sourceMappingURL=Effect.d.ts.map