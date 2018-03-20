GameSystem.Classes.StandardStat =
/**
 * @class StandardStat
 * @classdesc 紀錄寶可夢的基本五種狀態值。
 * @prop {number} _maxHP 最大生命值。
 * @prop {number} attack 攻擊力。
 * @prop {number} defense 防禦力。
 * @prop {number} special 特殊值。
 * @prop {number} speed 速度值。
 */
class StandardStat {
    constructor(maxHP = 8, attack = 1, defense = 1, special = 1, speed = 1) {
        if (maxHP < 0 || attack < 0 || defense <= 0 || special < 0 || speed < 0) {
            throw new Error("Status values must >= 0. Stat \"defense\" must > 0.");
        }
        this._maxHP = maxHP;
        this._attack = attack;
        this._defense = defense;
        this._special = special;
        this._speed = speed;
    }

    set maxHP(newMaxHP) { if (newMaxHP >= 0) this._maxHP = newMaxHP; else throw new Error("\"maxHP\" value must >= 0."); }
    get maxHP() { return this._maxHP; }

    set attack(newAttack) { if (newAttack >= 0) this._attack = newAttack; else throw new Error("\"attack\" value must >= 0."); }
    get attack() { return this._attack; }

    set defense(newDefense) { if (newDefense > 0) this._defense = newDefense; else throw new Error("\"defense\" value must > 0."); }
    get defense() { return this._defense; }

    set special(newSpecial) { if (newSpecial >= 0) this._special = newSpecial; else throw new Error("\"specail\" value must >= 0."); }
    get special() { return this._defense; }

    set speed(newSpeed) { if (newSpeed >= 0) this._speed = newSpeed; else throw new Error("\"speed\" value must >= 0."); }
    get speed() { return this._speed; }
}

/**
 * 列舉。為寶可夢或招式的「屬性」。
 * @readonly
 * @enum {Symbol}
 */
GameSystem.Classes.StandardStat.Type = Object.freeze({
    /** 「一般」屬性 */
    Normal: Symbol("Normal"),

    /** 「格鬥」屬性 */
    Fighting: Symbol("Fighting"),

    /** 「飛行」屬性 */
    Flying: Symbol("Flying"),

    /** 「毒」屬性 */
    Poison: Symbol("Poison"),

    /** 「地面」屬性 */
    Ground: Symbol("Ground"),

    /** 「岩石」屬性 */
    Rock: Symbol("Rock"),

    /** 「蟲」屬性 */
    Bug: Symbol("Bug"),

    /** 「幽靈」屬性 */
    Ghost: Symbol("Ghost"),

    /** 「火」屬性 */
    Fire: Symbol("Fire"),

    /** 「水」屬性 */
    Water: Symbol("Water"),

    /** 「草」屬性 */
    Grass: Symbol("Grass"),

    /** 「電」屬性 */
    Electric: Symbol("Electric"),

    /** 「超能力」屬性 */
    Phycsic: Symbol("Phycsic"),

    /** 「冰」屬性 */
    Ice: Symbol("Ice"),

    /** 「龍」屬性 */
    Dragon: Symbol("Dragon")
});