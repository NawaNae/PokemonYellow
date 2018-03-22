GameSystem.Classes.Level=
class Level extends Framework.Level
{
    constructor(sizePosition)
    {
        super();
        var CS=GameSystem.Classes;
        this.map;
        if(!sizePosition)
            console.log("請確認初始化地圖大小，不然可能會出現角色走出地圖的BUG");
        sizePosition=sizePosition||{x:1000,y:1000};

         //請注意在初始化時填入size參數或者Load時設定，不然會造成超出地圖移動的問題。
        this.size=new CS.Rectangle({x:0,y:0},sizePosition);
        //NawaNawa

        this.obstacles=new Array();
        this.eventObj=new Array();
        this.npcs= new Array();
        this.gates= new Array();
        this.battleFields= new Array();
    }
    isWalkableAt(position)
    {
        
        for(var i in this.obstacles)
            if(position.isIn(this.obstacles[i]))
                return false
        
        if(!position.isIn(this.size))//地圖外(不再地圖內)
            return false;
        return true;
    }
    isGateAtThenGetGate(position)
    {
        let levelName=Framework.Game._findLevelNameByLevel(this);
        for(var i in this.gates)
        {
            let gate=this.gates[i];
            let place=gate.findPlaceByMapName(levelName);
            if(position.x==place.position.x&&position.y==place.position.y)
                return this.gates[i]
        }
            
        return undefined;

    }
    
}