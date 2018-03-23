GameSystem.Classes.Move =
/**
 * @class Move
 * @classdesc 寶可夢可用的招式。
 * 
 * @prop {string} name 招式名稱。
 * @prop {number} level 此可用此招式的門檻等級。
 * @prop {GameSystem.Classes.StandardStat.Type} type 招式的屬性。
 * @prop {number} power 招式的威力。
 * @prop {number} accuracy 招式的命中率。
 */
class Move {
    /**
     * @param {string} name 此招式的招式名稱。
     * @param {number} level 可使用此招式的門檻等級。
     * @param {GameSystem.Classes.StandardStat.Type} type 此招式的屬性。
     * @param {number} power 招式的威力。
     * @param {number} accuracy 招式的命中率。
     */
    constructor(name, level, type, power, accuracy) {
        this._name = name;
        this._level = level;
        this._type = type;
        this._power = power;
        this._accuracy = accuracy;
    }

    set name(newName) { this._name = newName; }
    get name() { return this._name; }

    set level(newLevel) { this._level = newLevel; }
    get level() { return this._level; }

    set type(newType) { this._type = newType; }
    get type() { return this._type; }

    set power(newPower) { this._newPower = newPower; }
    get power() { return this._newPower; }

    set accuracy(newAccuracy) { this._accuracy = newAccuracy; }
    get accuracy() { return this._accuracy; }
}