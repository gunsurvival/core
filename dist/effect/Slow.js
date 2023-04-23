import Effect from './Effect.js';
export default class Slow extends Effect {
    strength;
    constructor(strength = 1) {
        super();
        this.strength = strength;
    }
    calc(entity, world, tickData) {
        entity._stats.speed *= this.strength;
    }
}
//# sourceMappingURL=Slow.js.map