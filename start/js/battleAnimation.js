/**
 * @class BattleAnimation
 * @classdesc 寶可夢戰鬥畫面上的戰鬥動畫。
 * 
 * @prop {string} name 此動畫的名稱。
 * @prop {Function} action 此動畫的動作函式。
 */
GameSystem.Classes.BattleAnimation =
class BattleAnimation {
    constructor(name, action) {
        this._name = name;
        this._action = action;
    }

    get name() { return this._name; }
    set name(newName) { this._name = newName; }

    get action() { return this._action; }
    set action(newAction) { this._action = newAction; }
}

/** 戰鬥「我方攻擊敵方」的動畫字典 */
GameSystem.Classes.BattleAnimation.AttackToDictionary = {};

/** 戰鬥「敵方攻擊我方」的動畫字典 */
GameSystem.Classes.BattleAnimation.AttackedByDictionary = {};