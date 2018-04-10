GameSystem.Classes.EffortValue =
/**
 * @class EffortValue
 * @extends GameSystem.Classes.StandardStat
 * @classdesc 努力值，又另稱基礎數值。
 */
class EffortValue extends GameSystem.Classes.StandardStat {
    constructor(maxHP = 8, attack = 1, defense = 1, special = 1, speed = 1) {
        super(maxHP, attack, defense, special, speed);
    }

    /**
     * 取得努力值的副本。
     * @return {GameSystem.Classes.EffortValue} 此努力值的副本。
     */
    clone() {
        return new GameSystem.Classes.EffortValue(this._maxHP, this._attack, this._defense, this._special, this._speed);
    }

    /**
     * 傳回一個新的、空的努力值物件。
     * @return {EffortValue} 一個新的、空的努力值物件。
     */
    static GetEmptyValue() {
        return new EffortValue(0, 0, 0, 0, 0);
    }
}