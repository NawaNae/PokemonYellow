GameSystem.Classes.Level=
class Level extends Framework.Level
{
    constructor(sizePosition,name="")
    {
        super();
        this.counter =
        new (class Counter {
            constructor(countTo) {
                this.count = 0;
                this.lastTime = 0;
                this.countTo = countTo;
                this.fpsNow = 0;
                this._fpsCount = false;
                this.enable=false;
            }
            set fpsCount(value) {
               
                this._fpsCount = value;
                if (value) {
                    if(!this.enable)
                        return ;
                    this.count = 0;
                    var callback = () => {
                        this.fpsNow = this.count;
                        this.count = 0;
                        if (this._fpsCount)
                            setTimeout(callback, 1000);
                        console.log("fps : " + this.fpsNow);
                    }
                    callback();
                }
            }
            get fpsCount() { return this._fpsCount; }
            countIncrease() {
                if(!this.enable)
                return ;
                if (this._fpsCount)
                    this.count++;
                else {
                    if (this.count == 0)
                        this.lastTime = Date.now();
                    if (this.count == this.countTo - 1)
                        console.log("using " + (Date.now() - this.lastTime) + "ms to count to " + this.countTo);
                    this.count = (this.count + 1) % this.countTo;
                }
            }
        })(60);
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
        this.signBoards= new Array();
        this.gates= new Array();
        this.battleFields= new Array();
        this.music;
        this.inputMode=0;
        this.inputModes=GameSystem.Classes.Level.InputModes;
        
    }
    load()
    {
        this.loadNullSprite();
        GameSystem.Manager.Key.keyInput=(e)=>{this.keyInput(e);}
    }
    loadNullSprite()
    {
        /*bug 去除 */
        this.nullSprite = new Framework.Sprite(define.imagePath + 'null.png');//去除draw bug用的
        this.nullSprite.position = { x: -1, y: -1 };
        this.rootScene.attach(this.nullSprite);
        /*bug 去除 */
    }
    update()
    {
        /*bug 去除 */
        this.nullSprite.position.x--;
        if (this.nullSprite.position.x < -2)
            this.nullSprite.position.x = -1;
        /*bug 去除 */
    }
    touchstart(e) {
        //為了要讓Mouse和Touch都有一樣的事件
        //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
        this.click({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
    keyInput(e)
    {
        this.normalKeyInput(e);
    }
    draw(parentCtx) {
        this.counter.countIncrease();
         parentCtx.fillStyle = "black";
         parentCtx.fillRect(0, 0, Framework.Game.getCanvasWidth(), Framework.Game.getCanvasHeight());
 
         this.rootScene.draw(parentCtx);
         parentCtx.fillStyle = "black";
         parentCtx.font = "12px 新細明體"
         parentCtx.fillText("小智", 4 * 16 + 8, 3 * 16 + 14);
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
    getSignBoardAt(position)
    {
        for(let signBoard of this.signBoards)
        {
            let pos=signBoard.position;
            if(pos&&pos.x==position.x&&pos.y==position.y)
                return signBoard;
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
            case this.inputModes.options:
            this.optionsKeyInput(e);
            break;
            case this.inputModes.yesNoDialog:
            this.optionsKeyInput(e,GameSystem.HTMLObjectContainer.yesNoDialog);
            break;
            case this.inputModes.buySellDialog:
            this.optionsKeyInput(e,GameSystem.HTMLObjectContainer.buySellDialog);
            break;
            case this.inputModes.shoppingList:
            this.optionsKeyInput(e,GameSystem.HTMLObjectContainer.shoppingList);
            break;
            case this.inputModes.itemNumberDialog:
            this.itemNumberDialogKeyInput(e);
            break;
        }
    }
    walkKeyInput(e)
    {
       
        var GS = GameSystem;
        var CS = GS.Classes;
        var KM = GS.Manager.Key;
       this.npcTalkNow=undefined;//記錄對話的NPC
        if (KM.isMoveKey(e.key)) {
            
            let key = KM.moveKeys[e.key];
            GS.protagonist.facing = CS.Character.Face[key];
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
            if((this.npcTalkNow=this.isNPCAtThenGet(GS.protagonist.facePosition)))
                this.npcTalkNow.plot.start();
            if((this.signBoardNow=this.getSignBoardAt(GS.protagonist.facePosition)))
                this.signBoardNow.plot.start();
            
        }
        else if(KM.keyMapping[e.key]=="Start")
        {
            let options=GameSystem.HTMLObjectContainer.options;
            let container=GameSystem.HTMLObjectContainer;
            container.visible=true;
            options.visible=true;
            this.inputMode=this.inputModes.options;
        }
    }
  
    itemNumberDialogKeyInput(e,options)
    {
        let GS=GameSystem,KM=GS.Manager.Key,CS=GS.Classes;
        let container=GameSystem.HTMLObjectContainer;
        let itemNumber=container.itemNumberDialog;
        switch(KM.keyMapping[e.key])
        {
            case "Up":
                itemNumber.value++;
                break;
            case "Down":
                itemNumber.value--;
                break;
            case "A":
                this.inputMode=this.inputModes.yesNoDialog;
                container.yesNoDialog.yesOption.selectSend=function(){console.log("cost " + GameSystem.HTMLObjectContainer.itemNumberDialog.cost);container.yesNoDialog.hide();container.itemNumberDialog.hide()};
                container.yesNoDialog.show();
                break;
            case "B":
                container.itemNumberDialog.visible=false;
                break;

        }
    }
    optionsKeyInput(e,options)
    {

        let GS=GameSystem;
        let KM=GS.Manager.Key;
        options=options||GameSystem.HTMLObjectContainer.options;
        let container=GameSystem.HTMLObjectContainer;
        switch(KM.keyMapping[e.key])
        {
            case "Up":
            options.selectLast();
            break;
            case "Down":
            options.selectNext();
            break;
            case "A":
            options.selectSend();
            break;
            case "B":
            case "Start":  
            container.visible=false;
            options.visible=false;
            if(options.lastInputMode)
                this.inputMode=options.lastInputMode;//回到上個
            else
                this.inputMode=this.inputModes.walk;//直接回到走路
            break;
        }
      
    }
    teardown()
    {
        if(this.music)
            this.music.pause();
        this.counter.fpsCount=false;
    }
}
GameSystem.Classes.Level.InputModes=Object.freeze(
    {
        
            walk:0,
            options:2,
            yesNoDialog:3,
            buySellDialog:4,
            shoppingList:5,
            itemNumberDialog:6
        
    });