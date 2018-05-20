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
     * @param {function} use 使用呼叫的函數 若使用成功請回傳true
     */
    constructor(name, count = 1, use, isAutoDecreasing=true) {
        this._name = name;
        this._count = count;
        this._use=()=>{
            if(this.use)var result=this.use();
            if(this.isDecreasing&&result)this.count--;
        }
        this.isDecreasing=isAutoDecreasing;
    }
    set isDecreasing(bool){if(typeof this._count==="undefined"){console.warn("請確保有count的情況下再設定");return;}this._isDecreasing=bool;}
    get isDecreasing(){return this._isDecreasing;}

    get name() { return this._name; }
    set name(newName) { this._name = newName; }

    get count() { return this._count; }
    set count(newCount) { this._count = newCount; }
};