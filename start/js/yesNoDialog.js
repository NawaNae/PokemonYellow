GameSystem.Classes.YesNoDialog=
class YesNoDialog extends GameSystem.Classes.Options
{
    constructor()
    {
        super();
        let Option=GameSystem.Classes.Option;
        this.lastInputMode;
        this.yesOption=new Option("是");
        this.noOption=new Option("否");
        this.push(this.yesOption);
        this.yesOption.select=true;
        this.push(this.noOption);
        this.optionsLoop=false;
        this._display.classList.add("yesNoDialog")
    }
    selectTheOther()
    {
        var temp=this.yesOption.select;
        this.yesOption.select=this.noOption.select;
        this.noOption.select=!this.noOption.select;
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
    {
        let level=Framework.Game._currentLevel;
        if(level)
            this.lastInputMode=level.inputMode;
        return !this._display.classList.contains(this.displayClassName[0]);
    }
    set visible(value)
    {
        this._display.classList.add(this.displayClassName[value|0]);
        this._display.classList.remove(this.displayClassName[(!value)|0]);
    }

}