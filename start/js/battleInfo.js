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

    set attackLevel(newAttackLevel) { this._attackLevel = newAttackLevel; }
    get attackLevel() { return this._attackLevel; }

    set defenseLevel(newDefenseLevel) { this._defenseLevel = newDefenseLevel; }
    get defenseLevel() { return this._defenseLevel; }

    set specialLevel(newSpecialLevel) { this._specialLevel = newSpecialLevel; }
    get specialLevel() { return this._specialLevel; }

    set accuracyLevel(newAccuracyLevel) { this._accuracyLevel = newAccuracyLevel; }
    get accuracyLevel() { return this._accuracyLevel; }

    set evasionRateLevel(newEvasionRate) { this._evasionRateLevel = newEvasionRate; }
    get evasionRateLevel() { return this._evasionRateLevel; }

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

    changePokemon(pokemon) {
        this._pokemon = pokemon;
        this._attackLevel = 0;
        this._defenseLevel = 0;
        this._specialLevel = 0;
        this._accuracyLevel = 0;
        this._evasionRateLevel = 0;
    }
}