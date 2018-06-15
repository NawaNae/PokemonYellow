/**
 * @class BattleAnimation
 * @classdesc 寶可夢戰鬥畫面上的戰鬥動畫。
 * 
 * @prop {string} name 此動畫的名稱。
 * @prop {Object} initialAnimVars 初始的動畫變數群。
 * @prop {Object} animVars 動畫所需要用的變數群。
 * @prop {Function} mainAnim 此動畫的動作函式。
 * @prop {Function} originalMain 存放原先的動畫。
 * @prop {Function} animationSet 存放被播送之物件的動畫集合。
 * @prop {BattleAnimation.State} state 動畫的狀態。
 * @prop {Function} promiseResolve Promise的Resolve函式。在動畫播放完畢時，呼叫此函式來推進下一步驟。
 */
var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.BattleAnimation =
class BattleAnimation {
    /**
     * 初始化戰鬥動畫。
     * @param {string} name 此戰鬥動畫的名稱。
     * @param {Object} animVars 動畫所會用到的變數群。請注意，變數群中只能使用到初始型態(Primitive Type)。
     * @param {Function} mainAnim 動畫繪製集合中，主要的繪製方法。
     * @param {Function} playerAnim 動畫繪製集合中，繪製我方寶可夢的方法。
     * @param {Function} opponentAnim 動畫繪製集合中，繪製對手寶可夢的方法。
     */
    constructor(name, animVars, mainAnim = BattleAnimation.emptyAnimation, playerAnim, opponentAnim) {
        this._name = name;
        this._initialAnimVars = JSON.parse(JSON.stringify(animVars));
        this._animVars = animVars;
        // 儲存目前的動畫方法
        this._mainAnim = mainAnim.bind(this);
        this._playerAnim = playerAnim ? playerAnim.bind(this) : undefined;
        this._opponentAnim = opponentAnim ? opponentAnim.bind(this) : undefined;
        // 儲存原本的動畫方法
        this._originalMain = null;
        this._originalPlayer = null;
        this._originalOpponent = null;
        // 外部動畫集
        this._animationSet = null;
        this._state = GameSystem.Classes.BattleAnimation.State.Ready;
        this._promiseResolve = null;
    }

    get name() { return this._name; }
    set name(newName) { this._name = newName; }

    get mainAnim() { return this._mainAnim; }
    set mainAnim(newMainAnim) { this._mainAnim = newMainAnim.bind(this); }

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
            self.reset();                                               // 重置動畫參數。
            self._originalMain = animationSet.main;                     // 存放原先的主要動畫方法
            self._originalPlayer = animationSet.playerPokemon;          // 存放原先的我方寶可夢動畫方法
            self._originalOpponent = animationSet.opponentPokemon;      // 存放原先的對手寶可夢動畫方法
            self._animationSet = animationSet;                          // 存放外部的動畫集合
            animationSet.main = self._mainAnim;                         // 繪圖函式簽至BattleLevel或其他物件的 animationSet.main 上
            if (self._playerAnim)                                       // 若有定義我方寶可夢動畫方法，則簽至 animationSet.playerPokemon
                animationSet.playerPokemon = self._playerAnim;
            if (self._opponentAnim)                                     // 若有定義對手寶可夢動畫方法，則簽至 animationSet.opponentPokemon
                animationSet.opponentPokemon = self._opponentAnim;
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
        this._animationSet.playerPokemon = this._originalPlayer;
        this._animationSet.opponentPokemon = this._originalOpponent;
        this._promiseResolve(true);
        this._promiseResolve = null;
        this._animationSet = null;
        this._originalMain = null;
    }

    /** 
     * 空白的動畫。
     */
    static emptyAnimation() {}
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
    AttackedBy: {},
    PlayerEffect: {},
    OpponentEffect: {},
    MiscEffect: {}
};

(() => {
    const player = {x: 10, y: 40}, opponent = {x: 95, y: 5}, PI2 = 2 * Math.PI;
    let BattleAnimation = GameSystem.Classes.BattleAnimation;
    let DEX = BattleAnimation.Dictionary.AttackTo;

    // #region ==================== 初始化 AttackTo ==================== //

    // Done
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

    // Done
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

    // Done
    DEX["撞擊"] = new BattleAnimation("撞擊",
        { R: 5, r: 2, delay: 0 },
        function(ctx) {
            let animVars = this._animVars;
            if (animVars.R <= 40 || animVars.delay <= 40) {
                let x, y;
                ctx.strokeStyle = (animVars.R + animVars.delay) % 10 < 5 ? "#ff9393" : "#ffe5d1";
                ctx.lineWidth = 2;
                for (let i = 0, angle = 0; i < 8; i++, angle = (Math.PI / 4) * i) {
                    x = animVars.R * Math.cos(angle);
                    y = animVars.R * Math.sin(angle);
                    ctx.beginPath();
                    ctx.arc(120 + x, 35 + y, animVars.r, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.stroke();
                }
                // Increasement
                animVars.delay += 1;
                if (animVars.R <= 40 && animVars.delay >= 2) {
                    animVars.R += 1;
                    animVars.r += !(animVars.R % 5);
                    animVars.delay = 0;
                }
            }
            else {
                this._done();
            }
        }
    );

    DEX["起風"] = new BattleAnimation("起風",
        { R: 5, r: 2, delay: 0 },
        function(ctx) {
            let animVars = this._animVars;
            if (animVars.R <= 40 || animVars.delay <= 40) {
                let x, y;
                ctx.strokeStyle = (animVars.R + animVars.delay) % 10 < 5 ? "#ff9393" : "#ffe5d1";
                ctx.lineWidth = 2;
                for (let i = 0, angle = 0; i < 8; i++, angle = (Math.PI / 4) * i) {
                    x = animVars.R * Math.cos(angle);
                    y = animVars.R * Math.sin(angle);
                    ctx.beginPath();
                    ctx.arc(120 + x, 35 + y, animVars.r, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.stroke();
                }
                // Increasement
                animVars.delay += 1;
                if (animVars.R <= 40 && animVars.delay >= 2) {
                    animVars.R += 1;
                    animVars.r += !(animVars.R % 5);
                    animVars.delay = 0;
                }
            }
            else {
                this._done();
            }
        }
    );

    DEX["搖尾巴"] = new BattleAnimation("搖尾巴", 
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

    DEX["叫聲"] = new BattleAnimation("搖尾巴", 
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
    // #endregion ==================================================== //

    // #region =================== 初始化 AttackedBy =================== //
    DEX = BattleAnimation.Dictionary.AttackedBy;

    // Done
    DEX["電擊"] = new BattleAnimation("電擊",
        { times: 400, r: 30, isInc: false },
        function(ctx) {
            let animVars = this._animVars;
            if (animVars.times > 0) {
                ctx.fillStyle = (animVars.times % 8 < 4) ? "#DDDDDD" : "#F5E5A5";
                ctx.beginPath();
                ctx.arc(40, 70, animVars.r, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = (animVars.times % 4 < 4) ? "#FDFDFD" : "#FFFFFF";
                ctx.arc(40, 70, animVars.r - 5, 0, 2 * Math.PI);
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

    // Done
    DEX["撞擊"] = new BattleAnimation("撞擊",
        { R: 5, r: 2, delay: 0 },
        function(ctx) {
            let animVars = this._animVars;
            if (animVars.R <= 40 || animVars.delay <= 40) {
                let x, y;
                ctx.strokeStyle = (animVars.R + animVars.delay) % 10 < 5 ? "#ff9393" : "#ffe5d1";
                ctx.lineWidth = 2;
                for (let i = 0, angle = 0; i < 8; i++, angle = (Math.PI / 4) * i) {
                    x = animVars.R * Math.cos(angle);
                    y = animVars.R * Math.sin(angle);
                    ctx.beginPath();
                    ctx.arc(40 + x, 70 + y, animVars.r, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.stroke();
                }
                // Increasement
                animVars.delay += 1;
                if (animVars.R <= 40 && animVars.delay >= 2) {
                    animVars.R += 1;
                    animVars.r += !(animVars.R % 5);
                    animVars.delay = 0;
                }
            }
            else {
                this._done();
            }
        }
    );

    DEX["起風"] = new BattleAnimation("起風",
        { R: 5, r: 2, delay: 0 },
        function(ctx) {
            let animVars = this._animVars;
            if (animVars.R <= 40 || animVars.delay <= 40) {
                let x, y;
                ctx.strokeStyle = (animVars.R + animVars.delay) % 10 < 5 ? "#ff9393" : "#ffe5d1";
                ctx.lineWidth = 2;
                for (let i = 0, angle = 0; i < 8; i++, angle = (Math.PI / 4) * i) {
                    x = animVars.R * Math.cos(angle);
                    y = animVars.R * Math.sin(angle);
                    ctx.beginPath();
                    ctx.arc(40 + x, 70 + y, animVars.r, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.stroke();
                }
                // Increasement
                animVars.delay += 1;
                if (animVars.R <= 40 && animVars.delay >= 2) {
                    animVars.R += 1;
                    animVars.r += !(animVars.R % 5);
                    animVars.delay = 0;
                }
            }
            else {
                this._done();
            }
        }
    );

    DEX["搖尾巴"] = new BattleAnimation("搖尾巴", 
        { times: 400, r: 30, isInc: false },
        function(ctx) {
            let animVars = this._animVars;
            if (animVars.times > 0) {
                ctx.fillStyle = (animVars.times % 8 < 4) ? "#DDDDDD" : "#F5E5A5";
                ctx.beginPath();
                ctx.arc(40, 70, animVars.r, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = (animVars.times % 4 < 4) ? "#FDFDFD" : "#FFFFFF";
                ctx.arc(40, 70, animVars.r - 5, 0, 2 * Math.PI);
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

    DEX["叫聲"] = new BattleAnimation("叫聲", 
        { times: 400, r: 30, isInc: false },
        function(ctx) {
            let animVars = this._animVars;
            if (animVars.times > 0) {
                ctx.fillStyle = (animVars.times % 8 < 4) ? "#DDDDDD" : "#F5E5A5";
                ctx.beginPath();
                ctx.arc(40, 70, animVars.r, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = (animVars.times % 4 < 4) ? "#FDFDFD" : "#FFFFFF";
                ctx.arc(40, 70, animVars.r - 5, 0, 2 * Math.PI);
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

    // #endregion ======================================================== //

    // #region ================== 初始化 PlayerEffect ================== //
    DEX = BattleAnimation.Dictionary.PlayerEffect;

    DEX["搖尾巴"] = new BattleAnimation("搖尾巴", 
        { r: Math.PI, doneCircle: false },
        function(ctx) {
            let animVars = this._animVars;
            if (animVars.doneCircle) {
                this._done();
            }
        },
        function (ctx, image) {
            let animVars = this._animVars;
            if (animVars.r < 7 * Math.PI) {
                let x = 25 + 15 * Math.cos(animVars.r);
                let y = 40 - 7 * Math.sin(animVars.r);
                ctx.drawImage(image, x, y);
                animVars.r += 0.1;
            }
            else {
                animVars.doneCircle = true;
            }
        }
    );

    DEX["叫聲"] = new BattleAnimation("叫聲",
        { times: 3, r: 5, delay: 0 },
        function (ctx) {
            let animVars = this._animVars;
            if (animVars.times > 0) {
                if (animVars.delay <= 0) {
                    ctx.lineWidth = 5;
                    ctx.strokeStyle = "#ff6759";
                    ctx.beginPath();
                    ctx.arc(player.x + 25, player.y + 30, animVars.r, 0, PI2);
                    ctx.closePath();
                    ctx.stroke();
                    animVars.r += 1;
                    if (animVars.r >= 35) {
                        animVars.delay = 50;
                        animVars.times -= 1;
                        animVars.r = 5;
                    }
                }
                else {
                    animVars.delay -= 1;
                }
            }
            else {
                this._done();
            }
        }
    );

    DEX["電磁波"] = new BattleAnimation("電磁波", 
        { waveList: [0, -5, -10, -15, -20, -25, -30, -35], times: 5 },
        function (ctx) {
            let animVars = this._animVars;
            const a1 = -2 * Math.PI / 12, a2 =  5 * Math.PI / 12;
            const b1 =  7 * Math.PI / 12, b2 = 14 * Math.PI / 12;
            const c1 = 15 * Math.PI / 12, c2 = 21 * Math.PI / 12;
            ctx.strokeStyle = "#f7d954";
            if (animVars.waveList[animVars.waveList.length - 1] < 30) {
                animVars.waveList.forEach((r, index) => {
                    if (0 < r && r <= 40) {
                        ctx.lineWidth = 4 - Math.floor(r / 10);
                        ctx.beginPath();
                        ctx.arc(120, 35, r, a1, a2);
                        ctx.arc(120, 35, r, b1, b2);
                        ctx.arc(120, 35, r, c1, c2);
                        ctx.closePath();
                        ctx.stroke();
                    }
                    animVars.waveList[index] += 1;
                });
            }
            else if (animVars.times > 1) {
                animVars.times -= 1;
                animVars.waveList = [0, -5, -10, -15, -20, -25, -30, -35];
            }
            else {
                this._done();
            }
        }
    );

    // #endregion ===================================================== //

    // #region ================= 初始化 OpponentEffect ================= //
    DEX = BattleAnimation.Dictionary.OpponentEffect;

    DEX["搖尾巴"] = new BattleAnimation("搖尾巴", 
        { r: Math.PI / 2, doneCircle: false },
        function(ctx) {
            let animVars = this._animVars;
            if (animVars.doneCircle) {
                this._done();
            }
        },
        undefined,
        function (ctx, image) {
            let animVars = this._animVars;
            if (animVars.r < 6.5 * Math.PI) {
                let x = 95 + 15 * Math.cos(animVars.r);
                let y = 12 - 7 * Math.sin(animVars.r);
                ctx.drawImage(image, x, y);
                animVars.r += 0.1;
            }
            else {
                animVars.doneCircle = true;
            }
        }
    );

    // #region ======================================================== //

    // #region =================== 初始化 MiscEffect =================== //
    DEX = BattleAnimation.Dictionary.MiscEffect;

    DEX["藥水"] = new BattleAnimation("藥水",
        { r: 1 },
        function (ctx) {
            ctx.strokeStyle = "rgba(255, 0, 0, " + (255 - this._animVars.r * 10) + ")";
            ctx.lineWidth = 6 - Math.ceil(this._animVars.r / 12)
            if (this._animVars.r <= 60) {
                ctx.beginPath();
                ctx.arc(40, 70, Math.ceil(this._animVars.r), 0, PI2);
                ctx.closePath();
                ctx.stroke();
                this._animVars.r += 0.5;
            }
            else {
                this._done();
            }
        }
    );

    // #endregion ====================================================== //

})();