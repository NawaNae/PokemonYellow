/**
 * @class Pokemon
 * @extends GameSystem.Classes.StandardStat
 * @classdesc 寶可夢。紀錄一隻寶可夢身上所會有的參數、狀態、動作等等。
 * 
 * @prop {string} name 寶可夢的名稱。
 * @prop {number} HP 寶可夢當前的數
 * @prop {number} level 寶可夢的當前等級。
 * @prop {number} exp 寶可夢的當前經驗值。
 * @prop {GameSystem.Classes.PokemonType} typeInfo 此寶可夢的種族資訊。
 * @prop {GameSystem.Classes.IndividualValue} IV 寶可夢的「個體值」。
 * @prop {GameSystem.Classes.EffortValue} EV 寶可夢的「努力值」。
 * @prop {GameSystem.Classes.Move[]} moves 此寶可夢所會的「招式」。
 */
var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.Pokemon =
class Pokemon extends GameSystem.Classes.StandardStat {
    /**
     * @param {string} name 寶可夢的名稱。
     * @param {GameSystem.Classes.PokemonType} typeInfo 表示這個寶可夢的種族及其資訊。
     */
    constructor(name, typeInfo) {
        super();
        this._name = name;
        this._level = 1;
        this._exp = 0;
        this._typeInfo = typeInfo;

        let IndividualValue = GameSystem.Classes.IndividualValue;
        let EffortValue = GameSystem.Classes.EffortValue;

        this._IV = IndividualValue.GetNewValue();    // 取得新的、隨機生成的個體數值
        this._EV = EffortValue.GetEmptyValue();      // 取得新的、空的努力數值
        this._moves = typeInfo.GetInitialMoves();    // 取得寶可夢最初所會的招式
        
        this.updateAbilities();     // 更新寶可夢的五大能力值
        this._HP = this.maxHP;      // 初始化當前生命值
    }

    set name(newName) { this._name = newName; }
    get name() { return this._name; }

    set HP(newHP) { this._HP = newHP; }
    get HP() { return this._HP; }

    set level(newLevel) { this._level = newLevel; }
    get level() { return this._level; }

    set exp(newExp) { this._exp = newExp; }
    get exp() { return this._exp; }

    get typeA() { return this._typeInfo.typeA; }
    get typeB() { return this._typeInfo.typeB; }

    /**
     * 更新寶可夢的五個基本數值。
     */
    updateAbilities() {
        let TP = this._typeInfo;
        let IV = this._IV;
        let EV = this._EV;
        let level = this._level;

        this.maxHP = Math.floor( ((TP.maxHP + IV.maxHP + Math.sqrt(EV.maxHP) / 8) + level) / 50 + 10 + level );
        this.attack = Math.floor( ((TP.attack + IV.attack + Math.sqrt(EV.attack) / 8) + level) / 50 + 5 );
        this.defense = Math.floor( ((TP.defense + IV.defense + Math.sqrt(EV.defense) / 8) + level) / 50 + 5 );
        this.special = Math.floor( ((TP.special + IV.special + Math.sqrt(EV.special) / 8) + level) / 50 + 5 );
        this.speed = Math.floor( ((TP.speed + IV.speed + Math.sqrt(EV.speed) / 8) + level) / 50 + 5 );
    }

    /**
     * 寶可夢取得經驗值。 (尚未完成升級處理)
     * @param {number} exp 寶可夢所取得的經驗值量。
     * @return {number} 因經驗值而升級的級數。
     */
    gainExperience(exp) {
        const ExpTable = GameSystem.Classes.PokemonType.ExperienceTable;
        let expType = this._typeInfo.expType;
        let levelUps = 0;
        this._exp += exp;

        // 當目前等級小於100時，確認當前經驗是否能夠升級
        if (this._level < 100) {
            // 若當前經驗值大於下一等級的門檻時
            while (this._exp >= ExpTable[expType][this._level + 1]) {
                levelUps += 1;
                this._level += 1;
                this._EV.reset();
            }
        }

        this.updateAbilities();
        return levelUps;
    }

    /**
     * 透過總族值來增加各項努力值。
     * @param {GameSystem.Classes.PokemonType} pokemonType 對手之總族值。
     */
    gainEffortValue(pokemonType) {
        this._EV.gainEffortValue(pokemonType.maxHP, pokemonType.attack, pokemonType.defense, pokemonType.special, pokemonType.speed);
        this.updateAbilities();
    }

    /**
     * 取得此寶可夢的基本經驗值。
     * @return {number} 基本敬有值數值。
     */
    getBasicExperience() {
        return this._typeInfo.basicExp;
    }
    
    /**
     * 檢查此寶可夢是否擁有此招式。
     * @param {GameSystem.Classes.Move} move 要檢查的目標招式。
     * @return {boolean} 此寶可夢是否擁有此招式。
     */
    isHaveMove(move) {
        return this._moves.indexOf(move) >= 0;
    }

    /**
     * 隨機取得目前寶可夢所擁有的招式。
     * @return {GameSystem.Classes.Move} 隨機取得得招式。
     */
    randomlyTakeMove() {
        let index = Math.floor(Math.random() * this._moves.length);
        return this._moves[index];
    }

    /**
     * 取得圖片來源。
     * @return {string} 圖片來源位置。
     */
    getImageSrc() {
        return this._typeInfo.image.src;
    }

    /**
     * 取得此寶可夢的圖鑑編號。
     * @return {number} 圖鑑編號。
     */
    getNumber() {
        return this._typeInfo.id;
    }

    /**
     * 取得寶可夢所有的招式。
     * @return {GameSystem.Classes.Move[]} 寶可夢的所擁有的招式。
     */
    getMoves() {
        return this._moves;
    }

    /**
     * 取得這個寶可夢的圖片來源路徑。
     * @return {string} 圖片的來源路徑。
     */
    getImagePath() {
        return this._typeInfo.image.src;
    }

    /**
     * 取得這個寶可夢的「背面」之圖片來源路徑。
     * @return {string} 圖片的來源路徑。
     */
    getBackImagePath() {
        return this._typeInfo.backImage.src;
    }

    /**
     * 取得寶可夢種族資訊。
     * @return {GameSystem.Classes.PokemonType} 寶可夢種族資訊。
     */
    getPokemonType() {
        return this._typeInfo;
    }

    /**
     * 建立一個此寶可夢的副本。
     * @return {GameSystem.Classes.Pokemon} 新的寶可夢。
     */
    clone() {
        let Pokemon = GameSystem.Classes.Pokemon;
        let newPokemon = new Pokemon(this._name, this._typeInfo);   // 建立初始寶可夢副本
        newPokemon.maxHP = this.maxHP;          // 最大HP
        newPokemon.attack = this.attack;        // 攻擊力
        newPokemon.defense = this.defense;      // 防禦力
        newPokemon.special = this.special;      // 特殊值
        newPokemon.speed = this.speed;          // 速度值
        newPokemon.level = this.level;          // 等級
        newPokemon.exp = this.exp;              // 經驗
        newPokemon.HP = this.HP;                // HP
        newPokemon._IV = this._IV;              // 個體質
        newPokemon._EV = this._EV;              // 努力值
        newPokemon._moves = this._moves;        // 所學招式
        newPokemon.updateAbilities();

        return newPokemon;
    }
    copyFrom(pokemon)
    {
        super.copyFrom(pokemon);
        this._name=pokemon._name||pokemon.name||this._name;
        this._level=pokemon._level||pokemon.level||this._level;
        this._exp=pokemon._exp||pokemon.exp||this._exp;
        this._typeInfo=pokemon._typeInfo||pokemon.typeInfo||this._typeInfo;//?
        this._IV.copyFrom(pokemon._IV||pokemon.IV||this._IV);//?
        this._EV.copyFrom(pokemon._EV||pokemon.EV||this._EV);//?
        this._moves.copyFrom(pokemon._moves||pokemon.move||this._moves);//?
        this.updateAbilities();
        this._HP=pokemon._HP||pokemon.HP||this._HP;
    }
};

