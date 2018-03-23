GameSystem.Classes.IndividualValue =
/**
 * @class IndividualValue
 * @extends GameSystem.Classes.StandardStat
 * @classdesc 個體值的數值資料。
 */
class IndividualValue extends GameSystem.Classes.StandardStat {
    /**
     * 已指定的數值初始化個體值。
     * @param {number} maxHP 個體數值中的最大生命值。
     * @param {number} attack 個體數值中的攻擊力。
     * @param {number} defense 個體數值中的防禦力。
     * @param {number} special 個體數值中的特殊值。
     * @param {number} speed 個體數值中的速度值。
     */
    constructor(maxHP = 8, attack = 1, defense = 1, special = 1, speed = 1) {
        super(maxHP, attack, defense, special, speed);
    }

    /**
     * 取得新的、隨機生成的個體數值。
     * @return {IndividualValue} 一個新的、隨機生成過的個體數值。
     */
    static GetNewValue() {
        let newIV = new IndividualValue(Math.floor(Math.random() * 16),
                                        Math.floor(Math.random() * 16),
                                        Math.floor(Math.random() * 16),
                                        Math.floor(Math.random() * 16));
        
        newIV.maxHP = (this.attack  % 2) ? 0 : 8 +
                      (this.defnese % 2) ? 0 : 4 +
                      (this.special % 2) ? 0 : 2 +
                      (this.speed   % 2) ? 0 : 1;
        return newIV;
    }
}