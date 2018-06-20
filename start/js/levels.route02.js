GameSystem.Classes.Levels=GameSystem.Classes.Levels||{};
/**
 * 道路二第一部分
 * @class Route02
 * @extends Level
 */
GameSystem.Classes.Levels.Route02=
class Route02 extends GameSystem.Classes.Level
{
    constructor()
    {
        super({x:11,y:12},"route02");
        this.reviveMapPosition=new GameSystem.Classes.MapPosition("viridianCity",new GameSystem.Classes.Position(23,26));
    }
    load ()
    {
        super.load();
        var GS=GameSystem,CS=GS.Classes,Point=CS.Point,Position=CS.Position;
        this.mapImage=new CS.Image(define.mapImagePath + 'routes/route02.png',{cutStartPosition:new Point(2,148),cutSize:new Position(23,31)});
        this.map =new  Framework.Scene();
        this.map.attach(this.mapImage);
        this.rootScene.attach(this.map);
        this.music=Load.audio(define.musicPath+"background/106 The Road To Viridian City From Palette.mp3");
        this.music.autoplay=true;
        this.music.loop=true;
        this.size.pos1=new Position(2,4);
        this.size.pos2=new Position(13,29);
        this.map.x=GS.protagonist._screenPosition.toPoint().x-GS.protagonist.position.toPoint().x;
        this.map.y=GS.protagonist._screenPosition.toPoint().y-GS.protagonist.position.toPoint().y;
        GS.Manager.Key.keyInput=this.keyInput;
        this.rootScene.attach(GS.protagonist.image);
    }
    initBattleFields(){
        var GS=GameSystem,CS=GS.Classes,Rectangle=CS.Rectangle,Position=CS.Position,Occurrence=CS.Occurrence,BattleField=CS.BattleField,DEX=GameSystem.Classes.PokemonType.Dictionary;
        var addOccur=field=>{field.addOccurrence(new Occurrence(DEX["波波"], 3, 7, 30));field.addOccurrence(new Occurrence(DEX["小拉達"], 3, 4, 40));field.addOccurrence(new Occurrence(DEX["尼多蘭"], 3, 6, 15));field.addOccurrence(new Occurrence(DEX["尼多朗"], 3, 6, 15))};
        var nField=(x1,y1,x2,y2)=>new BattleField(new Rectangle(new Position(x1,y1),new Position(x2,y2)));
        var pushField=(x1,y1,x2,y2)=>{let f=nField(x1,y1,x2,y2);addOccur(f);this.battleFields.push(f);};
        pushField(6,11,11,8);
    }
    initObstacles()
    {
        var GS=GameSystem,CS=GS.Classes;
        this.obstacles.push(new CS.Rectangle({x:2,y:29},{x:3,y:20}));//左下樹
        this.obstacles.push(new CS.Rectangle({x:12,y:29},{x:13,y:29}));//左下樹
        this.obstacles.push(new CS.Rectangle({x:13,y:16},{x:8,y:13}));//右中樹
        this.obstacles.push(new CS.Rectangle({x:7,y:15},{x:7,y:14}));//右中樹
        this.obstacles.push(new CS.Rectangle({x:2,y:7},{x:9,y:7}));//上坎
        this.obstacles.push(new CS.Rectangle({x:2,y:7},{x:9,y:7}));//上坎
        this.obstacles.push(new CS.Rectangle({x:4,y:21},{x:8,y:21}));//下坎1
        this.obstacles.push(new CS.Rectangle({x:10,y:21},{x:13,y:21}));//下坎2
        this.obstacles.push(new CS.Rectangle({x:13,y:11},{x:13,y:4}));//右上樹
    }
    initGates()
    {
        var GS = GameSystem,CS = GS.Classes;
        var newConnectionItem=(map1,x1,y1,map2,x2,y2)=>new CS.Connection(new CS.MapPosition(map1,new CS.Position(x1,y1)),new CS.MapPosition(map2,new  CS.Position(x2, y2)));
        var pushItem=(map1,x1,y1,map2,x2,y2)=>this.gates.push(newConnectionItem(map1,x1,y1,map2,x2,y2));
        pushItem("route02",9,30,"viridianCity",17,0);
        pushItem("route02",10,30,"viridianCity",18,0);
        pushItem("route02",5,3,"route02House",5,7);
    }
    initSubLevels()
    {
        let house=new GameSystem.Classes.Levels.Route02.House();
        this.subLevels.push(house);
        Framework.Game.addNewLevel({"route02House":house});
        let part2=new GameSystem.Classes.Levels.Route02.Part2();
        this.subLevels.push(part2);
        Framework.Game.addNewLevel({"route02Part2":part2});
        for(let level of this.subLevels)
            level.parentLevel=this;
    }
}
/**
 * 道路二的房屋
 * @class Route02
 * @extends Level
 */
GameSystem.Classes.Levels.Route02.House=
class House extends GameSystem.Classes.Level
{
    load ()
    {
        super.load();
        var GS=GameSystem,CS=GS.Classes,Point=CS.Point,Position=CS.Position;
        this.mapImage=new CS.Image(define.mapImagePath + 'routes/route02.png',{cutStartPosition:new Point(388,2),cutSize:new Position(10,8)});
        this.map =new  Framework.Scene();
        this.map.attach(this.mapImage);
        this.rootScene.attach(this.map);
        this.music=Load.audio(define.musicPath+"background/106 The Road To Viridian City From Palette.mp3");
        this.music.autoplay=true;
        this.music.loop=true;
        this.size.pos1=new Position(0,1);
        this.size.pos2=new Position(9,7);
        this.map.x=GS.protagonist._screenPosition.toPoint().x-GS.protagonist.position.toPoint().x;
        this.map.y=GS.protagonist._screenPosition.toPoint().y-GS.protagonist.position.toPoint().y;
        GS.Manager.Key.keyInput=this.keyInput;
        this.rootScene.attach(GS.protagonist.image);
    }
    initGates()
    {
        var GS = GameSystem,CS = GS.Classes;
        var newConnectionItem=(map1,x1,y1,map2,x2,y2)=>new CS.Connection(new CS.MapPosition(map1,new CS.Position(x1,y1)),new CS.MapPosition(map2,new  CS.Position(x2, y2)));
        var pushItem=(map1,x1,y1,map2,x2,y2)=>this.gates.push(newConnectionItem(map1,x1,y1,map2,x2,y2));
        pushItem("route02",5,3,"route02House",5,7);
        pushItem("route02",5,3,"route02House",4,7);
        pushItem("route02Part2",5,12,"route02House",5,0);
    }
    initObstacles()
    {
        var GS=GameSystem,CS=GS.Classes;
        this.obstacles.push(new CS.Rectangle({x:0,y:7},{x:0,y:2}));//左下樹
        this.obstacles.push(new CS.Rectangle({x:6,y:2},{x:6,y:3}));//桌子?
        this.obstacles.push(new CS.Rectangle({x:6,y:6},{x:6,y:5}));//桌子?
        this.obstacles.push(new CS.Rectangle({x:8,y:6},{x:8,y:5}));//桌子?
        this.obstacles.push(new CS.Rectangle({x:8,y:3},{x:8,y:2}));//桌子?
        this.obstacles.push(new CS.Rectangle({x:9,y:2},{x:9,y:7}));//右中樹
    }
}
/**
 * 道路二第二部分
 * @class Route02Part2
 * @extends Level
 */
GameSystem.Classes.Levels.Route02.Part2=
class Route02Part2 extends GameSystem.Classes.Level
{
    constructor()
    {
        super({x:11,y:12},"route02Part2");
        this.reviveMapPosition=new GameSystem.Classes.MapPosition("viridianCity",new GameSystem.Classes.Position(23,26));
    }
    load ()
    {
        super.load();
        var GS=GameSystem,CS=GS.Classes,Point=CS.Point,Position=CS.Position;
        this.mapImage=new CS.Image(define.mapImagePath + 'routes/route02.png',{cutStartPosition:new Point(387,131),cutSize:new Position(23,26)});
        this.map =new  Framework.Scene();
        this.map.attach(this.mapImage);
        this.rootScene.attach(this.map);
        this.music=Load.audio(define.musicPath+"background/106 The Road To Viridian City From Palette.mp3");
        this.music.autoplay=true;
        this.music.loop=true;
        this.size.pos1=new Position(2,0);
        this.map.x=GS.protagonist._screenPosition.toPoint().x-GS.protagonist.position.toPoint().x;
        this.map.y=GS.protagonist._screenPosition.toPoint().y-GS.protagonist.position.toPoint().y;
        GS.Manager.Key.keyInput=this.keyInput;
        this.rootScene.attach(GS.protagonist.image);
    }
    initBattleFields(){
        var GS=GameSystem,CS=GS.Classes,Rectangle=CS.Rectangle,Position=CS.Position,Occurrence=CS.Occurrence,BattleField=CS.BattleField,DEX=GameSystem.Classes.PokemonType.Dictionary;
        var addOccur=field=>{field.addOccurrence(new Occurrence(DEX["波波"], 3, 7, 30));field.addOccurrence(new Occurrence(DEX["小拉達"], 3, 4, 40));field.addOccurrence(new Occurrence(DEX["尼多蘭"], 3, 6, 15));field.addOccurrence(new Occurrence(DEX["尼多朗"], 3, 6, 15))};
        var nField=(x1,y1,x2,y2)=>new BattleField(new Rectangle(new Position(x1,y1),new Position(x2,y2)));
        var pushField=(x1,y1,x2,y2)=>{let f=nField(x1,y1,x2,y2);addOccur(f);this.battleFields.push(f);};
        pushField(2,8,9,3);
    }
    initGates()
    {
        var GS = GameSystem,CS = GS.Classes;
        var newConnectionItem=(map1,x1,y1,map2,x2,y2)=>new CS.Connection(new CS.MapPosition(map1,new CS.Position(x1,y1)),new CS.MapPosition(map2,new  CS.Position(x2, y2)));
        var pushItem=(map1,x1,y1,map2,x2,y2)=>this.gates.push(newConnectionItem(map1,x1,y1,map2,x2,y2));
        pushItem("route02Part2",5,13,"route02House",5,0);
        pushItem("route02Part2",10,0,"pewterCity",18,34);
        pushItem("route02Part2",11,0,"pewterCity",19,34);
    }
    initObstacles()
    {
        var GS=GameSystem,CS=GS.Classes;
        this.obstacles.push(new CS.Rectangle({x:2,y:2},{x:9,y:0}));//左上樹
        this.obstacles.push(new CS.Rectangle({x:0,y:16},{x:1,y:1}));//左樹
        this.obstacles.push(new CS.Rectangle({x:2,y:16},{x:4,y:11}));//房屋左
        this.obstacles.push(new CS.Rectangle({x:6,y:16},{x:12,y:11}));//房屋右
    }
}