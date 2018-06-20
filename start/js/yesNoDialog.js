var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
/**
 * 是否的選擇框
 * @class YesNoDialog
 */
GameSystem.Classes.YesNoDialog=
class YesNoDialog extends GameSystem.Classes.Options
{
    constructor()
    {
        super();
        let Option=GameSystem.Classes.Option;
        this.autoChangeInputMode=true;
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
}