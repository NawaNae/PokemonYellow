GameSystem.Classes.Character = 
class Character {
    constructor(name = "", position, image) {
        this._name = name;
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

};