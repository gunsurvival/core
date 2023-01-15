export default function player(Base) {
    return class extends Base {
        state;
        constructor(...args) {
            super(...args);
            console.log(this.id);
        }
        getSpeedV() {
            // Return new SAT.Vector(
            // 	this.state.moving.left ? -1 : this.state.moving.right ? 1 : 0,
            // 	this.state.moving.up ? -1 : this.state.moving.down ? 1 : 0,
            // ).scale(
            // 	(1 / Math.sqrt(2)) * this.speed * this.delta,
            // );
        }
    };
}
//# sourceMappingURL=Player.js.map