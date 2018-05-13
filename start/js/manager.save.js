
GameSystem.Classes.Recorders=
class Recorders
{
    constructor()
    {
        this.recorders=[];
        this.loadAll();
    }
    saveAll()
    {
        localStorage.recorders=JSON.stringify(this.recorders);
    }
    save(options={index:0,mainChar:undefined,search:false})
    {
        var Recorder=GameSystem.Classes.Recorder;
        options.mainChar=(GameSystem&&GameSystem.protagonist)?GameSystem.protagonist:undefined;
        if(options.mainChar)
        {
            if(options.search)
            {
                var aim=this.recorders.find(ele=>name===options.mainChar.name);
                this.recorders[this.recorders.indexOf(aim)]=new Recorder(options.mainChar);
            }
            else
            {
                this.recorders[options.index]=new Recorder(options.mainChar);
            }
        }
        this.saveAll();
    }
    load(options={index:0,mainChar:undefined,name:undefined,search:false})
    {
        this.loadAll();//refresh
        options.mainChar=options.mainChar||(GameSystem&&GameSystem.protagonist)?GameSystem.protagonist:undefined;
        if(this.recorders.length>0)
        {
            if(!GameSystem.protagonist)
                GameSystem.protagonist=new GameSystem.Classes.Protagonist();    
            if(!options.search)
                GameSystem.protagonist.copyFrom(this.recorders[options.index]);
            else if(options.name)
                GameSystem.protagonist.copyFrom(this.recorders.find(ele=>ele.name===options.name));
            else if(mainChar)
                GameSystem.protagonist.copyFrom(this.recorders.find(ele=>ele.name===mainChar.name));
        }
        else
            console.log("no any recorder");
    }
    loadAll()
    {
        if(localStorage.recorders)
            this.recorders=JSON.parse(localStorage.recorders);
    }

}
GameSystem.Manager.Recorders=new GameSystem.Classes.Recorders();
