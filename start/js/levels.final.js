GameSystem.Classes.Levels=GameSystem.Classes.Levels||{};
GameSystem.Classes.Levels.Final=
class Final extends GameSystem.Classes.Level
{
    constructor()
    {
        super({x:21,y:18},"final");
        this.music=Load.audio(define.musicPath+"background/final.mp3");
        this.music.loop=true;
    }
    load ()
    {
        super.load();
        var GS=GameSystem;
        var CS=GS.Classes;
        var Position=CS.Position;
        this.mapImage=new CS.Image(define.mapImagePath + 'palletTown/gen3.png',{cutStartPosition:new Position(0,0),cutSize:new Position(27,27)});
        this.map =new  Framework.Scene();
        this.map.attach(this.mapImage);
        this.rootScene.attach(this.map);
        this.music.play();
        this.size.pos1=new CS.Position(2,2);
        this.map.x=GS.protagonist._screenPosition.toPoint().x-GS.protagonist.position.toPoint().x;
        this.map.y=GS.protagonist._screenPosition.toPoint().y-GS.protagonist.position.toPoint().y;
        this.keyInput = (e) => {
            this.normalKeyInput(e);
        };
        GS.Manager.Key.keyInput=this.keyInput;
        this.rootScene.attach(GS.protagonist.image);
        
            
    }
    initObstacles()
    {
        var GS = GameSystem;
        var CS = GS.Classes;
        var pushItem = (x1,y1,x2,y2)=>this.obstacles.push(new CS.Rectangle({ x: x1, y: y1 }, { x: x2, y: y2 }));
        pushItem(5,3,9,7);
        pushItem(14,3,18,7);
        pushItem(13,9,19,13);
        pushItem(13,16,18,16);
        pushItem(5,11,9,11);   
        pushItem(7,17,10,19);
        pushItem(13,7,13,7);
        pushItem(4,7,4,7);
    }

}
