/**
 * @class BattleResult
 * @classdesc 紀錄寶可夢一回合戰鬥的結果與動畫。
 * 
 * @prop {List} actionList 存放動畫、動作的清單。
 * @prop {BattleResult.State} state 狀態。 0=雙方都可再戰鬥；1=玩家方無法再戰鬥；2=對手方無法再戰鬥
 */
var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
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

    /** 判斷結果，是否玩家逃跑了。
     *  @return {boolean} 是否玩家逃跑了。
     */
    isPlayerEscaped() { return this._state == GameSystem.Classes.BattleResult.State.Escape; }

    /** 設定結果: 玩家贏了這場戰鬥。*/
    playerWins() { this._state = GameSystem.Classes.BattleResult.State.PlayerWin; }

    /** 設定結果: 對手贏了這場戰鬥。*/
    opponentWins() { this._state = GameSystem.Classes.BattleResult.State.OpponentWin; }

    /** 設定結果: 玩家逃跑了。 */
    playerEscaped() { this._state = GameSystem.Classes.BattleResult.State.Escape; }

    /** 
     * 將訊息新增至「戰鬥結果」中。
     * @param {string} message 要新增的訊息。
     */
    addMessage(message) {
        let delay = message ? 2000 : 1000;
        this._actionList.push({
            type: GameSystem.Classes.BattleResult.ActionType.ShowMessage,
            animation: () => new Promise(res => {
                GameSystem.BattlePad.setBattleMessage(message);
                setTimeout(() => res(true), delay);
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
     * @param {number} HP 當前的生命值。
     * @param {number} maxHP 寶可夢的最大生命值。
     * @param {boolean} isPlayer 血條是否為玩家。
     */
    addHPBarAnimation(diff, HP, maxHP, isPlayer) {
        this._actionList.push({
            type: GameSystem.Classes.BattleResult.ActionType.HPBarAnimation,
            animation: () => new Promise((res) => {
                let HPBar = isPlayer ? GameSystem.BattlePad.getPlayerHPBar() : GameSystem.BattlePad.getOpponentHPBar();
                let percentDiff = Math.sign(diff) * Math.ceil(( Math.abs(diff) / maxHP) * 100);     // 計算生命值的變動差
                if (isPlayer)
                    GameSystem.BattlePad.setPlayerHPValueText(HP + "/ " + maxHP);
                // HPBar 變動函式
                function Changing() {
                    if (percentDiff > 0) {
                        percentDiff -= 1;
                        HPBar.increaseOnePercent();
                        setTimeout(Changing, 25);
                    }
                    else if (percentDiff < 0) {
                        percentDiff += 1;
                        HPBar.decreaseOnePercent();
                        setTimeout(Changing, 25);
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
        function MovingOut(ctx, image) {
            if (opponentPos.x < 145) {      // 對手寶可夢移出畫面
                ctx.drawImage(image, opponentPos.x, opponentPos.y);
                opponentPos.x += 1;
            }
            else if (delay > 0) {           // 延遲
                delay -= 1;
            }
            else {                          // 結束動畫，將對手寶可夢繪製設為「空動畫」
                battleLevel_animationSet.opponentPokemon = BattleLevel.emptyAnimation;
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
     * 新增我方寶可夢移出的動畫。
     * @param {string} pokemonName 寶可夢的名稱。
     * @param {Image?} outImage 表示要移出的寶可夢之圖片。若有此項則表示為「一般更換寶可夢」，否則為「寶可夢昏厥」。
     */
    addPlayerPokemonMovingOut(pokemonName, outImage) {
        let resolve;                        // 存放 Promise 的 Resolve
        let playerPos = {x: 10, y: 40};     // 設定我方寶可夢的繪製位置
        let delay = 250;                    // 延遲 與 預延遲
        let battleLevel_animationSet;       // 紀錄 BattleLevel 上的 animationSet

        /** 移動玩家寶可夢的函式：「更換寶可夢」 */
        function MovingOut_Changing(ctx) {
            if (delay > 0) {                // 預延遲
                delay -= 1;
            }
            else if (playerPos.x > -70) {   // 我方寶可夢移出畫面
                playerPos.x -= 1;
            }
            else {                          // 結束動畫，將對手寶可夢繪製設為「空動畫」
                battleLevel_animationSet.playerPokemon = BattleLevel.emptyAnimation;
                setTimeout(() => resolve(true), 500);
            }
            ctx.drawImage(outImage, playerPos.x, playerPos.y);
        }
        /** 移動玩家寶可夢的函式：「寶可夢昏厥」 */
        function MovingOut_Fainted(ctx, image) {
            if (playerPos.x > -70) {      // 我方寶可夢移出畫面
                ctx.drawImage(image, playerPos.x, playerPos.y);
                playerPos.x -= 1;
            }
            else {                          // 結束動畫，將對手寶可夢繪製設為「空動畫」
                battleLevel_animationSet.playerPokemon = BattleLevel.emptyAnimation;
                setTimeout(() => resolve(true), 500);
            }
        }

        this._actionList.push({
            type: GameSystem.Classes.BattleResult.ActionType.PlayerPokemonFaint,
            animation: (animationSet) => new Promise(res => {
                resolve = res;
                animationSet.playerPokemon = outImage ? MovingOut_Changing : MovingOut_Fainted;     // 若有指定移出的圖片，則表示純粹更換寶可夢；否則則為因寶可夢昏厥而換的
                battleLevel_animationSet = animationSet;                                            // 紀錄動畫集合
                GameSystem.BattlePad.setVisiblePlayerPad(false);                                    // 關閉玩家方寶可夢戰鬥版面
                GameSystem.BattlePad.setBattleMessage(outImage ? "夠了" + pokemonName + "，回來吧！" : pokemonName + "倒下了！");     // 輸出訊息
            })
        });
    }

    /**
     * 新增我方寶可夢進入戰鬥的動畫。
     * @param {string} pokemonName 換上場的寶可夢名稱。
     */
    addPlayerPokemonMovingIn(pokemonName) {
        let resolve;                        // 存放 Promise 的 Resolve
        let playerPos = {x: -70, y: 40};    // 設定我方寶可夢的繪製位置
        let delay = 200;                    // 延遲 200 ticks
        let battleLevel_animationSet;       // 紀錄 BattleLevel 上的 animationSet
        /** 移動寶可夢的函式 */
        function MovingIn(ctx, image) {
            if (playerPos.x < 10) {         // 我方寶可夢移出畫面
                playerPos.x += 1;
            }
            else if (delay > 0) {           // 延遲
                delay -= 1;
            }
            else {                          // 結束動畫，將對手寶可夢繪製設為原先的寶可夢繪製函式
                battleLevel_animationSet.playerPokemon = BattleLevel.drawPlayersPokemon;
                resolve(true);
            }
            ctx.drawImage(image, playerPos.x, playerPos.y);
        }

        this._actionList.push({
            type: GameSystem.Classes.BattleResult.ActionType.PlayerPokemonFaint,
            animation: (animationSet) => new Promise(res => {
                resolve = res;
                battleLevel_animationSet = animationSet;                           // 紀錄繪圖函式集
                GameSystem.BattlePad.setVisiblePlayerPad(true);                    // 顯示玩家方寶可夢的戰鬥面板
                GameSystem.BattlePad.setBattleMessage("去吧！" + pokemonName);      // 輸出訊息 
                setTimeout(() => animationSet.playerPokemon = MovingIn, 1000);    // 延遲1秒
            })
        });
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
    PlayerPokemonFaint: Symbol('PlayerPokemonFaint'),

    /** 玩家寶可夢移入 */
    PlayerPokemonMovingIn: Symbol('PlayerPokemonMovingIn')
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
    OpponentWin: Symbol('OpponentWin'),

    /** 玩家進行逃跑 */
    Escape: Symbol('Escape')
});