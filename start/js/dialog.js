/**
 * @description 顯示在下方的對話框
 * @class GameSystem.Classes.Dialog
 * @extends DisplayInformation.Text
 * @property {string} text 內部顯示的文字
 * @property {bollean} visible 要不要顯示
 * @method show 顯示
 * @method hide 隱藏
 */
GameSystem.Classes.Dialog=
class Dialog extends DisplayInformation.Text
{
    constructor(text="",elementTypeString='div')
    {
        super(text,skip,skip,"dialog",elementTypeString);
        var skip=undefined;
        this.displayClassName=["hide","show"];
    }
    get visible()
    {return !this._display.classList.contains(this.displayClassName[0]);}
    set visible(value)
    {
        this._display.classList.add(this.displayClassName[value|0]);
        this._display.classList.remove(this.displayClassName[(!value)|0]);
    }
    show()
    {this.visible=true;}
    hide()
    {this.visible=false}
}