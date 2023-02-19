import SAT from 'sat';
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
    playAs(entity) {
        this.entity = entity;
    }
    update(world, tickData) {
        const vel = this.getSpeedV().scale(tickData.delta);
        this.entity.body.setPosition(this.entity.body.x + vel.x, this.entity.body.y + vel.y);
    }
    getSpeedV() {
        const speed = this.entity.stats.speed || this.fallbackSpeed;
        return new SAT.Vector(this.state.keyboard.a ? -1 : this.state.keyboard.d ? 1 : 0, this.state.keyboard.w ? -1 : this.state.keyboard.s ? 1 : 0).scale((1 / Math.sqrt(2)) * speed);
    }
}
//# sourceMappingURL=Casual.js.map