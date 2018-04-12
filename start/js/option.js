GameSystem.Classes.Option=
class Option extends DisplayInformation.Text
{
    constructor(text="",selectSendFunction,elementTypeString='div')
    {
        let skip=undefined;
        super(text,skip,skip,"option",elementTypeString);
        this.displayClassName=["hide","show"];
        let selectSend=()=>{console.log(this.text+"selected")};
        this.selectSend=selectSendFunction||selectSend;
        
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