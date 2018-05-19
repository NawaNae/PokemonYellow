/**
 * 新增NPC到Level用的劇情內容
 * @class AddNpc
 * @extends PlotContent
 */
GameSystem.Classes.PlotContents.AddNpc=
class AddNpc extends GameSystem.Classes.PlotContent
{
    /**
     * 
     * @param {NPC} npc NPC的實體
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
        if(!level||level.__proto__.__proto__.constructor.name!=="Level"){this.next();console.warn("無法取得Level");return;}
        var npcs=level.npcs;if(!npcs){this.next();console.warn("無法取得npcs of level");return;}//沒有npc陣列表示根本不是GameSystem的Level
        if(!this.npc){this.next();console.warn("這個內容必須設定npc卻無法取得");return;}
        if(!level.map){console.warn("無法取得map");return;}
        if(!level.map.attach){console.warn("無法attachImage");return;}
        level.map.attach(this.npc.image);
        npcs.push(this.npc);
        this.next();
    }
}