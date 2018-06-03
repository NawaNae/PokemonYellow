/**
 * @class IllustrationList
 * @description 圖鑑的class
 */
var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.IllustrationList=
class Illustration extends DisplayInformation.AutoKeyInput.Text
{
    constructor()
    {

        super("","","","illustrationList");
        this.initList();
        this.initNumber();
        this.lastKeyInput;
        this.keyInput=(e)=>{this._keyInput(e);}
    }
    onShow()
    {
        var mainChar=GameSystem.protagonist;
        this.findNumber.value=mainChar.metPokemons.length;
        let list=this.list,dictionary=GameSystem.Classes.PokemonType.Dictionary;
        var i=0;
        for(let key in dictionary)
        {
            if(key!=="length")
            {
                var option=list.options[i]
                if(mainChar.metPokemons.find(name=>name===key))
                {
                    option.text=dictionary[key].id + " " + key;
                    option.selectSend=function()
                    {
                        let ill=GameSystem.HTMLObjectContainer.illustration;
                        ill.setInfo=dictionary[key];
                        ill.show();
                    }
                }
                else
                {
                    option.text="????";
                    option.selectSend=()=>{};
                }
            }
            i++;
        }
    }
    initList()
    {
        let Options=GameSystem.Classes.Options,Option=GameSystem.Classes.Option;
        this.list=new Options({className:"list"});
        let list=this.list,dictionary=GameSystem.Classes.PokemonType.Dictionary;
        list.keyInput=undefined;
        list.optionsLoop=true;
        for(let key in dictionary)
        {
            if(key!=="length")
            list.push(new Option("????",function() {}));
        }
       
        list.push(new Option("length",function(){var GS=GameSystem,CS=GS.Classes,GR=GS.Resource,Position=CS.Position,PC=CS.PlotContents;
            var Drama=GR.Drama;Drama.Others.卡迪諾狂新聞.start();}));
        this.list.appendTo(this._display);
    }
    initNumber()
    {
        this.findNumber=new DisplayInformation.Digit(0,"發現了 "," 種\n共"+GameSystem.Classes.PokemonType.Dictionary.length+"種","illustrationNumbers");
        this.findNumber.appendTo(this._display);
    }
    _keyInput(e)
    {
        let GS=GameSystem;
        let KM=GS.Manager.Key;
        let options=this.list;
        switch(KM.keyMapping[e.key])
        {
            case "Up":
            options.selectLast();
            break;
            case "Down":
            options.selectNext();
            break;
            case "A":
            options.selectSend();
            break;
            case "B":
            case "Start":  
                this.visible=false;
        }
    }
    set visible(val)
    {
        super.visible=val;
        this.findNumber.visible=val;
        this.list.visible=val;
    }
    get visible()
    {return super.visible;}
 
}