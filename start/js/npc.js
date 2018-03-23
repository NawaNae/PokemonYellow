/**
 * @class NPC
 * @extends GameSystem.Classes.Character
 * @classdesc 非玩家角色。
 * 
 * @prop {GameSystem.Classes.Position[]?} behavior 此NPC的移動動作。
 * @prop {GameSystem.Classes.Plot?} plot 觸發此NPC時所會產生的劇情。
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
     */
    constructor(name, face, position, image, behavior, plot) {
        super(name, face, position, image);

        this._behavior = behavior;
        this._plot = plot;
    }
}