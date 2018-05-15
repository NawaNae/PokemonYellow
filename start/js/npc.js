/**
 * @class NPC
 * @extends GameSystem.Classes.Character
 * @classdesc 非玩家角色。
 * 
 * @prop {GameSystem.Classes.Position[]?} behavior 此NPC的移動動作。
 * @prop {GameSystem.Classes.Plot?} plot 觸發此NPC時所會產生的劇情。
 * @prop {GameSystem.Classes.Pokemon[]?} pokemons 此NPC所擁有的寶可夢。
 * @prop {GameSystem.Classes.Image?} battleImage 戰鬥時的圖片。
 */
GameSystem.Classes.NPC =
class NPC extends GameSystem.Classes.Character {
    /**
     * @param {string} name 此NPC的名稱。
     * @param {GameSystem.Classes.Position} position 此NPC的初始位置。
     * @param {GameSystem.Classes.Image} image 此NPC的圖片。
     * @param {GameSystem.Classes.Character.Face} face 此NPC的面向。
     * @param {GameSystem.Classes.Behavior?} behavior 此NPC的動作。(可選項)
     * @param {GameSystem.Classes.Plot?} plot 觸發此NPC時所會產生的對話情景或動作。(可選項)
     * @param {GameSystem.Classes.Pokemon?} pokemons 此NPC所擁有的寶可夢。(可選項)
     * @param {GameSystem.Classes.Image?} battleImage 戰鬥時的圖片。(可選項)
     */
    constructor(name, face, position, image, behavior, plot, pokemons, battleImage) {
        super(name, face, position, image);

        this._behavior = behavior;
        this._plot = plot;
        this._pokemons = pokemons || [];
        this._battleImage = battleImage;
    }

    set behavior(newBehavior) { this._behavior = newBehavior; }
    get behavior() { return this._behavior; }

    set plot(newPlot) { this._plot = newPlot; }
    get plot() { return this._plot; }

    set pokemons(newPokemons) { this._pokemons = newPokemons; }
    get pokemons() { return this._pokemons; }

    set battleImage(newBattleImage) { this._battleImage = newBattleImage; }
    get battleImage() { return this._battleImage; }

    /**
     * 取得角色圖片路徑。
     * @return {string} 角色圖片路徑。
     */
    getBattleImagePath() {
        return this._battleImage.src;
    }

    /**
     * 取得可戰鬥的寶可夢數量。
     * @return {number} 可戰鬥的寶可夢數量。
     */
    getAlivePokemonCount() {
        return this._pokemons.reduce((count, pokemon) => count + (pokemon.HP > 0 ? 1 : 0), 0);
    }

    /**
     * 取得昏厥的寶可夢數量。
     * @return {number} 昏厥的寶可夢數量。
     */
    getFaintPokemonCount() {
        return this._pokemons.reduce((count, pokemon) => count + (pokemon.HP <= 0 ? 1 : 0), 0);
    }
}