GameSystem.Classes.Levels=GameSystem.Classes.Levels||{};
/**
 * 載入存檔 或 直接開始的畫面
 * @class LoadRecord
 * @extends Level
 */
GameSystem.Classes.Levels.LoadRecord=
class LoadRecord extends GameSystem.Classes.Level
{
    constructor()
    {
        super({x:0,y:0});
        var Options=GameSystem.Classes.Options;
        this.options=new Options({className:"buySellDialog"});
        var Option=GameSystem.Classes.Option,RM=GameSystem.Manager.Records,linkStart=this.linkStart;
        this.options.keyInput=(e)=>
        {
            var key=GameSystem.Manager.Key.keyMapping[e.key];
            if(key!=="B")
                this.options._keyInput.call(this.options,e);
        }
        this.options.push(new Option("載入存檔",function(){RM.load();}));
        this.options.push(new Option("重新開始",function(){linkStart();}));
    }
    linkStart()
    {
        var GS=GameSystem,GM=GS.Manager;
        var RM=GM.Records,mainChar=GS.protagonist,rival=GS.rival;
        let name,rivalName;
        for(name=null;name===null;name=prompt("請輸入主角名字","小智障"));
        mainChar.name=name;
        mainChar.atMap="protagonistHome2F";
        for(rivalName=null;rivalName===null;rivalName=prompt("請輸入永遠的對手的名字","屁孩茂"));
        rival.name=rivalName;
    }
    draw(ctx)
    {ctx.fillStyle="white";
    ctx.fillRect(0,0,Framework.Game._canvas.width,Framework.Game._canvas.height);}
    load()
    {
        super.load();
        var container=GameSystem.HTMLObjectContainer;
        this.options.appendTo(container.container);
        container.show();
        this.options.show();
    }
    teardown()
    {
        var container=GameSystem.HTMLObjectContainer;
        container.hide();
        this.options.hide();
        this.options.remove();
    }
}