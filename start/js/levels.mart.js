GameSystem.Classes.Levels=GameSystem.Classes.Levels||{};
GameSystem.Classes.Levels.Mart=
class Mart extends GameSystem.Classes.Level {
    constructor(name) {
        let CS = GameSystem.Classes;
        super(new CS.Position(7, 7), name);
        this.size.pos1=new CS.Position(0, 2);
        this.isSublevel=true;
        if(this.parentLevel&&this.parentLevel.music)
        {
            this.music=this.parentLevel.music;
        }
        else{
            this.music= Load.audio( define.musicPath+"background/106 The Road To Viridian City From Palette.mp3");
            this.music.loop=true;
        }
    }
    initObstacles()
    {
        var GS = GameSystem,CS = GS.Classes;
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 6 }, { x: 1, y: 2 }));//櫃台
        this.obstacles.push(new CS.Rectangle({ x: 4, y: 3 }, { x: 7, y: 4 }));//中下樹
    }
    initSignBoards()
    {
        let SignBoard = GameSystem.Classes.SignBoard;
        let Drama = GameSystem.Resource.Drama.Hospital;
        this.signBoards.push(new SignBoard({ position: new GameSystem.Classes.Position(1, 5), content: Drama.JoiSan }));
    }
    initNpcs()
    {
        var NPC=GameSystem.Classes.NPC,Position=GameSystem.Classes.Position;
        var Item=GameSystem.Classes.AnimationItem;
        var GS = GameSystem, CS = GS.Classes, Image = CS.Image, Position = CS.Position, NPC = CS.NPC, Drama = GameSystem.Resource.Drama.PalletTown, Item = CS.AnimationItem,x;
        let girl=new NPC("girl1",CS.Character.Face.Right,new Position(0, 5),new CS.Image(define.characterImagePath + "girl1.png", { cutStartPosition: new Position(8, 0), cutSize: new Position(1, 1) }),10,x);
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
        this.music.play();
    
        var CS=GameSystem.Classes,GS=GameSystem,Position=CS.Position;
        this.mapImage=new CS.Image(define.mapImagePath + 'viridianCity/gen1.png',{cutStartPosition:new Position(54,26),cutSize:new Position(8,8)});
        this.map=new Framework.Scene();
        this.map.x = GS.protagonist._screenPosition.toPoint().x - GS.protagonist.position.toPoint().x;
        this.map.y = GS.protagonist._screenPosition.toPoint().y - GS.protagonist.position.toPoint().y;
        this.map.attach(this.mapImage);
        this.rootScene.attach(this.map);
        this.loadNPCs();
        this.rootScene.attach(GS.protagonist.image);
    }
}