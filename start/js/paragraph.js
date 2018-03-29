/**
 * @class Paragraph
 * @classdesc 段落，表示在劇情中每一段的段落文字以及關連動作。
 * 
 * @prop {string} content 段落的內容。
 * @prop {GameSystem.Classes.Action} 此段落要執行的動作。
 */
GameSystem.Classes.Paragraph =
class Paragraph {
    /**
     * @param {string} content 段落的內容。
     * @param {GameSystem.Classes.Action} action 此段落要執行的動作。
     */
    constructor(content, action) {
        this._content = content;
        this._action = action;
    }

    set text(newContent) { this._content = newContent; }
    get text() { return this._content; }

    set action(newAction) { this._action = newAction; }
    get action() { return this._action; }
}