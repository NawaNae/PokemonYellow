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
        this._HP = this.maxHP;      // 初始化當前稱命值
    }

    set name(newName) { this._name = name; }
    get name() { return this._name; }

    set HP(newName) { this._HP = HP; }
    get HP() { return this._HP; }

    set level(newLevel) { this._level = level; }
    get level() { return this._level; }

    set exp(newExp) { this._exp = exp; }
    get exp() { return this._exp; }

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
        this.defense = Math.floor( ((TP.defense + IV.atdefensetack + Math.sqrt(EV.defense) / 8) + level) / 50 + 5 );
        this.special = Math.floor( ((TP.special + IV.special + Math.sqrt(EV.special) / 8) + level) / 50 + 5 );
        this.speed = Math.floor( ((TP.speed + IV.speed + Math.sqrt(EV.speed) / 8) + level) / 50 + 5 );
    }
}