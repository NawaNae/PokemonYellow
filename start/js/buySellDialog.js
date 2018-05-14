GameSystem.Classes.BuySellDialog=
class BuySellDialog extends GameSystem.Classes.Options
{
    constructor()
    {
        super({className:"buySellDialog"});
        let GS=GameSystem,CS=GS.Classes;
        let Option=GS.Classes.Option;
        this.autoChangeInputMode=true;
        this.visible=false;
        this.push(new Option("買",()=>{this.buySelectSend()}))
        this.options[0].select=true;
        this.push(new Option("賣",()=>{this.sellSelectSend()}))
        this.push(new Option("取消",()=>{this.cancelSelectSend()}))

    }
    buySelectSend()
    {
        GameSystem.HTMLObjectContainer.shoppingList.show();
    }
    sellSelectSend()
    {
        GameSystem.HTMLObjectContainer.shoppingList.show();
    }
    cancelSelectSend()
    {
        this.visible=false;
    }
}