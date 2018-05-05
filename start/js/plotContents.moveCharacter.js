GameSystem.Classes.PlotContents.MoveCharacter=
class MoveCharacter extends GameSystem.Classes.PlotContent
{
    constructor(options={name:"moveCharacter",type:"MoveCharacter",character:GameSystem.protagonist,from:undefined,to:undefined,vector:undefined})
    {
        super(options);
        this.character=options.character;
        this.from=options.from;
        this.to=options.to;
        this.vector=options.vector;
    }
    start()
    {
        this.character.position=this.from||this.character.position;
        
    }
    end()
    {
        this.plot.step();//下一步
    }
}