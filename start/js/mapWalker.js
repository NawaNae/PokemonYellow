GameSystem.Classes.MapWalker=
class MapWalker
{
    constructor(config={mapRef,lockTime,walkSpeed:1,blockWidth:16})
    {
        this.blockWidth=config.blockWidth||16;
        this.lockTime=config.lockTime||GameSystem.Manager.Key.lockTime||300;
        this.movePeriod=0.9*(this.lockTime/this.blockWidth);
        var mapWalker=this;
        this.CounterClass=class Count
        {
            constructor()
            {
                this.counter={Up:0,Left:0,Down:0,Right:0};
            }
            Up(increase)
            {
                increase=increase||1;
                this.counter.Up+=increase;
                return this.counter.Up>mapWalker.blockWidth;
            }
            Left(increase)
            {
                increase=increase||1;
                this.counter.Left+=increase;
                return this.counter.Left>mapWalker.blockWidth;
            }
            Down(increase)
            {
                increase=increase||1;
                this.counter.Down+=increase;
                return this.counter.Down>mapWalker.blockWidth;
            }
            Right(increase)
            {
                increase=increase||1;
                this.counter.Right+=increase;
                return this.counter.Right>mapWalker.blockWidth;
            }


        };

        this.map=config.mapRef||Framework.Game._currentLevel.map;
        this.speed=config.walkSpeed||1;
        this.walkCounter=new this.CounterClass();
        this.keyInput=(e)=>
        {
            this.walkCounter.counter[e.key]=0;

            var callback=()=>
            {
                if(!this.walkCounter[e.key](1))
                {
                    setTimeout(callback,this.movePeriod);
                    //console.log(this.walkCounter.counter[e.key]);
                    this.mapmove(e);
                }
            };
            setTimeout(callback,this.movePeriod);
            this.mapmove(e);
            this.walkCounter[e.key](1);
        }
    }
    
    mapmove(e,increase)
    {
        increase=increase||1;
        var mappos=this.map.position;
        mappos.x -=  increase*e.pressList.Right;
        mappos.x +=  increase*e.pressList.Left;
        mappos.y -=  increase*e.pressList.Down;
         mappos.y +=  increase*e.pressList.Up;
    }
}