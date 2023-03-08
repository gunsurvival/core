export default class CoolDownSystem {
    list = new Map();
    update(tickData) {
        this.list.forEach((value, key) => {
            this.list.set(key, value - tickData.deltaMs);
        });
    }
    isCoolingDown(key = 'default') {
        return this.list.get(key) > 0;
    }
    add(key, time) {
        this.list.set(key, time);
    }
    remove(key) {
        this.list.delete(key);
    }
    clear() {
        this.list.clear();
    }
}
//# sourceMappingURL=CoolDownSystem.js.map