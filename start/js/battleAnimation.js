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

/** 定義戰鬥時「我方攻擊敵方」與「敵方攻擊我方」的動畫字典 */
GameSystem.Classes.BattleAnimations = {
    AttackToDictionary: {},
    AttackedByDictionary: {}
};

(() => {
    let BattleAnimation = GameSystem.Classes.BattleAnimation;
    let DEX = GameSystem.Classes.BattleAnimations.AttackToDictionary;

    DEX['投球'] = new BattleAnimation('投球', function (ctx) {
        let img = Load.image(define.imagePath + 'GreenCircle.png');
        ctx.drawImage(img, 10, 10, 20, 20);
    });
})();