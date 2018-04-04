GameSystem.Classes.Option=
class Option extends DisplayInformation.Text
{
    constructor(text="",elementTypeString='div')
    {
        let skip=undefined;
        super(text,skip,skip,"option",elementTypeString);
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
    set select(value)
    {
        if(this._display.classList.contains("select")&&!value)
            this._display.classList.remove("select");
        else if(!this._display.classList.contains("select")&&value)
            this._display.classList.add("select");
    }
    get select()
    {
        return this._display.classList.contains("select");
    }
}