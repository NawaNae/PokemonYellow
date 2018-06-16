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
 * @prop {boolean} isBurned 是否處於「灼燒狀態」。
 * @prop {boolean} isForzen 是否處於「冰凍狀態」。
 * @prop {boolean} isParalysis 是否處於「麻痺狀態」。
 * @prop {boolean} isPoisoned 是否處於「中毒狀態」。
 * @prop {boolean} isAsleep 是否處於「睡眠狀態」。
 * @prop {number} asleepTime 處於睡眠的回合數。
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
        this._isBurned = false;
        this._isForzen = false;
        this._isParalysis = false;
        this._isPoisoned = false;
        this._isAsleep = false;
        this._asleepTime = 0;
    }
    
    /** 寶可夢本身的資訊。 */
    get pokemon() { return this._pokemon; }

    /** 寶可夢的名稱。 */
    get name() { return this._pokemon.name; }

    /** 寶可夢的當前生命值 */
    get HP() { return this._pokemon.HP; }
    set HP(newHP) { this._pokemon.HP = newHP; }

    /** 寶可夢的最大血量。 */
    get maxHP() { return this._pokemon.maxHP; }

    /** 寶可夢的等級。 */
    get level() { return this._pokemon.level; }

    /** 寶可夢的第一屬性。 */
    get typeA() { return this._pokemon.typeA; }

    /** 寶可夢的第二屬性。 */
    get typeB() { return this._pokemon.typeB; }

    /** 取得寶可夢正面圖片 */
    get imagePath() { return this._pokemon.getImagePath(); }

    /** 取得寶可夢背部圖片 */
    get backImagePath() { return this._pokemon.getBackImagePath(); }

    /** 取的此寶可夢的捕獲率 */
    get catchRate() { return this._pokemon.getPokemonType().catchRate; }

    // #region ======================================== 階級變換類 ========================================

    /**
     * 指定能力種類，對其進行階級變化。
     * @param {GameSystem.Classes.Move} statusMove 變化的招式。
     * @return {number} 變更後的階級。
     */
    changeStatLevel(statusMove) {
        const StatType = GameSystem.Classes.Move.StatType;
        let statType = statusMove.statType;
        switch(statType) {
            case StatType.Attack:
                return this._changeAttackLevel(statusMove.levelChange);
            case StatType.Defnese:
                return this._changeDefenseLevel(statusMove.levelChange);
            case StatType.Speed:
                return this._changeSpeedLevel(statusMove.levelChange);
            case StatType.Accuracy:
                return this._changeAccuracyLevel(statusMove.levelChange);
            case StatType.EvasionRate:
                return this._changeEvasionLevel(statusMove.levelChange);;
        }
    }

    /**
     * 變更攻擊階級。
     * @private
     * @param {number} diff 攻擊階級的差。
     * @return {number} 階級變化差。
     */
    _changeAttackLevel(diff) {
        let originalLevel = this._attackLevel;
        this._attackLevel = this._levelFilter(this._attackLevel + diff);
        return this._attackLevel - originalLevel;
    }

    /**
     * 變更防禦階級。
     * @private
     * @param {number} diff 防禦階級的差。
     * @return {number} 階級變化差。
     */
    _changeDefenseLevel(diff) {
        let originalLevel = this._defenseLevel;
        this._defenseLevel = this._levelFilter(this._defenseLevel + diff);
        return this._defenseLevel - originalLevel;
    }

    /**
     * 變更速度階級。
     * @private
     * @param {number} diff 速度階級的差。
     * @return {number} 階級變化差。
     */
    _changeSpeedLevel(diff) {
        let originalLevel = this._speedLevel;
        this._speedLevel = this._levelFilter(this._speedLevel + diff);
        return this._speedLevel - originalLevel;
    }

    /**
     * 變更精精準階級。
     * @private
     * @param {number} diff 精準階級的差。
     * @return {number} 階級變化差。
     */
    _changeAccuracyLevel(diff) {
        let originalLevel = this._accuracyLevel;
        this._accuracyLevel = this._levelFilter(this._accuracyLevel + diff);
        return this._accuracyLevel - originalLevel;
    }

    /**
     * 變更迴避階級。
     * @private
     * @param {number} diff 迴避階級的差。
     * @return {number} 階級變化差。
     */
    _changeEvasionLevel(diff) {
        let originalLevel = this._evasionRateLevel;
        this._evasionRateLevel = this._levelFilter(this._evasionRateLevel + diff);
        return this._evasionRateLevel - originalLevel;
    }

    /**
     * 等級過濾器。檢查等級是否有在[-6,6]之間的範圍，若有則修正之。
     * @private
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
        return (2 + Math.max(0, this._attackLevel)) / (2 + Math.max(0, -this._attackLevel)) * this._pokemon.attack;
    }

    /**
     * 取得寶可夢在戰鬥台上的防禦力。
     * @return {number} 在戰鬥台上的防禦力。
     */
    get defense() {
        return (2 + Math.max(0, this._defenseLevel)) / (2 + Math.max(0, -this._defenseLevel)) * this._pokemon.defense;
    }

    /**
     * 取得寶可夢在戰鬥台上的速度值。
     * @return {number} 在戰鬥台上的速度值。
     */
    get speed() {
        let value = (2 + Math.max(0, this._speedLevel)) / (2 + Math.max(0, -this._speedLevel)) * this.pokemon.speed;
        return value / (this._isParalysis ? 2 : 1);
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

    // #region ======================================== 特殊狀態類 ========================================

    get isBurned() { return this._isBurned; }
    set isBurned(bool) { this._isBurned = bool; }

    get isForzen() { return this._isForzen; }
    set isForzen(bool) { this._isForzen = bool; }
    
    get isParalysis() { return this._isParalysis; }
    set isParalysis(bool) { this._isParalysis = bool; }

    get isPoisoned() { return this._isPoisoned; }
    set isPoisoned(bool) { this._isPoisoned = bool; }

    get isAsleep() { return this._isAsleep; }
    set isAsleep(bool) { this._isAsleep = bool; }

    get asleepTimes() { return this._asleepTime; }
    set asleepTimes(times) { this._asleepTime = times; }

    // #endregion =======================================================================================

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
        this._speedLevel = 0;
        this._accuracyLevel = 0;
        this._evasionRateLevel = 0;
        this._isBurned = false;
        this._isForzen = false;
        this._isParalysis = false;
        this._isPoisoned = false;
        this._isAsleep = false;
        this._asleepTime = 0;
    }
}