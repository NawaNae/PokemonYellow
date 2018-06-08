/**
 * @class PropItem
 * @classdesc 道具類別。如藥水、寶可夢球等等。
 * 
 * @prop {string} name 道具名稱。
 * @prop {number} count 道具的堆疊數量。
 */
var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.PropItem =
class PropItem {
    /**
     * @constructor 
     * @param {string} name 道具名稱。(optional)
     * @param {number} count 道具的堆疊數量。(optional)
     * @param {function} use 使用呼叫的函數 若使用成功請回傳true (optional)
     * @param {bool} 是否自動遞減物品數量(當使用時) (optional)
    * /
   //**
     * Copy Constructor
     * @constructor
     * @param {Prop} Object 複製來源
     * 
     */
    constructor(name, count, use, isAutoDecreasing=true ,selectSend) {
       
        this._name = name;
        this._count = count;
        this.use=use;
        this.selectSend=selectSend;
        this._selectSend=param1=>
        {
            if(typeof this.selectSend!=='undefined')
                this.selectSend(param1)
            else
                this._use(param1);
        }
        this._use=(param1)=>{
            if(this.use)var result=this.use(param1);
            if(this.isDecreasing&&result)this.count--;
        }
        this.isDecreasing=isAutoDecreasing;
        if(name&&(name.name||name._name||name.count||name._count||name.use||name.isAutoDecreasing))
        {
            this.copy(name);   
        }
    }
    /**
     * 
     * @param {string} val 
     * @param {*} count 
     * @param {*} use 
     * @param {*} isAutoDecreasing 
     */
    copy(val,count,use,isAutoDecreasing,selectSend)
    {
        if(typeof val === "undefined")
            return new this.constructor(this._name,this._count,this.use,this.isDecreasing,this.selectSend);
        if(typeof val === "string")
        {
            this._name=val;
            this._count=count;
            this.use=use;
            this.selectSend=selectSend;
            this.isDecreasing=isAutoDecreasing;
        }
        else if(val&&(val.name||val._name||val.count||val._count||val.use||val.isAutoDecreasing||val.selectSend||val._selectSend))
        {
            var name=val.name||val._name;
            this._name=name||this.name;
            this._count=val.count||val._count;
            this.selectSend=val.selectSend||this.selectSend;
            this.use=val.use||this.use;
            this.isDecreasing=val.isDecreasing||val._isDecreasing;
        }
    }
    set isDecreasing(bool){if(typeof this._count==="undefined"){console.warn("請確保有count的情況下再設定");return;}this._isDecreasing=bool;}
    get isDecreasing(){return this._isDecreasing;}
    
    get name() { return this._name; }
    set name(newName) { this._name = newName; }

    get count() { return this._count; }
    set count(newCount) { this._count = newCount; }
};