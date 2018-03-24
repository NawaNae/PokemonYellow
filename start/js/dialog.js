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
        var skip=undefined;
        this.displayClassName=["hide","show"];
        super(text,skip,skip,"dialog",elementTypeString);
    }
    get visible()
    {return !this.container.classList.contains(this.displayClassName[0]);}
    set visible(value)
    {
        this.container.classList.add(this.displayClassName[value]);
        this.container.classList.remove(this.displayClassName[!value]);
    }
    show()
    {this.visible=true;}
    hide()
    {this.visible=false}
}