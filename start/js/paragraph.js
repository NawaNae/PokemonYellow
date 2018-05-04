/**
 * @class Paragraph
 * @extends PlotContent
 * @classdesc 作為對話框系列動作的劇情文字內容
 * 
 * @prop {string} content 段落的內容。
 * 
 */
GameSystem.Classes.Paragraph =
class Paragraph extends GameSystem.Classes.PlotContent {
    /**
     * @param {string} content 段落的內容。
     * 
     */
    constructor(content,type="dialog") {
        super({type:type});
        autoBind(this);
        this._content = content;
        

    }
    start()
    {
        let dialog=GameSystem.HTMLObjectContainer.dialog,container=GameSystem.HTMLObjectContainer;
        if(this.type=="dialog")
        {
            dialog.plot=this.plot;
            dialog.show();
            container.show();
            dialog.text=this.text;
        }
    }
    end()
    {
        let dialog=GameSystem.HTMLObjectContainer.dialog,container=GameSystem.HTMLObjectContainer;
        if(this.type=="dialog")
        {
            dialog.plot=undefined;
            dialog.hide();
            dialog.text="";
            container.hide();
        }
    }
    set text(newContent) { this._content = newContent; }
    get text() { return this._content; }


}