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
        this.img.src = image;
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

GameSystem.Classes.PokemonListPad =
class PokemonListPad {
    /**
     * 建立寶可夢清單面板，並連同內容物也一起建立。
     * 有: 寶可夢1、寶可夢2、寶可夢3、寶可夢4、寶可夢5、寶可夢6
     * 並將其加入至 this.pokemonListPad 中。
     */
    constructor() {
        this.pokemonListPad = document.createElement('div');
        this.pokemonListPad.id = 'pokemonList';
        this.messageBar = document.createElement('div');
        this.messageBar.classList.add('message-bar');
        this.pokemonInfoBars = [
            new GameSystem.Classes.PokemonInfoBar('PokemonA', 5, 30, 25),
            new GameSystem.Classes.PokemonInfoBar('PokemonB', 5, 30, 25),
            new GameSystem.Classes.PokemonInfoBar('PokemonC', 5, 30, 25),
            new GameSystem.Classes.PokemonInfoBar('PokemonD', 5, 30, 25),
            new GameSystem.Classes.PokemonInfoBar('PokemonE', 5, 30, 25),
            new GameSystem.Classes.PokemonInfoBar('PokemonF', 5, 30, 25)
        ];

        this.pokemonInfoBars.forEach(element => this.pokemonListPad.appendChild(element.getHTMLElement()));
        this.pokemonListPad.appendChild(this.messageBar);
    }

    /**
     * 取得HTML元件。
     * @return {HTMLDivElement} 寶可夢清單面板之HTML元件。
     */
    getHTMLElement() {
        return this.pokemonListPad;
    }
};