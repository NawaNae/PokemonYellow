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
     */
    constructor(name, content = []) {
        
        this._name = name;
        this._content = content;
        this._type;
        this._index=0;
        this._keyInput=e=>this._content[this.index].keyInput?this._content[this.index].keyInput(e):this.keyInput(e);
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
            if(this.currentContent.start)//如果有定義開始 
                this.currentContent.start();
            this.index++;
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
        
        if(this.currentContent.type)
            this.type=this.currentContent.type;
        if(this.currentContent.start)
            this.currentContent.start();
    }
    set index(value){
        this._index=value;
        this.type=this.type||this._content[this._index].type;
    }
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
    let Drama = GameSystem.Resource.Drama;
    let Plot = GameSystem.Classes.Plot;
    let Paragraph = GameSystem.Classes.Paragraph;

    Drama["PalletTown"] = {
        "WelcomeSign": new Plot("WelcomeSign",[
            new Paragraph("歡迎來到「真新鎮」。"),
            new Paragraph("這裡是一個新鮮又平靜的鎮，小小又漂亮的地方。")
        ]),
        "OakNormal": new Plot("OakNormal", [
            new Paragraph("要不是因為我年老了，否則我仍會想要到外頭去尋找寶可夢呢。"),
            new Paragraph("記得，帶上你的PokèDex、寶可夢與熱忱的心！"),
            new Paragraph("去外頭捕捉新的寶可夢吧！")
        ]),
        "Mother": new Plot("Mother", [
            new Paragraph("外出探索新的寶可夢時，記得要拍照回憶、注意安全啊！")
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