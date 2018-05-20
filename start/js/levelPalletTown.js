class PalletTown extends GameSystem.Classes.Level {
    initEvents()
    {
        var GS=GameSystem,CS=GS.Classes,GR=GS.Resource,Position=CS.Position,Rectangle=CS.Rectangle,PC=CS.PlotContents, NPC=CS.NPC, Image=CS.Image ;
        var Drama=GR.Drama,Plot=CS.Plot,Paragraph=CS.Paragraph,CureAll=PC.CureAll,Script=PC.Script,GiveProp=PC.GiveProp,MoveCharacter=PC.MoveCharacter,Event=CS.Event,AddNpc=PC.AddNpc,RemoveNpc=PC.RemoveNpc;
        var Event=CS.Event, Plot=CS.Plot, Position=CS.Position, MoveChar=PC.MoveCharacter;
        var e0=new Event(new Position(12,10),()=>{for(let i=0;i<this.npcs.length;i++)this.npcs[i].moveTo(GameSystem.protagonist.position)});
        this.events.push(e0);
        var oak=new NPC("doctorOak",CS.Character.Face.Down,new Position(14, 9),new Image(define.characterImagePath + "oak.png", { cutStartPosition: new Position(1, 0), cutSize: new Position(1, 1) }),4, Drama.OakNormal);
        
        var e1=new Event
        (
            new Rectangle(new Position(13, 4),new Position(14, 4)),
            new Plot("OakFightWithPika",[
                new AddNpc(oak),
                new MoveChar({character:oak,to:new Position(13,4),from:new Position(14,9)}),
                new Paragraph("hen危險"),
                new RemoveNpc(oak)
            ])
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
        let protagonistHome1F=new ProtagonistHome1F();
        let protagonistHome2F=new ProtagonistHome2F();
        let palletTownHouse1=new PalletTownHouse1();
        let doctorsHome=new DoctorsHome();
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
        var KM = GS.Manager.Key;
        this.music= Load.audio( define.musicPath+"background/102 Palette Town Theme.mp3");
        this.music.loop=true;
        this.music.autoplay=false;
        this.map=new Framework.Scene();
        this.mapImage = new CS.Image(define.imagePath + 'palletTown.png');
        this.map.attach(this.mapImage);
        this.rootScene.attach(this.map);
        this.loadNPCs();
        this.map.x = GS.protagonist._screenPosition.toPoint().x - GS.protagonist.position.toPoint().x;
        this.map.y = GS.protagonist._screenPosition.toPoint().y - GS.protagonist.position.toPoint().y;

        this.walker = new CS.MapWalker({ mapRef: this.map });
        this.rootScene.attach(GS.protagonist.image);
        GS.protagonist.position=GS.protagonist.position;
    }
    loadNPCs()
    {
        for(let npc of this.npcs)
            if(npc.image)
            {
                this.map.attach(npc.image);
                npc.updateImagePosition();            
            }
    }
}
class ProtagonistHome1F extends GameSystem.Classes.Level {
    constructor() {
        let CS = GameSystem.Classes;
        super(new CS.Position(7, 7), 'palletTownHome1F');
        this.size.pos1=new CS.Position(0, 1);
        this.isSubLevel = true;
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
    loadNPCs()
    {
        for(let npc of this.npcs)
            if(npc.image)
{                this.map.attach(npc.image);
            npc.updateImagePosition();            
}
    }
    load()
    {
        super.load();
        this.music= Load.audio( define.musicPath+"background/102 Palette Town Theme.mp3");
       /* this.music.loop=true;
        this.music.autoplay=true;*/
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
class PalletTownHouse1 extends GameSystem.Classes.Level {
    constructor() {
        let CS = GameSystem.Classes;
        super(new CS.Position(7, 7), 'palletTownHouse1');
        this.size.pos1=new CS.Position(0, 1);
        this.isSubLevel = true;
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
        this.music= Load.audio( define.musicPath+"background/102 Palette Town Theme.mp3");
       /* this.music.loop=true;
        this.music.autoplay=true;*/
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
class DoctorsHome extends GameSystem.Classes.Level {
    constructor() {
        let CS = GameSystem.Classes;
        super(new CS.Position(9, 11), 'palletTownDoctorsHome');
        this.size.pos1=new CS.Position(0, 1);
        this.isSubLevel = true;

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
    initObstacles()
    {
        var GS = GameSystem;
        var CS = GS.Classes;
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 1 }, { x: 3, y: 1 }));
        this.obstacles.push(new CS.Rectangle({ x: 6, y: 1 }, { x: 9, y: 1 }));
        this.obstacles.push(new CS.Rectangle({ x: 6, y: 3 }, { x: 9, y: 3 }));
        this.obstacles.push(new CS.Rectangle({ x: 6, y: 6 }, { x: 9, y: 7 }));
        this.obstacles.push(new CS.Rectangle({ x: 7, y: 6 }, { x: 7, y: 7 }));
    }
    initNpcs() {
        var GS = GameSystem, CS = GS.Classes, Image = CS.Image, Position = CS.Position, NPC = CS.NPC, Drama = GameSystem.Resource.Drama.PalletTown, Item = CS.AnimationItem;
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
        super.load();
        this.music= Load.audio( define.musicPath+"background/102 Palette Town Theme.mp3");
      /*  this.music.loop=true;
        this.music.autoplay=true;*/
        var CS=GameSystem.Classes;
        var GS=GameSystem;

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