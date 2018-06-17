/**
 * 選擇商品數量的對話框
 * @class ItemNumberDialog
 * @default 價錢100 買1個
 */
var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
 GameSystem.Classes.ItemNumberDialog=
class ItemNumberDialog extends DisplayInformation.AutoKeyInput.Text
{
    constructor(item,number=1)
    {
        super("","","","itemNumberDialog");
        if(item)
        this._price=item.price;
        this.item=item;
        this.numberItem=new DisplayInformation.Digit(number,"X");
        this.numberItem.appendTo(this._display);
        if(item)
            this.moneyItem=new DisplayInformation.Digit(number*item.price,"　","円");
        else
        this.moneyItem=new DisplayInformation.Digit(200,"　","円");
        this.moneyItem.appendTo(this._display);
        this.hide();
    }
    /**
     * 商品單價
     */
    set price(value)
    {
        this.price=value;
        this.moneyItem.value=this.price*this.value;
    }
    get price()
    {   return this.item.price;}
    get cost()
    {
        return this.moneyItem.value;
    }
    keyInput(e)
    {
        let GS=GameSystem,KM=GS.Manager.Key,CS=GS.Classes;
        let container=GameSystem.HTMLObjectContainer;
        let itemNumber=container.itemNumberDialogBuy;
        switch(KM.keyMapping[e.key])
        {
            case "Up":
                itemNumber.value++;
                break;
            case "Down":
                itemNumber.value--;
                break;
            case "A":
                container.yesNoDialog.yesOption.selectSend=()=>
                {
                    var mainChar=GameSystem.protagonist;
                    mainChar.money -=itemNumber.cost;
                    var newItem=itemNumber.item.copy();
                    newItem.count=itemNumber.cost/itemNumber.price;
                    mainChar.addProp(newItem);
                    container.yesNoDialog.hide();
                    container.itemNumberDialogBuy.hide();
                };
                container.yesNoDialog.show();
                break;
            case "B":
                container.itemNumberDialogBuy.visible=false;
                break;
        }
    }
    /**
     * set 無法使用請設定value與price 只有get可用
     */
    set cost(val)
    {
        return;
    }
    /**
     * 商品個數
     */
    get value()
    {return this.numberItem.value;}
    set value(value)
    {
        if(value>99)
            value=1;
        if(value==0)
            value=99;
        if(value*this.price>GameSystem.protagonist.money)
            return;
        this.numberItem.value=value;
        this.moneyItem.value=value*this.price;
    }
}