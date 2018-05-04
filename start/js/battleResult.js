/**
 * @class BattleResult
 * @classdesc 紀錄寶可夢一回合戰鬥的結果與動畫。
 * 
 * @prop {List} actionList 存放動畫、動作的清單。
 * @prop {number} status 狀態。 0=雙方都可再戰鬥；1=玩家方無法再戰鬥；2=對手方無法再戰鬥
 */
GameSystem.Classes.BattleResult =
class BattleResult {
    constructor() {
        this._actionList = [];
        this._status = 0;
    }

    /** 判別結果，玩家是否贏了戰鬥。
     * @return {boolean} 玩家是否贏了戰鬥。
     */
    isPlayerWin() { return this._status == 2; }

    /** 判斷結果，對手是否贏了戰鬥。
     * @return {boolean} 對手是否贏了戰鬥。
     */
    isOpponentWin() { return this._status == 1; }

    /** 判斷結果，是否雙方都可以再進行戰鬥。
     * @return {boolean} 是否雙方都可以再進行戰鬥
     */
    isDraw () { return this._status == 0; }

    /** 設定結果: 玩家贏了這場戰鬥。*/
    playerWins() { this._status = 2; }

    /** 設定結果: 對手贏了這場戰鬥。*/
    opponentWins() { this._status = 1; }

    /** 
     * 將訊息新增至「戰鬥結果」中。
     * @param {string} message 要新增的訊息。
     */
    addMessage(message) {
        this._actionList.push({type: GameSystem.Classes.BattleResult.ActionType.ShowMessage, message: message});
    }

    /**
     * 將「我方攻擊敵方」動畫加入至「戰鬥結果」中。
     * @param {GameSystem.Classes.BattleAnimation} animation 指定的戰鬥動畫。
     */
    addAttackToAnimation(animation) {
        this._actionList.push({type: GameSystem.Classes.BattleResult.ActionType.AttackTo, animation: animation});
    }

    /**
     * 將「敵方攻擊我方」動畫加入至「戰鬥結果」中。
     * @param {GameSystem.Classes.BattleAnimation} animation 指定的戰鬥動畫。
     */
    addAttackedByAnimation(animation) {
        this._actionList.push({type: GameSystem.Classes.BattleResult.ActionType.AttackedBy, animation: animation});
    }

    /**
     * 將「生命值條」動畫加入至「戰鬥結果」中。
     * @param {number} diff 血條的差值。可為正值也可為負值。
     * @param {boolean} isPlayer 血條是否為玩家。
     */
    addHPBarAnimation(diff, isPlayer) {
        this._actionList.push({type: GameSystem.Classes.BattleResult.ActionType.HPBarAnimation, diff: diff});
    }

    /**
     * 將「等待」加入至「戰鬥結果」中。
     * @param {number} millisecond 表示等待的時間。
     */
    addWaitingTime(millisecond) {
        this._actionList.push({type: GameSystem.Classes.BattleResult.ActionType.Waiting, time: millisecond});
    }

    /**
     * @typedef AnimationAction
     * @prop {GameSystem.Classes.BattleResult.ActionType} type 表示戰鬥動畫的動作種類。
     * @prop {any} secondProp 儲存訊息或資料。
     * 第二參數則依照第一參數「type」來決定，如下
     * 若 type = ShowMessage    則 secondProp 的 Type 為 string
     * 若 type = AttackTo       則 secondProp 的 Type 為 BattleAnimation
     * 若 type = AttackedBy     則 secondProp 的 Type 為 BattleAnimation
     * 若 type = HPBarAnimation 則 secondProp 的 Type 為 number
     * 若 type = Waiting        則 secondProp 的 Type 為 number
     */
    /**
     * 取得動畫的動作指令。被取得的動作指令會被自動作清單(actionList)中移除。
     * @return {AnimationAction?} 動作指令。當動作皆完成時，回傳undefined。
     */
    popAction() {
        return this._actionList.pop();
    }
}

/** @enum 戰鬥結果的動作種類
 * @readonly
 */
GameSystem.Classes.BattleResult.ActionType = Object.freeze({
    /** 顯示訊息 */
    ShowMessage: Symbol('ShowMessage'),

    /** 運行「攻擊敵人」動畫 */
    AttackTo: Symbol('AttackTo'),

    /** 運行「被敵人攻擊」動畫 */
    AttackedBy: Symbol('AttackedBy'),

    /** 運行HP條動畫 */
    HPBarAnimation: Symbol('HPBarAnimation'),

    /** 等待個幾秒 */
    Waiting: Symbol('Waiting')
});