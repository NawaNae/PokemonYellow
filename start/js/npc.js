/**
 * @class NPC
 * @extends GameSystem.Classes.Character
 * @classdesc 非玩家角色。
 * 
 * @prop {GameSystem.Classes.Position[]?} behavior 此NPC的移動動作。
 * @prop {GameSystem.Classes.Plot?} plot 觸發此NPC時所會產生的劇情。
 * @prop {GameSystem.Classes.Pokemon[]?} pokemons 此NPC所擁有的寶可夢。
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
     */
    constructor(name, face, position, image, behavior, plot, pokemons) {
        super(name, face, position, image);

        this._behavior = behavior;
        this._plot = plot;
        this._pokemons = pokemons || [];
    }

    set behavior(newBehavior) { this._behavior = newBehavior; }
    get behavior() { return this._behavior; }

    set plot(newPlot) { this._plot = newPlot; }
    get plot() { return this._plot; }

    set pokemons(newPokemons) { this._pokemons = newPokemons; }
    get pokemons() { return this._pokemons; }
}