/**
 * @class Plot
 * @classdesc 劇情，在玩家與NPC或物件對話時所會用到的內容安排。
 * 
 * @prop {string} name 劇情的名稱。
 * @prop {Paragraph[]} content 劇情的內容安排。
 * @prop {string} type 自動記錄type會依據目前的content之type變更
 */
var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.Plot =
class Plot {
    /**
     * @param {string} name 劇情的名稱。
     * @param {Paragraph[]?} content 劇情的內容安排。
     * @param {boolean function(void)} (Optional) conditionFunc 給Plot管理器判斷是否應該使用該Plot的Func 回傳true或者未設置會執行，不可以有參數輸入
     */
    constructor(name, content = [],conditionFunc=undefined) {
        this._name = name;
        this._content = content;
        this._type;
        this._index=0;
        this._keyInput=e=>this.currentContent&&this.currentContent.keyInput?this._content[this.index].keyInput(e):this.keyInput(e);
        this.condition=conditionFunc;//
        //pointer of keyInput st you can detour the function of KeyManager of this object
        //this handler will call keyhandler of content if content owns a keyInput handler
        autoBind(this);//綁定所有method
    }
    get lastContent()
    {
        return this._index>0?this._content[this._index-1]:undefined;
    }
    set lastContent(val){console.log("last content is read only getter")}
    get currentContent()
    {
        return this._index<this._content.length?this._content[this._index]:undefined;
    }
    set currentContent(val)
    {console.log("current content is read only getter");}
    end()
    {
        this.index=0;
        GameSystem.Manager.Key.keyInput=this.lastKeyInput;
    }
    /**
     * 執行一個內容 並遞增
     */
    step()
    {
        if(this.lastContent&&this.lastContent.end)
                this.lastContent.end();//結束上一個內容
        if(this.currentContent)
        {
            var content=this.currentContent;
            if(content.type)
                this.type=this.currentContent.type;
            this.index++;
            if(content.start)//如果有定義開始 
                content.start();
        }
        else
        {
            this.end();
        }
    }
    /**
     * @description keyInput之handler
     */
    keyInput(e)
    {
    }
     /**
      * @description 執行Plot 取得KeyInput
      */
    start()
    {
        //備份並取得當前keyInput
        this.lastKeyInput=GameSystem.Manager.Key.keyInput;
        GameSystem.Manager.Key.keyInput=this._keyInput;
        for(let content of this._content)
            content.plot=this;
        this.step();
    }
    set index(value){
        this._index=value;
        //this.type=this.type||(this._content[this._index])?this._content[this._index].type:undefined;
    }
    get currentLevel(){return Framework.Game._currentLevel;}
    set currentLevel(val){console.log("current level is read only getter");}
    get index(){return this._index;}
    set type(newType){this._type=newType;}
    get type(){return this._type;}
    set name(newName) { this._name = newName; }
    get name() { return this._name; }
    set content(newContent) { this._content = newContent; }
    get content() { return this._content; }
}
