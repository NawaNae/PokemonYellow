GameSystem.Classes.PlotContents.GiveProp=
class GiveProp extends GameSystem.Classes.PlotContents.Paragraph
{
    constructor(prop,options={name:"giveProp",type:"giveProp"})
    {
        super("",options.type);
        this.name=options.name;
        this.prop=prop;
        autoBind(this);
    }
    start()
    {
        var mainChar=GameSystem.protagonist,dialog=GameSystem.HTMLObjectContainer.dialog,container=GameSystem.HTMLObjectContainer;
        dialog.plot=this.plot;
        if(mainChar)
        {    
            mainChar._props.push(this.prop);
            this._content=mainChar.name +" 得到了 " + this.prop.name+(this.prop.count ? " x "+this.prop.count:"");
        }
        else
        {
            this._content="找不到主角";
        }
        super.start();


    }
    
}