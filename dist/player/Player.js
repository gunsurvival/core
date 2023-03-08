import CoolDownSystem from '../util/CoolDownSystem.js';
export default class Player {
    entity;
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
    coolDownSystem = new CoolDownSystem();
    playAs(entity) {
        this.entity = entity;
    }
    update(world, tickData) {
        this.coolDownSystem.update(tickData);
    }
}
//# sourceMappingURL=Player.js.map