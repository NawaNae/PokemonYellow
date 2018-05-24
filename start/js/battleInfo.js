/**
 * @class BattleInfo
 * @classdesc 紀錄戰鬥台上的寶可夢戰鬥資訊。
 * 
 * @prop {GameSystem.Classes.Pokemon} pokemon 在戰鬥的寶可夢。
 * @prop {number} attackLevel 攻擊的能力階級。
 * @prop {number} defenseLevel 防禦的能力階級。
 * @prop {number} speedLevel 速度的能力階級。
 * @prop {number} accuracyLevel 命中率的能力階級。
 * @prop {number} evasionRateLevel 閃避率的能力階級。
 */
var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.BattleInfo =
class BattleInfo {
    constructor(pokemon) {
        //this._original = pokemon;
        this._pokemon = pokemon;
        this._attackLevel = 0;
        this._defenseLevel = 0;
        this._speedLevel = 0;
        this._accuracyLevel = 0;
        this._evasionRateLevel = 0;
    }

    get pokemon() { return this._pokemon; }

    // #region ======================================== 階級變換類 ========================================

    /**
     * 變更攻擊階級。
     * @param {number} diff 攻擊階級的差。
     * @return {boolean} 是否成功更改了階級。
     */
    changeAttackLevel(diff) {
        if (this._attackLevel == 6 && diff > 0 || this._attackLevel == -6 && diff < 0){
            return false;
        }
        else {
            this._attackLevel = this._levelFilter(this._attackLevel + diff);
            return true;
        }
    }

    /**
     * 變更防禦階級。
     * @param {number} diff 防禦階級的差。
     * @return {boolean} 是否成功更改了階級。
     */
    changeDefenseLevel(diff) {
        if (this._defenseLevel == 6 && diff > 0 || this._defenseLevel == -6 && diff < 0){
            return false;
        }
        else {
            this._defenseLevel = this._levelFilter(this._defenseLevel + diff);
            return true;
        }
    }

    /**
     * 變更特殊階級。
     * @param {number} diff 特殊階級的差。
     * @return {boolean} 是否成功更改了階級。
     */
    changeSpecialLevel(diff) {
        if (this._specialLevel == 6 && diff > 0 || this._specialLevel == -6 && diff < 0){
            return false;
        }
        else {
            this._specialLevel = this._levelFilter(this._specialLevel + diff);
            return true;
        }
    }

    /**
     * 變更速度階級。
     * @param {number} diff 速度階級的差。
     * @return {boolean} 是否成功更改了階級。
     */
    changeSpeedLevel(diff) {
        if (this._speedLevel == 6 && diff > 0 || this._speedLevel == -6 && diff < 0){
            return false;
        }
        else {
            this._speedLevel = this._levelFilter(this._speedLevel + diff);
            return true;
        }
    }

    /**
     * 變更精精準階級。
     * @param {number} diff 精準階級的差。
     * @return {boolean} 是否成功更改了階級。
     */
    changeAccuracyLevel(diff) {
        if (this._accuracyLevel == 6 && diff > 0 || this._accuracyLevel == -6 && diff < 0){
            return false;
        }
        else {
            this._accuracyLevel = this._levelFilter(this._accuracyLevel + diff);
            return true;
        }
    }

    /**
     * 變更迴避階級。
     * @param {number} diff 迴避階級的差。
     * @return {boolean} 是否成功更改了階級。
     */
    changeEvasionLevel(diff) {
        if (this._evasionRateLevel == 6 && diff > 0 || this._evasionRateLevel == -6 && diff < 0){
            return false;
        }
        else {
            this._evasionRateLevel = this._levelFilter(this._evasionRateLevel + diff);
            return true;
        }
    }

    /**
     * 等級過濾器。檢查等級是否有在[-6,6]之間的範圍，若有則修正之。
     * @param {number} level 修改過的等級。
     * @return {number} 修正後的等級。
     */
    _levelFilter(level) {
        if (level > 6)
            return 6;
        else if (level < -6)
            return -6;
        else
            return level;
    }

    // #endregion ==========================================================================================

    // #region ======================================== 取得能力值 ========================================

    /** 
     * 取得寶可夢在戰鬥台上的攻擊力。
     * @return {number} 在戰鬥台上的攻擊力。
     */
    get attack() {
        return (2 + Math.max(0, this._attackLevel)) / (2 + Math.max(0, -this._attackLevel)) * this.pokemon.attack;
    }

    /**
     * 取得寶可夢在戰鬥台上的防禦力。
     * @return {number} 在戰鬥台上的防禦力。
     */
    get defense() {
        return (2 + Math.max(0, this._defenseLevel)) / (2 + Math.max(0, -this._defenseLevel)) * this.pokemon.defense;
    }

    /**
     * 取得寶可夢在戰鬥台上的特殊值。
     * @return {number} 在戰鬥台上的特殊值。
     */
    get special() {
        return (2 + Math.max(0, this._specialLevel)) / (2 + Math.max(0, -this._specialLevel)) * this.pokemon.special;
    }

    /**
     * 取得寶可夢在戰鬥台上的速度值。
     * @return {number} 在戰鬥台上的速度值。
     */
    get speed() {
        return (2 + Math.max(0, this._speedLevel)) / (2 + Math.max(0, -this._speedLevel)) * this.pokemon.speed;
    }

    /**
     * 取得寶可夢在戰鬥台上的命中機率。
     * @return {number} 在戰鬥台上的命中機率。
     */
    get accuracy() {
        return (2 + Math.max(0, this._accuracyLevel)) / (2 + Math.max(0, -this._accuracyLevel));
    }

    /**
     * 取得寶可夢在戰鬥台上的閃避率。
     * @return {number} 在戰鬥台上的閃避率。
     */
    get evasion() {
        return (2 + Math.max(0, this._evasionRateLevel)) / (2 + Math.max(0, -this._evasionRateLevel));
    }

    // #endregion ============================================================================================

    /**
     * 實作「寶可夢接受傷害」的動作
     * @param {number} damage 傷害數值。
     * @return {boolean} 表示此寶可夢是否被打到瀕死。
     */
    acceptDamage(damage) {
        this._pokemon.HP = this._pokemon.HP - damage;
        if (this._pokemon.HP <= 0) {
            this._pokemon.HP = 0;
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * 進行變更寶可夢的動作。
     * @param {GameSystem.Classes.Pokemon} pokemon 上場的寶可夢。
     */
    changePokemon(pokemon) {
        this._pokemon = pokemon;
        this._attackLevel = 0;
        this._defenseLevel = 0;
        this._specialLevel = 0;
        this._accuracyLevel = 0;
        this._evasionRateLevel = 0;
    }
}