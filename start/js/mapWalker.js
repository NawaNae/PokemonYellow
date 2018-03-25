GameSystem.Classes.MapWalker=
class MapWalker
{
    constructor(config={mapRef,lockTime,walkSpeed:1,blockWidth:16,timesPerPixel})
    {
        this.blockWidth=config.blockWidth||16;//格子寬
        this.timesPerPixel=config.timesPerPixel||2;//每格子播放幾次
        this.lockTime=config.lockTime||GameSystem.Manager.Key.lockTime||300;//鎖鍵時間
        this.movePeriod=Math.floor(0.9*(this.lockTime/this.blockWidth/this.timesPerPixel));//播放一格間隔
        var mapWalker=this;
        this.walkCounter=
        {
            Up:0,
            Left:0,
            Down:0,
            Right:0
        };
        this.map=config.mapRef||Framework.Game._currentLevel.map;//map之reference
        this.map.game=this.map.game||{};//new namespce
        this.map.game.newPoint=new GameSystem.Classes.Point();//目標點(播放結束直接設定為該點 以防移動不準確)
        this.speed=config.walkSpeed||1;//移動速度(格數/每周期)
        this.moveVector=//地圖移動向量陣列
        {
            Up:new GameSystem.Classes.Point(0,-1),
            Down:new GameSystem.Classes.Point(0,+1),
            Right:new GameSystem.Classes.Point(+1,0),
            Left:new GameSystem.Classes.Point(-1,0),
        }
        this.timeout;
        let GS=GameSystem;
        let CS=GS.Classes;
        let PT=CS.Point;
        this.keyInput=(e)=>//keyInput的事件
        {
            this.timeout=()=>
            {
                if(this.walkCounter[e.key]<this.blockWidth*this.timesPerPixel)//condition (Loop)
                {
                    if(this.walkCounter[e.key]==0)//initialize(first loop)
                    {
       
                        var protagonistNewPoint=GS.protagonist.position.toPoint();
                        var protagonistScreenPoint=GS.protagonist._screenPosition.toPoint();
      
                        this.map.game.newPoint=new PT(protagonistScreenPoint.x-protagonistNewPoint.x,
                            protagonistScreenPoint.y-protagonistNewPoint.y);
                    }
                    this.map.x+=this.moveIncrease(e.key,this.speed).x;
                    this.map.y+=this.moveIncrease(e.key,this.speed).y;
                 
                    this.walkCounter[e.key]+=this.speed;//increase
                    setTimeout(this.timeout,this.movePeriod);//continue to next loop...
                }
                else
                {    
                    this.map.position=this.map.game.newPoint;
                   
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
        return new GameSystem.Classes.Point(-aimVector.x*value/this.timesPerPixel,-aimVector.y*value/this.timesPerPixel);

    }
}
