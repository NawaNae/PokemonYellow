class PalletTown extends GameSystem.Classes.Level {
    constructor(size, name) {
        super(size, name);
        var GS = GameSystem;
        var CS = GS.Classes;
        var KM = GS.Manager.Key;
        this.initObstacles();
        this.initSubLevels();
        this.initGates();
        //this.counter.fpsCount = true;
       
        this.keyInput = (e) => {
            this.normalKeyInput(e);
        };
    }
    initGates()
    {
        var GS = GameSystem;
        var CS = GS.Classes;
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
                new  CS.Position(3, 7)
                )
            ));
        this.gates.push(new CS.Connection
            (
            new CS.MapPosition
                (
                "palletTown",
                new CS.Position(13, 3)
                ),
            new CS.MapPosition
                (
                "route01",
                new CS.Position(10, 39)
                )
            ));
        this.gates.push(new CS.Connection
            (
            new CS.MapPosition
                (
                "palletTown",
                new CS.Position(14, 3)
                ),
            new CS.MapPosition
                (
                "route01",
                new CS.Position(11, 39)
                )
            ));
            this.gates.push(new CS.Connection
                (
                new CS.MapPosition
                    (
                    "palletTown",
                    new CS.Position(16, 7)
                    ),
                new CS.MapPosition
                    (
                    "palletTownHouse1",
                    new CS.Position(3, 7)
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
        {
            level.parentLevel=this;
        }
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
    load() {
        super.load();
        var GS = GameSystem;
        var CS = GS.Classes;
        var KM = GS.Manager.Key;
        this.music= Load.audio( define.musicPath+"background/102 Palette Town Theme.mp3");
        this.music.loop=true;
        this.music.autoplay=false;
        //GS.Manager.Key.keyInput = this.keyInput;
        this.map = new CS.Image(define.imagePath + 'palletTown.png');
        this.rootScene.attach(this.map);
        this.loadNPCs();
        this.loadSignBoard();
        this.map.x = GS.protagonist._screenPosition.toPoint().x - GS.protagonist.position.toPoint().x;
        this.map.y = GS.protagonist._screenPosition.toPoint().y - GS.protagonist.position.toPoint().y;
        this.walker = new CS.MapWalker({ mapRef: this.map });
        this.rootScene.attach(GS.protagonist.image);
    }
    loadSignBoard()
    {
        let SignBoard=GameSystem.Classes.SignBoard;
        let Position=GameSystem.Classes.Position;
        let Polt=GameSystem.Classes.Polt;
        let Paragraph=GameSystem.Classes.Paragraph;
        let Drama=GameSystem.Resource.Drama.PalletTown;
        this.signBoards=[];
        this.signBoards.push(new SignBoard({position:new Position(10,11),content: Drama.WelcomeSign}));
    }
    loadNPCs()
    {
        var GS = GameSystem;
        var CS = GS.Classes;
        this.npcs=[];
        this.npcs.push(
            new CS.NPC("TestNPC", 
                                       CS.Character.Face.Up,
                                       new CS.Position(6, 7),
                                       new CS.Image(define.imagePath+"null.png"),
                                       undefined,
                                       GS.Resource.PlotExample  ));
        
                                       this.npcs.push(
            new CS.NPC(
                "CHTestNPC",
                CS.Character.Face.Up,
                new CS.Position(14, 7),
                new CS.Image(define.imagePath+"null.png"),
                undefined,
                new CS.Plot(
                    "TestCH", 
                    [
                        new CS.Paragraph("中文測試\n你好香蕉"),
                        new CS.Paragraph("長文測試\n約60000字\n"),
                    ]
                )
            )
        );
        this.npcs.push(
            new CS.NPC(
                "drawTestNPC",
                CS.Character.Face.Up,
                new CS.Position(14, 8),
                new CS.Image(define.imagePath+"Protagonist.png",{cutStartPosition:{x:0,y:0},cutSize:{x:16,y:16}}),
                undefined,
                new CS.Plot(
                    "TestCH", 
                    [
                        new CS.Paragraph("我才是主人公"),
                    ]
                )
            )
        );
        let rotateNPC=new CS.NPC(
            "drawTestNPC",
            CS.Character.Face.Up,
            new CS.Position(12, 8),
            new CS.Image(define.imagePath+"Protagonist.png",{cutStartPosition:{x:0,y:0},cutSize:{x:16,y:16}}),
            undefined,
            new CS.Plot(
                "TestCH", 
                [
                    new CS.Paragraph("旋轉 跳躍 我不停歇"),
                    new CS.Paragraph("對了 我是主人公拉"),
                ]
            )
        )
        let Item=CS.AnimationItem;
        let Position=CS.Position;
        rotateNPC.animationLists.Up.push(new Item(
            define.imagePath+"Protagonist.png",
            {
                group:"Up",
                cutStartPosition:new Position(1,0),
                cutSize:new Position(1,1)
            }
        ));
        rotateNPC.animationLists.Up.push(new Item(
            define.imagePath+"Protagonist.png",
            {
                group:"Up",
                cutStartPosition:new Position(6,0),
                cutSize:new Position(1,1)
            }
        ));
        rotateNPC.animationLists.Up.push(new Item(
            define.imagePath+"Protagonist.png",
            {
                group:"Up",
                cutStartPosition:new Position(7,0),
                cutSize:new Position(1,1)
            }
        ));
        rotateNPC.animationLists.Down.push(new Item(
            define.imagePath+"Protagonist.png",
            {
                group:"Down",
                cutStartPosition:new Position(0,0),
                cutSize:new Position(1,1)
            }
        ));
        rotateNPC.animationLists.Down.push(new Item(
            define.imagePath+"Protagonist.png",
            {
                group:"Down",
                cutStartPosition:new Position(4,0),
                cutSize:new Position(1,1)
            }
        ));
        rotateNPC.animationLists.Down.push(new Item(
            define.imagePath+"Protagonist.png",
            {
                group:"Down",
                cutStartPosition:new Position(5,0),
                cutSize:new Position(1,1)
            }
        ));
        rotateNPC.animationLists.Left.push(new Item(
            define.imagePath+"Protagonist.png",
            {
                group:"Left",
                cutStartPosition:new Position(2,0),
                cutSize:new Position(1,1)
            }
        ));
        rotateNPC.animationLists.Left.push(new Item(
            define.imagePath+"Protagonist.png",
            {
                group:"Left",
                cutStartPosition:new Position(8,0),
                cutSize:new Position(1,1)
            }
        ));
        rotateNPC.animationLists.Right.push(new Item(
            define.imagePath+"Protagonist.png",
            {
                group:"Right",
                cutStartPosition:new Position(3,0),
                cutSize:new Position(1,1)
            }
        ));
        rotateNPC.animationLists.Right.push(new Item(
            define.imagePath+"Protagonist.png",
            {
                group:"Right",
                cutStartPosition:new Position(9,0),
                cutSize:new Position(1,1)
            }
        ));
        rotateNPC.i=0;
        rotateNPC.faceMapping=
        [
            "Up",
            "Right",
            "Down",
            "Left"
        ]

        rotateNPC.update=function()
        {

            if((i%60)==0)
            {   
                this.facing=this.faceMapping[i/60];
                this.move(this.facing);
                this.updateImagePosition();
                //console.log(this.position);
            };
            i++;
            i%=240;
        }
        this.npcs.push(rotateNPC);
        for(let npc of this.npcs)
        {
            if(npc.image)
            {
                this.rootScene.attach(npc.image);
            }
        }
    }
}
class ProtagonistHome1F extends GameSystem.Classes.Level {
    constructor() {
        let CS = GameSystem.Classes;
        super(new CS.Position(7, 7), 'palletTownHome1F');
        this.size.pos1=new CS.Position(0, 1);
        this.isSubLevel = true;
        this.initObstacles();
        this.initGates();
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
    load()
    {
        super.load();
        this.music= Load.audio( define.musicPath+"background/102 Palette Town Theme.mp3");
        this.music.loop=true;
        this.music.autoplay=true;
        var CS=GameSystem.Classes;
        var GS=GameSystem;
        this.map=new CS.Image(define.imagePath+"palletTownHome1F.png");
        this.walker=new CS.MapWalker({ mapRef: this.map });
        this.map.x = GS.protagonist._screenPosition.toPoint().x - GS.protagonist.position.toPoint().x;
        this.map.y = GS.protagonist._screenPosition.toPoint().y - GS.protagonist.position.toPoint().y;
        this.rootScene.attach(this.map);
        this.rootScene.attach(GS.protagonist.image);
    }
  
}
class ProtagonistHome2F extends GameSystem.Classes.Level {
    constructor() {
        let CS = GameSystem.Classes;
        super(new CS.Position(7, 7), 'palletTownHome2F');
        this.size.pos1=new CS.Position(0, 1);
        this.isSubLevel = true;
        this.initObstacles();
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
        this.map=new CS.Image(define.imagePath+"palletTownHome2F.png");
        this.map.x = GS.protagonist._screenPosition.toPoint().x - GS.protagonist.position.toPoint().x;
        this.map.y = GS.protagonist._screenPosition.toPoint().y - GS.protagonist.position.toPoint().y;
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
        this.initObstacles();
        this.initGates();
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
        this.music.loop=true;
        this.music.autoplay=true;
        var CS=GameSystem.Classes;
        var KM=GameSystem.Manager.Key;
        var GS=GameSystem;
        this.keyInput=this.normalKeyInput;
        KM.keyInput=(e)=>{this.keyInput(e);}
       
        this.map=new CS.Image(define.imagePath+"palletTownHouse1.png");
        this.walker=new CS.MapWalker({ mapRef: this.map });
        this.map.x = GS.protagonist._screenPosition.toPoint().x - GS.protagonist.position.toPoint().x;
        this.map.y = GS.protagonist._screenPosition.toPoint().y - GS.protagonist.position.toPoint().y;
        this.rootScene.attach(this.map);
        this.rootScene.attach(GS.protagonist.image);
    }
}
class DoctorsHome extends GameSystem.Classes.Level {
    constructor() {
        let CS = GameSystem.Classes;
        super(new CS.Position(9, 11), 'palletTownDoctorsHome');
        this.size.pos1=new CS.Position(0, 1);
        this.isSubLevel = true;
        this.initObstacles();
        this.initGates();
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
    load()
    {
        super.load();
        this.music= Load.audio( define.musicPath+"background/102 Palette Town Theme.mp3");
        this.music.loop=true;
        this.music.autoplay=true;
        var CS=GameSystem.Classes;
        var GS=GameSystem;
        this.map=new CS.Image(define.imagePath+"palletTownDoctorsHome.png");
        this.walker=new CS.MapWalker({ mapRef: this.map });
        this.map.x = GS.protagonist._screenPosition.toPoint().x - GS.protagonist.position.toPoint().x;
        this.map.y = GS.protagonist._screenPosition.toPoint().y - GS.protagonist.position.toPoint().y;
        this.rootScene.attach(this.map);
        this.rootScene.attach(GS.protagonist.image);
    }
}