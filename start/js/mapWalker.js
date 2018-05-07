GameSystem.Classes.MapWalker=
class MapWalker
{
    constructor(config={mapRef,npcsRef,lockTime,walkSpeed:1,blockWidth:16,timesPerPixel})
    {
        let GS=GameSystem;
        let CS=GS.Classes;
        let PT=CS.Point;
        this._blockWidth=config.blockWidth||16;//格子寬
        this._timesPerPixel=config.timesPerPixel||1;//每格子播放幾次
        this.lockTime=config.lockTime||GameSystem.Manager.Key.lockTime||300;//鎖鍵時間
        this.movePeriod=Math.floor(0.8*(this.lockTime/this._blockWidth/this._timesPerPixel));//播放一格間隔
        var mapWalker=this;
        this._countEnd=this._blockWidth*this._timesPerPixel;
        this.walkCounter=
        {
            Up:0,
            Left:0,
            Down:0,
            Right:0
        };
        this.npcs=config.npcsRef||Framework.Game._currentLevel.npcs;//npcs之ref
        this.map=config.mapRef||Framework.Game._currentLevel.map;//map之reference
        this.map.game=this.map.game||{};//new namespce
        this.map.game.newPoint=new GameSystem.Classes.Point();//目標點(播放結束直接設定為該點 以防移動不準確)
        this.speed=config.walkSpeed||1;//移動速度(格數/每周期)
        this.mapMoveVector=//地圖移動向量陣列
        {
            Up:new GameSystem.Classes.Point(0,+1),
            Down:new GameSystem.Classes.Point(0,-1),
            Right:new GameSystem.Classes.Point(-1,0),
            Left:new GameSystem.Classes.Point(+1,0),
        }
        this.characterMoveVector=CS.Character.MovePointVector;//地圖移動向量陣列
        
        this.timeout;
        
        this.keyInput=(e)=>//keyInput的事件
        {
            let key = GS.Manager.Key.moveKeys[e.key];
            var manChar=GS.protagonist;
            this.timeout=()=>
            {
                if(this.walkCounter[key]<this._countEnd)//condition (Loop)
                {
                    //console.log("frame"+this.walkCounter[key]);
                    if(this.walkCounter[key]==0)//initialize(first loop)
                    {
       
                        var protagonistNewPoint=GS.protagonist.position.toPoint();
                        var protagonistScreenPoint=GS.protagonist._screenPosition.toPoint();
      
                        this.map.game.newPoint=new PT(
                            protagonistScreenPoint.x-protagonistNewPoint.x,
                            protagonistScreenPoint.y-protagonistNewPoint.y
                        );
                    }
                    let move=this.moveIncrease(key,this.speed);
                    manChar.x+=move.x;
                    manChar.y+=move.y;
                    for(let npc of this.npcs)
                    {
                        npc.x-=move.x;
                        npc.y-=move.y;
                    }
                    this.walkCounter[key]+=this.speed;//increase
                    setTimeout(this.timeout,this.movePeriod);//continue to next loop...
                }
                else
                {    
                    this.map.position=this.map.game.newPoint;
                    for(let npc of this.npcs)
                    {
                        npc.updateImagePosition();
                    }
                    this.walkCounter[key]=0;//reset(initialize)
                }
            };
            this.timeout();
        }
    }
    get timesPerPixel(){return this._timesPerPixel;}
    set timesPerPixel(value)
    {
        this._timesPerPixel=value;
        this._countEnd=this._timesPerPixel*this._blockWidth;
    }
    get blockWidth(){return this._blockWidth;}
    set blockWidth(value)
    {
        this._blockWidth=value;
        this._countEnd=this._timesPerPixel*this._blockWidth;
    }
    moveIncrease(key,value,moveVector)
    {
        value=value||1;
        key=GameSystem.Manager.Key.keyMapping[key];
        moveVector=moveVector||this.characterMoveVector;
        var aimVector=moveVector[key];
        return new GameSystem.Classes.Point(aimVector.x*value/this._timesPerPixel,aimVector.y*value/this._timesPerPixel);

    }
    
}
