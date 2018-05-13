
GameSystem.Classes.Records=
class Records
{
    constructor()
    {
        this.records=[];
        this.loadAll();
    }
    saveAll()
    {
        localStorage.records=JSON.stringify(this.records);
    }
    save(options={index:0,mainChar:undefined,rival:undefined,rivalName:undefined,search:false})
    {
        var Record=GameSystem.Classes.Record,Character=GameSystem.Classes.Character;
        options.mainChar=(GameSystem&&GameSystem.protagonist)?GameSystem.protagonist:undefined;
        options.rival=options.rival||(options.rivalName)?new Character(options.rivalName):(GameSystem.rival)?GameSystem.rival:undefined;
        if(options.mainChar)
        {
            if(options.search)
            {
                var aim=this.records.find(ele=>name===options.mainChar.name);
                this.records[this.records.indexOf(aim)]=new Record(options.mainChar,options.rival);
            }
            else
            {
                this.records[options.index]=new Record(options.mainChar,options.rival);
            }
        }
        this.saveAll();
    }
    load(options={index:0,mainChar:undefined,name:undefined,search:false})
    {
        this.loadAll();//refresh
        options.mainChar=options.mainChar||(GameSystem&&GameSystem.protagonist)?GameSystem.protagonist:undefined;
        if(this.records.length>0)
        {
            if(!GameSystem.protagonist)
                GameSystem.protagonist=new GameSystem.Classes.Protagonist();    
            if(!GameSystem.rival)
                GameSystem.rival=new GameSystem.Classes.Character();
            if(!options.search)
            {  
              GameSystem.protagonist.copyFrom(this.records[options.index]);
              GameSystem.rival.name=this.records[options.index].rivalName||"屁孩茂";
            }
            else if(options.name)
            {    
                var record=this.records.find(ele=>ele.name===options.name);
                GameSystem.protagonist.copyFrom(record);
                GameSystem.rival.name=record.rivalName||"屁孩茂";
            }
            else if(mainChar)
             {   
                var record=this.records.find(ele=>ele.name===options.name)
                GameSystem.protagonist.copyFrom(record);
                GameSystem.rival.name=record.rivalName||"屁孩茂";
             }
        }
        else
            console.log("no any record");
    }
    loadAll()
    {
        if(localStorage.records)
            this.records=JSON.parse(localStorage.records);
    }

}
GameSystem.Manager.Records=new GameSystem.Classes.Records();
