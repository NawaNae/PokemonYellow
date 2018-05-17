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
 * @prop {Function[]} messagingQueue 訊息佇列。
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
        this._messagingQueue = [];

        // 確保 HTMLObjectContainer 有顯示
        document.querySelector(".HTMLObjectContainer").classList.remove('hide');

        // 開啟UI 並 更新UI上的資料
        this.updateDateOnUI();
        GameSystem.BattlePad.setVisible(true);
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
                    GameSystem.BattlePad.setVisibleMoveListPad(true);
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
                GameSystem.BattlePad.setVisibleMoveListPad(false);
                GameSystem.BattlePad.hideMoveInfoPad();
                GameSystem.BattlePad.setVisibleMenu(false);
                this.doPokemonFight();
                break;
            case 'B':
                this._inputMode = BattleLevel.InputMode.BattlePad_Menu;
                this._keyInputHandler = this.keyInput_OnBattlePad_Menu;
                GameSystem.BattlePad.setVisibleMoveListPad(false);
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
     * 在戰鬥版面中回應訊息的輸入處理。
     * @param {Function} next 表示前進到下一個處理。
     * @param {KeyboardEvent} e 事件物件。
     */
    keyInput_OnBattlePad_Messaging(next, e) {
        if (this._messagingQueue.length > 0) {
            let action = this._messagingQueue[0];
            action(() => this._messagingQueue.splice(0, 1), e);
        }
        else {
            throw new Error("Unended message events.");
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

    /**
     * 當玩家贏了這一回合時的處理。
     */
    playerWinARound() {
        if (this._isOpponentPokemon) {  // 當對手是野生寶可夢時
            let exp = this._battleStage.getExperience(!this._isOpponentPokemon, false); // 取得這一場戰鬥之經驗值
            let updateLevels = this._playerPokemon.gainExperience(exp);                 // 將經驗值增加至寶可夢上
            this._playerPokemon.gainEffortValue(this._opponent.getPokemonType());       // 取得對手寶可夢之總族值，將其各項值增加至玩家寶可夢之努力值上

            // 顯示經驗值訊息
            this._messagingQueue.push(next => {
                GameSystem.BattlePad.setBattleMessage(this._playerPokemon.name + "獲得了 " + exp + "經驗值點數！");
                next();
            });

            // 若有升級的話，顯示升級資訊與可能習得的新招式
            if (updateLevels > 0) {
                let pokemonType = this._playerPokemon.getPokemonType();
                let moves = this._playerPokemon.getMoves();

                // 顯示升級訊息
                this._messagingQueue.push(next => {
                    GameSystem.BattlePad.setBattleMessage(this._playerPokemon.name + "升級至等級" + this._playerPokemon.level + "了！");
                    next();
                });

                // 檢查是否有可習得的招式
                while (updateLevels > 0) {
                    let levelDiff = this._playerPokemon.level + (--updateLevels);           // 取得升級的等級
                    let newMoves = pokemonType.GetPossibleMovesToLearnByLevel(levelDiff);   // 透過等級取得可習得的招式
                    // 若有可習得的招式
                    if (newMoves) {

                        // 循每一個可能學到的招式進行動作、判斷
                        newMoves.forEach(newMove => {

                            // 若該寶可夢擁有的招式量小於4，則直接加入新招式並輸出訊息
                            if (moves.length < 4) {
                                moves.push(newMove);

                                // 提示寶可夢已經習得了新的招式
                                this._messagingQueue.push(next => {
                                    GameSystem.BattlePad.setBattleMessage("你的寶可夢已經習得了「" + newMove.name + "」招式。");
                                    next();
                                });
                            }
                            // 若否，則詢問是否習得與撤換招式
                            else {
                                let yesNoSelect = true;

                                // 顯示招式上限的提示
                                this._messagingQueue.push(next => {
                                    GameSystem.BattlePad.setBattleMessage("您的寶可夢所擁有之招式量已達上限！");
                                    next();
                                });

                                // 詢問是否捨棄招式來習得新招式
                                this._messagingQueue.push(next => {
                                    GameSystem.BattlePad.setBattleMessage("是否遺忘一項舊有招式來習得新招式呢？");
                                    GameSystem.BattlePad.setVisibleYesNoPad(true);
                                    GameSystem.BattlePad.setYesNoPadSelection(true);
                                    next();
                                });

                                // 對使用者輸入的結果來判斷下一步動作
                                this._messagingQueue.push((next, e) => {
                                    switch(e.key) {
                                        case "W":
                                            if (!yesNoSelect) {
                                                yesNoSelect = true;
                                                GameSystem.BattlePad.setYesNoPadSelection(yesNoSelect);
                                            }
                                            break;
                                        case "S":
                                            if (yesNoSelect) {
                                                yesNoSelect = false;
                                                GameSystem.BattlePad.setYesNoPadSelection(true);
                                            }
                                            break;
                                        case "K":
                                            // 關閉「是、否」版面
                                            GameSystem.BattlePad.setVisibleYesNoPad(false);
                                            if (yesNoSelect) {  // 顯示招式選擇清單，讓使用者選擇要忘記的招式
                                                GameSystem.BattlePad.setBattleMessage("捨棄招式");
                                                GameSystem.BattlePad.updateMoveListPad(this._playerPokemon.getMoves());
                                                GameSystem.BattlePad.setVisibleMoveListPad(true);
                                                GameSystem.BattlePad.setMoveListMouseCursor(0);
                                                this._moveListSelection = 0;
                                            }
                                            else {
                                                GameSystem.BattlePad.setBattleMessage("已捨棄了招式「" + newMove.name + "」。");
                                                next();         // 多刪除一個，跳過「是」的選項。
                                            }
                                            next();
                                    }
                                });

                                // 在使用者回應「是」的情況下，顯示招式選單，讓使用者選則欲捨棄的招式。
                                this._messagingQueue.push((next, e) => {
                                    switch(e.key) {
                                        case "W":
                                            if (this._moveListSelection > 0) {
                                                this._moveListSelection -= 1;
                                                GameSystem.BattlePad.setMoveListMouseCursor(this._moveListSelection);
                                            }
                                            break;
                                        case "S":
                                            if (this._moveListSelection + 1 < 4) {
                                                this._moveListSelection += 1;
                                                GameSystem.BattlePad.setMoveListMouseCursor(this._moveListSelection);
                                            }
                                            break;
                                        case "K":
                                            let oldMoveName = moves[this._moveListSelection].name;
                                            moves[this._moveListSelection] = newMove;
                                            GameSystem.BattlePad.setBattleMessage("忘記「" + oldMoveName + "」.. 學到了「" + newMove.name + "」！");
                                            next();
                                    }
                                });
                            }
                        });
                    }
                }
            }

            // 最後從戰鬥退出至地圖
            this._messagingQueue.push(() => {
                Framework.Game.goToLevel(this._protagonist.atMap);
            });

            this._inputMode = BattleLevel.InputMode.BattlePad_Message;
            this._keyInputHandler = this.keyInput_OnBattlePad_Messaging;
        }
        else {  // 當對手是訓練師時

        }
    }

    /**
     * 當玩家輸了這一回合時的處理。 (尚未完成)
     */
    playerLoseARound() {

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
                self.finishAnimation(battleResult.state);
                return true;
            }
        }
        // 執行動畫師
        Animator();
    }

    /**
     * 當完成動畫時的還原動作。
     * @param {GameSystem.Classes.BattleResult.State} state 戰鬥完一輪後的狀態。
     */
    finishAnimation(state) {
        let EnumState = GameSystem.Classes.BattleResult.State;
        // 根據戰鬥結果來決定下一步該如何進行
        if (state == EnumState.PlayerWin) {
            this.playerWinARound();
        }
        else if (state == EnumState.OpponentWin) {
            this.playerLoseARound();
        }
        else {
            this._inputMode = BattleLevel.InputMode.BattlePad_Menu;
            this._keyInputHandler = this.keyInput_OnBattlePad_Menu;
            GameSystem.BattlePad.setVisibleMenu(true);
        }
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
        GameSystem.BattlePad.setVisible(false);
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

/**
 * @typedef BattleDate.InputMode
 * @description 輸入模式之定義。
 * @enum
 * @readonly
 */
BattleLevel.InputMode = Object.freeze({
    /** 戰鬥版面下的主選單。 */
    BattlePad_Menu: Symbol("BattlePad_Menu"),

    /** 戰鬥版面下的招式清單 */
    BattlePad_MoveList: Symbol("BattlePad_MoveList"),

    /** 戰鬥版面下的背包物品清單 */
    BattlePad_Backpack: Symbol("BattlePad_Backpack"),

    /** 戰鬥版面下的訊息顯示 */
    BattlePad_Message: Symbol("BattlePad_Message"),

    /** 寶可夢清單 */
    PokemonList: Symbol("PokemonList"),

    /** 寶可夢清單下的子選單 */
    PokemonList_Menu: Symbol("PokemonList_Menu"),

    /** 寶可夢資訊版面 */
    PokemonInfo: Symbol("PokemonInfo"),

    /** 空處理 */
    Empty: Symbol("Empty")
});