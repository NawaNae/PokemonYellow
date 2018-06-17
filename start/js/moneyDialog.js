var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.MoneyDialog=
class MoneyDialog extends DisplayInformation.Digit
{
    constructor()
    {
        super(0,"","円","moneyDialog","div");
        this.visible=false;
    }
    onShow()
    {
        this.updateMoney();
        this.timeNumber=setInterval(()=>this.updateMoney(),250);
    }
    onHide()
    {
        if(this.timeNumber)
            clearInterval(this.timeNumber);
    }
    updateMoney()
    {
        if(GameSystem&&GameSystem.protagonist)
        this.value=GameSystem.protagonist.money;
    }
}
