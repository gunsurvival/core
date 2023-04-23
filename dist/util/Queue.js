export class Queue {
    timeout;
    _queue = [];
    constructor(timeout = 0) {
        this.timeout = timeout;
    }
    async create(id) {
        return new Promise((resolve, reject) => {
            this._queue.push({ id, resolve, reject });
            if (this.timeout > 0) {
                // SetTimeout(resolve, this.timeout);
            }
        });
    }
    resolve(id, data) {
        const item = this._queue.find(item => item.id === id);
        if (item) {
            item.resolve(data);
            this._queue.splice(this._queue.indexOf(item), 1);
        }
    }
}
//# sourceMappingURL=Queue.js.map