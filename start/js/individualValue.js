var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
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
     * 取得個體值的副本。
     * @return {GameSystem.Classes.IndividualValue} 此個體值的副本。
     */
    clone() {
        return new GameSystem.Classes.IndividualValue(this._maxHP, this._attack, this._defense, this._special, this._speed);
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
        
        newIV.maxHP = (this.attack  % 2) ? 8 : 0 +
                      (this.defnese % 2) ? 4 : 0 +
                      (this.special % 2) ? 2 : 0 +
                      (this.speed   % 2) ? 1 : 0;
        return newIV;
    }
}