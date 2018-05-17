/**
 * @class NPC
 * @extends GameSystem.Classes.Character
 * @classdesc 非玩家角色。
 * 
 * @prop {GameSystem.Classes.Position[]?} behavior 此NPC的移動動作。
 * @prop {GameSystem.Classes.Plot?} plot 觸發此NPC時所會產生的劇情。
 */
GameSystem.Classes.NPC =
class NPC extends GameSystem.Classes.Character {
    /**
     * @param {string} name 此NPC的名稱。
     * @param {GameSystem.Classes.Position} position 此NPC的初始位置。
     * @param {GameSystem.Classes.Image} image 此NPC的圖片。
     * @param {GameSystem.Classes.Character.Face} face 此NPC的面向。
     * @param {GameSystem.Classes.Behavior?} behavior 此NPC的動作。(可選項)
     * @param {GameSystem.Classes.Plot || [Plot,Plot,...]} plot 觸發此NPC時所會產生的對話情景或動作，可以是陣列必須含condition來讓其選擇。(可選項)
     * @param {bool} randomlyWalk 是否自動執行隨機移動
     * @param {function} behavior 每過2000ms自動執行的函數 沒有定義則不執行
     */
    constructor(name, face, position, image, cutFunctionIndex, plot,randomlyWalk=false,behavior) {
        super(name, face, position, image,cutFunctionIndex);
        this.isRandomlyWalk=randomlyWalk;

        this._behavior = behavior;
        this._plotController=new GameSystem.Classes.PlotsController(plot,this);
        this._timeNumber;
    }
    behave()
    {  
        if(this.isPlayBehavior)
        {
            if(this._behavior)
                this._behavior();
            if(this.isRandomlyWalk)
                this.randomlyWalk();
        }
    }
    load(){this._timeNumber=setInterval(()=>this.behave(),2000);}
    teardown()
    {
        clearInterval(this._timeNumber);
    }
    randomlyWalk()
    {
        var i=Math.floor((Math.random() * 5));
        var dir=["Up","Down","Left","Right"];//0~4是走路 
        if(i!==5)//5不走
            this.walk(dir[i]);
    }

    set behavior(newBehavior) { this._behavior = newBehavior; }
    get behavior() { return this._behavior; }
    get plots(){return this._plotController.plots;}
    set plots(val){this._plotController.plots=new Array(val)}
    set plot(newPlot) { this._plotController.plot=newPlot; }
    get plot() { return this._plotController.plot; }
}