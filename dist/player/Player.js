import { SATVector } from 'detect-collisions';
import { AsyncEE } from './../util/AsyncEE.js';
import Inventory from '../Inventory.js';
export default class Player {
    isOnline;
    entity;
    fallbackSpeed = 5;
    event = new AsyncEE();
    inventory = new Inventory(4);
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
    constructor(isOnline = false) {
        this.isOnline = isOnline;
    }
    get isReady() {
        return Boolean(this.entity);
    }
    playAs(entity) {
        this.entity = entity;
        this.bindEvents(entity);
    }
    bindEvents(entity) {
        entity.event.on('collision-enter', () => {
            // This.event.emit('collision-enter');
        });
        entity.event.on('collision-exit', () => {
            // This.event.emit('collision-exit');
        });
    }
    unbindEvents(entity) {
        // Entity.event.off('collision-enter');
        // entity.event.off('collision-exit');
    }
    update(world, tickData) {
        this.inventory.update(tickData);
    }
    getSpeedV() {
        return new SATVector(this.state.keyboard.a ? -1 : this.state.keyboard.d ? 1 : 0, this.state.keyboard.w ? -1 : this.state.keyboard.s ? 1 : 0).scale((1 / Math.sqrt(2)) * this.speed);
    }
    get speed() {
        return this.entity._stats.speed || this.fallbackSpeed;
    }
}
//# sourceMappingURL=Player.js.map