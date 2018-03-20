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
}