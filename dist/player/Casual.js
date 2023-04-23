import Player from './Player.js';
import { SATVector } from 'detect-collisions';
import Ak47 from '../item/Ak47.js';
export default class Casual extends Player {
    constructor(isOnline = false) {
        super(isOnline);
        this.inventory.addItem(new Ak47()).catch(console.error);
        this.event.on('mousedown', (mouse) => {
            if (this.isOnline) {
                switch (mouse.button) {
                    case 0:
                        this.state.mouse.left = true;
                        break;
                    case 1:
                        this.state.mouse.middle = true;
                        break;
                    case 2:
                        this.state.mouse.right = true;
                        break;
                    default:
                        break;
                }
            }
        });
    }
    update(world, tickData) {
        super.update(world, tickData);
        const vel = this.getSpeedV().scale(tickData.delta);
        this.entity.body.setPosition(this.entity.body.x + vel.x, this.entity.body.y + vel.y);
        if (this.state.mouse.left && this.inventory.current.length > 0) {
            this.inventory.current[0]?.primaryAction(this, world, tickData);
        }
    }
    getSpeedV() {
        const speed = this.entity._stats.speed || this.fallbackSpeed;
        return new SATVector(this.state.keyboard.a ? -1 : this.state.keyboard.d ? 1 : 0, this.state.keyboard.w ? -1 : this.state.keyboard.s ? 1 : 0).scale((1 / Math.sqrt(2)) * speed);
    }
}
//# sourceMappingURL=Casual.js.map