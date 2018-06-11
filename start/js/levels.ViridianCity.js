GameSystem.Classes.Levels=GameSystem.Classes.Levels||{};
GameSystem.Classes.Levels.ViridianCity=
class ViridianCity extends GameSystem.Classes.Level {
    initEvents()
    {
        var GS=GameSystem,CS=GS.Classes,GR=GS.Resource,Position=CS.Position,Rectangle=CS.Rectangle,PC=CS.PlotContents, NPC=CS.NPC, Image=CS.Image ;
        var Drama=GR.Drama,Plot=CS.Plot,Paragraph=CS.Paragraph,CureAll=PC.CureAll,Script=PC.Script,GiveProp=PC.GiveProp,MoveCharacter=PC.MoveCharacter,Event=CS.Event,AddNpc=PC.AddNpc,RemoveNpc=PC.RemoveNpc;
        var Event=CS.Event, Plot=CS.Plot, Position=CS.Position, MoveChar=PC.MoveCharacter;
        var e0=new Event(new Position(12,10),()=>{for(let i=0;i<this.npcs.length;i++)this.npcs[i].moveTo(GameSystem.protagonist.position)});
        this.events.push(e0);
        this.music= Load.audio( define.musicPath+"background/106 The Road To Viridian City From Palette.mp3");
        this.music.loop=true;
        var oak=new NPC("doctorOak",CS.Character.Face.Down,new Position(14, 9),new Image(define.characterImagePath + "oak.png", { cutStartPosition: new Position(1, 0), cutSize: new Position(1, 1) }),4, Drama.OakNormal);
    }
    initGates()
    {
        var GS = GameSystem,CS = GS.Classes;
        var newConnectionItem=(map1,x1,y1,map2,x2,y2)=>new CS.Connection(new CS.MapPosition(map1,new CS.Position(x1,y1)),new CS.MapPosition(map2,new  CS.Position(x2, y2)));
        var pushItem=(map1,x1,y1,map2,x2,y2)=>this.gates.push(newConnectionItem(map1,x1,y1,map2,x2,y2));
        pushItem("route01",10,0,"viridianCity",20,31);
        pushItem("route01",11,0,"viridianCity",21,31);
        pushItem("viridianCityHospital",4,7,"viridianCity",23,25);
        pushItem("viridianCityMart",4,7,"viridianCity",29,19);
    }
    initSubLevels()
    {
        let hospital = new GameSystem.Classes.Levels.ViridianCity.Hospital("viridianCityHospital");
        let mart=new GameSystem.Classes.Levels.ViridianCity.Mart("viridianCityMart");
        this.subLevels.push(hospital);
        this.subLevels.push(mart);
         for(let level of this.subLevels)
             level.parentLevel=this;
         Framework.Game.addNewLevel({"viridianCityHospital":hospital});
         Framework.Game.addNewLevel({"viridianCityMart":mart});
    }
    initObstacles()
    {
        var GS = GameSystem;
        var CS = GS.Classes;
        var KM = GS.Manager.Key;
        /*左下角 */
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 30 }, { x: 3, y: 28 }));
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 27 }, { x: 13, y: 24 }));
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 23 }, { x: 9, y: 23 }));
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 22 }, { x: 8, y: 22 }));
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 21 }, { x: 7, y: 21 }));
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 20 }, { x: 3, y: 18 }));
        /*下方檻 */
        this.obstacles.push(new CS.Rectangle({ x: 14, y: 27 }, { x: 14, y: 27 }));
        this.obstacles.push(new CS.Rectangle({ x: 16, y: 27 }, { x: 18, y: 27 }));
        this.obstacles.push(new CS.Rectangle({ x: 20, y: 27 }, { x: 35, y: 27 }));
        /*Hospital*/
        this.obstacles.push(new CS.Rectangle({ x: 22, y: 25 }, { x: 25, y: 22 }));
        /*Mart */
        this.obstacles.push(new CS.Rectangle({ x: 28, y: 19 }, { x: 31, y: 16 }));
        /*House1 */
        this.obstacles.push(new CS.Rectangle({ x: 20, y: 15 }, { x: 23, y: 14 }));
        /*House2 */
        this.obstacles.push(new CS.Rectangle({ x: 20, y: 9 }, { x: 23, y: 8 }));
        /*GYM */
        this.obstacles.push(new CS.Rectangle({ x: 28, y: 7 }, { x: 33, y: 4 }));
        /*柵欄 */
        this.obstacles.push(new CS.Rectangle({ x: 20, y: 17 }, { x: 23, y: 17 }));
        this.obstacles.push(new CS.Rectangle({ x: 20, y: 13 }, { x: 35, y: 13 }));
        this.obstacles.push(new CS.Rectangle({ x: 24, y: 9 }, { x: 35, y: 9 }));
        this.obstacles.push(new CS.Rectangle({ x: 20, y: 6 }, { x: 20, y: 7 }));
        /*上方樹*/
        this.obstacles.push(new CS.Rectangle({ x: 20, y: 3 }, { x: 23, y: 2 }));
        this.obstacles.push(new CS.Rectangle({ x: 20, y: 1 }, { x: 35, y: 0 }));
        /*左上方 */
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 3 }, { x: 16, y: 0 }));
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 13 }, { x: 5, y: 4 }));
        /*左方樹海 */
        this.obstacles.push(new CS.Rectangle({ x: 7, y: 15 }, { x: 16, y: 6 }));
        this.obstacles.push(new CS.Rectangle({ x: 8, y: 16 }, { x: 15, y: 5 }));
        this.obstacles.push(new CS.Rectangle({ x: 14, y: 4 }, { x: 14, y: 4 }));//小樹
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
    }
    initSignBoards() {
        let SignBoard = GameSystem.Classes.SignBoard;
        let Position = GameSystem.Classes.Position;
        let Polt = GameSystem.Classes.Polt;
        let Paragraph = GameSystem.Classes.Paragraph;
        let Drama = GameSystem.Resource.Drama["Viridian City"];
        this.signBoards.push(new SignBoard({ position: new Position(21, 29), content: Drama.WelcomeSign }));
    }
    load() {
        super.load();
        var GS = GameSystem,CS = GS.Classes, KM = GS.Manager.Key,Position=CS.Position;
        this.music.play();
        this.size.pos1=new CS.Position(0,0);
        this.size.pos2=new CS.Position(35,30);
        this.map=new Framework.Scene();
        this.mapImage = new CS.Image(define.mapImagePath + 'viridianCity/gen1.png',{cutStartPosition:new Position(0,0),cutSize:new Position(39,39)});
        this.map.attach(this.mapImage);
        this.rootScene.attach(this.map);
        this.loadNPCs();
        this.map.x = GS.protagonist._screenPosition.toPoint().x - GS.protagonist.position.toPoint().x;
        this.map.y = GS.protagonist._screenPosition.toPoint().y - GS.protagonist.position.toPoint().y;
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
GameSystem.Classes.Levels.ViridianCity.Hospital=
class Hospital extends GameSystem.Classes.Levels.Hospital {
    initGates()
    {
        var GS = GameSystem,CS = GS.Classes;
        var newConnectionItem=(map1,x1,y1,map2,x2,y2)=>new CS.Connection(new CS.MapPosition(map1,new CS.Position(x1,y1)),new CS.MapPosition(map2,new  CS.Position(x2, y2)));
        var pushItem=(map1,x1,y1,map2,x2,y2)=>this.gates.push(newConnectionItem(map1,x1,y1,map2,x2,y2));
        pushItem("viridianCityHospital",3,7,"viridianCity",23,25);
        pushItem("viridianCityHospital",4,7,"viridianCity",23,25);
    }
}
GameSystem.Classes.Levels.ViridianCity.Mart=
class Mart extends GameSystem.Classes.Levels.Mart {
    initGates() {
        var GS = GameSystem,CS = GS.Classes;
        var newConnectionItem=(map1,x1,y1,map2,x2,y2)=>new CS.Connection(new CS.MapPosition(map1,new CS.Position(x1,y1)),new CS.MapPosition(map2,new  CS.Position(x2, y2)));
        var pushItem=(map1,x1,y1,map2,x2,y2)=>this.gates.push(newConnectionItem(map1,x1,y1,map2,x2,y2));
        pushItem("viridianCityMart",3,7,"viridianCity",29,19);
        pushItem("viridianCityMart",4,7,"viridianCity",29,19);
    }
}
