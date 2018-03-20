GameSystem.Classes.Character = 
class Character {
    constructor(name = "", position, image) {
        this._name = name;
        this._position = position || new GameSystem.Classes.Position(0, 0);
        this._image = image;
    }

    set name(newName) { this._name = newName; }
    get name() { return name; }
    set position(newPosition) { this._position = newPosition; }
    get position() { return this._position; }
    set image(newImage) { this._image = image; }
    get image() { return image; }

};