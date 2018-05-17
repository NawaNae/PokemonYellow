/**
 * @class PropItem
 * @classdesc 道具類別。如藥水、寶可夢球等等。
 * 
 * @prop {string} name 道具名稱。
 * @prop {number} count 道具的堆疊數量。
 */
GameSystem.Classes.PropItem =
class PropItem {
    /**
     * @param {string} name 道具名稱。
     * @param {number} count 道具的堆疊數量。
     */
    constructor(name, count = 1) {
        this._name = name;
        this._count = count;
    }

    get name() { return this._name; }
    set name(newName) { this._name = newName; }

    get count() { return this._count; }
    set count(newCount) { this._count = newCount; }
};