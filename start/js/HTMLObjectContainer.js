/**
 * @description 顯示在下方的對話框
 * @class GameSystem.Classes.HTMLObjectContainer
 * @property {bollean} visible 要不要顯示
 * @method show 顯示
 * @method hide 隱藏
 * @event resizeCanvas 在Canvas被變更時觸發
 */
var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.HTMLObjectContainer=
class HTMLObjectContainer
{
    constructor(visible)
    {
        this.displayClassName=["hide","show"];
        this.initContainer(); 
        this.visible=visible||false;//初始化可不可視
        this.childrenList=[];
        this.initOptions();
        this.initYesNoDialog();
        this.initDialog();
        this.initMoneyDialog();
        this.initBuySellDialog();
        this.initIllustration();
        this.initIllustrationList();
        this.initItemNumber();
        this.initShoppingList();
        this.initSellList();
        this.initPropList();
        this.initCharacterInfo();
        this.initPokemonsDialog();
        this.resizeCanvas=(width,height)=>
        {
            this.container.style.width=width;
            this.container.style.height=height;   
        }
        Framework.Game.resizeCanvas=this.resizeCanvas;
    }
    initPokemonsDialog()//
    {
        this.pokemonsDialog=new GameSystem.Classes.PokemonsDialog();
        this.pokemonsDialog.appendTo(this.container);
        this.pokemonsDialog.hide();
    }
    initContainer()
    {        
        this.container=document.createElement("div");
        this.container.classList.add("HTMLObjectContainer");
        document.body.appendChild(this.container);
    }
    initIllustration()
    {
        this.illustration=new GameSystem.Classes.Illustration();
        this.illustration.hide();
        this.addChild(this.illustration);
    }
    initIllustrationList()
    {
        this.illustrationList=new GameSystem.Classes.IllustrationList();
        this.illustrationList.hide();
        this.addChild(this.illustrationList);
    }
    initItemNumber()
    {
        this.itemNumberDialogBuy=new GameSystem.Classes.ItemNumberDialog();
        this.addChild(this.itemNumberDialogBuy);
        this.itemNumberDialogSell=new GameSystem.Classes.ItemNumberDialogSell();
        this.addChild(this.itemNumberDialogSell);
    }
    initDialog()
    {
        this.dialog=new GameSystem.Classes.Dialog();
        this.addChild(this.dialog);
        this.dialog.hide();
    }
    initYesNoDialog()
    {
        this.yesNoDialog=new GameSystem.Classes.YesNoDialog();
        this.yesNoDialog.appendTo(this.container);
        this.yesNoDialog.autoChangeInputMode=true;
        this.yesNoDialog.noOption.selectSend=function(){GameSystem.HTMLObjectContainer.yesNoDialog.visible=false;};
        this.addChild(this.yesNoDialog);
    }
    initMoneyDialog()
    {
        this.moneyDialog=new GameSystem.Classes.MoneyDialog();
        this.addChild(this.moneyDialog);
    }
    initBuySellDialog()
    {
        this.buySellDialog=new GameSystem.Classes.BuySellDialog();
        this.addChild(this.buySellDialog);
    }
    initOptions()
    {
        this.options=new GameSystem.Classes.Options();
        this.options.closeWithContainer=true;
        this.options.push(new GameSystem.Classes.Option("寶可夢圖鑑",function(){GameSystem.HTMLObjectContainer.illustrationList.show();;}));
        this.options.push(new GameSystem.Classes.Option("寶可夢",()=>{this.pokemonsDialog.pokemonsData=GameSystem.protagonist.pokemons;this.pokemonsDialog.show();}));
        this.options.push(new GameSystem.Classes.Option("道具",()=>{this.propList.show();}));
        var characterData=new GameSystem.Classes.Option("角色資料",()=>{this.characterInfo.show();});
        this.options.push(characterData);
        this.options.push(new GameSystem.Classes.Option("儲存",function(){
            var dialog = GameSystem.HTMLObjectContainer.yesNoDialog,RM=GameSystem.Manager.Records;
            dialog.yesOption.selectSend=function(){
                RM.save();dialog.hide();
            };
            dialog.show();
        }));
        this.options.push(new GameSystem.Classes.Option("離開",function()
        {
            let options=GameSystem.HTMLObjectContainer.options;
            let container=GameSystem.HTMLObjectContainer;
            container.visible=false;
            options.visible=false;
        }));
        this.options.push(new GameSystem.Classes.Option("回選單",()=>{this.options.hide();this.hide();Framework.Game.goToLevel("menu")}));
        this.options.push(new GameSystem.Classes.Option("商店",function(){ GameSystem.HTMLObjectContainer.buySellDialog.show();}));
        this.options.push(new GameSystem.Classes.Option("寶可夢醫院",()=>{
            var GS=GameSystem,CS=GS.Classes,GR=GS.Resource,Position=CS.Position,PC=CS.PlotContents;
            var Drama=GR.Drama,Plot=CS.Plot,Paragraph=CS.Paragraph,CureAll=PC.CureAll,Script=PC.Script,GiveProp=PC.GiveProp,MoveCharacter=PC.MoveCharacter;
            (new Plot("PokemonHospital", [
                new Paragraph("給你治療一下好惹"),
                new Script(function()
                {
                    var dialog = GameSystem.HTMLObjectContainer.yesNoDialog;
                    var script=this;
                    dialog.yesOption.selectSend=()=>{
                        dialog.hide();GameSystem.HTMLObjectContainer.hide();script.next();
                    };
                    var oldNo=dialog.noOption.selectSend;
                    dialog.noOption.selectSend=()=>
                    {
                        dialog.hide();script.index++;GameSystem.HTMLObjectContainer.hide();script.next();
                        dialog.noOption=oldNo;
                    }
                    GameSystem.HTMLObjectContainer.show();
                    dialog.show();
                },{autoNext:false}),
                new CureAll(),
                new Paragraph("¡Adios!",undefined,undefined,"es",false)
            ])).start();
        }));
        this.options.options[0].select=true;
        this.options.optionsLoop=true;
        this.addChild(this.options);
    }
    initSellList()
    {
        let Option=GameSystem.Classes.Option;
        let container=this;
        this.sellList=new GameSystem.Classes.Options({className:"sellList"});
        this.sellList.hide();
        this.sellList.update=function()
        {
            /*this is sellList */
            this.clear();
            var GS=GameSystem;if(!GS)return;
            var mainChar=GS.protagonist;
            for(var prop of mainChar.props)
                if(prop.constructor.name==="PropItem"&&typeof prop.price!=="undefined")
                {
                    var option=new Option(prop.price+"円 "+prop.name+" x "+prop.count,function(){
                        container.itemNumberDialogSell.item=this.prop;
                        container.itemNumberDialogSell.value=1;
                        container.itemNumberDialogSell.show();
                    });
                    option.prop=prop;
                    this.push(option);
                }
            this.push(new Option("離開",()=>{this.hide();}))
        }
        this.sellList.onShow=function()
        {
            this.update();
        };
        this.addChild(this.sellList);
    }
    initShoppingList()
    {
        let Option=GameSystem.Classes.Option;
        let container=this;
        this.shoppingList=new GameSystem.Classes.Options({className:"shoppingList"});
        this.shoppingList.autoChangeInputMode=true;
        this.shoppingList.push(new Option("200円 女僕咖啡廳的紅藥水",function(){
            var GR=GameSystem.Resource,Dictionary=GR.PropDictionary,mainChar=GameSystem.protagonist;
            if(mainChar.money<200)
            {
                alert("餘額不足");return;
            }    
            container.itemNumberDialogBuy.item=Dictionary["女僕咖啡廳的紅藥水"];
            container.itemNumberDialogBuy.value=1;
            container.itemNumberDialogBuy.show();
        }));
        this.shoppingList.push(new Option("200円 寶可夢球",function(){
            var GR=GameSystem.Resource,Dictionary=GR.PropDictionary,mainChar=GameSystem.protagonist;
            if(mainChar.money<200)
            {
                alert("餘額不足");return;
            }    
            container.itemNumberDialogBuy.item=Dictionary["寶可夢球"];
            container.itemNumberDialogBuy.value=1;
            container.itemNumberDialogBuy.show();
        }));
        this.shoppingList.push(new Option("離開",function(){GameSystem.HTMLObjectContainer.shoppingList.hide();}));
        this.addChild(this.shoppingList);
    }
    initPropList()
    {
        let Option=GameSystem.Classes.Option;
        let container=GameSystem.HTMLObjectContainer;
        var Text=DisplayInformation.Text,Digit=DisplayInformation.Digit,X;
        this.propList=new GameSystem.Classes.Options({className:"propList"});
        var propList=this.propList;
        propList.update=function()
        {
            var mainChar=GameSystem.protagonist;
            this.clear();
            for(let i=0;i<mainChar._props.length;i++)
            {
                var prop=mainChar._props[i]
                if(prop)
                {
                    var option=new Option("",function(){this.prop._selectSend();this.propName.text=this.prop.name;if(this.prop.count)this.propCount.value=this.prop.count});
                    option.prop=prop;
                    this.push(option);
                    option.propName=new Text(prop.name,X,X,"name","span");
                    option.append(option.propName);
                    option.propCount=new Digit(prop.count,"x ",X,"count","span")
                    if(prop.count)option.append(option.propCount)
                }
            }
            var pList=this;
            this.push(new Option("離開",function(){pList.hide();}));
        }
        propList.onShow=function()
        {
            propList.update();
        }
        this.addChild(this.propList);
    }
    initCharacterInfo()
    {
        var Text=DisplayInformation.Text,Digit=DisplayInformation.Digit,x;
        var characterInfo=new DisplayInformation.AutoKeyInput.Text(x,x,x,"characterInfo");
        var mainChar=GameSystem.protagonist;
        var name=new Text(mainChar.name,"名稱：");
        var money=new Digit(mainChar.money,"金錢：","円");
        characterInfo.append(name);
        characterInfo.append(money);
        this.addChild(characterInfo);
        characterInfo.onShow=function()
        {
            name.text=mainChar.name;
            money.value=mainChar.money;
        }
        characterInfo.keyInput=()=>{characterInfo.hide();}
        characterInfo.hide();
        this.characterInfo=characterInfo;
    }
    get visible()
    {
        return !this.container.classList.contains(this.displayClassName[0]);
    }
    set visible(value)
    {
        this.container.classList.add(this.displayClassName[value|0]);
        this.container.classList.remove(this.displayClassName[(!value)|0]);
    }
    addChild(child)
    {
        this.childrenList.push(child);
        child.appendTo(this.container);
    }
    show()
    {this.visible=true;}
    hide()
    {this.visible=false}
    remove()
    {this.container.remove();}
    append(child)
    {this.container.appendChild(child);}
    prepend(child)
    {this.container.prepend(child);}
    appendTo(father)
    {father.append(this.container);}
    prependTo(father)
    {father.prepend(this.container);}
}
