/** @typedef AnimationSet 動畫繪圖方式集合
 * @prop {Function} main 主要繪製的方法。帶context參數。
 */
//
/** @class BattleLevel
 * @classdesc 寶可夢戰鬥時Level
 * 
 * @prop {GameSystem.Classes.Protagonist} protagonist 主人公的資料。
 * @prop {GameSystem.Classes.Pokemon} selectPokemon 玩家所選的寶可夢。
 * @prop {GameSystem.Classes.NPC | GameSystem.Classes.Pokemon} opponent 為對手NPC或寶可夢。
 * @prop {boolean} isOpponentPokemon 對手是否為(野生)寶可夢。
 * @prop {GameSystem.Classes.BattleStage} battleStage 戰鬥台資訊。
 * @prop {number} opponentSelect 對手的寶可夢選擇。
 * @prop {Function} originalKeyHandler 紀錄原本的按鍵按下事件處理函式。
 * 
 * @prop {BattleLevel.InputMode} inputMode 目前使用者輸入對應到的操作模式。
 * @prop {Function} keyInputHandler 鍵盤輸入事件的處理者函式變數。
 * @prop {number} menuSelection 選單上的選擇。
 * @prop {number} moveListSelection 招式選單上的選擇。
 * @prop {number} moveListCount 招式選單上的招式量。
 * @prop {number} backpackItemSelection 背包清單上的選擇。
 * @prop {number} pokemonListSelection 寶可夢清單上的選擇。
 * @prop {number} pokemonListMenuSelection 寶可夢清單中的選單之選擇。
 * @prop {boolean} pokemonInfoPage 寶可夢資訊頁面中的分頁：false為第一頁、true為第二頁。
 * @prop {AnimationSet} animationSet 動畫繪製方法集合。
 */
class BattleLevel extends Framework.Level {
    constructor() {
        super();
    }

    /**
     * 當此戰鬥關卡被讀取時所做的動作。
     */
    load() {
        this.animationSet = {main: BattleLevel.emptyAnimation};
        this.enableDraw();
        this._originalKeyHandler = GameSystem.Manager.Key.keyInput;
        GameSystem.Manager.Key.keyInput = (e) => { this._keyInputHandler(e); };

        // 取得在 GameSystem.Bridges.BattleData 的橋接資料與 GameSystem.protagonist 主人公資料。
        this._protagonist = GameSystem.protagonist;
        this._selectPokemon = GameSystem.Bridges.BattleData.selectPokemon;
        this._opponent = GameSystem.Bridges.BattleData.opponent;
        this._isOpponentPokemon = this._opponent instanceof GameSystem.Classes.Pokemon;

        // 判斷是否為對手(opponent)是否為「寶可夢」或「NPC」
        if (this._isOpponentPokemon) {
            this._battleStage = new GameSystem.Classes.BattleStage(this._selectPokemon, this._opponent);
        }
        else {
            this._opponentSelect = 0;
            this._battleStage = new GameSystem.Classes.BattleStage(this._selectPokemon, this._opponent.pokemons[0]);
        }

        // 初始化選單參數
        this._inputMode = BattleLevel.InputMode.BattlePad_Menu;
        this._keyInputHandler = this.keyInput_OnBattlePad_Menu;
        this._menuSelection = 0;
        this._moveListSelection = 0;
        this._moveListCount = this._selectPokemon.getMoves().length;
        this._backpackItemSelection = 0;
        this._pokemonListSelection = 0;
        this._pokemonListMenuSelection = 0;
        this._pokemonInfoPage = false;

        // 確保 HTMLObjectContainer 有顯示
        document.querySelector(".HTMLObjectContainer").classList.remove('hide');

        // 將資料更新至畫面上並顯示畫面
        GameSystem.BattlePad.resetViews();
        GameSystem.BattlePad.updateInfo(this._selectPokemon, this._opponent, this._protagonist.pokemons, this._protagonist.props);
        GameSystem.BattlePad.show();
    }

    // #region ============================== KeyInput Handlers ==============================

    keyInput(e) { /* 轉移至 this._keyInputHander 作為替代方案 */ }

    /**
     * 在戰鬥版面中的選單之下的按鍵處理。
     * @param {KeyboardEvent} e 事件物件。
     */
    keyInput_OnBattlePad_Menu(e) {
        switch (e.key) {
            case 'W':
                if (this._menuSelection == 1) {
                    GameSystem.BattlePad.setMenuCursor(0);
                    this._menuSelection = 0;
                }
                else if (this._menuSelection == 3) {
                    GameSystem.BattlePad.setMenuCursor(2);
                    this._menuSelection = 2;
                }
                break;
            case 'S':
                if (this._menuSelection == 0) {
                    GameSystem.BattlePad.setMenuCursor(1);
                    this._menuSelection = 1;
                }
                else if (this._menuSelection == 2) {
                    GameSystem.BattlePad.setMenuCursor(3);
                    this._menuSelection = 3;
                }
                break;
            case 'A':
                if (this._menuSelection == 2) {
                    GameSystem.BattlePad.setMenuCursor(0);
                    this._menuSelection = 0;
                }
                else if (this._menuSelection == 3) {
                    GameSystem.BattlePad.setMenuCursor(1);
                    this._menuSelection = 1;
                }
                break;
            case 'D':
                if (this._menuSelection == 0) {
                    GameSystem.BattlePad.setMenuCursor(2);
                    this._menuSelection = 2;
                }
                else if (this._menuSelection == 1) {
                    GameSystem.BattlePad.setMenuCursor(3);
                    this._menuSelection = 3;
                }
                break;
            case 'K':
                if (this._menuSelection == 0) {
                    this._inputMode = BattleLevel.InputMode.BattlePad_MoveList;
                    this._keyInputHandler = this.keyInput_OnBattlePad_MoveList;
                    GameSystem.BattlePad.showMoveListPad();
                    GameSystem.BattlePad.showMoveInfoPad();
                }
                else if (this._menuSelection == 1) {
                    this._inputMode = BattleLevel.InputMode.BattlePad_Backpack;
                    this._keyInputHandler = this.keyInput_OnBattlePad_Backpack;
                    GameSystem.BattlePad.showBackpackPad();
                }
                else if (this._menuSelection == 2) {
                    this._inputMode = BattleLevel.InputMode.PokemonList;
                    this._keyInputHandler = this.keyInput_OnPokemonList;
                    GameSystem.BattlePad.showPokemonListPad();
                }
                else if (this._menuSelection == 3) {
                    // Run Away
                }
        }
    }

    /**
     * 在戰鬥版面中的招式清單之下的按鍵處理。
     * @param {KeyboardEvent} e 事件物件。
     */
    keyInput_OnBattlePad_MoveList(e) {
        switch(e.key) {
            case 'W':
                if (this._moveListSelection > 0) {
                    this._moveListSelection -= 1;
                    GameSystem.BattlePad.setMoveListMouseCursor(this._moveListSelection);
                }
                break;
            case 'S':
                if (this._moveListSelection + 1 < this._moveListCount) {
                    this._moveListSelection += 1;
                    GameSystem.BattlePad.setMoveListMouseCursor(this._moveListSelection);
                }
                break;
            case 'K':
                // Fighting Action
                break;
            case 'B':
                this._inputMode = BattleLevel.InputMode.BattlePad_Menu;
                this._keyInputHandler = this.keyInput_OnBattlePad_Menu;
                GameSystem.BattlePad.hideMoveListPad();
                GameSystem.BattlePad.hideMoveInfoPad();
        }
    }

    /**
     * 在戰鬥版面中的背包物品清單之下的按鍵處理。
     * @param {KeyboardEvent} e 事件物件。
     */
    keyInput_OnBattlePad_Backpack(e) {
        switch(e.key) {
            case 'W':
                if (this._backpackItemSelection > 0) {
                    this._backpackItemSelection -= 1;
                    GameSystem.BattlePad.setBackpackItemCursor(this._backpackItemSelection);
                }
                break;
            case 'S':
                if (this._backpackItemSelection + 1 <= this._protagonist.props.length ) {
                    this._backpackItemSelection += 1;
                    GameSystem.BattlePad.setBackpackItemCursor(this._backpackItemSelection);
                }
                break;
            case 'K':
                // 若所選為道具，則執行道具相對應的動作效果
                if ( this._backpackItemSelection < this._protagonist.props.length ) {
                    // Use prop
                    break;
                }
                // else: 若所選為「返回」(清單中最後一項)，則返回至主選單
            case 'B':
                this._inputMode = BattleLevel.InputMode.BattlePad_Menu;
                this._keyInputHandler = this.keyInput_OnBattlePad_Menu;
                GameSystem.BattlePad.hideBackpackPad();
        }
    }

    /**
     * 在寶可夢清單版面之下的按鍵處理。
     * @param {KeyboardEvent} e 事件物件。
     */
    keyInput_OnPokemonList(e) {
        switch(e.key) {
            case 'W':
                if (this._pokemonListSelection > 0) {
                    this._pokemonListSelection -= 1;
                    GameSystem.BattlePad.setPokemonListCursor(this._pokemonListSelection);
                }
                break;
            case 'S':
                if (this._pokemonListSelection + 1 < this._protagonist._pokemons.length) {
                    this._pokemonListSelection += 1;
                    GameSystem.BattlePad.setPokemonListCursor(this._pokemonListSelection);
                }
                break;
            case 'K':
                this._inputMode = BattleLevel.InputMode.PokemonList_Menu;
                this._keyInputHandler = this.keyInput_OnPokemonList_Menu;
                GameSystem.BattlePad.showPokemonListPadMenu();
                break;
            case 'B':
                this._inputMode = BattleLevel.InputMode.BattlePad_Menu;
                this._keyInputHandler = this.keyInput_OnBattlePad_Menu;
                GameSystem.BattlePad.hidePokemonListPad();
        }
    }

    /**
     * 在寶可夢清單版面中的選單之下的按鍵處理。
     * @param {KeyboardEvent} e 事件物件。
     */
    keyInput_OnPokemonList_Menu(e) {
        switch(e.key) {
            case 'W':
                if (this._pokemonListMenuSelection > 0) {
                    this._pokemonListMenuSelection -= 1;
                    GameSystem.BattlePad.setPokemonListPadMenuCursor(this._pokemonListMenuSelection);
                }
                break;
            case 'S':
                if (this._pokemonListMenuSelection < 2) {
                    this._pokemonListMenuSelection += 1;
                    GameSystem.BattlePad.setPokemonListPadMenuCursor(this._pokemonListMenuSelection);
                }
                break;
            case 'K':
                if (this._pokemonListMenuSelection == 0) {
                    this._inputMode = BattleLevel.InputMode.PokemonInfo;
                    this._keyInputHandler = this.keyInput_OnPokemonInfo;
                    this._pokemonInfoPage = false;
                    GameSystem.BattlePad.setPokemonInfoPadData(this._protagonist._pokemons[this._pokemonListSelection]);
                    GameSystem.BattlePad.showPokemonInfoPad(false);
                    break;
                }
                else if (this._pokemonListMenuSelection == 1) {
                    
                    break;
                }
            case 'B':
                this._inputMode = BattleLevel.InputMode.PokemonList;
                this._keyInputHandler = this.keyInput_OnPokemonList;
                GameSystem.BattlePad.hidePokemonListPadMenu();
        }
    }
    
    /**
     * 在寶可夢資訊版面之下的按鍵處理。
     * @param {KeyboardEvent} e 事件物件。
     */
    keyInput_OnPokemonInfo(e) {
        if (this._pokemonInfoPage) {
            this._inputMode = BattleLevel.InputMode.PokemonList_Menu;
            this._keyInputHandler = this.keyInput_OnPokemonList_Menu;
            GameSystem.BattlePad.hidePokemonInfoPad();
        }
        else {
            this._pokemonInfoPage = true;
            GameSystem.BattlePad.showPokemonInfoPad(true);
        }
    }

    /**
     * 案件按下處理函式。此函式表示不處理任何按下的
     * @param {KeyboardEvent} e 事件物件。
     */
    keyInput_Empty(e) {}

    // #endregion ============================================================================

    // #region ============================= Game Handler ====================================

    

    // #endregion ============================================================================

    // #region ============================== Animation Actions ==============================

    /**
     * 執行戰鬥動畫、動作。以BattleResult作為根據來執行一系列的動作。
     * @param {GameSystem.Classes.BattleResult} battleResult 戰鬥結果。要執行的動畫以此作為根據。
     */
    executeAnimationQueue(battleResult) {
        const ActionType = GameSystem.Classes.BattleResult.ActionType;
        const self = this;
        // 暫時取消使用者的輸入處理
        this._inputMode = BattleLevel.InputMode.Empty;
        this._keyInputHandler = this.keyInput_Empty;

        GameSystem.BattlePad.hideMenu(); /* !!! For debugging. This line should set in key input handler function. !!! */

        // 定義動畫師
        function Animator() {
            let action = battleResult.dequeueAction();      // 取得動畫動作
            // 若存在動畫動作，則執行該動畫(Promise)
            if (action) {
                return action.animation(self.animationSet).then(Animator);
            }
            else {
                self.finishAnimation();
                return true;
            }
        }
        // 執行動畫師
        Animator();
    }

    /**
     * 當完成動畫時的還原動作。
     */
    finishAnimation() {
        this._inputMode = BattleLevel.InputMode.BattlePad_Menu;
        this._keyInputHandler = this.keyInput_OnBattlePad_Menu;
        GameSystem.BattlePad.showMenu();
    }

    // #endregion ============================================================================

    /**
     * 當離開BattleLevel時的處理。
     */
    teardown() {
        GameSystem.BattlePad.hide();
        GameSystem.Manager.Key.keyInput = this._originalKeyHandler;     // 還原上一個Level的按鍵輸入處理
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
        this.animationSet.main(ctx);
    }

    /**
     * 判斷是否為方向按鍵。
     * @param {string} key 要判斷的按鍵名稱。
     * @return {boolean} 是否為方向按鍵。
     */
    static isDirectionKey(key) {
        return key === 'W' || key === 'S' || key === 'A' || key === 'D';
    }

    /**
     * 判斷是否為按鍵B。
     * @param {string} key 要判斷的按鍵名稱。
     * @return {boolean} 是否為方向按鍵。
     */
    static isKeyB(key) {
        return key === 'B';
    }

    /**
     * 判斷是否為按鍵K。
     * @param {string} key 要判斷的按鍵名稱。
     * @return {boolean} 是否為方向按鍵。
     */
    static isKeyK(key) {
        return key === 'K';
    }

    static emptyAnimation() { /* 空的動畫函式。 */ }
}

BattleLevel.InputMode = Object.freeze({
    BattlePad_Menu: Symbol("BattlePad_Menu"),
    BattlePad_MoveList: Symbol("BattlePad_MoveList"),
    BattlePad_Backpack: Symbol("BattlePad_Backpack"),
    PokemonList: Symbol("PokemonList"),
    PokemonList_Menu: Symbol("PokemonList_Menu"),
    PokemonInfo: Symbol("PokemonInfo"),
    Empty: Symbol("Empty")
});