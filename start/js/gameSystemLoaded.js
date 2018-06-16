
GameSystem.loaded=function ()
{
   
    defPlot();
    defProp();
    var GS=GameSystem,CS=GS.Classes,Image=CS.Image,Position=CS.Position,Pokemon=CS.Pokemon,DEX=CS.PokemonType.Dictionary,GR=GS.Resource,Drama=GR.Drama,FightEndP=Drama.FightEnd;
    var x;
    GS.protagonist=new CS.Protagonist();
    let ibu=new Pokemon("伊布",DEX["伊布"]);
    ibu.level=5;
    ibu.updateAbilities();
    ibu.HP=ibu.maxHP;
    GS.rival=new CS.NPC(x,x,x,new Image(define.characterImagePath+"rival.png",{cutStartPosition:new Position(0,0),cutSize:new Position(1,1)}),4,x,x,x,[ibu],new Image(define.characterImagePath+"Rival_InBattle.png"));
    GS.rival.fightEndPlot=FightEndP.Rival;
    let protagonist=GS.protagonist;
    protagonist.initialize();
    protagonist.image.addToAllLevels();
    GameSystem.HTMLObjectContainer=new GameSystem.Classes.HTMLObjectContainer;
    GameSystem.Classes.BattlePad.initBattlePad();

}
var defProp=()=>
{
    GameSystem.Resource=GameSystem.Resource||{};
    var GR=GameSystem.Resource;GR.PropDictionary=GR.PropDictionary||{};
    var Prop=GameSystem.Classes.PropItem;
    var x;

    // Note:
    // The form of battlePackage is:
    // battlePackage = {player: this._player, opponent: this._opponent, battleResult: battleResult}
    // and the following function must be used by PropItem.
    function UsePotion(battlePackage) {
        let animation = GameSystem.Classes.BattleAnimation.Dictionary.MiscEffect['藥水'];
        let originHP = battlePackage.player.HP;
        battlePackage.player.HP += 20;
        if (battlePackage.player.HP > battlePackage.player.maxHP) {
            battlePackage.player.HP = battlePackage.player.maxHP;
        }
        let diff = battlePackage.player.HP - originHP;
        battlePackage.battleResult.addMessage("你對" + battlePackage.player.name + "使用了「" + this.name + "」！");
        battlePackage.battleResult.addBattleAnimation(animation);
        battlePackage.battleResult.addHPBarAnimation(battlePackage.player.HP - originHP, battlePackage.player.HP, battlePackage.player.maxHP, true);
        battlePackage.battleResult.addMessage(battlePackage.player.name + "恢復了" + diff + "點生命值");
        GameSystem.protagonist.decreaseSpecifiedPropItem(this);
    }

    // Note: not a complete original formula
    function UsePokemonBall(battlePackage) {
        const MiscAnim = GameSystem.Classes.BattleAnimation.Dictionary.MiscEffect;
        let battleResult = battlePackage.battleResult;
        let targetPkm = battlePackage.opponent;
        let rndVal = Math.floor(Math.random() * 256);
        let secRndVal = Math.floor(Math.random() * 256);
        let f = Math.floor((targetPkm.maxHP * 255 / 12) / (targetPkm.HP / 4))
        let isCaught = false;
        if (f > 255) f = 255;
        if (f <= 0) f = 1;
        isCaught = (rndVal < 25 && (targetPkm.isAsleep || targetPkm.isForzen)) ||
                   (rndVal < 12 && (targetPkm.isBurned || targetPkm.isParalysis || targetPkm.isPoisoned)) ||
                   (rndVal <= targetPkm.catchRate && f >= secRndVal);
        battleResult.addMessage("你將寶可夢球丟向了野生的" + targetPkm.name);
        // If caught target pokemon
        if (isCaught) {
            battleResult.addBattleAnimation(MiscAnim['收服成功']);
            battleResult.addAfterCaughtPokemon();
            battleResult.addMessage("你抓到了野生的" + targetPkm.name + "了！");
            battleResult.caughtPokemon();
        }
        else {
            battleResult.addBattleAnimation(MiscAnim['收服失敗']);
            battleResult.addMessage(targetPkm.name + "掙脫了！");
        }
        GameSystem.protagonist.decreaseSpecifiedPropItem(this);
        return isCaught;
    }

    /*所有物品的陣列 請在此定義物品 */
    GR.PropDictionary=
    {
        /*String: new Prop("Name",Count,useFunction(請回傳true or 非undefined/false 自動判斷減少物品)) */
        "小帽的照片": new Prop("小帽的照片",5201314,function(){return true;},x,x,9999),
        "寶可夢球":new Prop("寶可夢球",1,function(pokemon){pokemon.HP+=10;if(pokemon.HP>pokemon.maxHP)pokemon.HP=pokemon.maxHP;return true;},x,function(){new GameSystem.Classes.PokemonsSelectDialog(this);},200,UsePokemonBall),
        "女僕咖啡廳的紅藥水":new Prop("女僕咖啡廳的紅藥水",1,function(pokemon){var propList=GameSystem.HTMLObjectContainer.propList;pokemon.HP+=10;if(pokemon.HP>pokemon.maxHP)pokemon.HP=pokemon.maxHP;propList.update();},x,function(){new GameSystem.Classes.PokemonsSelectDialog(this);},200,UsePotion)
    };
}
/** 定義所有的劇本 */
var defPlot=()=>{
    GameSystem.Resource.Drama = {};
    var GS=GameSystem,CS=GS.Classes,GR=GS.Resource,Position=CS.Position,PC=CS.PlotContents, NPC=CS.NPC ;
    var Drama=GR.Drama,Plot=CS.Plot,Paragraph=CS.Paragraph,CureAll=PC.CureAll,Script=PC.Script,GiveProp=PC.GiveProp,MoveCharacter=PC.MoveCharacter,Event=CS.Event,AddNpc=PC.AddNpc;
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
            new Paragraph("¡Adios!",undefined,undefined,"es")
        ]),
        "TV": new Plot("TV",[
            new Paragraph("電視上播映著最新的動漫 -- 寶可夢，開始了......"),
            new Paragraph("ご覧の番組はナワナワから送りしました。",undefined,undefined,"ja"),
            new Paragraph("$MY_NAME『哈哈哈...二十年還贏不了冠軍聯盟，嗚嗚...嗚嗚嗚嗚...』"),
        ]),
        "Girl1": new Plot("Girl1", [
            new Paragraph("我也在養寶可夢，如果夠強的話還可以當你的保鑣呢！"),
            new Paragraph("$MY_NAME『阿不就好棒棒』"),
            new Paragraph("倫加4女森耶。我要去4,4ㄌ888"),
            new MoveCharacter({to:new Position(4,4)})
        ]),
        "Fatty": new Plot("Fatty", [
            new Paragraph("肥宅工程師『從寫完就可以睡覺了』"),
            new Paragraph("工程師立了一個flag"),
            new Paragraph("RRRRRR"),
            new Script(function(){this.fatherPlot.npc.visible=false;}),
        ]),
        "RivalsSisterMap": new Plot("RivalsSisterMap", [
            new Paragraph("聽說大木老頭找你跑腿阿？真辛苦（嘲諷意味）！"),
            new Paragraph("這給你用吧！"),
            new GiveProp({name:"地圖"})
            /*new Paragraph("在道具中使用城鎮地圖，可以看到自己在哪兒"),*/
        ],()=> !GameSystem.protagonist._props.find(ele=>ele.name==="地圖")),
        "RivalsSister": new Plot("RivalsSister", [
            new Paragraph("經常在一起能與寶可夢建立良好關係"),
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
        ]),
        
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
 
    Drama["Others"] = {
        '卡迪諾狂新聞':new Plot("卡迪諾狂新聞",[
            new Paragraph("歡迎來到本周的卡迪諾狂新聞",undefined,undefined,undefined,false),
            new Paragraph("$MY_NAME9 4 8 7 9 4 狂",undefined,undefined,undefined,false)
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
    Drama["Mart"]={
        'Seller':new Plot("Seller",[
        new Script(function(){
            var container=GameSystem.HTMLObjectContainer;
            var buySellDialog=container.buySellDialog;
            container.show();
            buySellDialog.show();
            var that=this;
            buySellDialog.onHide=function()
            {
                that.next();
            }
        },{autoNext:false})])
    };
    Drama["FightEnd"]={
        'Rival':new Plot("RivalFightEnd",[
            new Paragraph("$RIVAL_NAME『$MY_NAME，你贏了"),
            new Paragraph("這附近已經沒人欄的住你了...."),
            new Paragraph("往北兩個城市去'尼比市'找小剛PK吧")
        ]),
        'Camper':new Plot("CamperEnd",[
            new Paragraph("帳棚青年『$MY_NAME，你贏了"),
            new Paragraph("你可以去找小剛了"),
            new Paragraph("對了，小剛很強喔，他可是最終BOSS"),
            new Paragraph("還有要打我隨時都可以找我對話..."),
        ]),
        'LittleGan':new Plot("littleGan",
        [
                new Paragraph("小剛『$MY_NAME，你贏了"),
                new Paragraph("你已經稱霸'黃叫獸'的世界了"),
                new Script(function(){
                    var mainChar=GameSystem.protagonist;
                    if(mainChar.storyLineIndex>5)
                        this.plot.end();
                    else 
                        this.next();
                },{autoNext:false}),
                new Paragraph("讓你看看未來吧..."),
                new Script(function(){
                    var mainChar=GameSystem.protagonist;
                    mainChar.Position=new GameSystem.Classes.Position(6,8);
                    //var container=new DisplayInformation.AutoKeyInput.Text(text = "", prefixString = "", postfixString = "", displayHTMLClass, createElementTypeString = "div", father);
                    this.plot.end();
                    mainChar.atMap="final";
                    
                },{autoNext:false})
        ]),
    }
    Drama["Hospital"]={
        'JoiSan':new Plot("JoiSan",[
            new Paragraph("喬伊小姐『讓我看看！$MY_NAME』"),
            new Paragraph("好…"),
            new CureAll(),
            new Paragraph("你跟寶可夢都這麼有精神阿\n那小心一點喔"),
            new Paragraph("¡Adios!",undefined,undefined,"es")
        ]),
        'Patient':new Plot("Patient",[
            new Paragraph("患者『我東西被偷了！$MY_NAME，哀…』"),
            new Paragraph("$MY_NAME『我不想知道』"),
            new Paragraph("患者『我的心被喬伊小姐偷了』"),
            new Paragraph("$MY_NAME『嘔嘔嘔嘔嘔嘔』")
        ]),
    }

}
GameSystem.loaded();




