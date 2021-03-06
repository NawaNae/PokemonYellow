GameSystem.Classes.Levels=GameSystem.Classes.Levels||{};
/**
 * 真新鎮
 * @class PalletTown
 * @extends Level
 */
GameSystem.Classes.Levels.PalletTown=
class PalletTown extends GameSystem.Classes.Level {
    constructor()
    {
        super({x:26,y:23},"palletTown");
        this.music= Load.audio( define.musicPath+"background/102 Palette Town Theme.mp3");
        this.music.loop=true;
        this.reviveMapPosition=new GameSystem.Classes.MapPosition("palletTown",new GameSystem.Classes.Position(8,8));
    }
    initEvents()
    {
        var GS=GameSystem,CS=GS.Classes,GR=GS.Resource,Position=CS.Position,Rectangle=CS.Rectangle,PC=CS.PlotContents, NPC=CS.NPC, Image=CS.Image ;
        var Drama=GR.Drama,Plot=CS.Plot,Paragraph=CS.Paragraph,CureAll=PC.CureAll,Script=PC.Script,GiveProp=PC.GiveProp,MoveCharacter=PC.MoveCharacter,Event=CS.Event,AddNpc=PC.AddNpc,RemoveNpc=PC.RemoveNpc;
        var Event=CS.Event, Plot=CS.Plot, Position=CS.Position, MoveChar=PC.MoveCharacter,mainChar=GS.protagonist;
        var e0=new Event(new Position(12,10),()=>{for(let i=0;i<this.npcs.length;i++)this.npcs[i].moveTo(GameSystem.protagonist.position)});
        this.events.push(e0);
        var oak=new NPC("doctorOak",CS.Character.Face.Down,new Position(14, 9),new Image(define.characterImagePath + "oak.png", { cutStartPosition: new Position(1, 0), cutSize: new Position(1, 1) }),4, Drama.OakNormal);
        var e1=new Event
        (
            new Rectangle(new Position(13, 4),new Position(14, 4)),
            new Plot("OakFightWithPika",[
                new Paragraph("等等..."),
                new AddNpc(oak),
                new MoveChar({character:oak,to:new Position(13,4),from:new Position(14,9)}),
                new Paragraph("大木博士:『真是危險，"),
                new Paragraph("野生的寶可夢會從草叢裡跳出來的』"),
                new Paragraph("大木博士:『像這種草叢，"),
                new Paragraph("甚麼時候跳出寶可夢也不EY。"),
                new Paragraph("如果你有寶可夢的話可以與他戰鬥』"),
                new Paragraph("大木博士:『對了跟我去研究所吧』"),
                new MoveChar({character:oak,from:new Position(13,4),to:new Position(12,9)}),
                new RemoveNpc(oak),
                new Script(()=>mainChar.storyLineIndex=1),
                new MoveChar({character:mainChar,to:new Position(15,13)}),
            ])
            ,()=>mainChar.storyLineIndex===0
        )
        this.events.push(e1);
    }
    initGates()
    {
        var GS = GameSystem;
        var CS = GS.Classes;
        var newConnectionItem=(map1,x1,y1,map2,x2,y2)=>new CS.Connection(new CS.MapPosition(map1,new CS.Position(x1,y1)),new CS.MapPosition(map2,new  CS.Position(x2, y2)));
        var pushItem=(map1,x1,y1,map2,x2,y2)=>this.gates.push(newConnectionItem(map1,x1,y1,map2,x2,y2));
        pushItem("palletTown",8,7,"protagonistHome1F",3,7);
        pushItem("palletTown",13, 3,"route01",10, 39,);
        pushItem( "palletTown",14, 3, "route01",11, 39);
        pushItem( "palletTown",16, 7,"palletTownHouse1", 3, 7);
        pushItem( "doctorsHome",5, 11,"palletTown",15, 13);
    }
    initSubLevels()
    {
        let protagonistHome1F=new GameSystem.Classes.Levels.ProtagonistHome1F();
        let protagonistHome2F=new GameSystem.Classes.Levels.ProtagonistHome2F();
        let palletTownHouse1=new GameSystem.Classes.Levels.PalletTownHouse1();
        let doctorsHome=new GameSystem.Classes.Levels.DoctorsHome();
        this.subLevels.push(protagonistHome1F);
        this.subLevels.push(protagonistHome2F);
        this.subLevels.push(palletTownHouse1);
        this.subLevels.push(doctorsHome);
        for(let level of this.subLevels)
            level.parentLevel=this;
        Framework.Game.addNewLevel({"protagonistHome1F":protagonistHome1F});
        Framework.Game.addNewLevel({"protagonistHome2F":protagonistHome2F});
        Framework.Game.addNewLevel({"palletTownHouse1":palletTownHouse1});
        Framework.Game.addNewLevel({"doctorsHome":doctorsHome});
    }
    initObstacles()
    {
        var GS = GameSystem;
        var CS = GS.Classes;
        var KM = GS.Manager.Key;
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 0 }, { x: 12, y: 3 }));
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 4 }, { x: 3, y: 23 }));
        this.obstacles.push(new CS.Rectangle({ x: 7, y: 16 }, { x: 10, y: 23 }));
        this.obstacles.push(new CS.Rectangle({ x: 4, y: 19 }, { x: 4, y: 19 }));
        this.obstacles.push(new CS.Rectangle({ x: 4, y: 20 }, { x: 6, y: 23 }));
        this.obstacles.push(new CS.Rectangle({ x: 11, y: 19 }, { x: 21, y: 23 }));
        this.obstacles.push(new CS.Rectangle({ x: 22, y: 0 }, { x: 26, y: 23 }));
        this.obstacles.push(new CS.Rectangle({ x: 15, y: 0 }, { x: 21, y: 3 }));
        this.obstacles.push(new CS.Rectangle({ x: 13, y: 0 }, { x: 14, y: 2 }));
        this.obstacles.push(new CS.Rectangle({ x: 13, y: 10 }, { x: 18, y: 13 }));
        this.obstacles.push(new CS.Rectangle({ x: 13, y: 15 }, { x: 18, y: 15 }));
        this.obstacles.push(new CS.Rectangle({ x: 7, y: 11 }, { x: 10, y: 11 }));
        this.obstacles.push(new CS.Rectangle({ x: 7, y: 5 }, { x: 10, y: 7 }));
        this.obstacles.push(new CS.Rectangle({ x: 6, y: 7 }, { x: 6, y: 7 }));
        this.obstacles.push(new CS.Rectangle({ x: 14, y: 7 }, { x: 14, y: 7 }));
        this.obstacles.push(new CS.Rectangle({ x: 6, y: 7 }, { x: 6, y: 7 }));
        this.obstacles.push(new CS.Rectangle({ x: 15, y: 5 }, { x: 18, y: 7 }));
    }
    initNpcs()
    {
        var GS = GameSystem, CS = GS.Classes, Image = CS.Image, Position = CS.Position, NPC = CS.NPC, Drama = GameSystem.Resource.Drama.PalletTown, Item = CS.AnimationItem;
        this.npcs.push(
            new NPC(
                "girl1",
                CS.Character.Face.Up,
                new Position(5, 8),
                new CS.Image(define.characterImagePath + "girl1.png", { cutStartPosition: new Position(0, 0), cutSize: new Position(1, 1) }),
                10,
                Drama.Girl1,
                true
            )
        );
        this.npcs.push(
            new NPC(
                "fatty",
                CS.Character.Face.Down,
                new Position(12, 15),
                new Image(define.characterImagePath + "fatty.png", { cutStartPosition: new Position(0, 0), cutSize: new Position(1, 1) }),
                10,
                Drama.Fatty,
                true
            )
        );
    }
    initSignBoards() {
        let SignBoard = GameSystem.Classes.SignBoard;
        let Position = GameSystem.Classes.Position;
        let Polt = GameSystem.Classes.Polt;
        let Paragraph = GameSystem.Classes.Paragraph;
        let Drama = GameSystem.Resource.Drama.PalletTown;
        this.signBoards.push(new SignBoard({ position: new Position(10, 11), content: Drama.WelcomeSign }));
        this.signBoards.push(new SignBoard({ position: new Position(6, 7), content: Drama.ProtagonisHomeSign }));
        this.signBoards.push(new SignBoard({ position: new Position(14, 7), content: Drama.RivalHomeSign }));
        this.signBoards.push(new SignBoard({ position: new Position(16, 15), content: Drama.OakHomeSign }));
    }
    load() {
        super.load();
        var GS = GameSystem;
        var CS = GS.Classes;
        this.music.play();
        this.map=new Framework.Scene();
        this.mapImage = new CS.Image(define.imagePath + 'palletTown.png');
        this.map.attach(this.mapImage);
        this.rootScene.attach(this.map);
        this.loadNPCs();
        this.map.x = GS.protagonist._screenPosition.toPoint().x - GS.protagonist.position.toPoint().x;
        this.map.y = GS.protagonist._screenPosition.toPoint().y - GS.protagonist.position.toPoint().y;
        this.rootScene.attach(GS.protagonist.image);
        GS.protagonist.position=GS.protagonist.position;
    }
}
/**
 * 主角家一樓
 * @class ProtagonistHome1F
 * @extends Level
 */
GameSystem.Classes.Levels.ProtagonistHome1F=
class ProtagonistHome1F extends GameSystem.Classes.Level {
    constructor() {
        let CS = GameSystem.Classes;
        super(new CS.Position(7, 7), 'palletTownHome1F');
        this.size.pos1=new CS.Position(0, 1);
        this.isSubLevel = true;
        this.music= Load.audio( define.musicPath+"background/102 Palette Town Theme.mp3");
        this.music.loop=true;
    }
    initGates()
    {
        let CS = GameSystem.Classes;
        this.gates.push(new CS.Connection
            (
            new CS.MapPosition
                (
                "protagonistHome2F",
                new CS.Position(7, 1)
                ),
            new CS.MapPosition
                (
                "protagonistHome1F",
                new CS.Position(7, 1)
                )
            ));
        this.gates.push(new CS.Connection
            (
                new CS.MapPosition
                (
                "palletTown",
                new CS.Position(8,7)
                ),
                new CS.MapPosition
                (
                "protagonistHome1F",
                new CS.Position(3, 7)
                )
            ));
        this.gates.push(new CS.Connection
            (
                new CS.MapPosition
                (
                "palletTown",
                new CS.Position(8,7)
                ),
                new CS.MapPosition
                (
                "protagonistHome1F",
                new CS.Position(2, 7)
                )
            ));
    }
    initObstacles()
    {
        var GS = GameSystem;
        var CS = GS.Classes;
        this.obstacles.push(new CS.Rectangle({ x: 3, y: 4 }, { x: 4, y: 5 }));
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 1 }, { x: 1, y: 1 }));
        this.obstacles.push(new CS.Rectangle({ x: 3, y: 1 }, { x: 3, y: 1 }));
    }
    initSignBoards()
    {
        var GS = GameSystem, CS = GS.Classes;
        var SignBoard = CS.SignBoard, Position = CS.Position, Polt = CS.Polt, Paragraph = CS.Paragraph,Drama = GS.Resource.Drama.PalletTown;
        this.signBoards.push(new SignBoard({ position: new Position(0, 1), content: Drama.Bookshelf }));
        this.signBoards.push(new SignBoard({ position: new Position(1, 1), content: Drama.Bookshelf }));
        this.signBoards.push(new SignBoard({ position: new Position(3, 1), content: Drama.TV }));
    }
    initNpcs()
    {
        var NPC=GameSystem.Classes.NPC,Position=GameSystem.Classes.Position;
        var Item=GameSystem.Classes.AnimationItem;
        let mom=new NPC("Mother",GameSystem.Classes.Character.Face.Left,new Position(5,4),new GameSystem.Classes.Image(define.characterImagePath+"mom.png",{cutSize:new Position(1,1),cutStartPosition:new Position(2,0)}),undefined,GameSystem.Resource.Drama.PalletTown.Mother);
        this.npcs.push(mom);
        mom.initializeAnimationLists4PbySrc();
        mom.facing=GameSystem.Classes.Character.Face.Left;
    }
    load()
    {
        super.load();
        this.music.play();
        var CS=GameSystem.Classes;
        var GS=GameSystem;
        this.mapImage=new CS.Image(define.imagePath+"palletTownHome1F.png");
        this.map=new Framework.Scene();
        this.map.x = GS.protagonist._screenPosition.toPoint().x - GS.protagonist.position.toPoint().x;
        this.map.y = GS.protagonist._screenPosition.toPoint().y - GS.protagonist.position.toPoint().y;
        this.map.attach(this.mapImage);
        this.walker=new CS.MapWalker({ mapRef: this.map });
        this.rootScene.attach(this.map);
        this.loadNPCs();
        this.rootScene.attach(GS.protagonist.image);
    }
}
/**
 * 主角家二樓
 * @class ProtagonistHome2F
 * @extends Level
 */
GameSystem.Classes.Levels.ProtagonistHome2F=
class ProtagonistHome2F extends GameSystem.Classes.Level {
    constructor() {
        let CS = GameSystem.Classes;
        super(new CS.Position(7, 7), 'palletTownHome2F');
        this.size.pos1=new CS.Position(0, 1);
        this.isSubLevel = true;
    }
    initGates() {
        var CS = GameSystem.Classes;
        this.gates.push(new CS.Connection
            (new CS.MapPosition
                (
                "protagonistHome2F",
                new CS.Position(7, 1)
                ),
            new CS.MapPosition
                (
                "protagonistHome1F",
                new CS.Position(7, 1)
                )
            ));
    }
    initSignBoards() {
        var GS = GameSystem, CS = GS.Classes;
        var SignBoard = CS.SignBoard, Position = CS.Position, Polt = CS.Polt, Paragraph = CS.Paragraph, Drama = GS.Resource.Drama.PalletTown;
        this.signBoards.push(new SignBoard({ position: new Position(0, 7), content: Drama.PronBooks }));
    }
    initObstacles()
    {
        var GS = GameSystem;
        var CS = GS.Classes;
        this.obstacles.push(new CS.Rectangle({ x: 6, y: 6 }, { x: 6, y: 7 }));
        this.obstacles.push(new CS.Rectangle({ x: 3, y: 4 }, { x: 3, y: 5 }));
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 1 }, { x: 2, y: 1 }));
    }
    load()
    {
        super.load();
        this.music= Load.audio( define.musicPath+"background/102 Palette Town Theme.mp3");
        this.music.loop=true;
        this.music.autoplay=true;
        var CS=GameSystem.Classes;
        var GS=GameSystem;
        this.mapImage=new CS.Image(define.imagePath+"palletTownHome2F.png");
        this.map=new Framework.Scene;
        this.map.x = GS.protagonist._screenPosition.toPoint().x - GS.protagonist.position.toPoint().x;
        this.map.y = GS.protagonist._screenPosition.toPoint().y - GS.protagonist.position.toPoint().y;
        this.map.attach(this.mapImage);
        this.walker=new CS.MapWalker({mapRef:this.map});
        this.rootScene.attach(this.map);
        this.rootScene.attach(GS.protagonist.image);
    }
}
/**
 * 對手家
 * @class PalletTownHouse1
 * @extends Level
 */
GameSystem.Classes.Levels.PalletTownHouse1=
class PalletTownHouse1 extends GameSystem.Classes.Level {
    constructor() {
        let CS = GameSystem.Classes;
        super(new CS.Position(7, 7), 'palletTownHouse1');
        this.size.pos1=new CS.Position(0, 1);
        this.isSubLevel = true;
        this.music= Load.audio( define.musicPath+"background/102 Palette Town Theme.mp3");
        this.music.loop=true;
    }
    initNpcs() {
        var GS = GameSystem, CS = GS.Classes, Image = CS.Image, Position = CS.Position, NPC = CS.NPC, Drama = GameSystem.Resource.Drama.PalletTown, Item = CS.AnimationItem;
        this.npcs.push(
            new NPC(
                "sister",
                CS.Character.Face.Right,
                new Position(2, 3),
                new Image(define.characterImagePath + "rivalsSister.png", { cutStartPosition: new Position(3, 0), cutSize: new Position(1, 1) }),
                undefined,
                [Drama.RivalsSisterMap,Drama.RivalsSister]
            )
        );
    }
    initGates()
    {
        let CS = GameSystem.Classes;
        this.gates.push(new CS.Connection
            (
            new CS.MapPosition
                (
                "palletTownHouse1",
                new CS.Position(3, 7)
                ),
            new CS.MapPosition
                (
                "palletTown",
                new CS.Position(16, 7)
                )
            ));
            this.gates.push(new CS.Connection
                (
                new CS.MapPosition
                    (
                    "palletTownHouse1",
                    new CS.Position(2, 7)
                    ),
                new CS.MapPosition
                    (
                    "palletTown",
                    new CS.Position(16, 7)
                    )
                ));
    }
    initObstacles()
    {
        var GS = GameSystem;
        var CS = GS.Classes;
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 1 }, { x: 1, y: 1 }));
        this.obstacles.push(new CS.Rectangle({ x: 3, y: 3 }, { x: 4, y: 4 }));
        this.obstacles.push(new CS.Rectangle({ x: 7, y: 1 }, { x: 7, y: 1 }));
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 6 }, { x: 0, y: 7 }));
        this.obstacles.push(new CS.Rectangle({ x: 7, y: 6 }, { x: 7, y: 7 }));
     }
    load()
    {
        super.load();
        this.music.play();
        var CS=GameSystem.Classes;
        var KM=GameSystem.Manager.Key;
        var GS=GameSystem;
        this.keyInput=this.normalKeyInput;
        KM.keyInput=(e)=>{this.keyInput(e);}
        this.map=new Framework.Scene;
        this.mapImage=new CS.Image(define.imagePath+"palletTownHouse1.png");
        this.walker=new CS.MapWalker({ mapRef: this.map });
        this.map.x = GS.protagonist._screenPosition.toPoint().x - GS.protagonist.position.toPoint().x;
        this.map.y = GS.protagonist._screenPosition.toPoint().y - GS.protagonist.position.toPoint().y;
        this.map.attach(this.mapImage);
        this.rootScene.attach(this.map);
        this.loadNPCs();
        this.rootScene.attach(GS.protagonist.image);
    }
    loadNPCs() {
        for (let npc of this.npcs)
            if (npc.image) {
                this.map.attach(npc.image);
                npc.updateImagePosition();
            }
    }
}
/**
 * 博士研究所
 * @class DoctorsHome
 * @extends Level
 */
GameSystem.Classes.Levels.DoctorsHome=
class DoctorsHome extends GameSystem.Classes.Level {
    constructor() {
        let CS = GameSystem.Classes;
        super(new CS.Position(9, 11), 'palletTownDoctorsHome');
        this.size.pos1=new CS.Position(0, 1);
        this.isSubLevel = true;
        this.music= Load.audio( define.musicPath+"background/102 Palette Town Theme.mp3");
        this.music.loop=true;
        this.reviveMapPosition=new GameSystem.Classes.MapPosition("palletTown",new GameSystem.Classes.Position(8,8));
    }
    initGates()
    {
        let CS = GameSystem.Classes;
        this.gates.push(new CS.Connection
            (
            new CS.MapPosition
                (
                "doctorsHome",
                new CS.Position(4, 11)
                ),
            new CS.MapPosition
                (
                "palletTown",
                new CS.Position(15, 13)
                )
            ));
        this.gates.push(new CS.Connection
            (
            new CS.MapPosition
                (
                "doctorsHome",
                new CS.Position(5, 11)
                ),
            new CS.MapPosition
                (
                    "palletTown",
                    new CS.Position(15, 13)
                )
            ));
    }
    initEvents()
    {
        var GS=GameSystem,CS=GS.Classes,GR=GS.Resource,Position=CS.Position,Rectangle=CS.Rectangle,PC=CS.PlotContents, NPC=CS.NPC, Image=CS.Image ;
        var Drama=GR.Drama,Plot=CS.Plot,Paragraph=CS.Paragraph,CureAll=PC.CureAll,Script=PC.Script,GiveProp=PC.GiveProp,MoveCharacter=PC.MoveCharacter,Event=CS.Event,AddNpc=PC.AddNpc,RemoveNpc=PC.RemoveNpc,Fight=PC.Fight;
        var Event=CS.Event, Plot=CS.Plot, Position=CS.Position, MoveChar=PC.MoveCharacter,mainChar=GS.protagonist;
        var e1=new Event
        (
            new Rectangle(new Position(5, 2),new Position(5,2)) ,
            new Plot("OakGivePokemon",
                [
                    new Script(()=>{GS.rival.facing="Up";GS.rival.position=new Position(4,2);GS.rival.updateImagePosition();}),
                    new Paragraph("$RIVAL_NAME:『爺爺，道路接通了』"),
                    new Paragraph("大木博士:『$RIVAL_NAME你來拉?』"),
                    new Paragraph("我不是叫你稍後再來嗎…既然來拉"),
                    new Paragraph("那就再等一下吧！』"),
                    new Paragraph("喔～！$MY_NAME給你一個寶可夢吧"),
                    new Paragraph("就在這麼寶可夢球裡面有著一隻寶可夢"),
                    new Paragraph("拿去吧～！』"),
                    new Paragraph("$RIVAL_NAME:『阿～！阿～！偏心！爺爺我也要！』"),
                    new Paragraph("大木博士:『唉呦！$RIVAL_NAME急甚麼！我等一下"),
                    new Paragraph("也會給你的』"),
                    new Paragraph("$RIVAL_NAME:『不管！是我的』"),
                    new Paragraph("恭喜$MY_NAME的寶可夢球被搶走了"),
                    new Paragraph("大木博士:『畏！$RIVAL_NAME死因仔！你在做啥』"),
                    new Paragraph("$RIVAL_NAME:『爺爺！人家就是想要這個嘛！』"),
                    new Paragraph("大木博士:『真拿你沒辦法！好吧那個就給你"),
                    new Paragraph("反正是早晚的事，$MY_NAME這是另一隻我剛剛隨便抓的"),
                    new Paragraph("和人(kirito)還不是那麼親近"),
                    new Paragraph("$MY_NAME得到了皮卡丘"),
                    new Script(()=>mainChar.storyLineIndex=2),
                ]),
            ()=>mainChar.storyLineIndex===1
        )
        this.events.push(e1);
        var e2=new Event
        (
            new Rectangle(new Position(5, 6),new Position(4, 6)),
            new Plot("RivalFirstFight",[
                new Paragraph("$RIVAL_NAME:『等等！$MY_NAME好不容易從爺爺手中"),
                new Paragraph("得到寶可夢…就當我的對手練習練習吧♥』"),
                new MoveChar({character:GS.rival,to:new Position(4,6)}),
                new RemoveNpc(GS.rival),
                new Script(()=>mainChar.storyLineIndex=3),
                new Fight(GS.rival),
            ]),()=>mainChar.storyLineIndex===2);
        this.events.push(e2);
    }
    initObstacles()
    {
        var GS = GameSystem;
        var CS = GS.Classes;
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 1 }, { x: 3, y: 1 }));
        this.obstacles.push(new CS.Rectangle({ x: 6, y: 1 }, { x: 9, y: 1 }));
        this.obstacles.push(new CS.Rectangle({ x: 6, y: 3 }, { x: 9, y: 3 }));
        this.obstacles.push(new CS.Rectangle({ x: 6, y: 6 }, { x: 9, y: 7 }));
        this.obstacles.push(new CS.Rectangle({ x: 7, y: 6 }, { x: 7, y: 7 }));
        this.obstacles.push(new CS.Rectangle({ x: 3, y: 6 }, { x: 0, y: 7 }));
    }
    initNpcs() {
        var GS = GameSystem, CS = GS.Classes, Image = CS.Image, Position = CS.Position, NPC = CS.NPC, Drama = GameSystem.Resource.Drama.PalletTown, Item = CS.AnimationItem,mainChar=GS.protagonist;
        this.npcs.push(
            new NPC(
                "doctorOak",
                CS.Character.Face.Down,
                new Position(5, 1),
                new Image(define.characterImagePath + "oak.png", { cutStartPosition: new Position(1, 0), cutSize: new Position(1, 1) }),
                undefined,
                Drama.OakNormal
            )
        );
    }
    load()
    {
        var CS=GameSystem.Classes;
        var GS=GameSystem,mainChar=GS.protagonist,Position=CS.Position;
        if(mainChar.storyLineIndex===1||mainChar.storyLineIndex===2)
            if(!this.npcs.find(npc=>npc===GS.rival))
            {
                GS.rival.position=new Position(4,2);
                this.npcs.push(GS.rival)
            }
        super.load();
        this.music.play();
        this.mapImage=new CS.Image(define.imagePath+"palletTownDoctorsHome.png");
        this.map=new Framework.Scene;
        this.map.x = GS.protagonist._screenPosition.toPoint().x - GS.protagonist.position.toPoint().x;
        this.map.y = GS.protagonist._screenPosition.toPoint().y - GS.protagonist.position.toPoint().y;
        this.map.attach(this.mapImage);
        this.rootScene.attach(this.map);
        this.walker=new CS.MapWalker({ mapRef: this.map });
        this.loadNPCs();
        this.rootScene.attach(GS.protagonist.image);
    }
    loadNPCs() {
        for (let npc of this.npcs)
            if (npc.image) {
                this.map.attach(npc.image);
                npc.updateImagePosition();
            }
    }
}