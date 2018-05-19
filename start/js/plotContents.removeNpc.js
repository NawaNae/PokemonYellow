/**
 * 從Level刪除NPC的劇情內容
 * @class RemoveNpc
 * @extends PlotContent
 */
GameSystem.Classes.PlotContents.RemoveNpc=
class RemoveNpc extends GameSystem.Classes.PlotContent
{
    /**
     * 
     * @param {NPC or String} npc NPC的實體或名稱 若NPC找不到會用NPC的名字比較
     * @param {object} option 包裝可選參數
     * @param {Level or String} option.level=undefined 若string會找到名字一樣的level 若不填則自動找到currentLevel 若Level 在該level新增npc
     */
    constructor(npc,option={level:undefined,name:"AddNpc",type:"AddNpc"})
    {
        super(option);
        this.level=option.level;
        this.npc=npc;
    }
    start()
    {
        var level=this.level;
        if(level&&level.constructor.name==="String")level=Framewrok.Game._findLevel(level);
        if(!level)level=Framework.Game._currentLevel;
        if(!level||level.__proto__.__proto__.constructor.name!=="Level"){this.next();console.warn("無法取得Level");this.next();}
        var npcs=level.npcs;if(!npcs){this.next();console.warn("無法取得npcs of level");this.next();}//沒有npc陣列表示根本不是GameSystem的Level
        if(!this.npc){this.next();console.warn("這個內容必須設定npc卻無法取得");this.next();}
        if(!level.map){console.warn("無法取得map");this.next();}
        if(this.npc.constructor.name==="String")
            this.npc=npcs.find(ele=>this.npc===ele.name);
        if(!level.map.detach){console.warn("無法detachImage");this.next();}
        level.map.detach(this.npc.image);
        var index=npcs.indexOf(this.npc); 
        if(index!==-1)index=npcs.indexOf(npcs.find(ele=>ele.name===this.npc.name));
        if(index===-1){console.warn("無法取得index (該NPC不在"+level.constructor.name+"中)");}
        npcs.splice(index,1);
         
        this.next();
    }
}