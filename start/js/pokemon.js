/**
 * @class Pokemon
 * @extends GameSystem.Classes.StandardStat
 * @classdesc 寶可夢。紀錄一隻寶可夢身上所會有的參數、狀態、動作等等。
 * 
 * @prop {string} name 寶可夢的名稱。
 * @prop {number} HP 寶可夢當前的數
 * @prop {number} level 寶可夢的當前等級。
 * @prop {number} exp 寶可夢的當前經驗值。
 * @prop {GameSystem.Classes.PokemonType} typeInfo 此寶可夢的種族資訊。
 * @prop {GameSystem.Classes.IndividualValue} IV 寶可夢的「個體值」。
 * @prop {GameSystem.Classes.EffortValue} EV 寶可夢的「努力值」。
 * @prop {GameSystem.Classes.Move[]} moves 此寶可夢所會的「招式」。
 */
GameSystem.Classes.Pokemon =
class Pokemon extends GameSystem.Classes.StandardStat {
    /**
     * @param {string} name 寶可夢的名稱。
     * @param {GameSystem.Classes.PokemonType} typeInfo 表示這個寶可夢的種族及其資訊。
     */
    constructor(name, typeInfo) {
        super();
        this._name = name;
        this._level = 1;
        this._exp = 0;
        this._typeInfo = typeInfo;

        let IndividualValue = GameSystem.Classes.IndividualValue;
        let EffortValue = GameSystem.Classes.EffortValue;

        this._IV = IndividualValue.GetNewValue();    // 取得新的、隨機生成的個體數值
        this._EV = EffortValue.GetEmptyValue();      // 取得新的、空的努力數值
        this._moves = typeInfo.GetInitialMoves();    // 取得寶可夢最初所會的招式
        
        this.updateAbilities();     // 更新寶可夢的五大能力值
        this._HP = this.maxHP;      // 初始化當前生命值
    }

    set name(newName) { this._name = newName; }
    get name() { return this._name; }

    set HP(newHP) { this._HP = newHP; }
    get HP() { return this._HP; }

    set level(newLevel) { this._level = newLevel; }
    get level() { return this._level; }

    set exp(newExp) { this._exp = newExp; }
    get exp() { return this._exp; }

    get typeA() { return this._typeInfo.typeA; }
    get typeB() { return this._typeInfo.typeB; }

    /**
     * 更新寶可夢的五個基本數值。
     */
    updateAbilities() {
        let TP = this._typeInfo;
        let IV = this._IV;
        let EV = this._EV;
        let level = this._level;

        this.maxHP = Math.floor( ((TP.maxHP + IV.maxHP + Math.sqrt(EV.maxHP) / 8) + level) / 50 + 10 + level );
        this.attack = Math.floor( ((TP.attack + IV.attack + Math.sqrt(EV.attack) / 8) + level) / 50 + 5 );
        this.defense = Math.floor( ((TP.defense + IV.defense + Math.sqrt(EV.defense) / 8) + level) / 50 + 5 );
        this.special = Math.floor( ((TP.special + IV.special + Math.sqrt(EV.special) / 8) + level) / 50 + 5 );
        this.speed = Math.floor( ((TP.speed + IV.speed + Math.sqrt(EV.speed) / 8) + level) / 50 + 5 );
    }

    /**
     * 檢查此寶可夢是否擁有此招式。
     * @param {GameSystem.Classes.Move} move 要檢查的目標招式。
     * @return {boolean} 此寶可夢是否擁有此招式。
     */
    isHaveMove(move) {
        return this._moves.indexOf(move) >= 0;
    }

    /**
     * 隨機取得目前寶可夢所擁有的招式。
     * @return {GameSystem.Classes.Move} 隨機取得得招式。
     */
    randomlyTakeMove() {
        let index = Math.floor(Math.random() * this._moves.length);
        return this._moves[index];
    }

    /**
     * 取得圖片來源。
     * @return {string} 圖片來源位置。
     */
    getImageSrc() {
        return this._typeInfo.image.src;
    }

    /**
     * 取得此寶可夢的圖鑑編號。
     * @return {number} 圖鑑編號。
     */
    getNumber() {
        return this._typeInfo.id;
    }

    /**
     * 取得寶可夢所有的招式。
     * @return {GameSystem.Classes.Move[]} 寶可夢的所擁有的招式。
     */
    getMoves() {
        return this._moves;
    }

    /**
     * 取得這個寶可夢的圖片來源路徑。
     * @return {string} 圖片的來源路徑。
     */
    getImagePath() {
        return this._typeInfo.image.src;
    }

    /**
     * 取得這個寶可夢的「背面」之圖片來源路徑。
     * @return {string} 圖片的來源路徑。
     */
    getBackImagePath() {
        return this._typeInfo.backImage.src;
    }

    /**
     * 建立一個此寶可夢的副本。
     * @return {GameSystem.Classes.Pokemon} 新的寶可夢。
     */
    clone() {
        let Pokemon = GameSystem.Classes.Pokemon;
        let newPokemon = new Pokemon(this._name, this._typeInfo);   // 建立初始寶可夢副本
        newPokemon.maxHP = this.maxHP;          // 最大HP
        newPokemon.attack = this.attack;        // 攻擊力
        newPokemon.defense = this.defense;      // 防禦力
        newPokemon.special = this.special;      // 特殊值
        newPokemon.speed = this.speed;          // 速度值
        newPokemon.level = this.level;          // 等級
        newPokemon.exp = this.exp;              // 經驗
        newPokemon.HP = this.HP;                // HP
        newPokemon._IV = this._IV;              // 個體質
        newPokemon._EV = this._EV;              // 努力值
        newPokemon._moves = this._moves;        // 所學招式
        newPokemon.updateAbilities();

        return newPokemon;
    }
};

// For debugging
(() => {
    let DEX = GameSystem.Classes.PokemonType.Dictionary;
    GameSystem.Resource.Debug = GameSystem.Resource.Debug || {};
    GameSystem.Resource.Debug.pokemon1 = new GameSystem.Classes.Pokemon("妙蛙種子", DEX["妙蛙種子"]);
    GameSystem.Resource.Debug.pokemon2 = new GameSystem.Classes.Pokemon("小火龍", DEX["小火龍"]);
    GameSystem.Resource.Debug.pokemon3 = new GameSystem.Classes.Pokemon("傑尼龜", DEX["傑尼龜"]);
})();