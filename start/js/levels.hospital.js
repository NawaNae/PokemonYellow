GameSystem.Classes.Levels=GameSystem.Classes.Levels||{};
GameSystem.Classes.Levels.Hospital=
class Hospital extends GameSystem.Classes.Level {
    constructor(name) {
        let CS = GameSystem.Classes;
        super(new CS.Position(13, 7), name);
        this.size.pos1=new CS.Position(1, 3);
        this.isSublevel=true;
    }
    initObstacles()
    {
        var GS = GameSystem,CS = GS.Classes;
        this.obstacles.push(new CS.Rectangle({ x: 12, y: 7 }, { x: 13, y: 6 }));//右下樹
        this.obstacles.push(new CS.Rectangle({ x: 6, y: 7 }, { x: 7, y: 6 }));//中下樹
        this.obstacles.push(new CS.Rectangle({ x: 13, y: 3 }, { x: 13, y: 3 }));//電腦
        this.obstacles.push(new CS.Rectangle({ x: 1, y: 6 }, { x: 1, y: 7 }));
    }
    initSignBoards()
    {
        let SignBoard = GameSystem.Classes.SignBoard;
        let Drama = GameSystem.Resource.Drama.Hospital;
        this.signBoards.push(new SignBoard({ position: new GameSystem.Classes.Position(3, 2), content: Drama.JoiSan }));
        this.signBoards.push(new SignBoard({ position: new GameSystem.Classes.Position(0, 4), content: Drama.Patient }));
    }
    initNpcs()
    {
        var NPC=GameSystem.Classes.NPC,Position=GameSystem.Classes.Position;
        var Item=GameSystem.Classes.AnimationItem;
        var GS = GameSystem, CS = GS.Classes, Image = CS.Image, Position = CS.Position, NPC = CS.NPC, Drama = GameSystem.Resource.Drama.PalletTown, Item = CS.AnimationItem,x;
        let girl=new NPC("girl1",CS.Character.Face.Down,new Position(3, 1),new CS.Image(define.characterImagePath + "girl1.png", { cutStartPosition: new Position(3, 0), cutSize: new Position(1, 1) }),10,x);
        this.npcs.push(girl);
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
    load()
    {
        super.load();
        this.music= Load.audio( define.musicPath+"background/110 Pokemon Center.mp3");
       this.music.loop=true;
        this.music.autoplay=true;
        var CS=GameSystem.Classes,GS=GameSystem,Position=CS.Position;
        this.mapImage=new CS.Image(define.mapImagePath + 'viridianCity/gen1.png',{cutStartPosition:new Position(40,26),cutSize:new Position(14,8)});
        this.map=new Framework.Scene();
        this.map.x = GS.protagonist._screenPosition.toPoint().x - GS.protagonist.position.toPoint().x;
        this.map.y = GS.protagonist._screenPosition.toPoint().y - GS.protagonist.position.toPoint().y;
        this.map.attach(this.mapImage);
        this.rootScene.attach(this.map);
        this.loadNPCs();
        this.rootScene.attach(GS.protagonist.image);
    }
}