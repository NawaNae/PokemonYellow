class MyGameTest extends GameSystem.Classes.Level
{
    load ()
    {
        /*bug 去除 */ 
        this.nullSprite = new Framework.Sprite(define.imagePath + 'null.png');//去除draw bug用的
        this.nullSprite.position = { x: -1, y: -1 };
        this.rootScene.attach(this.nullSprite);
        /*bug 去除 */ 

        var GS=GameSystem;
        var CS=GS.Classes;
        var KM=GS.Manager.Key;

        this.obstacles.push(new CS.Rectangle({x:0,y:0},{x:12,y:3}));
        this.obstacles.push(new CS.Rectangle({x:0,y:4},{x:3,y:23}));
        this.obstacles.push(new CS.Rectangle({x:7,y:16},{x:10,y:23}));
        this.obstacles.push(new CS.Rectangle({x:4,y:19},{x:4,y:19}));        
        this.obstacles.push(new CS.Rectangle({x:4,y:20},{x:6,y:23}));
        this.obstacles.push(new CS.Rectangle({x:11,y:19},{x:21,y:23}));
        this.obstacles.push(new CS.Rectangle({x:22,y:0},{x:26,y:23}));
        this.obstacles.push(new CS.Rectangle({x:15,y:0},{x:21,y:3}));
        this.obstacles.push(new CS.Rectangle({x:13,y:0},{x:14,y:2}));
        this.map = new Framework.Sprite(define.imagePath + 'palletTown.png');
        
        this.rootScene.attach(this.map);
        this.walker=new CS.MapWalker({mapRef:this.map});
        this.keyInput=(e)=>
        {
            if(KM.isMoveKey(e.key))
            {
                var newPosition=new CS.Position(GS.protagonist.position.x+GS.protagonist.movePositionVector[e.key].x,
                    GS.protagonist.position.y+GS.protagonist.movePositionVector[e.key].y
                );
                if(this.isWalkableAt(newPosition))
                {
                    GS.protagonist.position=newPosition;
                    console.log(GS.protagonist.position);
                    this.walker.keyInput(e);
                }


            }
            
        };
        
        GS.Manager.Key.keyInput=this.keyInput;
        GS.protagonist.position.x=10;
        GS.protagonist.position.y=10;
        this.map.waitForLoad();
        this.map.loaded=()=>
        {
            this.map.x=GS.protagonist._screenPosition.toPoint().x-GS.protagonist.position.toPoint().x;
            this.map.y=GS.protagonist._screenPosition.toPoint().y-GS.protagonist.position.toPoint().y;
        }
    }
    initialize() {
        
    }
    update() {
        /*bug 去除 */ 
       this.nullSprite.position.x--;
       if (this.nullSprite.position.x < -2)
           this.nullSprite.position.x =-1;
       /*bug 去除 */
    }

    draw(parentCtx) {
        if( this.count==0) 
            this.lastTime=Date.now();
       
        if(this.count==59)
           // console.log(Date.now()-this.lastTime);
        this.count=(this.count+1)%60;
        parentCtx.fillStyle="black";
        parentCtx.fillRect(0,0,Framework.Game.getCanvasWidth(),Framework.Game.getCanvasHeight());

       this.rootScene.draw(parentCtx);
       parentCtx.fillStyle="rgba(0,0,0,0.5)";
       parentCtx.fillRect(4*16,4*16,16,16);
       parentCtx.fillStyle="white";
       parentCtx.font="12px MBitmapSquareHK"
       parentCtx.fillText("小智",4*16+8,4*16+12,16);
       // this.map.draw(parentCtx)
    }



    touchstart(e) {
        //為了要讓Mouse和Touch都有一樣的事件
        //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
        this.click({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
    
    click(e) {  

        if (!this.rectPosition) {
            return;
        }  
        
    }
}
