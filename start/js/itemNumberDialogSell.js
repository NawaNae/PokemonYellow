var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
 GameSystem.Classes.ItemNumberDialogSell=
class ItemNumberDialogSell extends GameSystem.Classes.ItemNumberDialog
{
    keyInput(e)
    {
        let GS=GameSystem,KM=GS.Manager.Key,CS=GS.Classes;
        let container=GameSystem.HTMLObjectContainer;
        let itemNumber=container.itemNumberDialogSell;
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
                    mainChar.money +=itemNumber.cost;
                    var newItem=itemNumber.item;
                    mainChar.decreaseSpecifiedPropItem(newItem,itemNumber.value);
                    container.yesNoDialog.hide();
                    itemNumber.hide();
                    container.sellList.update();
                };
                container.yesNoDialog.show();
                break;
            case "B":
                itemNumber.hide();
                break;
        }
    }    
    get value()
    {return this.numberItem.value;}
    set value(value)
    {
        if(value>99)
            value=1;
        if(value==0)
            value=99;
        if(value>this.item.count)
            value=this.item.count;
        this.numberItem.value=value;
        this.moneyItem.value=value*this.price;
    }
}