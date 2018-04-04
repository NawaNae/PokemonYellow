GameSystem.Classes.YesNoDialog=
class YesNoDialog
{
    constructor()
    {
        this._display=document.createElement("div");
        this._display.classList.add("yesNo");
        let CS=GameSystem.Classes;
        this.yesOption=new CS.Option("yes");
        this.noOption=new CS.Option("no");
        this.yesOption.appendTo(this._display);
        this.noOption.appendTo(this._display);
        this.displayClassName=["hide","show"];
    }
    yes()
    {
        this.yesOption.select=true;
        this.noOption.select=false;
    }
    no()
    {
        this.yesOption.select=false;
        this.noOption.select=true;
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