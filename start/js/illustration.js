/**
 * @class Illustration
 * @description 圖鑑的class
 */
GameSystem.Classes.Illustration=
class Illustration extends DisplayInformation.Text
{
    constructor()
    {

        super("","","","illustration");
        this.initList();
        this.initNumber();
        this.lastKeyInput;
        this.keyInput=(e)=>{this._keyInput(e);}
    }
    initList()
    {
        let Options=GameSystem.Classes.Options,Option=GameSystem.Classes.Option;
        this.list=new Options({className:"illustrationList"});
        let list=this.list,dictionary=GameSystem.Classes.PokemonType.Dictionary;
        this.listLen=0;
        for(let key in dictionary)
        {
            list.push(new Option(dictionary[key].id + " " + key,function(){/*show property of pokemon*/}));
            this.listLen++;
        }
        this.list.appendTo(this._display);
    }
    initNumber()
    {
        this.findNumber=new DisplayInformation.Digit(0,"發現了 "," 種\n共"+this.listLen+"種","illustrationNumbers");
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
        if(val)
        {
            this.lastKeyInput=GameSystem.Manager.Key.keyInput;
            GameSystem.Manager.Key.keyInput=this.keyInput;
        }
        else
        {
            if(this.lastKeyInput)
                GameSystem.Manager.Key.keyInput=this.lastKeyInput;
        }
    }
    get visible()
    {return super.visible;}
 
}