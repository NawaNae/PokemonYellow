/**
 * @class NPC
 * @extends GameSystem.Classes.Character
 * @classdesc 非玩家角色。
 * 
 * @prop {GameSystem.Classes.Position[]?} behavior 此NPC的移動動作。
 * @prop {GameSystem.Classes.Plot?} plot 觸發此NPC時所會產生的劇情。
 * @prop {GameSystem.Classes.Pokemon[]?} pokemons 此NPC所擁有的寶可夢。
 * @prop {GameSystem.Classes.Image?} battleImage 戰鬥時的圖片。
 */
GameSystem.Classes.NPC =
class NPC extends GameSystem.Classes.Character {
    /**
     * @param {string} name 此NPC的名稱。
     * @param {GameSystem.Classes.Character.Face} face 此NPC的面向。
     * @param {GameSystem.Classes.Position} position 此NPC的初始位置。
     * @param {GameSystem.Classes.Image} image 此NPC的圖片。
     * @param {number} cutFunctionIndex 函數索引。
     * @param {GameSystem.Classes.Plot || [Plot,Plot,...]} plot 觸發此NPC時所會產生的對話情景或動作，可以是陣列必須含condition來讓其選擇。(可選項)
     * @param {boolean} randomlyWalk 是否自動執行隨機移動
     * @param {function} behavior 每過2000ms自動執行的函數 沒有定義則不執行
     * @param {GameSystem.Classes.Pokemon?} pokemons 此NPC所擁有的寶可夢。(可選項)
     * @param {GameSystem.Classes.Image?} battleImage 戰鬥時的圖片。(可選項)
     */
    constructor(name, face, position, image, cutFunctionIndex, plot, randomlyWalk=false, behavior, pokemons, battleImage) {
        super(name, face, position, image, cutFunctionIndex);
        this.isRandomlyWalk=randomlyWalk;

        this._behavior = behavior;
        this._plotController=new GameSystem.Classes.PlotsController(plot,this);
        this._timeNumber;
        this._pokemons = pokemons || [];
        this._battleImage = battleImage;
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

    set pokemons(newPokemons) { this._pokemons = newPokemons; }
    get pokemons() { return this._pokemons; }

    set battleImage(newBattleImage) { this._battleImage = newBattleImage; }
    get battleImage() { return this._battleImage; }

    /**
     * 取得角色圖片路徑。
     * @return {string} 角色圖片路徑。
     */
    getBattleImagePath() {
        return this._battleImage.src;
    }

    /**
     * 取得可戰鬥的寶可夢數量。
     * @return {number} 可戰鬥的寶可夢數量。
     */
    getAlivePokemonCount() {
        return this._pokemons.reduce((count, pokemon) => count + (pokemon.HP > 0 ? 1 : 0), 0);
    }

    /**
     * 取得昏厥的寶可夢數量。
     * @return {number} 昏厥的寶可夢數量。
     */
    getFaintPokemonCount() {
        return this._pokemons.reduce((count, pokemon) => count + (pokemon.HP <= 0 ? 1 : 0), 0);
    }
}