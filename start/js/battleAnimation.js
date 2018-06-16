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

    // Unlity math function
    function grab_fx(x) { return x * Math.cos(0.375 * PI2); }
    function grab_fy(y) { return -y * Math.sin(0.375 * PI2); }
    function grab_fdx(x) { return x * Math.cos(0.125 * PI2); }
    function grab_fdy(y) { return -y * Math.sin(0.125 * PI2); }
    function sand_path(x, x0, y0) { return -0.4117 * (x - x0) + y0; }
    function sand_particle_sizing(x) { return 10 - ((x - 80) ** 2) / 260; }

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

    DEX["叫聲"] = new BattleAnimation("叫聲", 
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

    DEX["電光一閃"] = new BattleAnimation("電光一閃",
        { x: 123, y: 33, times: 300 },
        function (ctx) {
            let animVars = this._animVars;
            if (animVars.times > 0) {
                let R = Math.floor(Math.random() * 30) + 1;
                let r = Math.floor(Math.random() * 11) + 5;
                let angle = PI2 * Math.random();
                let color = Math.floor(Math.random() * 70) + 180;
                let x = animVars.x + R * Math.cos(angle), y = animVars.y + R * Math.sin(angle); 
                ctx.fillStyle = "rgb(" + color + ", " + color + ", 0)"; 
                ctx.beginPath();
                ctx.arc(x, y, r, 0, PI2);
                ctx.closePath();
                ctx.fill();
                animVars.times -= 1;
            }
            else {
                this._done();
            }
        }
    );

    DEX["抓"] = new BattleAnimation("抓",
        { x: 123, y: 33, t1: 30, t2: 30, startT: 30, endT: -30, d: 5, times: 3 },
        function (ctx) {
            let animVars = this._animVars;
            for (let i = -3; i <= 3; i++) {
                let startX = animVars.x + grab_fx(i * animVars.d) + grab_fdx(animVars.t1);
                let endX = animVars.x + grab_fx(i * animVars.d) + grab_fdx(animVars.t2);
                let startY = animVars.y + grab_fy(i * animVars.d) + grab_fdy(animVars.t1);
                let endY = animVars.y + grab_fy(i * animVars.d) + grab_fdy(animVars.t2);
                ctx.strokeStyle = "#FF0000";
                ctx.lineWidth = animVars.times % 2 ? 1 : 2;
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.closePath();
                ctx.stroke();
            }
            if (animVars.t1 > animVars.endT){
                animVars.t1 -= 3;
            }
            else if (animVars.t1 <= animVars.endT && animVars.t2 > animVars.endT){
                animVars.t2 -= 3;
            }
            else if (animVars.t1 <= animVars.endT && animVars.t2 <= animVars.endT && animVars.times > 1) {
                animVars.t1 = animVars.startT;
                animVars.t2 = animVars.startT;
                animVars.times -= 1;
            }
            else{
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

    DEX["電光一閃"] = new BattleAnimation("電光一閃",
        { x: 38, y: 68, times: 300 },
        function (ctx) {
            let animVars = this._animVars;
            if (animVars.times > 0) {
                let R = Math.floor(Math.random() * 30) + 1;
                let r = Math.floor(Math.random() * 11) + 5;
                let angle = PI2 * Math.random();
                let color = Math.floor(Math.random() * 70) + 180;
                let x = animVars.x + R * Math.cos(angle), y = animVars.y + R * Math.sin(angle); 
                ctx.fillStyle = "rgb(" + color + ", " + color + ", 0)"; 
                ctx.beginPath();
                ctx.arc(x, y, r, 0, PI2);
                ctx.closePath();
                ctx.fill();
                animVars.times -= 1;
            }
            else {
                this._done();
            }
        }
    );

    DEX["抓"] = new BattleAnimation("抓",
        { x: 38, y: 68, t1: 30, t2: 30, startT: 30, endT: -30, d: 5, times: 3 },
        function (ctx) {
            let animVars = this._animVars;
            for (let i = -3; i <= 3; i++) {
                let startX = animVars.x + grab_fx(i * animVars.d) + grab_fdx(animVars.t1);
                let endX = animVars.x + grab_fx(i * animVars.d) + grab_fdx(animVars.t2);
                let startY = animVars.y + grab_fy(i * animVars.d) + grab_fdy(animVars.t1);
                let endY = animVars.y + grab_fy(i * animVars.d) + grab_fdy(animVars.t2);
                ctx.strokeStyle = "#FF0000";
                ctx.lineWidth = animVars.times % 2 ? 1 : 2;
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.closePath();
                ctx.stroke();
            }
            if (animVars.t1 > animVars.endT){
                animVars.t1 -= 3;
            }
            else if (animVars.t1 <= animVars.endT && animVars.t2 > animVars.endT){
                animVars.t2 -= 3;
            }
            else if (animVars.t1 <= animVars.endT && animVars.t2 <= animVars.endT && animVars.times > 1) {
                animVars.t1 = animVars.startT;
                animVars.t2 = animVars.startT;
                animVars.times -= 1;
            }
            else{
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

    DEX["瞪眼"] = new BattleAnimation("瞪眼", 
        { x: 38, y: 68, times: 300 },
        function (ctx) {
            let animVars = this._animVars;
            if (animVars.times > 0) {
                let R = Math.floor(Math.random() * 20) + 1;
                let halfLen = Math.floor(Math.random() * 8) + 3;
                let width = Math.floor(Math.random() * 3) + 1;
                let angle = PI2 * Math.random();
                let color = Math.floor(Math.random() * 70) + 180;
                let x = animVars.x + R * Math.cos(angle), y = animVars.y + R * Math.sin(angle); 
                ctx.strokeStyle = "rgb( 0, " + color + ", " + color + ")"; 
                ctx.lineWidth = width;
                ctx.beginPath();
                ctx.moveTo(x, y - halfLen);
                ctx.lineTo(x, y + halfLen);
                ctx.moveTo(x - halfLen, y);
                ctx.lineTo(x + halfLen, y);
                ctx.closePath();
                ctx.stroke();
                animVars.times -= 1;
            }
            else {
                this._done();
            }
        }
    );

    DEX["潑沙"] = new BattleAnimation("潑沙",
        { phase: 0, x: 35, startX: 38, startY: 68, endX: 130, endY: 30, particles: []},
        function (ctx) {
            let animVars = this._animVars;
            if (animVars.phase == 0) {
                let n = Math.floor(Math.random() * 5) + 10;
                let angle, R, amp;
                for (let i = 0; i < n; i++) {
                    angle = PI2 * Math.random();
                    R = Math.floor(Math.random() * 30) + 1;
                    amp = Math.random() + 1;
                    animVars.particles.push({ angle, R, amp });
                }
                animVars.phase += 1;
            }
            else if (animVars.phase == 1) {
                if (animVars.x <= animVars.endX) {
                    let x, y, r, color, x0, y0;
                    x0 = animVars.x;
                    y0 = sand_path(x0, animVars.startX, animVars.startY);
                    animVars.particles.forEach(data => {
                        x = x0 + data.R * Math.cos(data.angle);
                        y = y0 - data.R * Math.sin(data.angle);
                        r = data.amp * sand_particle_sizing(x0);
                        color = Math.floor(Math.random() * 50) + 170;
                        ctx.fillStyle = "rgb(" + color + ", " + color + ", 0)"
                        ctx.beginPath();
                        ctx.arc(x, y, r, 0, PI2);
                        ctx.closePath();
                        ctx.fill();
                    });
                    animVars.x += 1;
                }
                else {
                    this._done();
                }
            }
        }
    );

    DEX["刺耳聲"] = new BattleAnimation("刺耳聲",
        { x: 38, y: 68, r1: 5, r2: 5, minr: 5, maxr: 40, times: 3 },
        function(ctx) {
            let animVars = this._animVars;
            if (animVars.times > 0) {
                let x1, y1, x2, y2;
                ctx.strokeStyle = "#FF0000";
                ctx.lineWidth = 1;
                for (let i = 0; i < 16; i++) {
                    x1 = animVars.x + animVars.r1 * Math.cos(i * (PI2 / 16));
                    y1 = animVars.y - animVars.r1 * Math.sin(i * (PI2 / 16));
                    x2 = animVars.x + animVars.r2 * Math.cos(i * (PI2 / 16));
                    y2 = animVars.y - animVars.r2 * Math.sin(i * (PI2 / 16));
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
                if (animVars.r1 < animVars.maxr) {
                    animVars.r1 += 1;
                }
                else if (animVars.r2 < animVars.maxr) {
                    animVars.r2 += 1;
                }
                else {
                    animVars.r1 = animVars.minr;
                    animVars.r2 = animVars.minr;
                    animVars.times -= 1;
                }
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

    DEX["瞪眼"] = new BattleAnimation("瞪眼", 
        { x: 123, y: 33, times: 300 },
        function (ctx) {
            let animVars = this._animVars;
            if (animVars.times > 0) {
                let R = Math.floor(Math.random() * 20) + 1;
                let halfLen = Math.floor(Math.random() * 8) + 3;
                let width = Math.floor(Math.random() * 3) + 1;
                let angle = PI2 * Math.random();
                let color = Math.floor(Math.random() * 70) + 180;
                let x = animVars.x + R * Math.cos(angle), y = animVars.y + R * Math.sin(angle); 
                ctx.strokeStyle = "rgb( 0, " + color + ", " + color + ")"; 
                ctx.lineWidth = width;
                ctx.beginPath();
                ctx.moveTo(x, y - halfLen);
                ctx.lineTo(x, y + halfLen);
                ctx.moveTo(x - halfLen, y);
                ctx.lineTo(x + halfLen, y);
                ctx.closePath();
                ctx.stroke();
                animVars.times -= 1;
            }
            else {
                this._done();
            }
        }
    );

    DEX["潑沙"] = new BattleAnimation("潑沙",
        { phase: 0, x: 130, startX: 130, startY: 30, endX: 35, endY: 70, particles: []},
        function (ctx) {
            let animVars = this._animVars;
            if (animVars.phase == 0) {
                let n = Math.floor(Math.random() * 5) + 10;
                let angle, R, amp;
                for (let i = 0; i < n; i++) {
                    angle = PI2 * Math.random();
                    R = Math.floor(Math.random() * 30) + 1;
                    amp = Math.random() + 1;
                    animVars.particles.push({ angle, R, amp });
                }
                animVars.phase += 1;
            }
            else if (animVars.phase == 1) {
                if (animVars.x >= animVars.endX) {
                    let x, y, r, color, x0, y0;
                    x0 = animVars.x;
                    y0 = sand_path(x0, animVars.startX, animVars.startY);
                    animVars.particles.forEach(data => {
                        x = x0 + data.R * Math.cos(data.angle);
                        y = y0 - data.R * Math.sin(data.angle);
                        r = data.amp * sand_particle_sizing(x0);
                        color = Math.floor(Math.random() * 50) + 170;
                        ctx.fillStyle = "rgb(" + color + ", " + color + ", 0)"
                        ctx.beginPath();
                        ctx.arc(x, y, r, 0, PI2);
                        ctx.closePath();
                        ctx.fill();
                    });
                    animVars.x -= 1;
                }
                else {
                    this._done();
                }
            }
        }
    );

    DEX["刺耳聲"] = new BattleAnimation("刺耳聲",
        { x: 123, y: 33, r1: 5, r2: 5, minr: 5, maxr: 40, times: 3 },
        function(ctx) {
            let animVars = this._animVars;
            if (animVars.times > 0) {
                let x1, y1, x2, y2;
                ctx.strokeStyle = "#FF0000";
                ctx.lineWidth = 1;
                for (let i = 0; i < 16; i++) {
                    x1 = animVars.x + animVars.r1 * Math.cos(i * (PI2 / 16));
                    y1 = animVars.y - animVars.r1 * Math.sin(i * (PI2 / 16));
                    x2 = animVars.x + animVars.r2 * Math.cos(i * (PI2 / 16));
                    y2 = animVars.y - animVars.r2 * Math.sin(i * (PI2 / 16));
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
                if (animVars.r1 < animVars.maxr) {
                    animVars.r1 += 1;
                }
                else if (animVars.r2 < animVars.maxr) {
                    animVars.r2 += 1;
                }
                else {
                    animVars.r1 = animVars.minr;
                    animVars.r2 = animVars.minr;
                    animVars.times -= 1;
                }
            }
            else {
                this._done();
            }
        }
    );

    // #endregion ======================================================== //

    // #region =================== 初始化 MiscEffect =================== //
    DEX = BattleAnimation.Dictionary.MiscEffect;

    const pokemonBallImage = Load.image(define.imagePath + "AlivePokemonBall.png");

    // Done
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

    // Done
    DEX['收服成功'] = new BattleAnimation('收服成功',
        { phase: 1, x: 25, y: 75, shaking: 19, dx: 1, delay: 200, particle_r: 1,
          oppoX: 95, oppoY: 5, oppoSize: 56, oppoSrcXY: 0},
        function (ctx) {
            let animVars = this._animVars;
            // Throwing ball
            if (animVars.phase == 1) {
                if (animVars.x < 120) {
                    animVars.x += 1;
                    animVars.y = 0.02 * (animVars.x - 90) ** 2 + 15;
                }
                else animVars.phase += 1;
            }
            // Ball waiting
            else if (animVars.phase == 2) {
                if (animVars.delay > 0)
                    animVars.delay -= 1;
                else 
                    animVars.phase += 1;
            }
            // Ball shaking
            else if (animVars.phase == 3) {
                animVars.x += animVars.dx;
                if (animVars.shaking % 4 == 3 && animVars.x >= 125) {               // Moving Right
                    animVars.dx = -1;
                    animVars.shaking -= 1;
                }
                else if (animVars.shaking % 4 == 2 && animVars.x <= 115) {          // Moving left
                    animVars.dx = 1;
                    animVars.shaking -= 1;
                }
                else if (animVars.shaking % 4 == 1 && animVars.x == 120) {          // Moving right (back to origin)
                    animVars.dx = 0; 
                    animVars.delay = 100;
                    animVars.shaking -= 1;
                }
                else if (animVars.shaking % 4 == 0 && --animVars.delay <= 0) {      // Waiting
                    animVars.dx = 1;
                    animVars.shaking -= 1;
                    if (animVars.shaking < 0)
                        animVars.phase += 1;
                }
            }
            // 'Done' particles and finished
            else if (animVars.phase == 4) {
                if (animVars.particle_r <= 40) {
                    ctx.strokeStyle = "#FFFF00";
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(animVars.x + 7, animVars.y + 7, animVars.particle_r, 0, PI2);
                    ctx.closePath();
                    ctx.stroke();
                    animVars.particle_r += 0.25;
                }
                else {
                    this._done();
                }
            }
            ctx.drawImage(pokemonBallImage, animVars.x, animVars.y, 14, 14);
        },
        undefined,
        function (ctx, image) {
            let animVars = this._animVars;
            if (animVars.phase < 2) {
                ctx.drawImage(image, 95, 5);
            }
            else if (animVars.phase == 2) {
                if (animVars.oppoSize > 0) {
                    ctx.drawImage(image, animVars.oppoSrcXY, animVars.oppoSrcXY, animVars.oppoSize, animVars.oppoSize,
                        animVars.oppoX, animVars.oppoY, animVars.oppoSize, animVars.oppoSize);
                    animVars.oppoSize -= 2;
                    animVars.oppoSrcXY += 1;
                    animVars.oppoX += 1;
                    animVars.oppoY += 1;
                }
            }
        }
    );

    // Done
    DEX['收服失敗'] = new BattleAnimation('收服失敗',
        { phase: 1, x: 25, y: 75, shaking: 19, dx: 1, delay: 200, particle_r: 1,
          oppoX: 95, oppoY: 5, oppoSize: 56, oppoSrcXY: 0},
        function (ctx) {
            let animVars = this._animVars;
            // Throwing ball
            if (animVars.phase == 1) {
                if (animVars.x < 120) {
                    animVars.x += 1;
                    animVars.y = 0.02 * (animVars.x - 90) ** 2 + 15;
                }
                else animVars.phase += 1;
            }
            // Ball waiting
            else if (animVars.phase == 2) {
                if (animVars.delay > 0)
                    animVars.delay -= 1;
                else 
                    animVars.phase += 1;
            }
            // Ball shaking
            else if (animVars.phase == 3) {
                animVars.x += animVars.dx;
                if (animVars.shaking % 4 == 3 && animVars.x >= 125) {               // Moving Right
                    animVars.dx = -1;
                    animVars.shaking -= 1;
                }
                else if (animVars.shaking % 4 == 2 && animVars.x <= 115) {          // Moving left
                    animVars.dx = 1;
                    animVars.shaking -= 1;
                }
                else if (animVars.shaking % 4 == 1 && animVars.x == 120) {          // Moving right (back to origin)
                    animVars.dx = 0; 
                    animVars.delay = 100;
                    animVars.shaking -= 1;
                }
                else if (animVars.shaking % 4 == 0 && --animVars.delay <= 0) {      // Waiting
                    animVars.dx = 1;
                    animVars.shaking -= 1;
                    if (animVars.shaking < 0)
                        animVars.phase += 1;
                }
            }
            // 'Done' particles and finished
            else if (animVars.phase == 4) {
                animVars.y -= 3;
                if (animVars.particle_r <= 120) {
                    ctx.strokeStyle = "#FF8888";
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.arc(127, 42, animVars.particle_r, 0, PI2);
                    ctx.closePath();
                    ctx.stroke();
                    animVars.particle_r += 2;
                }
                else {
                    this._done();
                }
            }
            ctx.drawImage(pokemonBallImage, animVars.x, animVars.y, 14, 14);
        },
        undefined,
        function (ctx, image) {
            let animVars = this._animVars;
            if (animVars.phase < 2) {
                ctx.drawImage(image, 95, 5);
            }
            else if (animVars.phase == 2) {
                if (animVars.oppoSize > 0) {
                    ctx.drawImage(image, animVars.oppoSrcXY, animVars.oppoSrcXY, animVars.oppoSize, animVars.oppoSize,
                        animVars.oppoX, animVars.oppoY, animVars.oppoSize, animVars.oppoSize);
                    animVars.oppoSize -= 2;
                    animVars.oppoSrcXY += 1;
                    animVars.oppoX += 1;
                    animVars.oppoY += 1;
                }
            }
            else if (animVars.phase == 3);
            else if (animVars.phase == 4) {
                if (animVars.oppoSize < 56) {
                    ctx.drawImage(image, animVars.oppoSrcXY, animVars.oppoSrcXY, animVars.oppoSize, animVars.oppoSize,
                        animVars.oppoX, animVars.oppoY, animVars.oppoSize, animVars.oppoSize);
                    animVars.oppoSize += 2;
                    animVars.oppoSrcXY -= 1;
                    animVars.oppoX -= 1;
                    animVars.oppoY -= 1;
                }
                else {
                    ctx.drawImage(image, 95, 5);
                }
            }
        }
    );

    // #endregion ====================================================== //

})();