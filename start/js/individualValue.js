GameSystem.Classes.IndividualValue =
/**
 * @class IndividualValue
 * @extends GameSystem.Classes.StandardStat
 * @classdesc 個體值的數值資料。
 */
class IndividualValue extends GameSystem.Classes.StandardStat {
    constructor(maxHP = 8, attack = 1, defense = 1, special = 1, speed = 1) {
        super(maxHP, attack, defense, special, speed);
    }
}