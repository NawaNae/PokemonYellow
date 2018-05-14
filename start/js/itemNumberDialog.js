/**
 * 選擇商品數量的對話框
 * @class ItemNumberDialog
 * @default 價錢100 買1個
 */
GameSystem.Classes.ItemNumberDialog=
class ItemNumberDialog extends DisplayInformation.AutoKeyInput.Text
{
    constructor(price=100,number=1)
    {
        super("","","","itemNumberDialog");
        this._price=price;

        this.numberItem=new DisplayInformation.Digit(number,"X");
        this.numberItem.appendTo(this._display);
        this.moneyItem=new DisplayInformation.Digit(number*price,"　","円");
        this.moneyItem.appendTo(this._display);
        this.hide();
    }
    /**
     * 商品單價
     */
    set price(value)
    {
        this._price=value;
        this.moneyItem.value=this._price*this.value;
    }
    get price()
    {   return this._price;}
    get cost()
    {
        return this.moneyItem.value;
    }
    keyInput(e)
    {
        let GS=GameSystem,KM=GS.Manager.Key,CS=GS.Classes;
        let container=GameSystem.HTMLObjectContainer;
        let itemNumber=container.itemNumberDialog;
        switch(KM.keyMapping[e.key])
        {
            case "Up":
                itemNumber.value++;
                break;
            case "Down":
                itemNumber.value--;
                break;
            case "A":
                container.yesNoDialog.yesOption.selectSend=function(){console.log("cost " + GameSystem.HTMLObjectContainer.itemNumberDialog.cost);container.yesNoDialog.hide();container.itemNumberDialog.hide()};
                container.yesNoDialog.show();
                break;
            case "B":
                container.itemNumberDialog.visible=false;
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
        this.numberItem.value=value;
        this.moneyItem.value=value*this.price;
    }
}