/**
 * @class Paragraph
 * @extends PlotContent
 * @classdesc 作為對話框系列動作的劇情文字內容
 * 
 * @prop {string} content 段落的內容。
 * 
 */
GameSystem.Classes.PlotContents=GameSystem.Classes.PlotContents||{};
GameSystem.Classes.PlotContents.Paragraph=GameSystem.Classes.Paragraph =
class Paragraph extends GameSystem.Classes.PlotContent {
    /**
     * @param {string} content 段落的內容。
     * 
     */
    constructor(content,type="dialog",isSpeak=true,lang="zh-tw") {
        super({type:type});
        autoBind(this);
        this._content = content;
        this.speakLang=lang;
        this.isSpeak=speak;

    }
    start()
    {
        let dialog=GameSystem.HTMLObjectContainer.dialog,container=GameSystem.HTMLObjectContainer;

            dialog.plot=this.plot;
            dialog.show();
            container.show();
            dialog.text=this.text;
            if(this.isSpeak)
                this.speakAudio=speak(dialog.text,this.speakLang);
        
    }
    end()
    {
        let dialog=GameSystem.HTMLObjectContainer.dialog,container=GameSystem.HTMLObjectContainer;

            dialog.plot=undefined;
            dialog.hide();
            dialog.text="";
            if(this.isSpeak)
                this.speakAudio.pause();
            this.speakAudio=undefined;
            container.hide();
        
    }
    set text(newContent) { this._content = newContent; }
    get text() { return this._content; }


}