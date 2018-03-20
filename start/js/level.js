GameSystem.Classes.Level=
class Level extends Framework.Level
{
    constructor(size={x:0,y:0})
    {
        super();
        this.map;
        this.size=new GameSystem.Classes.Rectangle({x:0,y:0},size||{x:0,y:0});
        this.obstacles=new Array();
        this.eventObj=new Array();
        this.npcs= new Array();
        this.gates= new Array();
        this.battleFields= new Array();
    }

    
}