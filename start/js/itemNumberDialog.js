/**
 * 選擇商品數量的對話框
 * @class ItemNumberDialog
 * @default 價錢100 買1個
 */
GameSystem.Classes.ItemNumberDialog=
class ItemNumberDialog extends DisplayInformation.Text
{
    constructor(price=100,number=1)
    {
        super("","","","itemNumberDialog");
        this._price=price;

        this.numberItem=new DisplayInformation.Digit(number,"X");
        this.numberItem.appendTo(this._display);
        this.moneyItem=new DisplayInformation.Digit(number*price,"　","円");
        this.moneyItem.appendTo(this._display);
        this.displayClassName=['hide','show'];
        this.inputMode=GameSystem.Classes.Level.InputModes.itemNumberDialog;
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
    get visible()
    {return !this._display.classList.contains(this.displayClassName[0]);}
    set visible(value)
    {
        if(Framework.Game&&Framework.Game._currentLevel&&Framework.Game._currentLevel.inputMode)
            if(value)
            {
                this.lastInputMode=Framework.Game._currentLevel.inputMode;
                Framework.Game._currentLevel.inputMode=this.inputMode;
            }
            else
            {
                Framework.Game._currentLevel.inputMode=this.lastInputMode;
                this.lastInputMode=undefined;
            }
        this._display.classList.add(this.displayClassName[value|0]);
        this._display.classList.remove(this.displayClassName[(!value)|0]);
    }
    show()
    {this.visible=true;}
    hide()
    {this.visible=false}
}