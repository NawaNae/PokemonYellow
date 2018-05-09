/**
 * @class BattleAnimation
 * @classdesc 寶可夢戰鬥畫面上的戰鬥動畫。
 * 
 * @prop {string} name 此動畫的名稱。
 * @prop {Object} initialAnimVars 初始的動畫變數群。
 * @prop {Object} animVars 動畫所需要用的變數群。
 * @prop {Function} action 此動畫的動作函式。
 * @prop {Function} originalMain 存放原先的動畫。
 * @prop {Function} animationSet 存放被播送之物件的動畫集合。
 * @prop {BattleAnimation.State} state 動畫的狀態。
 * @prop {Function} promiseResolve Promise的Resolve函式。在動畫播放完畢時，呼叫此函式來推進下一步驟。
 */
GameSystem.Classes.BattleAnimation =
class BattleAnimation {
    /**
     * 初始化戰鬥動畫。
     * @param {string} name 此戰鬥動畫的名稱。
     * @param {Object} animVars 動畫所會用到的變數群。請注意，變數群中只能使用到初始型態(Primitive Type)。
     * @param {Function} action 動畫的動作函式。
     */
    constructor(name, animVars, action) {
        this._name = name;
        this._initialAnimVars = JSON.parse(JSON.stringify(animVars));
        this._animVars = animVars;
        this._action = action.bind(this);
        this._originalMain = null;
        this._animationSet = null;
        this._state = GameSystem.Classes.BattleAnimation.State.Ready;
        this._promiseResolve = null;
    }

    get name() { return this._name; }
    set name(newName) { this._name = newName; }

    get action() { return this._action; }
    set action(newAction) { this._action = newAction.bind(this); }

    /**
     * 重置動畫參數。
     */
    reset() {
        this._animVars = JSON.parse(JSON.stringify(this._initialAnimVars));
        this._state = GameSystem.Classes.BattleAnimation.State.Ready;
    }

    /**
     * 取得動畫播放函式。
     * @return {Function} 啟動動畫的函式。
     */
    getAnimationStarter() {
        const self = this;
        return function (animationSet) {
            self.reset();                           // 重置動畫參數。
            self._originalMain = animationSet.main; // 存放原先的動畫方法
            self._animationSet = animationSet;      // 存放外部的動畫集合
            animationSet.main = self._action;       // 繪圖函式簽至BattleLevel或其他物件的 animationSet.main 上
            self._state = GameSystem.Classes.BattleAnimation.State.Running;
            return new Promise(res => { self._promiseResolve = res; });
        };
    }

    /**
     * 動畫完成時所會呼叫的函式。
     */
    _done() {
        this._state = GameSystem.Classes.BattleAnimation.State.Finished;
        this._animationSet.main = this._originalMain;
        this._promiseResolve(true);
        this._promiseResolve = null;
        this._animationSet = null;
        this._originalMain = null;
    }
}

/** @typedef BattleAnimation.State
 * @description 定義動畫狀態。
 * @enum
 * @readonly
 */
GameSystem.Classes.BattleAnimation.State = Object.freeze({
    /** 表示動畫已經準備好可以被播送。 */
    Ready: Symbol("Ready"),

    /** 動畫正在執行中。 */
    Running: Symbol("Running"),

    /** 動畫已經結束。 */
    Finished: Symbol("Finished")
});

/** 定義戰鬥時「我方攻擊敵方」與「敵方攻擊我方」的動畫字典 */
GameSystem.Classes.BattleAnimation.Dictionary = {
    AttackTo: {},
    AttackedBy: {}
};

(() => {
    let BattleAnimation = GameSystem.Classes.BattleAnimation;
    let DEX = BattleAnimation.Dictionary.AttackTo;

    DEX['投球'] = new BattleAnimation('投球',
        { x: 25, y: 75 },
        function (ctx) {
            let animVars = this._animVars;
            if (animVars.x <= 120) {
                animVars.x += 0.5;
                animVars.y = 0.02 * (animVars.x - 90) ** 2 + 15;
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(animVars.x, animVars.y, 10, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.stroke();
            }
            else {
                this._done();
            }
        }
    );

    DEX["電擊"] = new BattleAnimation("電擊",
        { times: 400, r: 30, isInc: false },
        function(ctx) {
            let animVars = this._animVars;
            if (animVars.times > 0) {
                ctx.fillStyle = (animVars.times % 8 < 4) ? "#DDDDDD" : "#F5E5A5";
                ctx.beginPath();
                ctx.arc(120, 35, animVars.r, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = (animVars.times % 4 < 4) ? "#FDFDFD" : "#FFFFFF";
                ctx.arc(120, 35, animVars.r - 5, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();
                
                animVars.r += animVars.isInc ? 4 : -4;
                animVars.isInc = (animVars.r <= 10) ? true : (animVars.r >= 30 ? false : animVars.isInc);

                animVars.times -= 1;
            }
            else {
                this._done();
            }
        }
    );
})();