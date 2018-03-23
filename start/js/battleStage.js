/**
 * @class BattleStage
 * @classdesc 戰鬥台。提供寶可夢戰鬥之間的相關方法。
 * 
 * @prop {GameSystem.Classes.BattleInfo} player 玩家方的寶可夢戰鬥資訊。
 * @prop {GameSystem.Classes.BattleInfo} opponent 對手方的寶可夢戰鬥資訊。
 */
GameSystem.Classes.BattleStage =
class BattleStage {
    /**
     * @param {GameSystem.Classes.Pokemon} playerPokemon 玩家方的寶可夢戰鬥資訊。
     * @param {GameSystem.Classes.Pokemon} opponentPokemon 對手方的寶可夢戰鬥資訊。
     */
    constructor(playerPokemon, opponentPokemon) {
        this._player = new GameSystem.Classes.BattleInfo(playerPokemon);
        this._opponent = new GameSystem.Classes.BattleInfo(opponentPokemon);
    }
}