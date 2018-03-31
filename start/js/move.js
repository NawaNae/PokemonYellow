GameSystem.Classes.Move =
/**
 * @class Move
 * @classdesc 寶可夢可用的招式。
 * 
 * @prop {string} name 招式名稱。
 * @prop {string} description 此招式的敘述。
 * @prop {GameSystem.Classes.StandardStat.Type} type 招式的屬性。
 * @prop {number} power 招式的威力。
 * @prop {number} accuracy 招式的命中率。
 * @prop {number} priority 招式的優先度。
 */
class Move {
    /**
     * @param {string} name 此招式的招式名稱。
     * @param {string} description 招式的敘述。
     * @param {number} level 可使用此招式的門檻等級。
     * @param {GameSystem.Classes.StandardStat.Type} type 此招式的屬性。
     * @param {number} power 招式的威力。
     * @param {number} accuracy 招式的命中率。
     * @param {number?} priority 招式的優先度。
     */
    constructor(name, description, type, power, accuracy, priority = 0) {
        this._name = name;
        this._description = description;
        this._type = type;
        this._power = power;
        this._accuracy = accuracy;
        this._priority = priority;
    }

    set name(newName) { this._name = newName; }
    get name() { return this._name; }

    set description(newDescription) { this._description = newDescription; }
    get description() { return this._description; }

    set type(newType) { this._type = newType; }
    get type() { return this._type; }

    set power(newPower) { this._newPower = newPower; }
    get power() { return this._newPower; }

    set accuracy(newAccuracy) { this._accuracy = newAccuracy; }
    get accuracy() { return this._accuracy; }

    set priority(newPriority) { this._priority = newPriority; }
    get priority() { return this._priority; }
}