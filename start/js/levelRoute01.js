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
        this.music=Load.audio(define.musicPath+"background/106 The Road To Viridian City From Palette.mp3");
        this.music.autoplay=true;
        this.music.loop=true;
        this.size.pos1=new CS.Position(4,0);
        this.size.pos2=new CS.Position(17,39);

       

        this.walker=new CS.MapWalker({mapRef:this.map});
   
        this.loadNPCs();
        this.loadObstacles();
        this.map.x=GS.protagonist._screenPosition.toPoint().x-GS.protagonist.position.toPoint().x;
        this.map.y=GS.protagonist._screenPosition.toPoint().y-GS.protagonist.position.toPoint().y;
        this.keyInput = (e) => {
            this.normalKeyInput(e);
        };
        GS.Manager.Key.keyInput=this.keyInput;
        
            
    }
    loadObstacles()
    {
        var GS=GameSystem;
        var CS=GS.Classes;
        this.obstacles.push(new CS.Rectangle({x:5,y:34},{x:9,y:39}));
        this.obstacles.push(new CS.Rectangle({x:12,y:34},{x:17,y:39}));
        this.obstacles.push(new CS.Rectangle({x:4,y:29},{x:5,y:29}));
        this.obstacles.push(new CS.Rectangle({x:9,y:29},{x:17,y:29}));
        this.obstacles.push(new CS.Rectangle({x:16,y:25},{x:17,y:25}));
        this.obstacles.push(new CS.Rectangle({x:4,y:25},{x:11,y:25}));
        this.obstacles.push(new CS.Rectangle({x:4,y:21},{x:4,y:21}));
        this.obstacles.push(new CS.Rectangle({x:6,y:21},{x:8,y:21}));
        this.obstacles.push(new CS.Rectangle({x:10,y:21},{x:17,y:21}));
        this.obstacles.push(new CS.Rectangle({x:13,y:15},{x:4,y:15}));
        this.obstacles.push(new CS.Rectangle({x:4,y:7},{x:13,y:7}));
        this.obstacles.push(new CS.Rectangle({x:9,y:6},{x:9,y:11}));
        this.obstacles.push(new CS.Rectangle({x:4,y:11},{x:8,y:11}));
        this.obstacles.push(new CS.Rectangle({x:12,y:0},{x:17,y:3}));
        this.obstacles.push(new CS.Rectangle({x:4,y:0},{x:9,y:3}));

    }
    loadNPCs()
    {
        var GS=GameSystem;
        var CS=GS.Classes;
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
