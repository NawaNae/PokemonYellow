GameSystem.Classes.Level=
class Level extends Framework.Level
{
    constructor(sizePosition,name="")
    {
        super();
        this.name=name;
        var CS=GameSystem.Classes;
        this.map;
        if(!sizePosition)
            console.log("請確認初始化地圖大小，不然可能會出現角色走出地圖的BUG");
        sizePosition=sizePosition||{x:1000,y:1000};

         //請注意在初始化時填入size參數或者Load時設定，不然會造成超出地圖移動的問題。
        this.size=new CS.Rectangle({x:0,y:0},sizePosition);
        //NawaNawa
        this.parentLevel=undefined;
        this.subLevels=new Array();
        this.obstacles=new Array();
        this.eventObj=new Array();
        this.npcs= new Array();
        this.gates= new Array();
        this.battleFields= new Array();
        this.inputMode=0;
        this.inputModes=
        {
            walk:0,
            dialog:1
        };
    }
    draw(parentCtx) {
        // this.counter.countIncrease();
         parentCtx.fillStyle = "black";
         parentCtx.fillRect(0, 0, Framework.Game.getCanvasWidth(), Framework.Game.getCanvasHeight());
 
         this.rootScene.draw(parentCtx);
         parentCtx.fillStyle = "rgba(0,0,0,0.5)";
         parentCtx.fillRect(4 * 16, 4 * 16, 16, 16);
         parentCtx.fillStyle = "white";
         parentCtx.font = "12px MBitmapSquareHK"
         parentCtx.fillText("小智", 4 * 16 + 8, 4 * 16 + 12, 16);
         // this.map.draw(parentCtx)
     }
    isNPCAtThenGet(position)
    {
        for(let npc of this.npcs)
        {
            let pos=npc.position;
            if(pos.x==position.x&&pos.y==position.y)
                return npc;
        }
        return undefined;
    }
    isWalkableAt(position)
    {
        
        for(var i in this.obstacles)
            if(position.isIn(this.obstacles[i]))
                return false
        
        if(!position.isIn(this.size))//地圖外(不再地圖內)
            return false;
        return true;
    }
    isGateAtThenGetGate(position)
    {
        let levelName=Framework.Game._findLevelNameByLevel(this);
        for(var i in this.gates)
        {
            let gate=this.gates[i];
            let place=gate.findPlaceByMapName(levelName);
            if(position.x==place.position.x&&position.y==place.position.y)
                return this.gates[i]
        }
            
        return undefined;

    }
    normalKeyInput(e)
    {
        switch(this.inputMode)
        {
            case this.inputModes.walk:
            this.walkKeyInput(e);
            break;
            case this.inputModes.dialog:
            this.dialogKeyInput(e);
            break;
        }
    }
    walkKeyInput(e)
    {
        var GS = GameSystem;
        var CS = GS.Classes;
        var KM = GS.Manager.Key;
       var npc=undefined;
        if (KM.isMoveKey(e.key)) {
            GS.protagonist.facing = CS.Character.Face[e.key];
            let key = KM.moveKeys[e.key];
            var newPosition = new CS.Position(GS.protagonist.position.x + GS.protagonist.movePositionVector[key].x,
                GS.protagonist.position.y + GS.protagonist.movePositionVector[key].y
            );
            var gate = undefined;

            if ((gate = this.isGateAtThenGetGate(newPosition))) {
                let levelName=Framework.Game._findLevelNameByLevel(this);
                let anotherPlace=gate.findAnotherPlaceByMapName(levelName);
                GS.protagonist.position=anotherPlace.position;
                Framework.Game.goToLevel(anotherPlace.mapName);
            }
            else if (this.isWalkableAt(newPosition)) {
                console.log(newPosition);
                GS.protagonist.position = newPosition;
                this.walker.keyInput(e);
            }
        }else
        if(KM.keyMapping[e.key]=="A")
        {
            if((npc=this.isNPCAtThenGet(GS.protagonist.facePosition)))
            {
                npc.plot.index=0;
                this.inputMode=this.inputModes.dialog;
                GS.HTMLObjectContainer.visible=true;
                let dialog=GameSystem.HTMLObjectContainer.dialog;
                dialog.visible=true;

                dialog.text=npc.plot.content[npc.plot.index++].text;
                this.inputMode=this.inputModes.dialog;
            }
        }
    }
    dialogKeyInput(e)
    {
        var GS=GameSystem;
        let npc=this.isNPCAtThenGet(GS.protagonist.facePosition);
        let dialog=GameSystem.HTMLObjectContainer.dialog;
        if(npc.plot.index==npc.plot.content.length)
        {
            dialog.visible=false;
            GS.HTMLObjectContainer.visible=false;
            this.inputMode=this.inputModes.walk;
            return;
        }
        dialog.text=npc.plot.content[npc.plot.index++].text;
        
        
    }
    
}