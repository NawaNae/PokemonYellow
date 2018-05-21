var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.Option=
class Option extends DisplayInformation.Text
{
    constructor(text="",selectSendFunction,elementTypeString='div')
    {
        let skip=undefined;
        super(text,skip,skip,"option",elementTypeString);
        this.displayClassName=["hide","show"];
        let selectSend=()=>{
            while(confirm("你確定要開"+this.text+"?"));};
        this.selectSend=selectSendFunction||selectSend;
        
    }
    checkChanged()
    {

    }

    set select(value)
    {
        if(this._display.classList.contains("select")&&!value)
        {
            this._display.classList.remove("select");
            (()=>{this.checkChanged()})();
        }
        else if(!this._display.classList.contains("select")&&value)
        {
            this._display.classList.add("select");
            (()=>{this.checkChanged()})();
        }
    }
    get select()
    {
        return this._display.classList.contains("select");
    }
}