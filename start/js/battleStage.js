/**
 * @class BattleStage
 * @classdesc 戰鬥台。提供寶可夢戰鬥之間的相關方法。
 * 
 * @prop {GameSystem.Classes.BattleInfo} player 玩家方的寶可夢戰鬥資訊。
 * @prop {GameSystem.Classes.BattleInfo} opponent 對手方的寶可夢戰鬥資訊。
 */
var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.BattleStage =
class BattleStage {
    /**
     * @param {GameSystem.Classes.Pokemon} playerPokemon 玩家方的寶可夢戰鬥資訊。
     * @param {GameSystem.Classes.Pokemon} opponentPokemon 對手方的寶可夢戰鬥資訊。
     * @param {GameSystem.Classes.NPC?} opponentPlayer 對手資訊。此項為空則表示為野生寶可夢。
     */
    constructor(playerPokemon, opponentPokemon) {
        this._player = new GameSystem.Classes.BattleInfo(playerPokemon);
        this._opponent = new GameSystem.Classes.BattleInfo(opponentPokemon);
    }

    /**
     * 取得先後攻的順序。
     * @return {GameSystem.Classes.Pokemon[]} 儲存 [先攻的寶可夢, 後攻的寶可夢]。
     */
    getPokemonOrder(playerMove, opponentMove) {
        let playerPokemon = this._player.pokemon, opponentPokemon = this._opponent.pokemon;
        return (playerMove.priority >= opponentMove.priority || playerPokemon.speed >= opponentPokemon.speed) ? playerPokemon : opponentPokemon;
    }

    /**
     * 做一回合的戰鬥動作。
     * @param {GameSystem.Classes.Move} playerMove 玩家所選擇的招式。
     * @return {GameSystem.Classes.BattleResult} 一回合戰鬥完的結果。
     */
    doOneRoundBattle(playerMove) {
        const AttackToAnimations = GameSystem.Classes.BattleAnimation.Dictionary.AttackTo;
        const AttackedByAnimations = GameSystem.Classes.BattleAnimation.Dictionary.AttackedBy;

        let opponentMove = this._opponent.pokemon.randomlyTakeMove();
        let [attacker, defender] = (playerMove.priority >= opponentMove.priority || this._player.speed >= this._opponent.speed) ? [this._player, this._opponent] : [this._opponent, this._player];
        let [atkMove, defMove] = (attacker == this._player) ? [playerMove, opponentMove] : [opponentMove, playerMove];

        let defDamage = this.getNormalDamage(attacker == this._player, atkMove);                // 後攻方的傷害
        let atkDamage = this.getNormalDamage(defender == this._player, defMove);                // 先攻方的傷害
        let battleResult = new GameSystem.Classes.BattleResult();

        // 將「先攻方攻擊後攻方」的動畫、動作加入到BattleResult中
        battleResult.addMessage(attacker.pokemon.name + "使用了招式「" + atkMove.name + "」！");
        battleResult.addBattleAnimation(attacker == this._player ? AttackToAnimations[atkMove.name] : AttackedByAnimations[atkMove.name]);
        battleResult.addHPBarAnimation(-defDamage, defender.pokemon.maxHP, defender == this._player);

        // 實作攻擊，並判斷後攻方的寶可夢是否瀕死
        if (defender.acceptDamage(defDamage)) {
            attacker == this._player ? battleResult.playerWins() : battleResult.opponentWins();
            defender == this._player ? battleResult.addPlayerPokemonFaint(this._player.pokemon.name) : battleResult.addOpponentPokemonFaint(this._opponent.pokemon.name);
            return battleResult;
        }

        // 停頓1秒
        battleResult.addWaitingTime(1000);

        // 將「後攻方攻擊先攻方」的動畫、動作加入到BattleResult中
        battleResult.addMessage(defender.pokemon.name + "使用了招式「" + defMove.name + "」！");
        battleResult.addBattleAnimation(defender == this._player ? AttackToAnimations[defMove.name] : AttackedByAnimations[defMove.name]);
        battleResult.addHPBarAnimation(-atkDamage, attacker.pokemon.maxHP, attacker == this._player);

        // 實作攻擊，並判斷先攻方的寶可夢是否瀕死
        if (attacker.acceptDamage(atkDamage)) {
            defender == this._player ? battleResult.playerWins() : battleResult.opponentWins();
            attacker == this._player ? battleResult.addPlayerPokemonFaint(this._player.pokemon.name) : battleResult.addOpponentPokemonFaint(this._opponent.pokemon.name);
            return battleResult;
        }

        battleResult.addMessage();
        return battleResult;
    }

    /**
     * 計算、取得一般傷害值。
     * @param {boolean} isPlayer 是否由玩家方所發起的攻擊。
     * @param {GameSystem.Classes.Move} move 被發動的招式。
     */
    getNormalDamage(isPlayer, move) {
        // 辨識攻、防兩方的寶可夢
        let [attacker, defender] = isPlayer ? [this._player.pokemon, this._opponent.pokemon] : [this._opponent.pokemon, this._player.pokemon];
        let against = this.getAgainstValue(isPlayer);                                                           // 屬性相剋加成
        if (against == 0) return 0;                                                                             // 若攻擊完全被剋，則直接回傳0

        let STAB = (attacker.typeA == move.type || attacker.typeB == move.type) ? 1.5 : 1;                      // 屬性一致加成效果
        let criticalHit = this.isCriticalHit(isPlayer);                                                         // 「擊中要害」加成
        let rndValue = (85 + (Math.random() * 16)) / 100.0;                                                     // 傷害隨機數

        // 計算最後的傷害
        let damage = (((2 * attacker.level + 10) / 250) * (attacker.attack / defender.defense) * move.power + 2) * against * STAB * criticalHit * rndValue;
        
        return damage < 1 ? 1 : Math.round(damage);     // 若傷害低於1，則提升到1。
    }

    /**
     * 取得屬性相剋的倍數數值。
     * @param {boolean} isPlayer 攻擊方是否為玩家。
     * @return {number} 相剋的倍數。
     */
    getAgainstValue(isPlayer) {
        let typeTable = GameSystem.Classes.StandardStat.AgainstTable;
        let [player, opponent] = [this._player.pokemon, this._opponent.pokemon];
        let rate = 1;
        if (isPlayer) {
            rate *= (player.typeA && opponent.typeA) ? typeTable[player.typeA][opponent.typeA] : 1;
            rate *= (player.typeA && opponent.typeB) ? typeTable[player.typeA][opponent.typeB] : 1;
            rate *= (player.typeB && opponent.typeA) ? typeTable[player.typeB][opponent.typeA] : 1;
            rate *= (player.typeB && opponent.typeB) ? typeTable[player.typeB][opponent.typeB] : 1;
        }
        else {
            rate *= (opponent.typeA && player.typeA) ? typeTable[opponent.typeA][player.typeA] : 1;
            rate *= (opponent.typeA && player.typeB) ? typeTable[opponent.typeA][player.typeB] : 1;
            rate *= (opponent.typeB && player.typeA) ? typeTable[opponent.typeB][player.typeA] : 1;
            rate *= (opponent.typeB && player.typeB) ? typeTable[opponent.typeB][player.typeB] : 1;
        }
        return rate;
    }

    /**
     * 計算是否有「擊中要害」。 (尚未完成)
     * @param {boolean} isPlayer 攻擊方是否為玩家。
     * @return {boolean} 是否有擊中要害。
     */
    isCriticalHit(isPlayer) {
        return 1;
    }

    /**
     * 取得戰鬥後的經驗值。
     * @param {boolean} isOpponentATrainer 對手是否為訓練家。
     * @param {boolean} isObtained 是否捕捉寶可夢。
     * @return {number} 經驗數值。
     */
    getExperience(isOpponentATrainer, isObtained) {
        let a = isOpponentATrainer ? 1.5 : 1;   // 對手是否為訓練師
        let t = isObtained ? 1 : 1.5;           // 是否為捕捉寶可夢
        let b = 1;                              // 被打倒的寶可夢之基礎經驗值 (Haven't done yet)
        let L = this._opponent.pokemon.level;   // 對手寶可夢之等級
        let s = 1;                              // 參加對戰並沒有進入瀕死狀態的寶可夢數量 (Haven't done yet)
        let k = 1;                              // 學習裝置關閉或者寶可夢參加對戰則為1; 學習裝置開啟且寶可夢沒有參加對戰則為2; 學習裝置開啟且同行的寶可夢只有1隻則為0.5
        return Math.ceil((a * t * b * L) / (7 * s * k));
    }
}