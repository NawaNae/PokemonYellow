/**
 * @class Plot
 * @classdesc 劇情，在玩家與NPC或物件對話時所會用到的內容安排。
 * 
 * @prop {string} name 劇情的名稱。
 * @prop {Paragraph[]} content 劇情的內容安排。
 */
GameSystem.Classes.Plot =
class Plot {
    /**
     * @param {string} name 劇情的名稱。
     * @param {Paragraph[]?} content 劇情的內容安排。
     */
    constructor(name, content = []) {
        this._name = name;
        this._content = content;
        this.index=0;
    }

    set name(newName) { this._name = newName; }
    get name() { return this._name; }

    set content(newContent) { this._content = newContent; }
    get content() { return this._content; }
}