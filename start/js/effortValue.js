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
     * 增加各項努力值。
     * @param {number} maxHP 最大生命值。
     * @param {number} attack 攻擊力。
     * @param {number} defense 防禦力。
     * @param {number} special 特殊值。
     * @param {number} speed 速度值。
     */
    gainEffortValue(maxHP, attack, defense, special, speed) {
        this.maxHP += maxHP;
        this.attack += attack;
        this.defense += defense;
        this.special += special;
        this.speed += speed;
    }

    /**
     * 重置各項努力數值。
     */
    reset() {
        this.maxHP = 0;
        this.attack = 0;
        this.defense = 0;
        this.special = 0;
        this.speed = 0;
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