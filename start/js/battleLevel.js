/** @typedef AnimationSet 動畫繪圖方式集合
 * @prop {Function} main 主要繪製的方法。帶context參數。
 */
//
/** @class BattleLevel
 * @classdesc 寶可夢戰鬥時Level
 * 
 * @prop {GameSystem.Classes.Protagonist} protagonist 主人公的資料。
 * @prop {GameSystem.Classes.Pokemon} playerPokemon 玩家所選的寶可夢。
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
 * @prop {Image} playerPokemonImage 玩家的寶可夢之圖像。
 * @prop {Image} opponentPokemonImage 對手的寶可夢之圖像。
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
        this.animationSet = {main: BattleLevel.emptyAnimation, playerPokemon: BattleLevel.emptyAnimation, opponentPokemon: BattleLevel.emptyAnimation};
        this.enableDraw();
        this._originalKeyHandler = GameSystem.Manager.Key.keyInput;
        GameSystem.Manager.Key.keyInput = (e) => { this._keyInputHandler(e); };

        // 取得在 GameSystem.Bridges.BattleData 的橋接資料與 GameSystem.protagonist 主人公資料。
        this._protagonist = GameSystem.protagonist;
        this._playerPokemon = GameSystem.Bridges.BattleData.selectPokemon;
        this._opponent = GameSystem.Bridges.BattleData.opponent;
        this._isOpponentPokemon = this._opponent instanceof GameSystem.Classes.Pokemon;

        // 判斷是否為對手(opponent)是否為「寶可夢」或「NPC」
        if (this._isOpponentPokemon) {
            this._battleStage = new GameSystem.Classes.BattleStage(this._playerPokemon, this._opponent);
        }
        else {
            this._opponentSelect = 0;
            this._battleStage = new GameSystem.Classes.BattleStage(this._playerPokemon, this._opponent.pokemons[0]);
        }
        
        // 讀取寶可夢圖像資料
        this._playerPokemonImage = Load.image(this._playerPokemon.getBackImagePath());
        this._opponentPokemonImage = this._isOpponentPokemon ? Load.image(this._opponent.getImagePath()) : Load.image(this._opponent.pokemons[0].getImagePath());

        // 初始化選單參數
        this._inputMode = BattleLevel.InputMode.Empty;
        this._keyInputHandler = this.keyInput_Empty;
        this._menuSelection = 0;
        this._moveListSelection = 0;
        this._moveListCount = this._playerPokemon.getMoves().length;
        this._backpackItemSelection = 0;
        this._pokemonListSelection = 0;
        this._pokemonListMenuSelection = 0;
        this._pokemonInfoPage = false;

        // 確保 HTMLObjectContainer 有顯示
        document.querySelector(".HTMLObjectContainer").classList.remove('hide');

        // 更新UI上的資料
        this.updateDateOnUI();
        GameSystem.BattlePad.setVisibleMenu(false);
        GameSystem.BattlePad.switchPokemonBallView(true);
        GameSystem.BattlePad.setPlayerPokemonBallsView(GameSystem.protagonist.getFaintPokemonCount(), GameSystem.protagonist.getAlivePokemonCount());
        if (this._isOpponentPokemon) {
            GameSystem.BattlePad.setOpponentPokemonBallsView();
        }
        else {
            GameSystem.BattlePad.setOpponentPokemonBallsView(this._opponent.getFaintPokemonCount(), this._opponent.getAlivePokemonCount());
        }

        // 播放進場動畫
        this.introAnimation(this._isOpponentPokemon ? undefined : this._opponent.getBattleImagePath());
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
                    this._moveListSelection = 0;
                    GameSystem.BattlePad.setMoveListMouseCursor(0);
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
            case 'K':   // Fighting Action
                GameSystem.BattlePad.hideMoveListPad();
                GameSystem.BattlePad.hideMoveInfoPad();
                GameSystem.BattlePad.setVisibleMenu(hide);
                this.doPokemonFight();
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

    /**
     * 更新畫面上的資料。
     */
    updateDateOnUI() {
        // 將資料更新至畫面上並顯示畫面
        GameSystem.BattlePad.resetViews();
        GameSystem.BattlePad.updateInfo(this._playerPokemon, this._opponent, this._protagonist.pokemons, this._protagonist.props);
        GameSystem.BattlePad.setVisibleMenu(true);
    }

    /**
     * 實作一回合的寶可夢戰鬥。
     */
    doPokemonFight() {
        let selectedMove = this._playerPokemon.getMoves()[this._moveListSelection];
        let result = this._battleStage.doOneRoundBattle(selectedMove);
        this.executeAnimationQueue(result);
    }

    // #endregion ============================================================================

    // #region ============================== Animation Actions ==============================

    /**
     * 進場動畫。
     * @param {string?} opponentTrainerImagePath 對手訓練師的圖片。若無責直接使用野生寶可夢圖示。
     */
    introAnimation(opponentTrainerImagePath) {
        const playerTrainerImage = Load.image(define.imagePath + "characters/Ash_InBattle.png");
        let ticks = 0, playerPos = {x: 10, y: 50}, opponentPos = {x: 95, y: 5};
        // 若有傳入訓練家的圖示位置
        if (opponentTrainerImagePath) {
            const opponentTrainerImage = Load.image(define.imagePath + "characters/" + opponentTrainerImagePath);
            opponentPos.x = 110;
            GameSystem.BattlePad.setBattleMessage(this._opponent.name + " 想要和你來場戰鬥！");
            // 將入場動畫設定至動畫集(animationSet)中
            this.animationSet.main = (ctx) => {
                ticks += 1;

                if (ticks < 200) {                      // 主角訓練師 與 對手訓練師
                    ctx.drawImage(playerTrainerImage, playerPos.x, playerPos.y);
                    ctx.drawImage(opponentTrainerImage, opponentPos.x, opponentPos.y);
                }
                else if (200 <= ticks && ticks < 300) { // 兩訓練師移出的動畫
                    ctx.drawImage(playerTrainerImage, playerPos.x, playerPos.y);
                    ctx.drawImage(opponentTrainerImage, opponentPos.x, opponentPos.y);
                    playerPos.x -= 1;
                    opponentPos.x += 1;
                }
                else if (ticks == 300) {                // 微調位置 並 輸出訊息
                    playerPos.y = 40;
                    opponentPos.x = 195;
                    GameSystem.BattlePad.setBattleMessage(this._opponent.name + " 派出了 " + this._opponent.pokemons[0].name + "！");
                    GameSystem.BattlePad.switchPokemonBallView(false);
                }
                else if (500 <= ticks && ticks < 600) { // 主角寶可夢 與 對手寶可夢 移入動畫
                    ctx.drawImage(this._playerPokemonImage, playerPos.x, playerPos.y);
                    ctx.drawImage(this._opponentPokemonImage, opponentPos.x, opponentPos.y);
                    playerPos.x += 1;
                    opponentPos.x -= 1;
                }
                else if (ticks == 600) {                // 將 寶可夢球 更換為 戰鬥資訊
                    ctx.drawImage(this._playerPokemonImage, playerPos.x, playerPos.y);
                    ctx.drawImage(this._opponentPokemonImage, opponentPos.x, opponentPos.y);
                    GameSystem.BattlePad.switchPokemonBallView(false);
                }
                else if (600 < ticks && ticks < 800) {  // 間距
                    ctx.drawImage(this._playerPokemonImage, playerPos.x, playerPos.y);
                    ctx.drawImage(this._opponentPokemonImage, opponentPos.x, opponentPos.y);
                }
                else if (ticks >= 800){                 // 移入完後，將動畫集設定回預備戰鬥狀態 並 將輸入處理設定回「戰鬥選單」
                    this.animationSet.main = BattleLevel.emptyAnimation;
                    this.animationSet.playerPokemon = this.drawPlayersPokemon;
                    this.animationSet.opponentPokemon = this.drawOpponentPokemon;
                    this._inputMode = BattleLevel.InputMode.BattlePad_Menu;
                    this._keyInputHandler = this.keyInput_OnBattlePad_Menu;
                    GameSystem.BattlePad.setBattleMessage();                // 最後清空訊息
                    GameSystem.BattlePad.setVisibleMenu(true);              // 顯示主選單
                    GameSystem.BattlePad.switchPokemonBallView(false);
                }
            };
        }
        else {
            GameSystem.BattlePad.setBattleMessage("野生的 " + this._opponent.name + " 出現了！");
            // 將入場動畫設定至動畫集(animationSet)中
            this.animationSet.main = (ctx) => {
                ctx.drawImage(this._opponentPokemonImage, opponentPos.x, opponentPos.y);
                ticks += 1;
                
                if (ticks < 200) {                      // 玩家訓練師
                    ctx.drawImage(playerTrainerImage, playerPos.x, playerPos.y);
                }
                else if (200 <= ticks && ticks < 300) { // 玩家訓練師移出動畫
                    ctx.drawImage(playerTrainerImage, playerPos.x, playerPos.y);
                    playerPos.x -= 1;
                }
                else if (ticks == 300) {                // 微調位置 並 輸出訊息
                    playerPos.y = 40;
                    GameSystem.BattlePad.setBattleMessage("去吧！" + this._playerPokemon.name);
                }
                else if (500 <= ticks && ticks < 600) { // 主角寶可夢 移入動畫
                    ctx.drawImage(this._playerPokemonImage, playerPos.x, playerPos.y);
                    playerPos.x += 1;
                }
                else if (ticks == 600) {                // 將 寶可夢球 更換為 戰鬥資訊
                    ctx.drawImage(this._playerPokemonImage, playerPos.x, playerPos.y);
                    GameSystem.BattlePad.switchPokemonBallView(false);
                }
                else if (600 < ticks && ticks < 800) {  // 間距
                    ctx.drawImage(this._playerPokemonImage, playerPos.x, playerPos.y);
                }
                else if (ticks >= 800){                 // 移入完後，將動畫集設定回預備戰鬥狀態 並 將輸入處理設定回「戰鬥選單」
                    this.animationSet.main = BattleLevel.emptyAnimation;
                    this.animationSet.playerPokemon = this.drawPlayersPokemon;
                    this.animationSet.opponentPokemon = this.drawOpponentPokemon;
                    this._inputMode = BattleLevel.InputMode.BattlePad_Menu;
                    this._keyInputHandler = this.keyInput_OnBattlePad_Menu;
                    GameSystem.BattlePad.setBattleMessage();                // 最後清空訊息
                    GameSystem.BattlePad.setVisibleMenu(true);                        // 顯示主選單
                }
            };
        }
    }

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
        GameSystem.BattlePad.setVisibleMenu(true);
    }

    /**
     * 繪製玩家方的寶可夢。
     * @param {Context2D} ctx Canvas的Context2D畫布。
     */
    drawPlayersPokemon(ctx) {
        ctx.drawImage(this._playerPokemonImage, 10, 40);
    }

    /**
     * 繪製對手方的寶可夢。
     * @param {Context2D} ctx Canvas的Context2D畫布。
     */
    drawOpponentPokemon(ctx) {
        ctx.drawImage(this._opponentPokemonImage, 95, 5);
    }

    // #endregion ============================================================================

    /**
     * 當離開BattleLevel時的處理。
     */
    teardown() {
        GameSystem.BattlePad.setVisibleMenu(false);
        GameSystem.Manager.Key.keyInput = this._originalKeyHandler;     // 還原上一個Level的按鍵輸入處理
    }

    /**
     * 啟用繪圖。
     */
    enableDraw(){
        this.__enableDraw = new Framework.Sprite(define.imagePath + 'null.png');//去除draw bug用的
        this.__enableDraw.position = { x: -1, y: -1 };
        this.rootScene.attach(this.__enableDraw);
    }

    update() {
        this.__enableDraw.position.x += this.__enableDraw.position.x < -2 ? 1 : -1;
    }

    draw(ctx) {
        this.animationSet.playerPokemon.call(this, ctx);
        this.animationSet.opponentPokemon.call(this, ctx);
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