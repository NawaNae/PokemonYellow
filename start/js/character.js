/**
 * @class Character
 * @abstract
 * @classdesc 一個角色必備的資料。
 * 
 * @prop {string} name 角色的名稱。
 * @prop {GameSystem.Classes.Position} position 角色所在地圖上的位置。
 * @prop {GameSystem.Classes.Image} image 角色的圖片。
 * @prop {GameSystem.Classes.Position{}} movePositionVector 角色的位移向量。
 * @prop {GameSystem.Classes.Character.Face} facing 角色的面向。
 */
GameSystem.Classes.Character = 
class Character {
    /**
     * @param {string} name 角色的姓名。
     * @param {GameSystem.Classes.Character.Face} face 角色的面朝方向
     * @param {GameSystem.Classes.Position} position 角色的位置
     * @param {GameSystem.Classes.Image} image 角色的圖片
     */
    constructor(name, face, position, image) {
        this._name = name;
        this._facing = face;
        this._position = position || new GameSystem.Classes.Position(0, 0);
        this._image = image;
        this.movePositionVector=//地圖移動向量陣列
        {
            Up:new GameSystem.Classes.Position(0,-1),
            Down:new GameSystem.Classes.Position(0,+1),
            Right:new GameSystem.Classes.Position(+1,0),
            Left:new GameSystem.Classes.Position(-1,0),
        }
    }

    set name(newName) { this._name = newName; }
    get name() { return name; }
    set position(newPosition) { this._position = newPosition; }
    get position() { return this._position; }
    set image(newImage) { this._image = image; }
    get image() { return image; }
    set facing(newDirection){this._facing=newDirection;}
    get facing(){return this._facing;}

};

/**
 * 列舉。表示角色的面朝方向。
 * @readonly
 * @enum {number}
 */
GameSystem.Classes.Character.Face = Object.freeze({
    /** 角色的面向為「上」 */
    Up: Symbol("Up"),

    /** 角色的面向為「右」 */
    Right: Symbol("Right"),

    /** 角色的面向為「下」 */
    Down: Symbol("Down"),

    /** 角色的面相為「左」 */
    Left: Symbol("Left")
});