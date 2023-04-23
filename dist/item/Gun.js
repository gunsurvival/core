import CoolDownSystem from '../util/CoolDownSystem.js';
import Item from './Item.js';
export default class Gun extends Item {
    coolDownPrimary;
    coolDownSystem = new CoolDownSystem();
    constructor(coolDownPrimary) {
        super();
        this.coolDownPrimary = coolDownPrimary;
    }
    update(tickData) {
        this.coolDownSystem.update(tickData);
    }
    primaryAction(player, world, tickData) {
        if (this.coolDownSystem.isReady('primary')) {
            this.coolDownSystem.add('primary', this.coolDownPrimary);
            this.fire(player, world, tickData);
        }
    }
    fire(player, world, tickData) {
    }
}
//# sourceMappingURL=Gun.js.map