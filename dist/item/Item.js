export default class Item {
    id = this.constructor.name;
    amount = 1; // For stackable items (Use in Inventory.ts)
    primaryAction(player, world, tickData) { }
    update(tickData) { }
    canStackWith(item) {
        return item.constructor.name === this.constructor.name;
    }
}
//# sourceMappingURL=Item.js.map