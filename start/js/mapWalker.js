GameSystem.Classes.MapWalker=
class MapWalker
{
    constructor(config={mapRef,lockTime,walkSpeed:1,blockWidth:16})
    {
        this.blockWidth=config.blockWidth||16;
        this.lockTime=config.lockTime||GameSystem.Manager.Key.lockTime||300;
        this.movePeriod=Math.floor(0.95*(this.lockTime/this.blockWidth));
        var mapWalker=this;
        this.walkCounter=
        {
            Up:0,
            Left:0,
            Down:0,
            Right:0
        };
        this.map=config.mapRef||Framework.Game._currentLevel.map;
        this.map.game=this.map.game||{};
        this.map.game.newPoint=new GameSystem.Classes.Point();
        this.speed=config.walkSpeed||1;
        this.moveVector=//地圖移動陣列
        {
            Up:new GameSystem.Classes.Point(0,-1),
            Down:new GameSystem.Classes.Point(0,+1),
            Right:new GameSystem.Classes.Point(+1,0),
            Left:new GameSystem.Classes.Point(-1,0),
        }
        this.timeout;
        this.keyInput=(e)=>
        {
            this.timeout=()=>
            {
                if(this.walkCounter[e.key]<this.blockWidth)//condition (Loop)
                {
                    if(this.walkCounter[e.key]==0)//initialize(first loop)
                    {
                        this.map.game.newPoint.x=this.map.x+this.moveIncrease(e.key,this.blockWidth).x;
                        this.map.game.newPoint.y=this.map.y+this.moveIncrease(e.key,this.blockWidth).y;
                    }
                    this.map.x+=this.moveIncrease(e.key).x;
                    this.map.y+=this.moveIncrease(e.key).y;
                    this.walkCounter[e.key]++;//increase
                    setTimeout(this.timeout,this.movePeriod);//continue to next loop...
                }
                else
                {    
                    this.map.x=this.map.game.newPoint.x;
                    this.map.y=this.map.game.newPoint.y;
                    this.walkCounter[e.key]=0;//reset(initialize)
                }
            };
            this.timeout();
        }
    }
    moveIncrease(key,value)
    {
        value=value||1;
        key=GameSystem.Manager.Key.keyMapping[key];
        var aimVector=this.moveVector[key];
        return new GameSystem.Classes.Point(-aimVector.x*value,-aimVector.y*value);

    }
}
