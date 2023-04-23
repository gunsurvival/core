import { SATVector } from 'detect-collisions';
export class Camera {
    pos = new SATVector(0, 0);
    angle = 0;
    following;
    get x() {
        return this.pos.x;
    }
    get y() {
        return this.pos.y;
    }
    follow(entity) {
        this.following = entity;
    }
    update(world) {
        if (!this.following) {
            return;
        }
        this.pos.x = this.following.body.pos.x;
        this.pos.y = this.following.body.pos.y;
    }
}
//# sourceMappingURL=Camera.js.map