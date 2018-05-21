var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.MoneyDialog=
class MoneyDialog extends DisplayInformation.Digit
{
    constructor()
    {
        super(0,"","円","moneyDialog","div");
        this.displayClassName=['hide','show'];
        this.visible=false;
    }
    updateMoney()
    {
        if(GameSystem&&GameSystem.protagonist)
        this.value=GameSystem.protagonist.money;
    }
    get visible()
    {return !this._display.classList.contains(this.displayClassName[0]);}
    set visible(value)
    {
        if(value)
        this.updateMoney();
        this._display.classList.add(this.displayClassName[value|0]);
        this._display.classList.remove(this.displayClassName[(!value)|0]);
    }
}
