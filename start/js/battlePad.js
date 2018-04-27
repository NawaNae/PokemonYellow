/** @typedef PlayerSet 玩家方戰鬥資訊面板的HTML物件集合。
 * @prop {HTMLDivElement} playerPad 玩家方戰鬥資訊面板的HTML容器。
 * @prop {HTMLSpanElement} pokemonName 寶可夢名稱。
 * @prop {HTMLSpanElement} level 等級。
 * @prop {HTMLLabelElement} HPText 文字「HP:」
 * @prop {GameSystem.Classes.HPBarContainer} HPBar 生命條的控制物件。
 * @prop {HTMLSpanElement} HPValue 生命值數值。
 */
//
/** @typedef OpponentSet 對手方的戰鬥資料面板的HTML物件集合。
 * @prop {HTMLDivElement} opponentPad 對手方戰鬥資訊面板的HTML容器。
 * @prop {HTMLSpanElement} pokemonName 寶可夢的名稱。
 * @prop {HTMLSpanElement} level 等級。 
 * @prop {HTMLLabelElement} HPText 文字「HP:」。
 * @prop {GameSystem.Classes.HPBarContainer} HPBar 生命條的控制物件。
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
 * @prop {GameSystem.Classes.PokemonListPad} pokemonListPad 寶可夢清單的HTML元件。
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
        
        this.pokemonListPad = new GameSystem.Classes.PokemonListPad();      // 建立「寶可夢清單」面板之控制物件
        this.battlePad.appendChild(this.pokemonListPad.getHTMLElement());   // 取得「寶可夢清單」面板的HTML元件，並將其加入至battlePad中

        this.pokemonInfoPad = new GameSystem.Classes.PokemonInfoPad();      // 建立「寶可夢訊息」面板之控制物件
        this.battlePad.appendChild(this.pokemonInfoPad.getHTMLElement());   // 取得「寶可夢訊息」面板的HTML元件，並將其加入至battlePad中

        // Debug
        this.moveListSet.moveListPad.classList.add('hide');
        this.moveInfoSet.moveInfoPad.classList.add('hide');
        this.backpackPad.classList.add('hide');
        this.pokemonListPad.hide();
        this.pokemonInfoPad.hide();
    }

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

        // 紀錄以上的元件
        this.playerSet = {playerPad, pokemonName, level, HPText, HPBar, HPValue};

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

        this.opponentSet = {opponentPad, pokemonName, level, HPText, HPBar};

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
        return this.backpackPad;
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
        container.classList.remove('hide');
        container.classList.add('show');
    }
}

GameSystem.Classes.BattlePad.initBattlePad();