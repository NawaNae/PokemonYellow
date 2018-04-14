/**
 * @class BattleLevel
 * @classdesc 寶可夢戰鬥時Level
 * 
 * @prop {GameSystem.Classes.Protagonist} protagonist 主人公的資料。
 * @prop {GameSystem.Classes.NPC | GameSystem.Classes.Pokemon} opponent 為對手NPC或寶可夢。
 * @prop {boolean} isOpponentPokemon 對手是否為(野生)寶可夢。
 * @prop {GameSystem.Classes.BattleStage} battleStage 戰鬥台資訊。
 * @prop {number} opponentSelect 對手的寶可夢選擇。
 * @prop {Function} originalKeyHandler 紀錄原本的按鍵按下事件處理函式。
 */
class BattleLevel extends Framework.Level {
    /**
     * @param {GameSystem.Classes.Protagonist} protagonist 為主人公。
     * @param {GameSystem.Classes.NPC | GameSystem.Classes.Pokemon} opponent 為對手NPC或寶可夢。
     * @param {GameSystem.Classes.Pokemon} selectPokemon 玩家所選擇的寶可夢。
     */
    constructor(protagonist, opponent, selectPokemon) {
        super();
        this._protagonist = protagonist;
        this._opponent = opponent;
        this._isOpponentPokemon = opponent instanceof GameSystem.Classes.Pokemon;
        this.anim = () => {};

        return;
        if (this._isOpponentPokemon) {
            this._battleStage = new GameSystem.Classes.BattleStage(selectPokemon, opponent);
        }
        else {
            this._opponentSelect = 0;
            this._battleStage = new GameSystem.Classes.BattleStage(selectPokemon, opponent.pokemons[0]);
        }
        this.originalKeyHandler = null;
    }

    load() {
        this.enableDraw();
        this.originalKeyHandler = GameSystem.Manager.Key.keyInput;
        GameSystem.Manager.Key.keyInput = (e) => { this.keyInput(e); }
    }

    keyInput(e) {
        let DEX = GameSystem.Classes.BattleAnimations.AttackToDictionary;
        this.anim = DEX['投球'].action;
    }

    enableDraw(){
        this.__enableDraw = new Framework.Sprite(define.imagePath + 'null.png');//去除draw bug用的
        this.__enableDraw.position = { x: -1, y: -1 };
        this.rootScene.attach(this.__enableDraw);
    }

    update() {
        this.__enableDraw.position.x += this.__enableDraw.position.x < -2 ? 1 : -1;
    }

    draw(ctx) {
        this.anim(ctx);
    }
}