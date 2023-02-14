var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { type, Schema } from '@colyseus/schema';
import { safeId } from '../util/safeId';
export default class Effect extends Schema {
    id = safeId();
    markAsRemove = false;
    destroy() {
        this.markAsRemove = true;
    }
}
__decorate([
    type('number')
], Effect.prototype, "id", void 0);
__decorate([
    type('boolean')
], Effect.prototype, "markAsRemove", void 0);
//# sourceMappingURL=Effect.js.map