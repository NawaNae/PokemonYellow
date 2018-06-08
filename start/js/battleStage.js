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
     */
    constructor(playerPokemon, opponentPokemon) {
        this._player = new GameSystem.Classes.BattleInfo(playerPokemon);
        this._opponent = new GameSystem.Classes.BattleInfo(opponentPokemon);
        this._escapeTimes = 0;
    }

    get playerPokemon() { return this._player.pokemon; }
    get opponentPokemon() { return this._opponent.pokemon; }

    /**
     * 取得先後攻的順序。
     * @return {GameSystem.Classes.Pokemon[]} 儲存 [先攻的寶可夢, 後攻的寶可夢]。
     */
    getPokemonOrder(playerMove, opponentMove) {
        return (playerMove.priority >= opponentMove.priority || this._player.speed >= this._opponent.speed) ? playerPokemon : opponentPokemon;
    }

    /**
     * 做一回合的戰鬥動作。
     * @param {GameSystem.Classes.Move | GameSystem.Classes.PropItem | GameSystem.Classes.Pokemon | undefined} choice 玩家所做出的選擇。
     * 若是招式(Move)，則進行一般的回合制動作；
     * 若是道具(PropItem)，則進行道具使用動作；
     * 若是未定義(undefined)，則嘗試進行逃跑動作。'若逃跑失敗，則會一般地進行戰鬥。
     * @return {GameSystem.Classes.BattleResult} 一回合戰鬥完的結果。
     */
    doOneRoundBattle(choice) {
        let battleResult = new GameSystem.Classes.BattleResult();

        // 若玩家嘗試逃跑，則計算其機率
        if (!choice) {
            let a = this._player.speed, b = Math.floor(this._opponent.speed / 4) % 256, c = ++this._escapeTimes;
            let f = (a * 32) / b + 30 * c;
            battleResult.addMessage("你嘗試進行逃跑...");
            if (f > 255 || Math.floor(Math.random() * 256) < f) {
                battleResult.addMessage("你和你的寶可夢成功地逃走了！");
                battleResult.playerEscaped();
                return battleResult;
            }
            else {
                battleResult.addMessage("逃跑失敗！");
            }
        }
        
        // 玩家做了更換寶可夢的動作
        if (choice.constructor == GameSystem.Classes.Pokemon) {
            // 若寶可夢是在生命值大於0的狀態下更換，則加入移出動畫
            if (this._player.HP > 0) {
                let outImage = Load.image(this._player.backImagePath);
                battleResult.addPlayerPokemonMovingOut(this._player.name, outImage);
            }
            this._player.changePokemon(choice);
            battleResult.addPlayerPokemonMovingIn(choice.name);
        }

        let playerMove = (choice && choice.constructor == GameSystem.Classes.Move) ? choice : undefined;
        let opponentMove = this._opponent.pokemon.randomlyTakeMove();
        let [attacker, defender] = (playerMove && (playerMove.priority >= opponentMove.priority || this._player.speed >= this._opponent.speed)) ? [this._player, this._opponent] : [this._opponent, this._player];
        let [atkMove, defMove] = (attacker == this._player) ? [playerMove, opponentMove] : [opponentMove, playerMove];
        
        // 首先，先處理先攻方(Attacker)對後攻方(Defender)的招式動作
        if (atkMove && this._halfRoundBattle(battleResult, attacker, defender, atkMove))
            return battleResult;

        // 停頓1秒
        battleResult.addWaitingTime(1000);

        // 再來，先處理後攻方(Defender)對先攻方(Attacker)的招式動作
        if (defMove && this._halfRoundBattle(battleResult, defender, attacker, defMove))
            return battleResult;
        
        // 判斷先攻者是否為燒傷狀態或中毒狀態。
        // 若為燒傷狀態，則使其接受 (最大生命值 / 16) 的傷害；若為中毒狀態，則使其接受 (最大生命值 / 8) 的傷害
        if (this._checkBurned(battleResult, attacker) || this._checkPoisoned(battleResult, attacker))
            return battleResult;

        // 判斷後攻者是否為燒傷狀態或中毒狀態。
        // 若為燒傷狀態，則使其接受 (最大生命值 / 16) 的傷害；若為中毒狀態，則使其接受 (最大生命值 / 8) 的傷害
        if (this._checkBurned(battleResult, defender) || this._checkPoisoned(battleResult, defender))
            return battleResult;
        
        this._checkDeforzen(battleResult, attacker);  // 若先攻者為冰凍狀態，則計算解除狀態的機率
        this._checkDeforzen(battleResult, defender);  // 若後攻者為冰凍狀態，則計算解除狀態的機率

        this._checkWakeUp(battleResult, attacker);    // 若先攻者為睡眠狀態，則計算甦醒機率。
        this._checkWakeUp(battleResult, defender);    // 若後攻者為睡眠狀態，則計算甦醒機率。

        battleResult.addMessage();
        return battleResult;
    }

    /**
     * 實作半場的戰鬥動作。
     * @param {GameSystem.Classes.BattleResult} battleResult 戰鬥結果物件。
     * @param {GameSystem.Classes.BattleInfo} attacker 攻擊方。
     * @param {GameSystem.Classes.BattleInfo} defender 防禦方。(被攻擊方)
     * @param {GameSystem.Classes.Move} move 攻擊方所出的招式。
     * @return {boolean} 防禦方是否被擊倒。
     */
    _halfRoundBattle(battleResult, attacker, defender, move) {
        const AttackToAnim = GameSystem.Classes.BattleAnimation.Dictionary.AttackTo;
        const AttackedByAnim = GameSystem.Classes.BattleAnimation.Dictionary.AttackedBy;
        const PEffectAnim = GameSystem.Classes.BattleAnimation.Dictionary.PlayerEffect;
        const OEffectAnim = GameSystem.Classes.BattleAnimation.Dictionary.OpponentEffect;
        const MoveTypes = GameSystem.Classes.Move.Types;

        // 計算是否失誤
        if (move.accuracy) {
            let accuracy = GameSystem.Classes.Move.AccuracyTable[move.accuracy] * attacker.accuracy / defender.evasion;
            let rndVal = Math.floor(Math.random() * 255) + 1;
            if (rndVal >= accuracy) {
                battleResult.addMessage(attacker.name + "使用了招式「" + move.name + "」！");
                battleResult.addMessage("但是" + attacker.name + "失誤了...");
                return false;
            }
        }

        // 確認是否麻痺。若為麻痺，則計算可使用招式的機率。
        if (attacker.isParalysis && Math.random() <= 0.25) {
            battleResult.addMessage(attacker.name + "麻痺了！無法使用招式「" + move.name + "」");
            return false;
        }

        // 若寶可夢處於「冰凍狀態」，則無法使用招式。
        if (attacker.isForzen) {
            battleResult.addMessage(attacker.name + "處於冰凍狀態！無法使出招式！");
            return false;
        }

        // 「物理」類之事 (Special為暫時)
        if (move.moveType == MoveTypes.Physical || move.moveType == MoveTypes.Special) {
            let damage = this.getNormalDamage(attacker, defender, move);                    // 取得傷害

            // 將的動畫、動作加入到BattleResult中
            let isFainted = defender.acceptDamage(damage);
            battleResult.addMessage(attacker.name + "使用了招式「" + move.name + "」！");
            battleResult.addBattleAnimation(attacker == this._player ? AttackToAnim[move.name] : AttackedByAnim[move.name]);
            battleResult.addHPBarAnimation(-damage, defender.HP, defender.maxHP, defender == this._player);

            // 實作攻擊，並判斷後攻方的寶可夢是否瀕死
            if (isFainted) {
                attacker == this._player ? battleResult.playerWins() : battleResult.opponentWins();
                defender == this._player ? battleResult.addPlayerPokemonMovingOut(this._player.name) : battleResult.addOpponentPokemonFaint(this._opponent.name);
                return true;
            }
        }
        else if (move.moveType == MoveTypes.Status) {        // 「變化」類招式
            let newLevel;
            // 施加效果的對象為對手
            if (move.isEffectToOpponent) {
                newLevel = defender.changeStatLevel(move);                                                                              // 變更狀態階級，並取得最後的變化差
                battleResult.addMessage(attacker.name + "對" + defender.name + "施加了「" + move.name + "」!");                           // 輸出動作訊息
                battleResult.addBattleAnimation(attacker == this._player ? PEffectAnim[move.name] : OEffectAnim[move.name]);            // 新增動畫特效
                battleResult.addMessage(defender.name + "的" + GameSystem.Classes.Move.getStatEffectInfo(move.statType, newLevel, move.levelChange));    // 取得效果訊息
            }
            else {
                newLevel = attacker.changeStatLevel(move);                                                                              // 變更狀態階級，並取得最後的變化差
                battleResult.addMessage(attacker.name + "對自己使用了「" + move.name + "」!");                                             // 輸出動作訊息
                battleResult.addBattleAnimation(attacker == this._player ? PEffectAnim[move.name] : OEffectAnim[move.name]);            // 新增動畫特效
                battleResult.addMessage(attacker.name + "的" + GameSystem.Classes.Move.getStatEffectInfo(move.statType, newLevel, move.levelChange));    // 取得效果訊息
            }
        }
        return false;
    }

    /**
     * 確認是否為灼傷狀態。若是，則實作灼傷。
     * @param {GameSystem.Classes.BattleResult} battleResult 戰鬥結果物件。
     * @param {GameSystem.Classes.BattleInfo} pokemon 戰鬥訊息物件。
     * @return {boolean} 寶可夢是否燒到昏厥。
     */
    _checkBurned(battleResult, pokemon) {
        if (pokemon.isBurned) {
            let burnedDamage = Math.floor(pokemon.maxHP / 16);
            battleResult.addMessage(pokemon.name + "處於燒傷狀態！");
            battleResult.addHPBarAnimation(burnedDamage, pokemon.maxHP, pokemon == this._player);
            battleResult.addMessage(pokemon.name + "受到" + burnedDamage + "點灼傷傷害！");
            if (pokemon.acceptDamage(burnedDamage)) {
                pokemon != this._player ? battleResult.playerWins() : battleResult.opponentWins();
                pokemon == this._player ? battleResult.addPlayerPokemonMovingOut(this._player.name) : battleResult.addOpponentPokemonFaint(this._opponent.name);
                return true;
            }
        }
        return false;
    }

    /**
     * 確認是否為中毒狀態。若是，則實作中毒。
     * @param {GameSystem.Classes.BattleResult} battleResult 戰鬥結果物件。
     * @param {GameSystem.Classes.BattleInfo} pokemon 戰鬥訊息物件。
     * @return {boolean} 寶可夢是否中毒到昏厥。
     */
    _checkPoisoned(battleResult, pokemon) {
        if (pokemon.isPoisoned) {
            let burnedDamage = Math.floor(pokemon.maxHP / 8);
            battleResult.addMessage(pokemon.name + "處於中毒狀態！");
            battleResult.addHPBarAnimation(burnedDamage, pokemon.maxHP, pokemon == this._player);
            battleResult.addMessage(pokemon.name + "受到" + burnedDamage + "點中毒傷害！");
            if (pokemon.acceptDamage(burnedDamage)) {
                pokemon != this._player ? battleResult.playerWins() : battleResult.opponentWins();
                pokemon == this._player ? battleResult.addPlayerPokemonMovingOut(this._player.name) : battleResult.addOpponentPokemonFaint(this._opponent.name);
                return true;
            }
        }
        return false;
    }

    /**
     * 確認及計算解凍機率。 (Haven't done yet)
     * @param {GameSystem.Classes.BattleResult} battleResult 戰鬥結果物件。
     * @param {GameSystem.Classes.BattleInfo} pokemon 戰鬥訊息物件。
     */
    _checkDeforzen(battleResult, pokemon) {
        if (pokemon.isForzen && Math.random() <= 0.2) {
            battleResult.addMessage(pokemon.name + "解凍了！");
            pokemon.isForzen = false;
        }
    }

    /**
     * 確認及計算甦醒機率。 (Haven't done yet)
     * @param {GameSystem.Classes.BattleResult} battleResult 戰鬥結果物件。
     * @param {GameSystem.Classes.BattleInfo} pokemon 戰鬥訊息物件。
     */
    _checkWakeUp(battleResult, pokemon) {
        if (pokemon.isAsleep && --pokemon.asleepTimes <= 0) {
            battleResult.addMessage(pokemon.name + "從睡眠中醒來了！");
            pokemon.isAsleep = false;
        }
    }

    /**
     * 計算、取得一般傷害值。
     * @param {GameSystem.Classes.BattleInfo} attacker 攻擊方。
     * @param {GameSystem.Classes.BattleInfo} defender 防守方。
     * @param {GameSystem.Classes.Move} move 被發動的招式。
     */
    getNormalDamage(attacker, defender, move) {
        let against = this.getAgainstValue(attacker == this._player);                                           // 屬性相剋加成
        if (against == 0) return 0;                                                                             // 若攻擊完全被剋，則直接回傳0

        let STAB = (attacker.typeA == move.type || attacker.typeB == move.type) ? 1.5 : 1;                      // 屬性一致加成效果
        let criticalHit = this.isCriticalHit(attacker == this._player);                                         // 「擊中要害」加成
        let rndValue = (85 + (Math.random() * 16)) / 100.0;                                                     // 傷害隨機數

        // 計算最後的傷害
        let damage = (((2 * attacker.level + 10) / 250) * (attacker.attack / defender.defense) * move.power + 2) * against * STAB * criticalHit * rndValue;

        // 若攻擊方處於「灼傷狀態」，則攻擊效果減半。
        if (attacker.isBurned)
            damage /= 2;

        return damage < 1 ? 1 : Math.round(damage);     // 若傷害低於1，則提升到1。
    }

    /**
     * 取得屬性相剋的倍數數值。
     * @param {boolean} isPlayer 攻擊方是否為玩家。
     * @return {number} 相剋的倍數。
     */
    getAgainstValue(isPlayer) {
        let typeTable = GameSystem.Classes.StandardStat.AgainstTable;
        let [player, opponent] = [this._player, this._opponent];
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
        let a = isOpponentATrainer ? 1.5 : 1;                   // 對手是否為訓練師
        let t = isObtained ? 1 : 1.5;                           // 是否為捕捉寶可夢
        let b = this._opponent.pokemon.getBasicExperience();    // 被打倒的寶可夢之基礎經驗值
        let L = this._opponent.pokemon.level;                   // 對手寶可夢之等級
        let s = 1;                                              // 參加對戰並沒有進入瀕死狀態的寶可夢數量 (Haven't done yet)
        let k = 1;                                              // 學習裝置關閉或者寶可夢參加對戰則為1; 學習裝置開啟且寶可夢沒有參加對戰則為2; 學習裝置開啟且同行的寶可夢只有1隻則為0.5
        return Math.ceil((a * t * b * L) / (7 * s * k));
    }
}