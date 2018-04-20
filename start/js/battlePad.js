/**
 * @class BattlePad
 * @classdesc 
 * 
 * @prop {HTMLDivElement} battlePad 戰鬥面板的HTML元件主體。
 * @prop {HTMLDivElement} playerPad 玩家方的戰鬥資料面板的HTML元件。
 * @prop {HTMLDivElement} opponentPad 對手方的戰鬥資料面板的HTML元件。
 * @prop {HTMLDivElement} messagePad 資訊面板的HTML元件。
 * @prop {HTMLDivElement} menuPad 選單面板的HTML元件。
 * @prop {HTMLDivElement} moveListPad 招式清單的HTML元件。
 * @prop {HTMLDivElement} moveInfoPad 招式資訊的HTML元件。
 * @prop {HTMLDivElement} backpackPad 背包物品清單版面的HTML元件。
 * @prop {GameSystem.Classes.PokemonListPad} pokemonListPad 寶可夢清單的HTML元件。
 */
GameSystem.Classes.BattlePad =
class BattlePad {
    constructor() {
        let container = document.querySelector('div.HTMLObjectContainer');  // 取得母容器 HTMLObjectContainer
        this.battlePad = document.createElement('div');
        this.battlePad.id = 'battlePad';
        this.battlePad.appendChild(this.initPlayerPad());         // 建立「玩家方資訊」面板
        this.battlePad.appendChild(this.initOpponentPad());       // 建立「敵方資訊」面板
        this.battlePad.appendChild(this.initMessagePad());        // 建立「訊息」面板
        this.battlePad.appendChild(this.initMenuPad());           // 建立「主功能選單」面板
        this.battlePad.appendChild(this.initMoveListPad());       // 建立「招式清單」面板
        this.battlePad.appendChild(this.initMoveInfoPad());       // 建立「招式資訊」面板
        this.battlePad.appendChild(this.initBackpackPad());       // 建立「背包物品清單」面板
        
        this.pokemonListPad = new GameSystem.Classes.PokemonListPad();      // 建立「寶可夢清單」面板之集合物件
        this.battlePad.appendChild(this.pokemonListPad.getHTMLElement());   // 取得「寶可夢清單」面板的HTML元件，並將其加入至battlePad中

        container.appendChild(this.battlePad);              // 將戰鬥面板加入至HTMLObjectContainer容器中

        // Debug
        container.classList.remove('hide');
        container.classList.add('show');
        this.moveListPad.classList.add('hide');
        this.moveInfoPad.classList.add('hide');
        this.backpackPad.classList.add('hide');
    }

    /**
     * 建立一個新的血量條HTML元件。
     * 內容包含了「血量條容器」與「血量條」。
     * @param {number?} maxHP 一個非負的整數數值。表示最大生命值。
     * @param {number?} HP 一個非負的整數數值。表示目前生命值。
     * @return {HTMLDivElement} 包含「血量條」的「血量條容器」。
     */
    createNewHPBar(maxHP, HP) {
        let divHPBar = document.createElement('div');
        let divHP = document.createElement('div');
        divHPBar.classList.add('hp-bar-container');
        divHP.classList.add('hp-bar');
        divHPBar.appendChild(divHP);
        if (maxHP != undefined && HP != undefined) {
            divHP.style = 'width: ' + (Math.ceil(HP / maxHP) * 100) + '%;';
        }
        return divHPBar;
    }

    /**
     * 建立玩家方資訊面板HTML元件。並連同內容物也一起建立，
     * 有: 寶可夢名稱、等級、文字「HP」、血量條容器與血量數值。
     * 最後將此標籤存至 this.playerPad 中。
     * @return {HTMLDivElement} 玩家資訊面板之HTML元件。
     */
    initPlayerPad() {
        this.playerPad = document.createElement('div');
        this.playerPad.id = 'playerPad';

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
        let HPBar = this.createNewHPBar();
        HPBar.classList.add('hp-bar');

        // 建立「生命數值」元件
        let HPValue = document.createElement('span');
        HPValue.classList.add('player-hp-value');
        HPValue.innerText = '20/ 20';

        // 將以上元件置入 playerPad 中。
        this.playerPad.appendChild(pokemonName);
        this.playerPad.appendChild(level);
        this.playerPad.appendChild(HPText);
        this.playerPad.appendChild(HPBar);
        this.playerPad.appendChild(HPValue);
        return this.playerPad;
    }

    /**
     * 建立敵方資訊面板HTML元件。並連同內容物也一起建立，
     * 有: 寶可夢名稱、等級、文字「HP」與血量條容器。
     * 最後將此標籤存至 this.playerPad 中。
     * @return {HTMLDivElement} 敵方資訊面板之HTML元件。
     */
    initOpponentPad() {
        this.opponentPad = document.createElement('div');
        this.opponentPad.id = 'opponentPad';
        
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
        let HPBar = this.createNewHPBar();
        HPBar.classList.add('opponent-hp-bar');

        // 將以上元件置入 playerPad 中。
        this.opponentPad.appendChild(pokemonName);
        this.opponentPad.appendChild(level);
        this.opponentPad.appendChild(HPText);
        this.opponentPad.appendChild(HPBar);
        return this.opponentPad;
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
        this.menuPad = document.createElement('div');
        this.menuPad.id = 'menuPad';

        let fightAction = document.createElement('span');
        fightAction.innerText = '戰鬥';

        let itemAction = document.createElement('span');
        itemAction.innerText = '背包';

        let pokemonAction = document.createElement('span');
        pokemonAction.innerText = '寶可夢';

        let runAction = document.createElement('span');
        runAction.innerText = '逃跑';
        
        this.menuPad.appendChild(fightAction);
        this.menuPad.appendChild(itemAction);
        this.menuPad.appendChild(pokemonAction);
        this.menuPad.appendChild(runAction);
        return this.menuPad;
    }

    /**
     * 建立招式清單面板，並連同內容物也一起建立。
     * 有: 招式1、招式2、招式3、招式4
     * 並將其加入至 this.moveListPad 中。
     * @return {HTMLDivElement} 招式清單面板的HTML元件。
     */
    initMoveListPad() {
        this.moveListPad = document.createElement('div');
        this.moveListPad.id = 'moveListPad';
        let move1 = document.createElement('span'), move2 = document.createElement('span');
        let move3 = document.createElement('span'), move4 = document.createElement('span');
        move1.classList.add('move-name');
        move2.classList.add('move-name');
        move3.classList.add('move-name');
        move4.classList.add('move-name');
        move1.innerText = '招式1';
        move2.innerText = '招式2';
        move3.innerText = '招式3';
        move4.innerText = '招式4';
        this.moveListPad.appendChild(move1);
        this.moveListPad.appendChild(move2);
        this.moveListPad.appendChild(move3);
        this.moveListPad.appendChild(move4);
        return this.moveListPad;
    }

    /**
     * 建立招式訊息面板，並連同內容物也一起建立。
     * 有: 文字「TYPE/」、招式屬性與PP數值
     * 並將其加入至 this.moveInfoPad 中。
     * @return {HTMLDivElement} 招式訊息面板的HTML元件。
     */
    initMoveInfoPad() {
        this.moveInfoPad = document.createElement('div');
        this.moveInfoPad.id = 'moveInfoPad';
        
        let textTYPE = document.createElement('label');
        textTYPE.classList.add('text-type');
        textTYPE.innerText = 'TYPE/';

        let moveType = document.createElement('span');
        moveType.classList.add('move-type');
        moveType.innerText = '一般';

        let movePP = document.createElement('span');
        movePP.classList.add('move-PP');
        movePP.innerText = '20/ 20';

        this.moveInfoPad.appendChild(textTYPE);
        this.moveInfoPad.appendChild(moveType);
        this.moveInfoPad.appendChild(movePP);
        return this.moveInfoPad;
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
}

GameSystem.BattlePad = new GameSystem.Classes.BattlePad();