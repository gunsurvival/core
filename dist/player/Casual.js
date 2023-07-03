import Player from './Player.js';
import { SATVector } from 'detect-collisions';
export default class Casual extends Player {
    fallbackSpeed = 5;
    state = {
        keyboard: {
            w: false,
            a: false,
            s: false,
            d: false,
            shift: false,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
        },
        mouse: {
            left: false,
            middle: false,
            right: false,
        },
    };
    update(world, tickData) {
        super.update(world, tickData);
        if (this.state.mouse.left && this.entity.inventory.current.length > 0) {
            this.entity.inventory.current[0]?.primaryAction(this, world, tickData);
        }
        this.entity.vel.copy(this.getSpeedV());
    }
    getSpeedV() {
        return new SATVector(this.state.keyboard.a ? -1 : this.state.keyboard.d ? 1 : 0, this.state.keyboard.w ? -1 : this.state.keyboard.s ? 1 : 0).scale((1 / Math.sqrt(2)) * this.speed);
    }
    get speed() {
        return this.entity.stats.speed || this.fallbackSpeed;
    }
}
//# sourceMappingURL=Casual.js.map