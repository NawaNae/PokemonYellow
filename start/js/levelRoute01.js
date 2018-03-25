class Route01 extends GameSystem.Classes.Level
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

        this.map = new CS.Image(define.imagePath + 'route01.png');
        this.rootScene.attach(this.map);
        this.size.pos1=new CS.Position(4,0);
        this.size.pos2=new CS.Position(17,39);
        this.gates.push(new CS.Connection
            (
                new CS.MapPosition
                (
                    "palletTown",
                    new CS.Position(13,3)
                ),
                new CS.MapPosition
                (
                    "route01",
                    new CS.Position(10,39)
                )
            ));
            this.gates.push(new CS.Connection
                (
                    new CS.MapPosition
                    (
                        "palletTown",
                        new CS.Position(14,3)
                    ),
                    new CS.MapPosition
                    (
                        "route01",
                        new CS.Position(11,39)
                    )
                ));
 /*       this.obstacles.push(new CS.Rectangle({x:0,y:0},{x:12,y:3}));
        this.obstacles.push(new CS.Rectangle({x:0,y:4},{x:3,y:23}));*/

        this.walker=new CS.MapWalker({mapRef:this.map});
   
        
       
        this.map.x=GS.protagonist._screenPosition.toPoint().x-GS.protagonist.position.toPoint().x;
        this.map.y=GS.protagonist._screenPosition.toPoint().y-GS.protagonist.position.toPoint().y;
        this.keyInput=(e)=>
        {
            if(KM.isMoveKey(e.key))
            {
                GS.protagonist.facing=CS.Character.Face[e.key];
                var newPosition=new CS.Position(GS.protagonist.position.x+GS.protagonist.movePositionVector[e.key].x,
                    GS.protagonist.position.y+GS.protagonist.movePositionVector[e.key].y
                );
                var gate=undefined;
                
                // console.log(this.isGateAtThenGetGate(newPosition))
                if((gate=this.isGateAtThenGetGate(newPosition)))
                {
                    let levelName=Framework.Game._findLevelNameByLevel(this);
                    let anotherPlace=gate.findAnotherPlaceByMapName(levelName);
                    GS.protagonist.position=anotherPlace.position;
                    Framework.Game.goToLevel(anotherPlace.mapName);
                }
                else if(this.isWalkableAt(newPosition))
                {
                    console.log(newPosition);
 
                    GS.protagonist.position=newPosition;
                    this.walker.keyInput(e);
                }
            }
        };
        GS.Manager.Key.keyInput=this.keyInput;
        
            
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
