GameSystem.Classes.PlotContents.MoveCharacter=
class MoveCharacter extends GameSystem.Classes.PlotContent
{
    constructor(options={name:"moveCharacter",type:"MoveCharacter",character:undefined,from:undefined,to:undefined,vector:undefined})
    {
        super(options);
        
        this.character=options.character;
        this.from=options.from;
        this.to=options.to;
        this.vector=options.vector;
        autoBind(this);
    }
    start()
    {
        this.character=this.character||this.plot.npc;
        this.character.position=this.from||this.character.position;
        if(!this.to&&!this.vector){console.log("cannot get to or vector from a move plot content.");return;}
        this.to=this.to||this.from.add(this.vector);
        this.character.moveTo(this.to,()=>{this.plot.step();});
    }
}
 