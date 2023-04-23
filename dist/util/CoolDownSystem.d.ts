import { type ITickData } from '../types.js';
export default class CoolDownSystem {
    private readonly list;
    update(tickData: ITickData): void;
    isCoolingDown(key?: string): boolean;
    isReady(key?: string): boolean;
    add(key: string, time: number): void;
    remove(key: string): void;
    clear(): void;
}
//# sourceMappingURL=CoolDownSystem.d.ts.map