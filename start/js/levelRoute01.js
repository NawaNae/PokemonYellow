class Route01 extends GameSystem.Classes.Level
{
    load ()
    {
        super.load();
        var GS=GameSystem;
        var CS=GS.Classes;
        var KM=GS.Manager.Key;


        this.mapImage=new CS.Image(define.imagePath + 'route01.png');
        this.map =new  Framework.Scene();
        this.map.attach(this.mapImage);
        this.rootScene.attach(this.map);
        this.music=Load.audio(define.musicPath+"background/106 The Road To Viridian City From Palette.mp3");
        this.music.autoplay=true;
        this.music.loop=true;
        this.size.pos1=new CS.Position(4,0);
        this.size.pos2=new CS.Position(17,39);

       

        this.walker=new CS.MapWalker({mapRef:this.map});
   
        this.loadObstacles();
        this.map.x=GS.protagonist._screenPosition.toPoint().x-GS.protagonist.position.toPoint().x;
        this.map.y=GS.protagonist._screenPosition.toPoint().y-GS.protagonist.position.toPoint().y;
        this.keyInput = (e) => {
            this.normalKeyInput(e);
        };
        GS.Manager.Key.keyInput=this.keyInput;
        this.rootScene.attach(GS.protagonist.image);
        
            
    }
    initBattleFields(){
        var GS=GameSystem,CS=GS.Classes,Rectangle=CS.Rectangle,Position=CS.Position,Occurrence=CS.Occurrence,BattleField=CS.BattleField,DEX=GameSystem.Classes.PokemonType.Dictionary;
        var addOccur=field=>{field.addOccurrence(new Occurrence(DEX["小拉達"], 2, 4, 30));field.addOccurrence(new Occurrence(DEX["波波"], 2, 7, 70))};
        var nField=(x1,y1,x2,y2)=>new BattleField(new Rectangle(new Position(x1,y1),new Position(x2,y2)));
        var pushField=(x1,y1,x2,y2)=>{let f=nField(x1,y1,x2,y2);addOccur(f);this.battleFields.push(f);};
        pushField(10,39,11,34);
        pushField(12,33,15,32);
        pushField(14,11,17,30);
        pushField(4, 33,7,32);
        pushField(6, 31,9,30);
        pushField(12,27,15,24);
        pushField(14,17,17,14);
        pushField(10,11,17,8);
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
    initGates()
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
}
