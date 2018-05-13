/**
 * @class IllustrationList
 * @description 圖鑑的class
 */
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
    initList()
    {
        let Options=GameSystem.Classes.Options,Option=GameSystem.Classes.Option;
        this.list=new Options({className:"list"});
        let list=this.list,dictionary=GameSystem.Classes.PokemonType.Dictionary;
        list.keyInput=undefined;
        list.optionsLoop=true;
        for(let key in dictionary)
        {
            list.push(new Option(dictionary[key].id + " " + key,function()
            {
                let ill=GameSystem.HTMLObjectContainer.illustration;
                ill.setInfo=dictionary[key];
                ill.show();
            }));
        }
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