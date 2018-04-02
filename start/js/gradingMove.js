/**
 * @class GradingMove
 * @classdesc 門檻招式。表示某寶可夢學習指定招式(move)時所被要求的最低門檻等級(minLevel)
 * 
 * @prop {number} minLevel 最低門檻等級。
 * @prop {GameSystem.Classes.Move} move 指定的招式。
 */
GameSystem.Classes.GradingMove =
class GradingMove {
    /**
     * @param {number} minLevel 最低門檻等級。
     * @param {GameSystem.Classes.Move} move 指定的招式。
     */
    constructor(minLevel, move) {
        this._minLevel = minLevel;
        this._move = move;
    }

    set minLevel(newMinLevel) { this._minLevel = newMinLevel; }
    get minLevel() { return this._minLevel; }

    set move(newMove) { this._move = newMove; }
    get move() { return this._move; }
}