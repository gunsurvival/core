/// <reference types="sat" resolution-mode="require"/>
import type * as EntityCore from '@gunsurvival/core/entity';
import { SATVector } from 'detect-collisions';
import type World from '../world/World.js';
export declare class Camera {
    pos: SATVector;
    angle: number;
    following: EntityCore.default;
    get x(): number;
    get y(): number;
    follow(entity: EntityCore.default): void;
    update(world: World): void;
}
//# sourceMappingURL=Camera.d.ts.map