var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
/**
 * 買賣時顯示買、賣、取消的對話框
 * @class BuySellDialog
 */
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
    onShow()
    {
        if(GameSystem.HTMLObjectContainer)
        GameSystem.HTMLObjectContainer.moneyDialog.show();
    }
    onHide()
    {
        if(GameSystem.HTMLObjectContainer)
        GameSystem.HTMLObjectContainer.moneyDialog.hide();
    }
    buySelectSend()
    {
        GameSystem.HTMLObjectContainer.shoppingList.show();
    }
    sellSelectSend()
    {
        GameSystem.HTMLObjectContainer.sellList.show();
    }
    cancelSelectSend()
    {
        this.visible=false;
    }
}