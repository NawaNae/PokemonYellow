var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
/** @typedef PlayerSet 玩家方戰鬥資訊面板的HTML物件集合。
 * @prop {HTMLDivElement} playerPad 玩家方戰鬥資訊面板的HTML容器。
 * @prop {HTMLSpanElement} pokemonName 寶可夢名稱。
 * @prop {HTMLSpanElement} level 等級。
 * @prop {HTMLLabelElement} HPText 文字「HP:」
 * @prop {GameSystem.Classes.HPBarContainer} HPBar 生命條的控制物件。
 * @prop {HTMLSpanElement} HPValue 生命值數值。
 * @prop {HTMLImageElement[]} imgPokemonBalls 寶可夢球。
 */
//
/** @typedef OpponentSet 對手方的戰鬥資料面板的HTML物件集合。
 * @prop {HTMLDivElement} opponentPad 對手方戰鬥資訊面板的HTML容器。
 * @prop {HTMLSpanElement} pokemonName 寶可夢的名稱。
 * @prop {HTMLSpanElement} level 等級。 
 * @prop {HTMLLabelElement} HPText 文字「HP:」。
 * @prop {GameSystem.Classes.HPBarContainer} HPBar 生命條的控制物件。
 * @prop {HTMLImageElement[]} imgPokemonBalls 寶可夢球。
 */
//
/** @typedef MenuSet 主選單面板下的HTML物件集合。
 * @prop {HTMLDivElement} menuPad 主選單面板的HTML容器。
 * @prop {HTMLSpanElement} spanFight 選項文字「戰鬥」。
 * @prop {HTMLSpanElement} spanItem 選項文字「背包」。
 * @prop {HTMLSpanElement} spanPokemon 選項文字「寶可夢」。
 * @prop {HTMLSpanElement} spanRun 選項文字「逃跑」。
 */
//
/** @typedef MoveListSet 招式清單面板下的HTML物件集合。
 * @prop {HTMLDivElement} moveListPad 招式清單面板的HTML容器。
 * @prop {HTMLSpanElement[]} moveList 所有招式名稱。
 */
//
/** @typedef MoveInfoSet 招式資訊版面下的HTML物件集合。
 * @prop {HTMLDivElement} moveInfoPad 招式資訊版面的HTML容器。
 * @prop {HTMLLabelElement} textTYPE 文字「TYPE/」。
 * @prop {HTMLSpanElement} moveType 屬性名稱。
 * @prop {HTMLSpanElement} movePP PP數值。
 */
//
/** @typedef MoveInfo 招式資訊。
 * @prop {string} typeName 招式屬性名稱。
 * @prop {number} maxPP 最大PP數。
 * @prop {number} PP 招式的PP數。
 */
//
/** @typedef YesNoSet 「是、否」子選單。
 * @prop {HTMLDivElement} divYesNoPad 「是、否」版面的HTML容器。
 * @prop {HTMLLabelElement} labelYes 「是」文字。
 * @prop {HTMLLabelElement} labelNo 「否」文字。
 */
//
/** @typedef LevelUpStatSet 升級資訊版面。
 * @prop {HTMLDivElement} divLevelUpStat 升級資訊版面的HTML容器。
 * @prop {HTMLLabelElement} labelAttack 文字「ATTACK」。
 * @prop {HTMLSpanElement} spanAttack 升級後的攻擊力數值。
 * @prop {HTMLLabelElement} labelDefense 文字「DEFENSE」。
 * @prop {HTMLSpanElement} spanDefense 升級後的防禦力數值。
 * @prop {HTMLLabelElement} labelSpeed 文字「SPEED」。
 * @prop {HTMLSpanElement} spanSpeed 升級後的速度值數值。
 * @prop {HTMLLabelElement} labelSpecial 文字「SPECIAL」。
 * @prop {HTMLSpanElement} spanSpecial 升級後的特殊值數值。
 */
//
/**
 * @class BattlePad
 * @classdesc 
 * 
 * @prop {HTMLDivElement} battlePad 戰鬥面板的HTML元件主體。
 * @prop {PlayerSet} playerSet 玩家方戰鬥資訊面板的HTML物件集合。
 * @prop {OpponentSet} opponentSet 對手方的戰鬥資料面板的HTML物件集合。
 * @prop {HTMLDivElement} messagePad 資訊面板的HTML元件。
 * @prop {MenuSet} menuSet 主選單面板下的HTML物件集合。
 * @prop {MoveListSet} moveListSet 招式清單面板下的HTML物件集合。
 * @prop {MoveInfoSet} moveInfoSet 招式資訊版面下的HTML物件集合。
 * @prop {HTMLDivElement} backpackPad 背包物品清單版面的HTML元件。
 * @prop {GameSystem.Classes.PokemonListPad} pokemonListPad 寶可夢清單的控制元件。
 * @prop {GameSystem.Classes.PokemonInfoPad} pokemonInfoPad 寶可夢資訊版面的控制元件。
 * 
 * @prop {number} menuSelection 選單中所選的選項。
 * @prop {number} moveListSelection 招式選單中所選的選項。
 * @prop {number} backpackListSelection 背包物品清單中所選的選項。
 * @prop {MoveInfo[]} moveInfoList 招式資料。
 */
GameSystem.Classes.BattlePad =
class BattlePad {
    constructor() {
        this.battlePad = document.createElement('div');
        this.battlePad.id = 'battlePad';
        this.battlePad.appendChild(this.initPlayerPad());         // 建立「玩家方資訊」面板
        this.battlePad.appendChild(this.initOpponentPad());       // 建立「敵方資訊」面板
        this.battlePad.appendChild(this.initMessagePad());        // 建立「訊息」面板
        this.battlePad.appendChild(this.initMenuPad());           // 建立「主功能選單」面板
        this.battlePad.appendChild(this.initMoveListPad());       // 建立「招式清單」面板
        this.battlePad.appendChild(this.initMoveInfoPad());       // 建立「招式資訊」面板
        this.battlePad.appendChild(this.initBackpackPad());       // 建立「背包物品清單」面板
        this.battlePad.appendChild(this.initYesNoPad());          // 建立「是、否」面板
        this.battlePad.appendChild(this.initLevelUpStatPad());    // 建立「能力升級資訊」面板
        
        this.pokemonListPad = new GameSystem.Classes.PokemonListPad();      // 建立「寶可夢清單」面板之控制物件
        this.battlePad.appendChild(this.pokemonListPad.getHTMLElement());   // 取得「寶可夢清單」面板的HTML元件，並將其加入至battlePad中

        this.pokemonInfoPad = new GameSystem.Classes.PokemonInfoPad();      // 建立「寶可夢訊息」面板之控制物件
        this.battlePad.appendChild(this.pokemonInfoPad.getHTMLElement());   // 取得「寶可夢訊息」面板的HTML元件，並將其加入至battlePad中

        // Initialize
        this.moveListSet.moveListPad.classList.add('hide');
        this.moveInfoSet.moveInfoPad.classList.add('hide');
        this.backpackPad.classList.add('hide');
        this.pokemonListPad.hide();
        this.pokemonInfoPad.hide();
        this.setVisible(false);

        this.setMenuCursor(0);
        this.moveListSelection = -1;
        this.backpackListSelection = -1;
        this.moveInfoList = [];
    }

    // #region ============================== 初始化所用的函式集 ==============================
    /**
     * 建立玩家方資訊面板HTML元件。並連同內容物也一起建立，
     * 有: 寶可夢名稱、等級、文字「HP」、血量條容器與血量數值。
     * 最後將此標籤存至 this.playerPad 中。
     * @return {HTMLDivElement} 玩家資訊面板之HTML元件。
     */
    initPlayerPad() {
        let playerPad = document.createElement('div');
        playerPad.id = 'playerPad';

        // 建立「寶可夢名稱」的 <span>元件。
        let pokemonName = document.createElement('span');
        pokemonName.classList.add('pokemon-name');
        pokemonName.innerText = "Name of player's pokemon";

        // 建立「等級」的 <span>元件。
        let level = document.createElement('span');
        level.classList.add('level');
        level.innerText = ":L 99"

        // 建立文字「HP」的 <label>元件。
        let HPText = document.createElement('label');
        HPText.classList.add('hp-text');
        HPText.innerText = 'HP:'

        // 建立「生命條容器」的HTML元件
        let HPBar = new GameSystem.Classes.HPBarContainer(20, 20);

        // 建立「生命數值」元件
        let HPValue = document.createElement('span');
        HPValue.classList.add('player-hp-value');
        HPValue.innerText = '20/ 20';

        // 建立「寶可夢球」圖片元件
        let imgPokemonBalls = [document.createElement('img'), document.createElement('img'), document.createElement('img'), document.createElement('img'), document.createElement('img'), document.createElement('img')];

        // 紀錄以上的元件
        this.playerSet = {playerPad, pokemonName, level, HPText, HPBar, HPValue, imgPokemonBalls};
        imgPokemonBalls.forEach(elem => {
            elem.src = define.imagePath + "FaintedPokemonBall.png";
            elem.classList.add('pokemonBall');
            elem.classList.add('hide');
            playerPad.appendChild(elem);
        });

        // 將以上元件置入 playerPad 中。
        playerPad.appendChild(pokemonName);
        playerPad.appendChild(level);
        playerPad.appendChild(HPText);
        playerPad.appendChild(HPBar.getHTMLElement());
        playerPad.appendChild(HPValue);
        return playerPad;
    }

    /**
     * 建立敵方資訊面板HTML元件。並連同內容物也一起建立，
     * 有: 寶可夢名稱、等級、文字「HP」與血量條容器。
     * 最後將此標籤存至 this.playerPad 中。
     * @return {HTMLDivElement} 敵方資訊面板之HTML元件。
     */
    initOpponentPad() {
        let opponentPad = document.createElement('div');
        opponentPad.id = 'opponentPad';
        
        // 建立「寶可夢名稱」的 <span>元件。
        let pokemonName = document.createElement('span');
        pokemonName.classList.add('pokemon-name');
        pokemonName.innerText = "Name of opponent's pokemon";

        // 建立「等級」的 <span>元件。
        let level = document.createElement('span');
        level.classList.add('level');
        level.innerText = ":L 99"

        // 建立文字「HP」的 <label>元件。
        let HPText = document.createElement('label');
        HPText.classList.add('hp-text');
        HPText.innerText = 'HP:'

        // 建立「生命條容器」的HTML元件
        let HPBar = new GameSystem.Classes.HPBarContainer(20, 20);

        // 建立「寶可夢球」圖片元件
        let imgPokemonBalls = [document.createElement('img'), document.createElement('img'), document.createElement('img'), document.createElement('img'), document.createElement('img'), document.createElement('img')];
        imgPokemonBalls.forEach(elem => {
            elem.src = define.imagePath + "FaintedPokemonBall.png";
            elem.classList.add('pokemonBall');
            elem.classList.add('hide');
            opponentPad.appendChild(elem);
        });

        this.opponentSet = {opponentPad, pokemonName, level, HPText, HPBar, imgPokemonBalls};

        // 將以上元件置入 playerPad 中。
        opponentPad.appendChild(pokemonName);
        opponentPad.appendChild(level);
        opponentPad.appendChild(HPText);
        opponentPad.appendChild(HPBar.getHTMLElement());
        return opponentPad;
    }

    /**
     * 建立訊息面板，並將其加入至 this.messagePad 中。
     * @return {HTMLDivElement} 訊息面板之HTML元件。
     */
    initMessagePad() {
        this.messagePad = document.createElement('div');
        this.messagePad.id = 'messagePad';

        return this.messagePad;
    }

    /**
     * 建立主選單面板，並連同內容物也一起建立。
     * 有: 戰鬥、道具、寶可夢與逃跑。
     * 並將其加入至 this.messagePad 中。
     * @return {HTMLDivElement} 訊息面板之HTML元件。
     */
    initMenuPad() {
        let menuPad = document.createElement('div');
        menuPad.id = 'menuPad';

        let spanFight = document.createElement('span');
        spanFight.innerText = '戰鬥';

        let spanItem = document.createElement('span');
        spanItem.innerText = '背包';

        let spanPokemon = document.createElement('span');
        spanPokemon.innerText = '寶可夢';
        
        let spanRun = document.createElement('span');
        spanRun.innerText = '逃跑';
        
        this.menuSet = {menuPad, spanFight, spanItem, spanPokemon, spanRun};

        menuPad.appendChild(spanFight);
        menuPad.appendChild(spanItem);
        menuPad.appendChild(spanPokemon);
        menuPad.appendChild(spanRun);
        return menuPad;
    }
    
    /**
     * 建立招式清單面板，並連同內容物也一起建立。
     * 有: 招式1、招式2、招式3、招式4
     * 並將其加入至 this.moveListPad 中。
     * @return {HTMLDivElement} 招式清單面板的HTML元件。
     */
    initMoveListPad() {
        let moveListPad = document.createElement('div');
        moveListPad.id = 'moveListPad';
        let moveList = [document.createElement('span'), document.createElement('span'), document.createElement('span'), document.createElement('span')];
        moveList.forEach((element, index) => {
            element.classList.add('move-name');
            element.innerText = '招式' + (index + 1);
            moveListPad.appendChild(element);
        });
        
        this.moveListSet = { moveListPad, moveList };
        return moveListPad;
    }

    /**
     * 建立招式訊息面板，並連同內容物也一起建立。
     * 有: 文字「TYPE/」、招式屬性與PP數值
     * 並將其加入至 this.moveInfoPad 中。
     * @return {HTMLDivElement} 招式訊息面板的HTML元件。
     */
    initMoveInfoPad() {
        let moveInfoPad = document.createElement('div');
        moveInfoPad.id = 'moveInfoPad';
        
        let textTYPE = document.createElement('label');
        textTYPE.classList.add('text-type');
        textTYPE.innerText = 'TYPE/';

        let moveType = document.createElement('span');
        moveType.classList.add('move-type');
        moveType.innerText = '一般';

        let movePP = document.createElement('span');
        movePP.classList.add('move-PP');
        movePP.innerText = '20/ 20';

        this.moveInfoSet = { moveInfoPad, textTYPE, moveType, movePP };

        moveInfoPad.appendChild(textTYPE);
        moveInfoPad.appendChild(moveType);
        moveInfoPad.appendChild(movePP);
        return moveInfoPad;
    }

    /**
     * 建立背包面板，並連同內容物也一起建立。
     * 有: 項目1、項目2、...、離開
     * 並將其加入至 this.backpackPad 中。
     * @return {HTMLDivElement} 背包面板的HTML元件。
     */
    initBackpackPad() {
        this.backpackPad = document.createElement('div');
        this.backpackPad.id = 'backpackPad';
        this.backpackPad.appendChild(this.createNewBackpackItem('項目1', 1));
        this.backpackPad.appendChild(this.createNewBackpackItem('項目2', 1));
        this.backpackPad.appendChild(this.createNewBackpackItem('返回'));
        this.setBackpackItemCursor(0);
        return this.backpackPad;
    }

    /**
     * 建立「是、否」面板，並聯內容物也一起建立。
     * 有: 「是」、「否」文字標籤
     * 並將其加入至 this.yesNoPad 中。
     * @return {HTMLDivElement} 「是、否」面板的HTML元件。
     */
    initYesNoPad() {
        let divYesNoPad = document.createElement('div');
        divYesNoPad.classList.add('yesNoPad');
        divYesNoPad.classList.add('hide');

        let labelYes = document.createElement('label');
        labelYes.classList.add('option');
        labelYes.classList.add('select');
        labelYes.innerText = "是";

        let labelNo = document.createElement('label');
        labelNo.classList.add('option');
        labelNo.innerText = "否";

        this.yesNoSet = { divYesNoPad, labelYes, labelNo };

        divYesNoPad.appendChild(labelYes);
        divYesNoPad.appendChild(labelNo);
        return divYesNoPad;
    }

    /**
     * 建立能力升級資訊版面，並連同內容物也一起建立。
     * 有: 文字「ATTACK」、「DEFENSE」、「SPECIAL」、「SPEED」與攻擊力、防禦力、特殊值、速度值數值。
     * 並將其加入至 this.levelUpStatPad 中。
     */
    initLevelUpStatPad() {
        let divLevelUpStatPad = document.createElement('div');
        divLevelUpStatPad.classList.add('levelUpStatPad');
        divLevelUpStatPad.classList.add('hide');

        let labelAttack = document.createElement('label');  labelAttack.innerText = "ATTACK";
        let labelDefense = document.createElement('label'); labelDefense.innerText = "DEFENSE";
        let labelSpecial = document.createElement('label'); labelSpecial.innerText = "SPECIAL";
        let labelSpeed = document.createElement('label');   labelSpeed.innerText = "SPEED";

        let spanAttack = document.createElement('span');    spanAttack.innerText = "12";
        let spanDefense = document.createElement('span');   spanDefense.innerText = "12";
        let spanSpecial = document.createElement('span');   spanSpecial.innerText = "12";
        let spanSpeed = document.createElement('span');     spanSpeed.innerText = "12";
        
        this.levelUpStatSet = { divLevelUpStatPad, labelAttack, labelDefense, labelSpecial, labelSpeed, spanAttack, spanDefense, spanSpecial, spanSpeed };
        divLevelUpStatPad.appendChild(labelAttack);     divLevelUpStatPad.appendChild(spanAttack);
        divLevelUpStatPad.appendChild(labelDefense);    divLevelUpStatPad.appendChild(spanDefense);
        divLevelUpStatPad.appendChild(labelSpeed);    divLevelUpStatPad.appendChild(spanSpeed);
        divLevelUpStatPad.appendChild(labelSpecial);      divLevelUpStatPad.appendChild(spanSpecial);
        return divLevelUpStatPad;
    }

    // #endregion ===========================================================================

    /**
     * 更新資料。
     * @param {GameSystem.Classes.Pokemon} playerPokemon 玩家方的寶可夢。
     * @param {GameSystem.Classes.Pokemon} opponentPokemon 對手方的寶可夢。
     * @param {GameSystem.Classes.Pokemon[]} pokemonList 玩家方的所有寶可夢。
     * @param {GameSystem.Classes.PropItem[]} propList 玩家方的道具清單。
     */
    updateInfo(playerPokemon, opponentPokemon, pokemonList, propList) {
        // 更新玩家方的戰鬥面板資訊
        this.playerSet.pokemonName.innerText = playerPokemon.name;
        this.playerSet.level.innerText = ":L " + playerPokemon.level;
        this.playerSet.HPBar.updateHP(playerPokemon.HP, playerPokemon.maxHP);
        this.playerSet.HPValue.innerText = playerPokemon.HP + "/ " + playerPokemon.maxHP;
        // 更新對手方的戰鬥面板資訊
        this.opponentSet.pokemonName.innerText = opponentPokemon.name;
        this.opponentSet.level.innerText = ":L " + opponentPokemon.level;
        this.opponentSet.HPBar.updateHP(opponentPokemon.HP, opponentPokemon.maxHP);
        // 更新招式清單
        let moveList = playerPokemon.getMoves();
        this.moveInfoList = [];
        moveList.forEach(move => this.moveInfoList.push({typeName: GameSystem.Classes.StandardStat.TypeName[move.type], maxPP: 30, PP: 30}));      // !!PP 尚未實裝!!
        this.updateMoveListPad(playerPokemon.getMoves());
        // 更新寶可夢清單
        this.setPokemonListData(pokemonList);
        // 更新背包
        this.setBackpackPad(propList);
        // 重置所有選單、清單的選擇。
        this.resetViews();
        this.resetAllCursor();
    }

    /**
     * 重置所有的版面顯示設定。
     */
    resetViews() {
        this.hideBackpackPad();
        this.hideMoveInfoPad();
        this.setVisibleMoveListPad(false);
        this.hidePokemonListPad();
        this.hidePokemonListPadMenu();
        this.hidePokemonInfoPad();
        this.setVisibleYesNoPad(false);
        this.setVisibleLevelUpStatPad(false);
    }

    /**
     * 重置所有選單、清單的選擇。
     */
    resetAllCursor() {
        this.setMenuCursor(0);
        this.setMoveListMouseCursor(0);
        this.setBackpackItemCursor(0);
        this.setPokemonListCursor(0);
        this.setPokemonListPadMenuCursor(0);
    }

    /**
     * 建立新的背包物品之HTML元件。
     * 若count為 0 或 undefine。則不附加數量標籤。
     * @param {string} name 物品名稱。
     * @param {string | number} count 物品的數量。
     * @return {HTMLDivElement} 背包物品之HTML元件。
     */
    createNewBackpackItem(name, count) {
        let newItem = document.createElement('div');
        newItem.classList.add('backpack-item');

        let itemName = document.createElement('span');
        itemName.classList.add('item-name');
        itemName.innerText = name;
        newItem.appendChild(itemName);
        
        if (count) {
            let amount = document.createElement('span');
            amount.classList.add('item-amount');
            amount.innerText = (typeof count == 'number') ? 'x' + count : count;
            newItem.appendChild(amount);
        }
        
        return newItem;
    }

    /**
     * 取得玩家方的HPBar控制物件。
     * @return {GameSystem.Classes.HPBarContainer} HPBar控制物件。
     */
    getPlayerHPBar() {
        return this.playerSet.HPBar;
    }

    /**
     * 取得對手方的HPBar控制物件。
     * @return {GameSystem.Classes.HPBarContainer} HPBar控制物件。
     */
    getOpponentHPBar() {
        return this.opponentSet.HPBar;
    }

    // #region =============================== 介面設定 ================================

    /**
     * 設定是否顯示主選單。
     * @param {boolean} visible 是否顯示主顯單。
     */
    setVisibleMenu(visible) {
        visible ? this.menuSet.menuPad.classList.remove('hide') : this.menuSet.menuPad.classList.add('hide');
    }

    /**
     * 設定主選單的三角形選擇提示。
     * @param {number} select 指定的選項。
     * select = 0 為「戰鬥」選項。
     * select = 1 為「背包」選項。
     * select = 2 為「寶可夢」選項。
     * select = 3 為「逃跑」選項。
     * select = others 為清除。
     */
    setMenuCursor(select) {
        switch(this.menuSelection) {
            case 0: this.menuSet.spanFight.classList.remove('select');      break;
            case 1: this.menuSet.spanItem.classList.remove('select');       break;
            case 2: this.menuSet.spanPokemon.classList.remove('select');    break;
            case 3: this.menuSet.spanRun.classList.remove('select');        break;
        }
        switch(select) {
            case 0: this.menuSet.spanFight.classList.add('select');     break;
            case 1: this.menuSet.spanItem.classList.add('select');      break;
            case 2: this.menuSet.spanPokemon.classList.add('select');   break;
            case 3: this.menuSet.spanRun.classList.add('select');       break;
        }
        this.menuSelection = select;
    }

    /**
     * 設置戰鬥訊息。
     * @param {string?} message 戰鬥訊息。預設為空字串，作為清除用。
     */
    setBattleMessage(message = "") {
        this.messagePad.innerText = message;
    }

    /**
     * 設定玩家方的生命值數值顯示。
     * @param {number} value HP的數值。
     */
    setPlayerHPValueText(value) {
        this.playerSet.HPValue.innerText = value;
    }

    /**
     * 設定是否顯示面板上的戰鬥資訊。
     * @param {boolean} visible 是否可視戰鬥訊息面板。
     */
    setVisibleBattleInfoInPad(visible) {
        this.setVisiblePlayerPad(visible);
        this.setVisibleOpponentPad(visible);
    }

    /**
     * 設定是否顯示玩家方資訊面板。
     * @param {boolean} visible 是否要顯示。
     */
    setVisiblePlayerPad(visible) {
        if (visible) {
            this.playerSet.HPBar.show();
            this.playerSet.HPText.classList.remove('hide');
            this.playerSet.HPValue.classList.remove('hide');
            this.playerSet.level.classList.remove('hide');
            this.playerSet.pokemonName.classList.remove('hide');
        }
        else {
            this.playerSet.HPBar.hide();
            this.playerSet.HPText.classList.add('hide');
            this.playerSet.HPValue.classList.add('hide');
            this.playerSet.level.classList.add('hide');
            this.playerSet.pokemonName.classList.add('hide');
        }
    }

    /**
     * 設定是否顯示對手方資訊面板。
     * @param {boolean} visible 是否要顯示。
     */
    setVisibleOpponentPad(visible) {
        if (visible) {
            this.opponentSet.HPBar.show();
            this.opponentSet.HPText.classList.remove('hide');
            this.opponentSet.level.classList.remove('hide');
            this.opponentSet.pokemonName.classList.remove('hide');
        }
        else {
            this.opponentSet.HPBar.hide();
            this.opponentSet.HPText.classList.add('hide');
            this.opponentSet.level.classList.add('hide');
            this.opponentSet.pokemonName.classList.add('hide');
        }
    }

    /**
     * 設定寶可夢球圖片顯示。
     * @param {boolean} visible 是否可視。
     */
    setVisiblePokemonBallsInPad(visible) {
        this.playerSet.imgPokemonBalls.forEach(elem => visible ? elem.classList.remove('hide') : elem.classList.add('hide'));
        this.opponentSet.imgPokemonBalls.forEach(elem => visible ? elem.classList.remove('hide') : elem.classList.add('hide'));
    }

    /**
     * 切換寶可夢球的顯示。
     * @param {boolean} visible 是否顯示。
     */
    switchPokemonBallView(visible) {
        if (visible) {
            this.setVisibleBattleInfoInPad(false);
            this.setVisiblePokemonBallsInPad(true);
        }
        else {
            this.setVisiblePokemonBallsInPad(false);
            this.setVisibleBattleInfoInPad(true);
        }
    }

    /**
     * 設定玩家方的寶可夢球的顯示。
     * @param {number?} brokens 壞掉的寶可夢球數量。
     * @param {number?} alives 活著的寶可夢球數量。
     */
    setPlayerPokemonBallsView(brokens = 0, alives = 0) {
        this.playerSet.imgPokemonBalls.forEach(elem => {
            if (brokens > 0) {
                brokens -= 1;
                elem.src = define.imagePath + "BrokenPokemonBall.png";
            }
            else if (alives > 0) {
                alives -= 1;
                elem.src = define.imagePath + "AlivePokemonBall.png";
            }
            else {
                elem.src = define.imagePath + "FaintedPokemonBall.png";
            }
        });
    }

    /**
     * 設定對手方的寶可夢球的顯示。
     * @param {number?} brokens 壞掉的寶可夢球數量。
     * @param {number?} alives 活著的寶可夢球數量。
     */
    setOpponentPokemonBallsView(brokens = 0, alives = 0) {
        this.opponentSet.imgPokemonBalls.forEach(elem => {
            if (brokens > 0) {
                brokens -= 1;
                elem.src = define.imagePath + "BrokenPokemonBall.png";
            }
            else if (alives > 0) {
                alives -= 1;
                elem.src = define.imagePath + "AlivePokemonBall.png";
            }
            else {
                elem.src = define.imagePath + "FaintedPokemonBall.png";
            }
        });
    }

    /**
     * 是否顯示「是、否」版面。
     * @param {boolean} visible 是否顯示。
     */
    setVisibleYesNoPad(visible) {
        visible ? this.yesNoSet.divYesNoPad.classList.remove('hide') : this.yesNoSet.divYesNoPad.classList.add('hide');
    }

    /**
     * 設定「是、否」版面上的選擇。
     * @param {boolean} isYes 是否選擇「是」選項。
     */
    setYesNoPadSelection(isYes) {
        if (isYes) {
            this.yesNoSet.labelYes.classList.add('select');
            this.yesNoSet.labelNo.classList.remove('select');
        }
        else {
            this.yesNoSet.labelYes.classList.remove('select');
            this.yesNoSet.labelNo.classList.add('select');
        }
    }

    /**
     * 設定是否顯示「能力升級資訊」面板。
     * @param {boolean} visible 是否顯示。
     */
    setVisibleLevelUpStatPad(visible) {
        visible ? this.levelUpStatSet.divLevelUpStatPad.classList.remove('hide') : this.levelUpStatSet.divLevelUpStatPad.classList.add('hide');
    }

    /**
     * 設定在「能力升級資訊」面板上的資料。
     * @param {number} attack 攻擊力數值。
     * @param {number} defense 防禦力數值。
     * @param {number} speed 速度數值。
     * @param {number} special 特殊數值。
     */
    setLevelUpStatValues(attack, defense, speed, special) {
        this.levelUpStatSet.spanAttack.innerText = attack;
        this.levelUpStatSet.spanDefense.innerText = defense;
        this.levelUpStatSet.spanSpeed.innerText = speed;
        this.levelUpStatSet.spanSpecial.innerText = special;
    }

    // #endregion ======================================================================

    // #region ===========================「招式清單」控制有關的方法集合。===========================
    /**
     * 設定是否顯示「招式清單」面板
     * @param {boolean} visible 是否顯示。
     */
    setVisibleMoveListPad(visible) {
        if (visible) {
            this.setMoveListMouseCursor(0);
            this.moveListSet.moveListPad.classList.remove('hide');
        }
        else {
            this.moveListSet.moveListPad.classList.add('hide');
        }
    }

    /**
     * 設定招式選單的三角形選擇提示。
     * @param {number} select 指定的選項。
     * select = 0 為第一個招式。
     * select = 1 為第二個招式。
     * select = 2 為第三個招式。
     * select = 3 為第四個招式。
     * select = others 為清除。
     */
    setMoveListMouseCursor(select) {
        if (0 <= this.moveListSelection && this.moveListSelection <= 3)  {
            this.moveListSet.moveList[this.moveListSelection].classList.remove('select');
        }
        if (0 <= select && select <= 3) {
            this.moveListSet.moveList[select].classList.add('select');
            let moveInfo = this.moveInfoList[select];
            this.setMoveInfoPadData(moveInfo.name, moveInfo.PP, moveInfo.maxPP);
        }
        this.moveListSelection = select;
    }

    /**
     * 更新招式清單上的資料。
     * @param {GameSystem.Classes.Move[]} moveList 指定的招式清單資料。
     */
    updateMoveListPad(moveList) {
        for (let i = 0, move; i < 4; i++) {
            move = moveList[i];
            if (move) {
                this.moveListSet.moveList[i].classList.remove('hide');
                this.moveListSet.moveList[i].innerText = move.name;
            }
            else {
                this.moveListSet.moveList[i].classList.add('hide');
            }
        }
        this.setMoveListMouseCursor(0);
    }
    // #endregion =================================================================================

    // #region =========================「招式資訊面板」控制有關的方法集合。==========================
    /**
     * 顯示招式資訊面板。
     */
    showMoveInfoPad() {
        this.moveInfoSet.moveInfoPad.classList.remove('hide');
    }

    /**
     * 隱藏招式資訊面板。
     */
    hideMoveInfoPad() {
        this.moveInfoSet.moveInfoPad.classList.add('hide');
    }

    /**
     * 將招式資料設定至招式資料面板上。
     * @param {string} typeName 招式屬性名稱。預設為「一般」。
     * @param {number} PP 當前招式點數。預設為20。
     * @param {number} maxPP 最多招式點數。預設為20。
     */
    setMoveInfoPadData(typeName = "一般", PP = 20, maxPP = 20) {
        this.moveInfoSet.moveType.innerText = typeName;
        this.moveInfoSet.movePP.innerText = PP + "/ " + maxPP;
    }
    // #endregion =================================================================================

    // #region =========================「背包物品版面」控制有關的方法集合。==========================
    /**
     * 顯示背包物品版面。
     */
    showBackpackPad() {
        this.backpackPad.classList.remove('hide');
    }

    /**
     * 隱藏背包物品版面。
     */
    hideBackpackPad() {
        this.backpackPad.classList.add('hide');
    }

    /** @typedef BackpackItemData 表示背包物品資料。
     * @description 用於函式setBackpackPad()上參數型態使用。
     * @prop {stirng} name 物品名稱。
     * @prop {number?} count 物品數量。
     */
    /**
     * 設定背包內的物品資料。
     * @param {BackpackItemData[]} items 要設定的背包資料集。
     */
    setBackpackPad(items) {
        let backpackPad = this.backpackPad;
        // 移除原有的資料
        while(backpackPad.firstChild)
            backpackPad.removeChild(backpackPad.firstChild);
        // 設置新資料
        items.forEach(item => backpackPad.appendChild( this.createNewBackpackItem(item.name, item.count) ));
        backpackPad.appendChild(this.createNewBackpackItem('返回'));
    }

    /**
     * 設定背包項目選單中的三角形選擇提示。
     * @prop {number} select 指定的選項。選項中依數量來決定。超出索引的值將不會顯示三角提示。
     */
    setBackpackItemCursor(select) {
        if (0 <= this.backpackListSelection && this.backpackListSelection < this.backpackPad.childElementCount) {
            this.backpackPad.childNodes[this.backpackListSelection].classList.remove('select');
        }
        if (0 <= select && select < this.backpackPad.childElementCount) {
            this.backpackPad.childNodes[select].classList.add('select');
        }
        this.backpackListSelection = select;
    }

    // #endregion =================================================================================

    // #region =========================「寶可夢清單版面」控制有關的方法集合。=========================
    /**
     * 顯示寶可夢清單版面。
     */
    showPokemonListPad() {
        this.pokemonListPad.show();
    }

    /**
     * 隱藏寶可夢清單版面。
     */
    hidePokemonListPad() {
        this.pokemonListPad.hide();
    }

    /**
     * 設定寶可夢清單版面上的資料。
     * @prop {GameSystem.Classes.Pokemon[]} pokemons 目標要置入資料的寶可夢。
     */
    setPokemonListData(pokemons) {
        this.pokemonListPad.setPokemonsData(pokemons);
    }

    /**
     * 設置寶可夢清單的選擇。
     * @param {number} select 清單中的選擇。
     */
    setPokemonListCursor(select) {
        this.pokemonListPad.setPokemonListCursor(select);
    }

    /**
     * 顯示在寶可夢清單版面中的選單版面。
     */
    showPokemonListPadMenu() {
        this.pokemonListPad.showMenu();
    }

    /**
     * 隱藏在寶可夢清單版面中的選單版面。
     */
    hidePokemonListPadMenu() {
        this.pokemonListPad.hideMenu();
    }

    /**
     * 設置在寶可夢清單中，選單上的選擇。
     * @param {number} select 選單上的選擇。
     */
    setPokemonListPadMenuCursor(select) {
        this.pokemonListPad.setMenuCursor(select);
    }
    // #endregion =================================================================================

    // #region =========================「寶可夢資訊版面」控制有關的方法集合。=========================
    /**
     * 顯示寶可夢資訊版面。
     * @param {boolean?} isPartTwo 顯示是否為第二部分。
     */
    showPokemonInfoPad(isPartTwo = false) {
        this.pokemonInfoPad.show();
        isPartTwo ? this.pokemonInfoPad.showPart2() : this.pokemonInfoPad.showPart1();
    }

    /**
     * 隱藏寶可夢資訊版面。
     */
    hidePokemonInfoPad() {
        this.pokemonInfoPad.hide();
    }

    /**
     * 對寶可夢資訊版面設定資料。
     * @param {GameSystem.Classes.Pokemon} pokemon 目標要設定資料的寶可夢。
     */
    setPokemonInfoPadData(pokemon) {
        this.pokemonInfoPad.setInfo(pokemon);
    }
    // #endregion =================================================================================

    /**
     * 設定是否顯示戰鬥面板。
     * @param {boolean} visible 是否顯示。
     */
    setVisible(visible) {
        visible ? this.battlePad.classList.remove('hide') : this.battlePad.classList.add('hide');
    }

    /**
     * 取得管理的HTML物件。
     * @return {HTMLDivElement} 被管理的HTML物件。
     */
    getHTMLElement() {
        return this.battlePad;
    }
    
    /**
     * 初始化戰鬥面板至HTMLObjectContainer。
     */
    static initBattlePad() {
        let container = document.querySelector('div.HTMLObjectContainer');  // 取得母容器 HTMLObjectContainer
        let BattlePad = new GameSystem.Classes.BattlePad();
        container.appendChild(BattlePad.getHTMLElement());
        GameSystem.BattlePad = BattlePad;

        // Debug
        // container.classList.remove('hide');
        // container.classList.add('show');
    }
}

