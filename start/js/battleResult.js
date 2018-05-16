/**
 * @class BattleResult
 * @classdesc 紀錄寶可夢一回合戰鬥的結果與動畫。
 * 
 * @prop {List} actionList 存放動畫、動作的清單。
 * @prop {BattleResult.State} state 狀態。 0=雙方都可再戰鬥；1=玩家方無法再戰鬥；2=對手方無法再戰鬥
 */
GameSystem.Classes.BattleResult =
class BattleResult {
    constructor() {
        this._actionList = [];
        this._state = GameSystem.Classes.BattleResult.State.Draw;
    }

    get state() { return this._state; }

    /** 判別結果，玩家是否贏了戰鬥。
     * @return {boolean} 玩家是否贏了戰鬥。
     */
    isPlayerWin() { return this._state == GameSystem.Classes.BattleResult.State.PlayerWin; }

    /** 判斷結果，對手是否贏了戰鬥。
     * @return {boolean} 對手是否贏了戰鬥。
     */
    isOpponentWin() { return this._state == GameSystem.Classes.BattleResult.State.OpponentWin; }

    /** 判斷結果，是否雙方都可以再進行戰鬥。
     * @return {boolean} 是否雙方都可以再進行戰鬥
     */
    isDraw() { return this._state == GameSystem.Classes.BattleResult.State.Draw; }

    /** 設定結果: 玩家贏了這場戰鬥。*/
    playerWins() { this._state = GameSystem.Classes.BattleResult.State.PlayerWin; }

    /** 設定結果: 對手贏了這場戰鬥。*/
    opponentWins() { this._state = GameSystem.Classes.BattleResult.State.OpponentWin; }

    /** 
     * 將訊息新增至「戰鬥結果」中。
     * @param {string} message 要新增的訊息。
     */
    addMessage(message) {
        let delay = message.length > 0 ? 2000 : 1000;
        this._actionList.push({
            type: GameSystem.Classes.BattleResult.ActionType.ShowMessage,
            animation: () => new Promise(res => {
                GameSystem.BattlePad.setBattleMessage(message);
                setTimeout(() => res(true), 2000);
            })
        });
    }

    /**
     * 新增指定的戰鬥動畫。
     * @param {GameSystem.Classes.BattleAnimation} animation 指定的戰鬥動畫。
     */
    addBattleAnimation(animation) {
        this._actionList.push({
            type: GameSystem.Classes.BattleResult.ActionType.AttackTo,
            animation: animation.getAnimationStarter()
        });
    }

    /**
     * 將「生命值條」動畫加入至「戰鬥結果」中。
     * @param {number} diff 血條的差值。可為正值也可為負值。
     * @param {number} maxHP 寶可夢的最大生命值。
     * @param {boolean} isPlayer 血條是否為玩家。
     */
    addHPBarAnimation(diff, maxHP, isPlayer) {
        this._actionList.push({
            type: GameSystem.Classes.BattleResult.ActionType.HPBarAnimation,
            animation: () => new Promise((res) => {
                let HPBar = isPlayer ? GameSystem.BattlePad.getPlayerHPBar() : GameSystem.BattlePad.getOpponentHPBar();
                let percentDiff = Math.sign(diff) * Math.ceil(( Math.abs(diff) / maxHP) * 100);     // 計算生命值的變動差
                // HPBar 變動函式
                function Changing() {
                    if (percentDiff > 0) {
                        percentDiff -= 1;
                        HPBar.increaseOnePercent();
                        setTimeout(Changing, 50);
                    }
                    else if (percentDiff < 0) {
                        percentDiff += 1;
                        HPBar.decreaseOnePercent();
                        setTimeout(Changing, 50);
                    }
                    else {
                        setTimeout(() => res(true), 1000);
                    }
                }
                Changing();
            })
        });
    }

    /**
     * 將「等待」加入至「戰鬥結果」中。
     * @param {number} millisecond 表示等待的時間。
     */
    addWaitingTime(millisecond) {
        this._actionList.push({
            type: GameSystem.Classes.BattleResult.ActionType.Waiting,
            animation: () => new Promise(res => {
                setTimeout(() => res(true), millisecond);
            })
        });
    }

    /**
     * 新增對手寶可夢昏厥的動畫。
     * @param {string} pokemonName 寶可夢的名稱。
     */
    addOpponentPokemonFaint(pokemonName) {
        let resolve;                        // 存放 Promise 的 Resolve
        let opponentPos = {x: 95, y: 5};    // 設定對手寶可夢的繪製位置
        let delay = 100;                    // 延遲 100 ticks
        let battleLevel_animationSet;       // 紀錄 BattleLevel 上的 animationSet
        /** 移動對手寶可夢的函式 */
        function MovingOut(ctx) {
            if (opponentPos.x < 145) {      // 對手寶可夢移出畫面
                ctx.drawImage(this._opponentPokemonImage, opponentPos.x, opponentPos.y);
                opponentPos.x += 1;
            }
            else if (delay > 0) {           // 延遲
                delay -= 1;
            }
            else {                          // 結束動畫，將對手寶可夢繪製設為「空動畫」
                battleLevel_animationSet.opponentPokemon = GameSystem.BattlePad.emptyAnimation;
                resolve(true);
            }
        }

        this._actionList.push({
            type: GameSystem.Classes.BattleResult.ActionType.OpponentPokemonFaint,
            animation: (animationSet) => new Promise(res => {
                resolve = res;
                animationSet.opponentPokemon = MovingOut;
                battleLevel_animationSet = animationSet;
                GameSystem.BattlePad.setVisibleOpponentPad(false);
                GameSystem.BattlePad.setBattleMessage(pokemonName + "倒下了！");
            })
        });
    }

    /**
     * 新增我方寶可夢昏厥的動畫。 **
     * @param {string} pokemonName 寶可夢的名稱。
     */
    addPlayerPokemonFaint(pokemonName) {
    }

    /**
     * @typedef AnimationAction
     * @prop {GameSystem.Classes.BattleResult.ActionType} type 表示戰鬥動畫的動作種類。
     * @prop {Function} animation 動畫的Promise。
     */
    /**
     * 取得動畫的動作指令。被取得的動作指令會被自動作清單(actionList)中移除。
     * @return {AnimationAction?} 動作指令。當動作皆完成時，回傳undefined。
     */
    dequeueAction() {
        if (this._actionList.length > 0) {
            let action = this._actionList[0];
            this._actionList.splice(0, 1);
            return action;
        }
        else {
            return undefined;
        }
    }
}

/** @enum 戰鬥結果的動作種類
 * @readonly
 */
GameSystem.Classes.BattleResult.ActionType = Object.freeze({
    /** 顯示訊息 */
    ShowMessage: Symbol('ShowMessage'),

    /** 運行戰鬥動畫 */
    BattleAnimation: Symbol('BattleAnimation'),

    /** 運行HP條動畫 */
    HPBarAnimation: Symbol('HPBarAnimation'),

    /** 等待個幾秒 */
    Waiting: Symbol('Waiting'),

    /** 對手寶可夢昏厥 */
    OpponentPokemonFaint: Symbol('OpponentPokemonFaint'),

    /** 玩家寶可夢昏厥 */
    PlayerPokemonFaint: Symbol('PlayerPokemonFaint')
});

/** @enum 戰鬥結果的狀態種類列舉。
 * @readonly
 */
GameSystem.Classes.BattleResult.State = Object.freeze({
    /** 勝負未分 */
    Draw: Symbol('Draw'),

    /** 玩家方勝利 */
    PlayerWin: Symbol('PlayerWin'),

    /** 對手方勝利 */
    OpponentWin: Symbol('OpponentWin')
});