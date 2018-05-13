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
        options.mainChar=(GameSystem&&GameSystem.protagonist)?GameSystem.protagonist:undefined;
        if(options.mainChar)
        {
            if(options.search)
            {
                var aim=this.recorders.find(ele=>name===options.mainChar.name);
                this.recorders[this.recorders.indexOf(aim)]=options.mainChar;
            }
            else
            {
                localStorage.recorders[options.index]=JSON.stringify(options.mainChar);
            }
        }
        this.saveAll();
    }
    load(options={index:0,mainChar:undefined,name:undefined,search:false})
    {
        this.loadAll();//refresh
        options.mainChar=(GameSystem&&GameSystem.protagonist)?GameSystem.protagonist:undefined;
        if(options.recorders.length>0)
            if(!GameSystem.protagonist)
            {
                    if(!options.search)
                        GameSystem.protagonist=this.recorders[options.index]
                    else if(options.name)    
                            GameSystem.protagonist=this.recorders.find(ele=>options.name===ele.name)
            }
            else
            {
                    if(!options.search)
                        GameSystem.protagonist=this.recorders[options.index]
                    else if(options.name)
                        GameSystem.protagonist=this.recorders.find(ele=>ele.name===options.name);
                    else if(mainChar)
                        GameSystem.protagonist=this.recorders.find(ele=>ele.name===mainChar.name);
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
