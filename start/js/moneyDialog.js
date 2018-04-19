GameSystem.Classes.MoneyDialog=
class MoneyDialog extends DisplayInformation.Digit
{
    constructor()
    {
        super(0,"","円","moneyDialog","div");
        this.displayClassName=['hide','show'];
    }
    get visible()
    {return !this._display.classList.contains(this.displayClassName[0]);}
    set visible(value)
    {
        if(value&&GameSystem&&GameSystem.protagonist)
            this.value=GameSystem.protagonist.money;
        this._display.classList.add(this.displayClassName[value|0]);
        this._display.classList.remove(this.displayClassName[(!value)|0]);
    }
}
/*var money=new GameSystem.Classes.MoneyDialog();
money.appendTo(GameSystem.HTMLObjectContainer.container);*/