import { safeId } from '../util/safeId.js';
export default class Effect {
    id = safeId();
    markAsRemove = false;
    destroy() {
        this.markAsRemove = true;
    }
}
//# sourceMappingURL=Effect.js.map