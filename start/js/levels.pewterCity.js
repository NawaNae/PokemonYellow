GameSystem.Classes.Levels=GameSystem.Classes.Levels||{};
GameSystem.Classes.Levels.PewterCity=
class PewterCity extends GameSystem.Classes.Level {
    constructor()
    {
        var x,GS=GameSystem,CS=GS.Classes,Position=CS.Position;
        super(x,"pewterCity");
        
        this.music= Load.audio( define.musicPath+"background/109 Pewter City's Theme.mp3");
        this.music.loop=true;
        this.size.pos1=new Position(4,4);
        this.size.pos2=new Position(38,33);
    }
    initEvents()
    {
        var GS=GameSystem,CS=GS.Classes,GR=GS.Resource,Position=CS.Position,Rectangle=CS.Rectangle,PC=CS.PlotContents, NPC=CS.NPC, Image=CS.Image ;
        var Drama=GR.Drama,Plot=CS.Plot,Paragraph=CS.Paragraph,CureAll=PC.CureAll,Script=PC.Script,GiveProp=PC.GiveProp,MoveCharacter=PC.MoveCharacter,Event=CS.Event,AddNpc=PC.AddNpc,RemoveNpc=PC.RemoveNpc;
        var Event=CS.Event, Plot=CS.Plot, Position=CS.Position, MoveChar=PC.MoveCharacter;
        // var e0=new Event(new Position(12,10),()=>{for(let i=0;i<this.npcs.length;i++)this.npcs[i].moveTo(GameSystem.protagonist.position)});
        // this.events.push(e0);
        
    } 
    initGates()
    {
        var GS = GameSystem,CS = GS.Classes;
        var newConnectionItem=(map1,x1,y1,map2,x2,y2)=>new CS.Connection(new CS.MapPosition(map1,new CS.Position(x1,y1)),new CS.MapPosition(map2,new  CS.Position(x2, y2)));
        var pushItem=(map1,x1,y1,map2,x2,y2)=>this.gates.push(newConnectionItem(map1,x1,y1,map2,x2,y2));
        pushItem("route02Part2",10,0,"pewterCity",18,34);
        pushItem("route02Part2",11,0,"pewterCity",19,34);
        pushItem("pewterCityHospital",3,7,"pewterCity",13,27);
        pushItem("pewterCityMart",3,7,"pewterCity",23,19);
     //   pushItem("route01",11,0,"viridianCity",21,31);

    }
    initSubLevels()
    {
        let hospital = new GameSystem.Classes.Levels.PewterCity.Hospital("pewterCityHospital");
        let mart=new GameSystem.Classes.Levels.PewterCity.Mart("pewterCityMart");
        this.subLevels.push(hospital);
        this.subLevels.push(mart);
         for(let level of this.subLevels)
             level.parentLevel=this;
         Framework.Game.addNewLevel({"pewterCityHospital":hospital});
         Framework.Game.addNewLevel({"pewterCityMart":mart});
    }
    initObstacles()
    {
        var GS = GameSystem;
        var CS = GS.Classes;
        var KM = GS.Manager.Key;
        /*左下角房屋 */
        this.obstacles.push(new CS.Rectangle({ x: 6, y: 31 }, { x: 9, y: 30 }));
        /*寶可夢醫院 */
        this.obstacles.push(new CS.Rectangle({ x: 12, y: 27 }, { x: 15, y: 24 }));    
        /*樹 */
        this.obstacles.push(new CS.Rectangle({ x: 4, y: 23 }, { x: 18, y: 23 }));    
        /*柵欄 */
        this.obstacles.push(new CS.Rectangle({ x: 18, y: 23 }, { x: 18, y: 20 }));    
        /*GYM*/
        this.obstacles.push(new CS.Rectangle({ x: 12, y: 19 }, { x: 17, y: 16 }));    
        /*Mart*/
        this.obstacles.push(new CS.Rectangle({ x: 22, y: 19 }, { x: 25, y: 16 }));    
        /*House near mart*/
        this.obstacles.push(new CS.Rectangle({ x: 28, y: 15 }, { x: 31, y: 14 }));    
        /*神奇區域上方柵欄 */
        this.obstacles.push(new CS.Rectangle({ x: 22, y: 25 }, { x: 29, y: 25 }));    
        /*右側*/
        this.obstacles.push(new CS.Rectangle({ x:30, y: 31 }, { x: 30, y: 26 }));   
        /*下*/
        //this.obstacles.push(new CS.Rectangle({ x: 26, y: 31 }, { x: 29, y: 21 }));     
        this.obstacles.push(new CS.Rectangle({ x: 22, y: 31 }, { x: 24, y: 31 }));    
        /*左*/
        this.obstacles.push(new CS.Rectangle({ x: 21, y: 31 }, { x: 21, y: 26 }));   
        /*右下柵欄*/ 
        this.obstacles.push(new CS.Rectangle({ x: 35, y: 33 }, { x: 38, y: 28 }));    
        /*右下山*/
        this.obstacles.push(new CS.Rectangle({ x: 34, y: 27 }, { x: 38, y: 22 }));    
        /*右下山*/
        this.obstacles.push(new CS.Rectangle({ x: 34, y: 17 }, { x: 38, y: 12 }));    
        /*右上樹*/
        this.obstacles.push(new CS.Rectangle({ x: 35, y: 11 }, { x: 38, y: 4 }));    
        /*右上砍*/
        this.obstacles.push(new CS.Rectangle({ x: 32, y: 9 }, { x: 34, y: 9 }));    
        this.obstacles.push(new CS.Rectangle({ x: 8, y: 9 }, { x: 30, y: 9 }));   
         /*上大房*/
        this.obstacles.push(new CS.Rectangle({ x: 10, y: 9 }, { x: 17, y: 4 }));   
        /*左上砍*/
        this.obstacles.push(new CS.Rectangle({ x: 4, y: 9 }, { x: 6, y: 9 }));     
    }
    initNpcs()
    {
        // var GS = GameSystem, CS = GS.Classes, Image = CS.Image, Position = CS.Position, NPC = CS.NPC, Drama = GameSystem.Resource.Drama.PalletTown, Item = CS.AnimationItem;
        // this.npcs.push(
        //     new NPC(
        //         "girl1",
        //         CS.Character.Face.Up,
        //         new Position(5, 8),
        //         new CS.Image(define.characterImagePath + "girl1.png", { cutStartPosition: new Position(0, 0), cutSize: new Position(1, 1) }),
        //         10,
        //         Drama.Girl1,
        //         true
        //     )
        // );
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

        this.map=new Framework.Scene();
        this.mapImage = new CS.Image(define.mapImagePath + 'pewterCity/gen1.png',{cutStartPosition:new Position(0,0),cutSize:new Position(39,38)});

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
GameSystem.Classes.Levels.PewterCity.Hospital=
class Hospital extends GameSystem.Classes.Levels.Hospital {
    initGates()
    {
        var GS = GameSystem,CS = GS.Classes;
        var newConnectionItem=(map1,x1,y1,map2,x2,y2)=>new CS.Connection(new CS.MapPosition(map1,new CS.Position(x1,y1)),new CS.MapPosition(map2,new  CS.Position(x2, y2)));
        var pushItem=(map1,x1,y1,map2,x2,y2)=>this.gates.push(newConnectionItem(map1,x1,y1,map2,x2,y2));
        pushItem("pewterCityHospital",3,7,"pewterCity",13,27);
        pushItem("pewterCityHospital",4,7,"pewterCity",13,27);
    }
}
GameSystem.Classes.Levels.PewterCity.Mart=
class Mart extends GameSystem.Classes.Levels.Mart {
    initGates() {
        var GS = GameSystem,CS = GS.Classes;
        var newConnectionItem=(map1,x1,y1,map2,x2,y2)=>new CS.Connection(new CS.MapPosition(map1,new CS.Position(x1,y1)),new CS.MapPosition(map2,new  CS.Position(x2, y2)));
        var pushItem=(map1,x1,y1,map2,x2,y2)=>this.gates.push(newConnectionItem(map1,x1,y1,map2,x2,y2));
        pushItem("pewterCityMart",3,7,"pewterCity",23,19);
        pushItem("pewterCityMart",4,7,"pewterCity",23,19);
    }
    
}
