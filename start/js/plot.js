/**
 * @class Plot
 * @classdesc 劇情，在玩家與NPC或物件對話時所會用到的內容安排。
 * 
 * @prop {string} name 劇情的名稱。
 * @prop {Paragraph[]} content 劇情的內容安排。
 * @prop {string} type 自動記錄type會依據目前的content之type變更
 */
GameSystem.Classes.Plot =
class Plot {
    /**
     * @param {string} name 劇情的名稱。
     * @param {Paragraph[]?} content 劇情的內容安排。
     * @param {boolean function(void)} (Optional) conditionFunc 給Plot管理器判斷是否應該使用該Plot的Func 回傳true或者未設置會執行，不可以有參數輸入
     */
    constructor(name, content = [],conditionFunc=undefined) {
        
        this._name = name;
        this._content = content;
        this._type;
        this._index=0;
        this._keyInput=e=>this.currentContent&&this.currentContent.keyInput?this._content[this.index].keyInput(e):this.keyInput(e);
        this.condition=conditionFunc;//
        //pointer of keyInput st you can detour the function of KeyManager of this object
        //this handler will call keyhandler of content if content owns a keyInput handler
        autoBind(this);//綁定所有method
    }
    get lastContent()
    {
        return this._index>0?this._content[this._index-1]:undefined;
    }
    set lastContent(val){console.log("last content is read only getter")}
    get currentContent()
    {
        return this._index<this._content.length?this._content[this._index]:undefined;
    }
    set currentContent(val)
    {console.log("current content is read only getter");}
    end()
    {
        this.index=0;
        GameSystem.Manager.Key.keyInput=this.lastKeyInput;
    }
    /**
     * 執行一個內容 並遞增
     */
    step()
    {
        if(this.lastContent&&this.lastContent.end)
                this.lastContent.end();//結束上一個內容
        if(this.currentContent)
        {

            var content=this.currentContent;
            if(content.type)
                this.type=this.currentContent.type;
            this.index++;
            if(content.start)//如果有定義開始 
                content.start();
            
        }
        else
        {
            this.end();
        }
    }
    /**
     * @description keyInput之handler
     */
    keyInput(e)
    {
        
    }
     /**
      * @description 執行Plot 取得KeyInput
      */
    start()
    {
        //備份並取得當前keyInput
        this.lastKeyInput=GameSystem.Manager.Key.keyInput;
        GameSystem.Manager.Key.keyInput=this._keyInput;
        for(let content of this._content)
            content.plot=this;
        
        
        this.step();
    }
    set index(value){
        this._index=value;
        this.type=this.type||this._content[this._index].type;
    }
    get currentLevel(){return Framework.Game._currentLevel;}
    set currentLevel(val){console.log("current level is read only getter");}
    get index(){return this._index;}
    set type(newType){this._type=newType;}
    get type(){return this._type;}
    set name(newName) { this._name = newName; }
    get name() { return this._name; }

    set content(newContent) { this._content = newContent; }
    get content() { return this._content; }
}


GameSystem.Resource.Drama = {};

/** 定義所有的劇本 */
(() => {
    var GS=GameSystem,CS=GS.Classes,GR=GS.Resource,Position=CS.Position,PC=CS.PlotContents;
    var Drama=GR.Drama,Plot=CS.Plot,Paragraph=CS.Paragraph,CureAll=PC.CureAll,Script=PC.Script,MoveCharacter=PC.MoveCharacter;
    Drama["PalletTown"] = {
        "WelcomeSign": new Plot("WelcomeSign",[
            new Paragraph("歡迎來到「真新鎮」。"),
            new Paragraph("這裡是一個新鮮又平靜的鎮，小小又漂亮的地方。")
        ]),
        "ProtagonisHomeSign": new Plot("ProtagonisHomeSign",[
            new Paragraph("這裡是$MY_NAME家")
        ]),
        "RivalHomeSign":new Plot("ProtagonisHomeSign",[
            new Paragraph("這裡是$RIVAL_NAME家")
        ]),
        "OakHomeSign":new Plot("ProtagonisHomeSign",[
            new Paragraph("這裡是大木博士的研究所\n下方寫著一些信息"),
            new Paragraph("誠徵\n低價菸酒生、研究助理\n薪水絕對低於22k"),
            new Paragraph("工作內容\n打雜跑腿、買飲料、抓寶可夢"),
            new Paragraph("研究領域\n寶可夢工程、深度寶可夢\n智慧寶可夢、區塊寶可夢\n應有盡有，甚麼都不會"),
        ]),
        "Bookshelf": new Plot("Bookshelf", [
            new Paragraph("很多關於寶可夢的書。"),
        ]),
        "PronBooks": new Plot("PronBooks",[
            new Paragraph("發現了很多$MY_NAME的小黃書"),
            new Paragraph("伊布制服誘惑、臭臭泥的課後輔導..."),
            new Paragraph("作者『$MY_NAME真的瘋了』")
        ]),
        "OakNormal": new Plot("OakNormal", [
            new Paragraph("要不是因為我年老了，否則我仍會想要到外頭去尋找寶可夢呢。"),
            new Paragraph("記得，帶上你的PokèDex、寶可夢與熱忱的心！"),
            new Paragraph("去外頭捕捉新的寶可夢吧！")
        ]),
        "Mother": new Plot("Mother", [
            new Paragraph("媽媽『$MY_NAME不要做太過火\n不然寶可夢會討厭你的"),
            new Paragraph("休息一下吧…"),
            new CureAll(),
            new Paragraph("你跟寶可夢都這麼有精神阿\n那小心一點喔"),
            new Paragraph("¡Adios!")
        ]),
        "Girl1": new Plot("Girl1", [
            new Paragraph("我也在養寶可夢，如果夠強的話還可以當你的保鑣呢！"),
            new Paragraph("$MY_NAME『阿不就好棒棒』"),
            new Paragraph("倫加4女森耶。我要去4,4ㄌ888"),
            new MoveCharacter({to:new Position(4,4)})
        ]),
        "Fatty": new Plot("Fatty", [
            new Paragraph("科學的力量真是厲害"),
            new Paragraph("現在利用電腦通信從道具屋傳送寶可夢資料"),
            new Paragraph("然而作者沒打算做這功能"),
        ]),
        "RivalsSisterMap": new Plot("RivalsSisterMap", [
            new Paragraph("聽說大木老頭找你跑腿阿？真辛苦（嘲諷意味）！"),
            new Paragraph("這給你用吧！"),
            new Paragraph("$MY_NAME從姐姐手中得到城鎮地圖，然而作者也沒有想實作"),
            new Script(()=>{GameSystem.protagonist.storyLineIndex++;})
            /*new Paragraph("在道具中使用城鎮地圖，可以看到自己在哪兒"),*/
        ],()=> GameSystem.protagonist.storyLineIndex==0),
        "RivalsSister": new Plot("RivalsSister", [
            new Paragraph("經常在一豈能與寶可夢建立良好關係"),
            new Paragraph("$MY_NAME『Madam, 我比較想與你建立良好關係』")
        ]),
        "Gary_First": new Plot("Gary_First", [
            new Paragraph("嘿! 我正在等大木伯伯過來這裡，我要領我的寶可夢球了！")
        ]),
        "Common": new Plot("Common", [
            new Paragraph("真新鎮雖然一座人口很少的小鎮，不過卻是一個新鮮又平靜的鎮，小小又漂亮的地方。")
        ]),
        "Tip": new Plot("Tip", [
            new Paragraph("注意喔！在真新鎮周圍有很多的野草。"),
            new Paragraph("這表示了我們有可能走在草叢中會遇到野生的寶可夢。"),
            new Paragraph("記得！帶上你自己的寶可夢，讓牠來保護你！")
        ])
    };

    /** 「一號道路」的 */
    Drama["Route 1"] = {
        'WelcomeSign': new Plot('WelcomeSign', [
            new Paragraph("歡迎來到「１號道路」。")
        ]),
        'Common1': new Plot("Common1", [
            new Paragraph("若你想要訓練你的寶可夢，那就多多來草叢這裡走走"),
            new Paragraph("試著遇遇看野生的寶可夢，透過戰鬥來提升能力吧！")
        ]),
        'Common2': new Plot("Common2", [
            new Paragraph("這裡是１號道路"),
            new Paragraph("是一個充滿綠色和粗糙路徑的鄉間小路！")
        ]),
        'Tip1': new Plot("Tip1", [
            new Paragraph("在幾次戰鬥完後，寶可夢可能會因為受到攻擊的關係使得HP下降"),
            new Paragraph("你可以到寶可夢中心去將HP值恢復！")
        ]),
        'Tip2': new Plot("Tip2", [
            new Paragraph("記得確認你的寶可夢的HP是否是足夠的！")
        ])
    };

    Drama["Viridian City"] = {
        'WelcomeSign': new Plot("WelcomeSign", [
            new Paragraph("歡迎來到「常磐市」！"),
            new Paragraph("這裡是個長年茂綠環境的美麗城鎮！")
        ]),
        'Common1': new Plot("Common1", [
            new Paragraph("歡迎你來到「常磐市」！"),
            new Paragraph("在這個市中有寶可夢中心、寶可夢商店以及道館"),
            new Paragraph("都可以到處去看一看喔！")
        ])
    };

})();
/**
 * test func
 */
(()=>
{
    var GS=GameSystem,CS=GameSystem.Classes,level=()=>Framework.Game._currentLevel,container=GS.HTMLObjectContainer,mainChar=GS.protagonist,Position=CS.Position;
    var t0=new Position()
})()