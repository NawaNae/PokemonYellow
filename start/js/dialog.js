/**
 * 顯示在下方的對話框
 * @class GameSystem.Classes.Dialog
 * @extends DisplayInformation.Text
 * @property {string} text 內部顯示的文字
 * @property {bollean} visible 要不要顯示
 * @method show 顯示
 * @method hide 隱藏
 */
var GameSystem=GameSystem||{};
GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.Dialog=
class Dialog extends DisplayInformation.AutoKeyInput.Text
{
    constructor(text="",elementTypeString='div')
    {
        let skip;
        super(text,skip,skip,"dialog",elementTypeString);
        this.plot;
        autoBind(this);
    }
    keyInput(e)
    {
        //any key 
        this.plot.step();
    }
}