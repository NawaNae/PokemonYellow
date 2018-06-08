var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
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
        this.events=new Array();
        this.npcs= new Array();
        this.signBoards= new Array();
        this.gates= new Array();
        this.battleFields= new Array();
        this.music;
        this.inputMode=0;
        this.inputModes=GameSystem.Classes.Level.InputModes;
        this.initObstacles();
        this.initSubLevels();
        this.initGates();
        this.initNpcs();
        this.initSignBoards();
        this.initBattleFields();
        this.initEvents();
        this.keyInput = (e) => {
            this.normalKeyInput(e);
        };
        this._fightEnd=()=>{this.fightEnd();}
    }
    initObstacles(){}
    initSubLevels(){}
    initSubLevels(){}
    initGates(){}
    initNpcs(){}
    initBattleFields(){}
    initSignBoards(){}
    initEvents(){}
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
        this.rootScene.update();
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
         parentCtx.fillStyle = "black";
         parentCtx.fillRect(0, 0, Framework.Game.getCanvasWidth(), Framework.Game.getCanvasHeight());
 
         this.rootScene.draw(parentCtx);
         if(GameSystem.isShowGrid)
            this.drawGrid(parentCtx);
     }
     drawGrid(ctx)
     {
        const Width=160,Height=144;
        ctx.fillStyle="rgba(150,255,200,0.4)";
        ctx.beginPath();
        for(var x=0;x<16;x++)
        {
            ctx.moveTo(x*16,0);
            ctx.lineTo(x*16,144);
            if(x%5==0)
                ctx.lineTo(x*16,144);
        }
        for(var y=0;y<16;y++)
        {
            ctx.moveTo(0,y*16);
            ctx.lineTo(160,y*16);
            if(y%5==0)
                ctx.lineTo(160,y*16);
        }
        ctx.stroke();
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
    isInRectamgleArray(position,array,param)
    {
        for(var i in array)
            if(param)
            {
                if(position.isIn(array[i][param]))
                   return array[i]
            }
            else
            {
                if(position.isIn(array[i]))
                    return array[i];
            }

        return undefined;
    }
    getEventAreaAt(position)
    {return this.isInRectamgleArray(position,this.events,"area");}
    getBattleFieldAt(position)
    {
        return this.isInRectamgleArray(position,this.battleFields,"_area");
    }
    isWalkableAt(position)
    {
        
        if(this.isInRectamgleArray(position,this.obstacles))
            return false;
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
            this.walkKeyInput(e);
    }
    walkKeyInput(e)
    {
       
        var GS = GameSystem;
        var CS = GS.Classes;
        var KM = GS.Manager.Key;
        var mainChar=GS.protagonist;
       this.npcTalkNow=undefined;//記錄對話的NPC
        if (KM.isMoveKey(e.key)) {
            
            let key = KM.moveKeys[e.key];
            mainChar.walk(key);
           /* GS.protagonist.facing = CS.Character.Face[key];
            var newPosition = new CS.Position(GS.protagonist.position.x + GS.protagonist.movePositionVector[key].x,
                GS.protagonist.position.y + GS.protagonist.movePositionVector[key].y
            );
            var gate = undefined;

            if ((gate = this.isGateAtThenGetGate(newPosition))) {
                let levelName=Framework.Game._findLevelNameByLevel(this);
                let anotherPlace=gate.findAnotherPlaceByMapName(levelName);
                GS.protagonist.position=anotherPlace.position;
                GS.protagonist.atMap=(anotherPlace.mapName);
            }
            else if (this.isWalkableAt(newPosition)) {
                console.log(newPosition);
                GS.protagonist.position = newPosition;
                this.walker.keyInput(e);
                var event;
                if((event=this.getEventAreaAt(newPosition)))
                    event.start();
                var field,wildPoke;
                if((field=this.getBattleFieldAt(newPosition)))
                    if((wildPoke=field.trigger()))
                    {
                        var BD=GameSystem.Bridges.BattleData;
                        GS.protagonist.meetPokemon(wildPoke);
                        BD.opponent=wildPoke;
                        BD.selectPokemon=GameSystem.protagonist.pokemons[0];
                        Framework.Game.goToLevel('battleLevel');
                    }
            }
        */}else
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
           // this.inputMode=this.inputModes.options;
        }
    }
    fightEnd()
    {
        var mainChar=GameSystem.protagonist;
        var BR=GameSystem.Bridges.BattleResult;
        mainChar.meetPokemon(BR.fightedPokemonTypes);
        if(BR.isPlayerWon)
        {

        }
        else
        {
            this.money-=1;
        }
    }
    teardown()
    {
        if(this.music)
            this.music.pause();
    }
}
