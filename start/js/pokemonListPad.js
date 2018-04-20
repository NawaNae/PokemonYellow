/**
 * @class PokemonInfoBar
 * @classdesc 在寶可夢清單中，顯示寶可夢資料的資訊條。
 * 
 * @prop {HTMLDivElement} pokemonInfoBar 寶可夢的資訊條主體。
 * @prop {HTMLImageElement} img 寶可夢的圖示。
 * @prop {HTMLSpanElement} pokemonName 寶可夢的名稱。
 * @prop {GameSystem.Classes.HPBarContainer} HPBar 寶可夢的生命值物件。
 * @prop {HTMLSpanElement} levelTag 寶可夢的等級。
 * @prop {HTMLLabelElement} labelHP 「HP:」文字。
 * @prop {HTMLSpanElement} textHP 寶可夢的生命值數值。
 */
GameSystem.Classes.PokemonInfoBar =
class PokemonInfoBar {
    /**
     * 建立一個新的寶可夢資訊條物件，並連同內容物也一起建立。
     * 有: 小圖示、名稱、等級、血量條與血量數值。
     * @param {string} name 寶可夢的名稱。
     * @param {number} level 寶可夢的等級。
     * @param {number} maxHP 寶可夢的最大生命值。
     * @param {number} HP 寶可夢的當前生命值。
     * @param {string?} image 寶可夢的圖示。
     * @return {HTMLDivElement} 寶可夢資訊條之HTML元件。
     */
    constructor(name, level, maxHP, HP, image) {
        // 寶可夢的資訊條主體。
        this.pokemonInfoBar = document.createElement('div');
        this.pokemonInfoBar.classList.add('pokemon-info-bar');
        // 寶可夢的圖示。
        this.img = document.createElement('img');
        if (image) this.img.src = image;
        this.img.classList.add('pokemon-icon');
        // 寶可夢的名稱。
        this.pokemonName = document.createElement('span');
        this.pokemonName.innerText = name;
        this.pokemonName.classList.add('pokemon-name');
        // 寶可夢的生命值物件。
        this.HPBar = new GameSystem.Classes.HPBarContainer(maxHP, HP);
        // 寶可夢的等級。
        this.levelTag = document.createElement('span');
        this.levelTag.innerText = ':L ' + level;
        this.levelTag.classList.add('level');
        // 「HP:」文字。
        this.labelHP = document.createElement('label');
        this.labelHP.innerText = 'HP:';
        this.labelHP.classList.add('hp-text');
        // 寶可夢的生命值數值。
        this.textHP = document.createElement('span');
        this.textHP.innerText = HP + '/ ' + maxHP;
        this.textHP.classList.add('player-hp-value');
    
        this.pokemonInfoBar.appendChild(this.img);
        this.pokemonInfoBar.appendChild(this.pokemonName);
        this.pokemonInfoBar.appendChild(this.HPBar.getHTMLElement());
        this.pokemonInfoBar.appendChild(this.levelTag);
        this.pokemonInfoBar.appendChild(this.labelHP);
        this.pokemonInfoBar.appendChild(this.textHP);
    }

    /**
     * 更新資料。
     * @param {string} name 寶可夢的名稱。
     * @param {number} level 寶可夢的等級。
     * @param {number} maxHP 寶可夢的最大生命值。
     * @param {number} HP 寶可夢的當前生命值。
     * @param {string?} image 寶可夢的圖示。
     */
    updateInfo(name, level, maxHP, HP, image) {
        this.pokemonName.innerText = name;
        this.levelTag.innerHTML = ':L ' + level;
        this.updateHP(maxHP, HP);
        if (image) {
            this.img.src = image;
        }
    }

    /**
     * 更新寶可夢的生命值資訊。
     * @param {number} HP 當前生命值。
     * @param {number?} maxHP 最大生命值。
     */
    updateHP(HP, maxHP) {
        this.HPBar.updateHP(HP, maxHP);
        this.textHP.innerText = this.HPBar.HP + '/ ' + this.HPBar.MaxHP;
    }

    /**
     * 取得HTML元素。
     */
    getHTMLElement() {
        return this.pokemonInfoBar;
    }
};

/**
 * @class PokemonListPad
 * @classdesc HTML元件，「寶可夢清單」版面的控制物件。
 * 
 * @prop {HTMLDivElement} pokemonListPad 「寶可夢清單」版面的主HTML物件。
 * @prop {HTMLDivElement} messageBar 「訊息」版面的HTML物件。
 * @prop {GameSystem.Classes.PokemonInfoBar[]} 集合六個「寶可夢資料條」版面控制物件的清單。
 * @prop {HTMLDivElement} menu 「選單」版面的HTML物件。
 */
GameSystem.Classes.PokemonListPad =
class PokemonListPad {
    /**
     * 建立寶可夢清單面板，並連同內容物也一起建立。
     * 有: 寶可夢1、寶可夢2、寶可夢3、寶可夢4、寶可夢5、寶可夢6
     * 並將其加入至 this.pokemonListPad 中。
     */
    constructor() {
        this.pokemonListPad = document.createElement('div');    // 建立「寶可夢清單」的主容器。
        this.pokemonListPad.id = 'pokemonList';                 // 設定 id = 'pokemonList'
        // 建立六個「寶可夢資料條」版面控制物件的清單。
        this.pokemonInfoBars = [
            new GameSystem.Classes.PokemonInfoBar('Pokemon A', 5, 30, 25),
            new GameSystem.Classes.PokemonInfoBar('Pokemon B', 5, 30, 25),
            new GameSystem.Classes.PokemonInfoBar('Pokemon C', 5, 30, 25),
            new GameSystem.Classes.PokemonInfoBar('Pokemon D', 5, 30, 25),
            new GameSystem.Classes.PokemonInfoBar('Pokemon E', 5, 30, 25),
            new GameSystem.Classes.PokemonInfoBar('Pokemon F', 5, 30, 25)
        ];
        
        this.pokemonInfoBars.forEach(element => this.pokemonListPad.appendChild(element.getHTMLElement())); // 將六個「寶可夢訊息條」加入至母版面中。
        this.pokemonListPad.appendChild(this.initMessageBar());   // 將「訊息」版面加入至母版面中。
        this.pokemonListPad.appendChild(this.initMenu());         // 將「控制選單」版面加入至母版面中。
    }

    /**
     * 建立新的「訊息」版面。並將其加入至 this.messageBar 中。
     * @return {HTMLDivElement} 「訊息」版面的HTML元件。
     */
    initMessageBar() {
        // 建立「訊息版面」
        this.messageBar = document.createElement('div');
        this.messageBar.classList.add('message-bar');
        return this.messageBar;
    }

    /**
     * 建立一個新的「選單」HTML元件。連同內部的元件初始化。
     * 有: 選項「狀態」、「切換」、「取消」。
     * 最後將元件加入至 this.menu 中。
     * @return {HTMLDivElement} 「選單」HTML元件。
     */
    initMenu() {
        // 建立新的「選單」HTML元件
        this.menu = document.createElement('div');
        this.menu.classList.add('menu');
        // 選項「狀態」
        let spanStats = document.createElement('span');
        spanStats.classList.add('menu-item');
        spanStats.innerText = '狀態';
        // 選項「切換」
        let spanSwitch = document.createElement('span');
        spanSwitch.classList.add('menu-item');
        spanSwitch.innerText = '切換';
        // 選項「取消」
        let spanCancel = document.createElement('span');
        spanCancel.classList.add('menu-item');
        spanCancel.innerText = '取消';

        this.menu.appendChild(spanStats);
        this.menu.appendChild(spanSwitch);
        this.menu.appendChild(spanCancel);
        return this.menu;
    }

    /**
     * 顯示「寶可夢清單」版面。
     */
    show() {
        this.pokemonListPad.classList.remove('hide');
        this.pokemonListPad.classList.add('show');
    }

    /**
     * 隱藏「寶可夢清單」版面。
     */
    hide() {
        this.pokemonListPad.classList.remove('show');
        this.pokemonListPad.classList.add('hide');
    }

    /**
     * 取得HTML元件。
     * @return {HTMLDivElement} 寶可夢清單面板之HTML元件。
     */
    getHTMLElement() {
        return this.pokemonListPad;
    }
};