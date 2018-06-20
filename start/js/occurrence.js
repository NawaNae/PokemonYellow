/**
 * @class Occurrence
 * @classdesc 寶可夢出現機率物件。
 * 
 * @prop {GameSystem.Classes.PokemonType} pokemonType 指定要出現的寶可夢種族。
 * @prop {number} minLevel 最低等級。
 * @prop {number} maxLevel 最高等級。
 * @prop {number} probabilty 此種寶可夢的出現機率。
 */
var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.Occurrence =
class Occurrence {
    /**
     * @param {GameSystem.Classes.PokemonType} pokemonType 指定要出現的寶可夢種族。
     * @param {number} minLevel 最低等級。
     * @param {number} maxLevel 最高等級。
     * @param {number} probabilty 此種寶可夢的出現機率。
     */
    constructor(pokemonType, minLevel, maxLevel, probabilty) {
        this._pokemonType = pokemonType;
        this._minLevel = minLevel;
        this._maxLevel = maxLevel;
        if (probabilty <= 0 || probabilty > 100) {
            throw new Error("Occurrence constructor: parameter 'probabilty' must larger than 0 and not exceed 100.");
        }
        this._probabilty = probabilty;
    }
    get pokemonType() { return this._pokemonType; }
    set pokemonType(newPokemonType) { this._pokemonType = newPokemonType; }
    get minLevel() { return this._minLevel; }
    set minLevel(newMinLevel) { this._minLevel = newMinLevel; }
    get maxLevel() { return this._maxLevel; }
    set maxLevel(newMaxLevel) { this._maxLevel = newMaxLevel; }
    get probabilty() { return this._probabilty; }
    set probabilty(newProbabilty) {
        if (probabilty <= 0 || probabilty > 100)
            throw new Error("Occurrence setter: parameter 'newProbabilty' must larger than 0 and not exceed 100.");
        else                               
            this._probabilty = newProbabilty;
    }
    /**
     * 取得在最低等級(minLevel)與最高等級(maxLevel)區間的隨機整數。
     * @return {number} 區間的隨機等級。
     */
    getLevelRandomly() {
        return this._minLevel + Math.floor(Math.random() * (this._maxLevel - this._minLevel + 1));
    }
};