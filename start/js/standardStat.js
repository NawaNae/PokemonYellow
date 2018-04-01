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
        this._maxHP = maxHP;
        this._attack = attack;
        this._defense = defense;
        this._special = special;
        this._speed = speed;
    }

    set maxHP(newMaxHP) { this._maxHP = newMaxHP; }
    get maxHP() { return this._maxHP; }

    set attack(newAttack) { this._attack = newAttack;  }
    get attack() { return this._attack; }

    set defense(newDefense) { this._defense = newDefense; }
    get defense() { return this._defense; }

    set special(newSpecial) { this._special = newSpecial; }
    get special() { return this._defense; }

    set speed(newSpeed) { this._speed = newSpeed; }
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

/** 初始化「屬性相剋表」 */
(() => {
    let T = GameSystem.Classes.StandardStat.Type;
    let table = {
        [T.Normal]: {
              [T.Normal]: 1,
            [T.Fighting]: 1,
              [T.Flying]: 1,
              [T.Poison]: 1,
              [T.Ground]: 1,
                [T.Rock]: 0.5,
                 [T.Bug]: 1,
               [T.Ghost]: 0,
                [T.Fire]: 1,
               [T.Water]: 1,
               [T.Grass]: 1,
            [T.Electric]: 1,
             [T.Phycsic]: 1,
                 [T.Ice]: 1,
              [T.Dragon]: 1
        },
        [T.Fighting]: { 
              [T.Normal]: 2,
            [T.Fighting]: 1,
              [T.Flying]: 0.5,
              [T.Poison]: 0.5,
              [T.Ground]: 1,
                [T.Rock]: 2,
                 [T.Bug]: 0.5,
               [T.Ghost]: 0,
                [T.Fire]: 1,
               [T.Water]: 1,
               [T.Grass]: 1,
            [T.Electric]: 1,
             [T.Phycsic]: 0.5,
                 [T.Ice]: 2,
              [T.Dragon]: 1
        },
        [T.Flying]: { 
              [T.Normal]: 1,
            [T.Fighting]: 2,
              [T.Flying]: 1,
              [T.Poison]: 1,
              [T.Ground]: 1,
                [T.Rock]: 0.5,
                 [T.Bug]: 2,
               [T.Ghost]: 1,
                [T.Fire]: 1,
               [T.Water]: 1,
               [T.Grass]: 2,
            [T.Electric]: 0.5,
             [T.Phycsic]: 1,
                 [T.Ice]: 1,
              [T.Dragon]: 1
        },
        [T.Poison]: { 
              [T.Normal]: 1,
            [T.Fighting]: 1,
              [T.Flying]: 1,
              [T.Poison]: 0.5,
              [T.Ground]: 0.5,
                [T.Rock]: 0.5,
                 [T.Bug]: 2,
               [T.Ghost]: 0.5,
                [T.Fire]: 1,
               [T.Water]: 1,
               [T.Grass]: 2,
            [T.Electric]: 1,
             [T.Phycsic]: 1,
                 [T.Ice]: 1,
              [T.Dragon]: 1
        },
        [T.Ground]: { 
              [T.Normal]: 1,
            [T.Fighting]: 1,
              [T.Flying]: 0,
              [T.Poison]: 2,
              [T.Ground]: 1,
                [T.Rock]: 2,
                 [T.Bug]: 0.5,
               [T.Ghost]: 1,
                [T.Fire]: 2,
               [T.Water]: 1,
               [T.Grass]: 0.5,
            [T.Electric]: 2,
             [T.Phycsic]: 1,
                 [T.Ice]: 1,
              [T.Dragon]: 1
        },
        [T.Rock]: { 
              [T.Normal]: 1,
            [T.Fighting]: 0.5,
              [T.Flying]: 2,
              [T.Poison]: 1,
              [T.Ground]: 0.5,
                [T.Rock]: 1,
                 [T.Bug]: 2,
               [T.Ghost]: 1,
                [T.Fire]: 2,
               [T.Water]: 1,
               [T.Grass]: 1,
            [T.Electric]: 1,
             [T.Phycsic]: 1,
                 [T.Ice]: 2,
              [T.Dragon]: 1
        },
        [T.Bug]: { 
              [T.Normal]: 1,
            [T.Fighting]: 0.5,
              [T.Flying]: 0.5,
              [T.Poison]: 2,
              [T.Ground]: 1,
                [T.Rock]: 1,
                 [T.Bug]: 1,
               [T.Ghost]: 0.5,
                [T.Fire]: 0.5,
               [T.Water]: 1,
               [T.Grass]: 2,
            [T.Electric]: 1,
             [T.Phycsic]: 2,
                 [T.Ice]: 1,
              [T.Dragon]: 1
        },
        [T.Ghost]: { 
              [T.Normal]: 0,
            [T.Fighting]: 1,
              [T.Flying]: 1,
              [T.Poison]: 1,
              [T.Ground]: 1,
                [T.Rock]: 1,
                 [T.Bug]: 1,
               [T.Ghost]: 2,
                [T.Fire]: 1,
               [T.Water]: 1,
               [T.Grass]: 1,
            [T.Electric]: 1,
             [T.Phycsic]: 0,
                 [T.Ice]: 1,
              [T.Dragon]: 1
        },
        [T.Fire]: { 
              [T.Normal]: 1,
            [T.Fighting]: 1,
              [T.Flying]: 1,
              [T.Poison]: 1,
              [T.Ground]: 1,
                [T.Rock]: 0.5,
                 [T.Bug]: 2,
               [T.Ghost]: 1,
                [T.Fire]: 0.5,
               [T.Water]: 0.5,
               [T.Grass]: 2,
            [T.Electric]: 1,
             [T.Phycsic]: 1,
                 [T.Ice]: 2,
              [T.Dragon]: 0.5
        },
        [T.Water]: { 
              [T.Normal]: 1,
            [T.Fighting]: 1,
              [T.Flying]: 1,
              [T.Poison]: 1,
              [T.Ground]: 2,
                [T.Rock]: 2,
                 [T.Bug]: 1,
               [T.Ghost]: 1,
                [T.Fire]: 2,
               [T.Water]: 0.5,
               [T.Grass]: 0.5,
            [T.Electric]: 1,
             [T.Phycsic]: 1,
                 [T.Ice]: 1,
              [T.Dragon]: 0.5
        },
        [T.Grass]: { 
              [T.Normal]: 1,
            [T.Fighting]: 1,
              [T.Flying]: 0.5,
              [T.Poison]: 0.5,
              [T.Ground]: 2,
                [T.Rock]: 2,
                 [T.Bug]: 0.5,
               [T.Ghost]: 1,
                [T.Fire]: 0.5,
               [T.Water]: 2,
               [T.Grass]: 0.5,
            [T.Electric]: 1,
             [T.Phycsic]: 1,
                 [T.Ice]: 1,
              [T.Dragon]: 0.5
        },
        [T.Electric]: { 
              [T.Normal]: 1,
            [T.Fighting]: 1,
              [T.Flying]: 2,
              [T.Poison]: 1,
              [T.Ground]: 0,
                [T.Rock]: 1,
                 [T.Bug]: 1,
               [T.Ghost]: 1,
                [T.Fire]: 1,
               [T.Water]: 2,
               [T.Grass]: 0.5,
            [T.Electric]: 0.5,
             [T.Phycsic]: 1,
                 [T.Ice]: 1,
              [T.Dragon]: 0.5
        },
        [T.Phycsic]: { 
              [T.Normal]: 1,
            [T.Fighting]: 2,
              [T.Flying]: 1,
              [T.Poison]: 2,
              [T.Ground]: 1,
                [T.Rock]: 1,
                 [T.Bug]: 1,
               [T.Ghost]: 1,
                [T.Fire]: 1,
               [T.Water]: 1,
               [T.Grass]: 1,
            [T.Electric]: 1,
             [T.Phycsic]: 0.5,
                 [T.Ice]: 1,
              [T.Dragon]: 1
        },
        [T.Ice]: { 
              [T.Normal]: 1,
            [T.Fighting]: 1,
              [T.Flying]: 2,
              [T.Poison]: 1,
              [T.Ground]: 2,
                [T.Rock]: 1,
                 [T.Bug]: 1,
               [T.Ghost]: 1,
                [T.Fire]: 1,
               [T.Water]: 0.5,
               [T.Grass]: 2,
            [T.Electric]: 1,
             [T.Phycsic]: 1,
                 [T.Ice]: 0.5,
              [T.Dragon]: 2
        },
        [T.Dragon]: { 
              [T.Normal]: 1,
            [T.Fighting]: 1,
              [T.Flying]: 1,
              [T.Poison]: 1,
              [T.Ground]: 1,
                [T.Rock]: 1,
                 [T.Bug]: 1,
               [T.Ghost]: 1,
                [T.Fire]: 1,
               [T.Water]: 1,
               [T.Grass]: 1,
            [T.Electric]: 1,
             [T.Phycsic]: 1,
                 [T.Ice]: 1,
              [T.Dragon]: 2
        }
    };

    GameSystem.Classes.StandardStat.AgainstTable = table;
})();