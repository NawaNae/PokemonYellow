class PalletTown extends GameSystem.Classes.Level {
    constructor(size, name) {
        super(size, name);
        var GS = GameSystem;
        var CS = GS.Classes;
        var KM = GS.Manager.Key;
        this.initObstacles();
        this.initSubLevels();
        this.initGates();
        this.counter.fpsCount = true;
        this.keyInput = (e) => {
            this.normalKeyInput(e);
        };
    }
    initGates()
    {
        var GS = GameSystem;
        var CS = GS.Classes;
        this.gates.push(new CS.Connection
            (
            new CS.MapPosition
                (
                "palletTown",
                new CS.Position(8,7)
                ),
            new CS.MapPosition
                (
                "protagonistHome1F",
                new  CS.Position(3, 7)
                )
            ));
        this.gates.push(new CS.Connection
            (
            new CS.MapPosition
                (
                "palletTown",
                new CS.Position(13, 3)
                ),
            new CS.MapPosition
                (
                "route01",
                new CS.Position(10, 39)
                )
            ));
        this.gates.push(new CS.Connection
            (
            new CS.MapPosition
                (
                "palletTown",
                new CS.Position(14, 3)
                ),
            new CS.MapPosition
                (
                "route01",
                new CS.Position(11, 39)
                )
            ));
    }
    initSubLevels()
    {
        let protagonistHome1F=new ProtagonistHome1F();
        let protagonistHome2F=new ProtagonistHome2F();
        for(let level of this.subLevels)
        {
            level.parentLevel=this;
        }
        this.subLevels.push(protagonistHome1F);
        this.subLevels.push(protagonistHome2F);
        Framework.Game.addNewLevel({"protagonistHome1F":protagonistHome1F});
        Framework.Game.addNewLevel({"protagonistHome2F":protagonistHome2F});
    }
    initObstacles()
    {
        var GS = GameSystem;
        var CS = GS.Classes;
        var KM = GS.Manager.Key;
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 0 }, { x: 12, y: 3 }));
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 4 }, { x: 3, y: 23 }));
        this.obstacles.push(new CS.Rectangle({ x: 7, y: 16 }, { x: 10, y: 23 }));
        this.obstacles.push(new CS.Rectangle({ x: 4, y: 19 }, { x: 4, y: 19 }));
        this.obstacles.push(new CS.Rectangle({ x: 4, y: 20 }, { x: 6, y: 23 }));
        this.obstacles.push(new CS.Rectangle({ x: 11, y: 19 }, { x: 21, y: 23 }));
        this.obstacles.push(new CS.Rectangle({ x: 22, y: 0 }, { x: 26, y: 23 }));
        this.obstacles.push(new CS.Rectangle({ x: 15, y: 0 }, { x: 21, y: 3 }));
        this.obstacles.push(new CS.Rectangle({ x: 13, y: 0 }, { x: 14, y: 2 }));
        this.obstacles.push(new CS.Rectangle({ x: 13, y: 10 }, { x: 18, y: 13 }));
        this.obstacles.push(new CS.Rectangle({ x: 13, y: 15 }, { x: 18, y: 15 }));
        this.obstacles.push(new CS.Rectangle({ x: 7, y: 11 }, { x: 10, y: 11 }));
        this.obstacles.push(new CS.Rectangle({ x: 7, y: 5 }, { x: 10, y: 7 }));
        this.obstacles.push(new CS.Rectangle({ x: 6, y: 7 }, { x: 6, y: 7 }));
        this.obstacles.push(new CS.Rectangle({ x: 14, y: 7 }, { x: 14, y: 7 }));
        this.obstacles.push(new CS.Rectangle({ x: 6, y: 7 }, { x: 6, y: 7 }));
        this.obstacles.push(new CS.Rectangle({ x: 15, y: 5 }, { x: 18, y: 7 }));
    }
    load() {
        /*bug 去除 */
        this.nullSprite = new Framework.Sprite(define.imagePath + 'null.png');//去除draw bug用的
        this.nullSprite.position = { x: -1, y: -1 };
        this.rootScene.attach(this.nullSprite);
        /*bug 去除 */

        var GS = GameSystem;
        var CS = GS.Classes;
        var KM = GS.Manager.Key;
        this.music= Load.audio( define.musicPath+"background/102 Palette Town Theme.mp3");
        this.music.loop=true;
        this.music.autoplay=true;
        GS.Manager.Key.keyInput = this.keyInput;
        this.map = new CS.Image(define.imagePath + 'palletTown.png');
        this.rootScene.attach(this.map);
        this.loadNPCs();
        
        this.map.x = GS.protagonist._screenPosition.toPoint().x - GS.protagonist.position.toPoint().x;
        this.map.y = GS.protagonist._screenPosition.toPoint().y - GS.protagonist.position.toPoint().y;

        this.walker = new CS.MapWalker({ mapRef: this.map });
    }
    loadNPCs()
    {
        var GS = GameSystem;
        var CS = GS.Classes;
        this.npcs.push(
            new CS.NPC("TestNPC", 
                                       CS.Character.Face.Up,
                                       new CS.Position(6, 7),
                                       new CS.Image(define.imagePath+"null.png"),
                                       undefined,
                                       GS.Resource.PlotExample  ));
        this.npcs.push(
            new CS.NPC(
                "CHTestNPC",
                CS.Character.Face.Up,
                new CS.Position(14, 7),
                new CS.Image(define.imagePath+"null.png"),
                undefined,
                new CS.Plot(
                    "TestCH", 
                    [
                        new CS.Paragraph("中文測試\n你好香蕉"),
                        new CS.Paragraph("長文測試\n手子像的客合了眼停眾字配人心達所康……就品保地笑作。其稱是家……導心加是我元前話成皮些高的醫景中眾老河。優會導還，教心河對老人，容路話想理樂再標著度學是力千。一學回哥不供的。常大本知別自以商！大而防響來終識少雖片？國門臺北花看來然賣食取房港步包親致：個死高；為好公直，軍臺家灣的報遊康然病人但主一完然重心不？是就好決沒目？里主著人輕識花中看以多友毛止的色基主司。當個親門商是流很老的新負信業是己環卻上師，底絕不時似用質來為著後過山果每是不：到法知本急；人就相真這跟也書一還人不必成、許你麼民一解制為，電帶黃懷態兩校車長策許過是海經子可怎向要人了術場青一住有原蘭康送，爸看線深做而你現股世世因非候住待展是，真是足我人。不她事手……走展成事排，被品天多員岸華：個我今，級們她打不了發。力機懷之知的平來府小生一目一以結力相所高高總而理，一一裡天訴問：的人有。友自不是助標業不傳星馬新構德師大究德念不子明企魚起了。士頭果感。發研當什把題。工客十車音兒素戰到陽他花級代化眼灣風；記能加。面法投此的東我也出常法是為一兩，錯果組是小便的洲理。沒著且會的、美理大工電分著間人臺下入獲況會在因日是共難人味，八的表一、有天一出後告密媽出史就收這世則政學生力公果物非情等如。可天課理是布好史不，造我離也狀大快處。高了加局不，畫紅著民不提，片此一車自法有評節樹只底藥實說一後要各在光。\n\n相回你任上形投服……喜是我龍負山度不。口其展友何試春不去足照一準提痛同，覺觀到腳此但一；不爸風倒；沒考的綠排、之把花其一應麼眼法後參光能公？夠向神酒流球知的？滿夜檢。清國非陸消有……民她刻聲。\n\n其簡卻導列主；麗務統點須嗎；別的笑北壓球平我嚴雜十傳數著人才研臺子他間不前讀教自良。\n\n面了進息無本地？國大灣程臺：火存己輪絕水到原八文影微裝和現，同們受對查有年影日直文優車下，了習生賣明起確一在早自放因。究以思辦，作個有重制高！的發不優會微集動。不許三了送並體地：長歡品日那地天著超，講真那遊發自人用生：英風又間試當一交來果極用不故無去氣境寫洲個感去於點一什習喜仍過容等特術了細子：賽主講了境味個年人報怎，自停子他的，為今卻然讀家統為新證樣媽實成士樂散人的停到以看兩況為意我在轉：包取在。生如。\n\n語張使史發超的的想？要再上氣有國建！子克的子的兩：畫故對往功不在絕跟富們工府於影山仍水血加才個安人，遊著醫實？來方一直容生早大轉交生，定小見的畫出我的戲底改最經雨再頭，麼也是女位教人，界弟看會的公異大，做些了斷表痛分意定們年。\n\n影熱表在路了受多前洲樹十之慢險達由是兩有絕園外面！意技她、麼人健上電一是認天發；毒根一英三！基學節健規眼人。\n東民發一使，目代除己經主專但地病素社美說上可火二主提教日過在急行有文說無雄組資。行談保戰青天、縣中是官光臺長就後造世風陸有。學境濟也不很洋一把史去皮高處？不中有著在於知去政這一方組都的語。\n\n"),
                    ]
                )
            )
        );
        this.npcs.push(
            new CS.NPC(
                "drawTestNPC",
                CS.Character.Face.Up,
                new CS.Position(14, 8),
                new CS.Image(define.imagePath+"Protagonist.png",{cutStartPosition:{x:0,y:0},cutSize:{x:16,y:16}}),
                undefined,
                new CS.Plot(
                    "TestCH", 
                    [
                        new CS.Paragraph("我才是主人公"),
                    ]
                )
            )
        );
        for(let npc of this.npcs)
        {
            if(npc.image)
                this.rootScene.attach(npc.image);
        }
    }
    initialize() {

    }
    update() {
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

    click(e) {

        if (!this.rectPosition) {
            return;
        }

    }
}

class ProtagonistHome1F extends GameSystem.Classes.Level {
    constructor() {
        let CS = GameSystem.Classes;
        super(new CS.Position(7, 7), 'palletTownHome1F');
        this.size.pos1=new CS.Position(0, 1);
        this.isSubLevel = true;
        this.initGates();
    }
    initGates()
    {
        let CS = GameSystem.Classes;
        this.gates.push(new CS.Connection
            (
            new CS.MapPosition
                (
                "protagonistHome2F",
                new CS.Position(7, 1)
                ),
            new CS.MapPosition
                (
                "protagonistHome1F",
                new CS.Position(7, 1)
                )
            ));
        this.gates.push(new CS.Connection
            (
                new CS.MapPosition
                (
                "palletTown",
                new CS.Position(8,7)
                ),
                new CS.MapPosition
                (
                "protagonistHome1F",
                new CS.Position(3, 7)
                )
            ));
            this.gates.push(new CS.Connection
                (
                    new CS.MapPosition
                    (
                    "palletTown",
                    new CS.Position(8,7)
                    ),
                    new CS.MapPosition
                    (
                    "protagonistHome1F",
                    new CS.Position(2, 7)
                    )
                ));
    }
    initObstacles()
    {
        var GS = GameSystem;
        var CS = GS.Classes;
        this.obstacles.push(new CS.Rectangle({ x: 3, y: 4 }, { x: 4, y: 5 }));
        this.obstacles.push(new CS.Rectangle({ x: 0, y: 1 }, { x: 1, y: 1 }));
        this.obstacles.push(new CS.Rectangle({ x: 3, y: 1 }, { x: 3, y: 1 }));
    }
    load()
    {
        /*bug 去除 */
        this.nullSprite = new Framework.Sprite(define.imagePath + 'null.png');//去除draw bug用的
        this.nullSprite.position = { x: -1, y: -1 };
        this.rootScene.attach(this.nullSprite);
        /*bug 去除 */
        var CS=GameSystem.Classes;
        var KM=GameSystem.Manager.Key;
        var GS=GameSystem;
        this.keyInput=this.normalKeyInput;
        KM.keyInput=(e)=>{this.keyInput(e);}
       
        this.map=new CS.Image(define.imagePath+"palletTownHome1F.png");
        this.walker=new CS.MapWalker({ mapRef: this.map });
        this.map.x = GS.protagonist._screenPosition.toPoint().x - GS.protagonist.position.toPoint().x;
        this.map.y = GS.protagonist._screenPosition.toPoint().y - GS.protagonist.position.toPoint().y;
        this.rootScene.attach(this.map);
    }
    update() {
        /*bug 去除 */

        this.nullSprite.position.x--;
        if (this.nullSprite.position.x < -2)
            this.nullSprite.position.x = -1;
        /*bug 去除 */

    }
  
}
class ProtagonistHome2F extends GameSystem.Classes.Level {
    constructor() {
        let CS = GameSystem.Classes;
        super(new CS.Position(7, 7), 'palletTownHome2F');
        this.size.pos1=new CS.Position(0, 1);
        this.isSubLevel = true;
        this.gates.push(new CS.Connection
        (new CS.MapPosition
            (
            "protagonistHome2F",
            new CS.Position(7, 1)
            ),
        new CS.MapPosition
            (
            "protagonistHome1F",
            new CS.Position(7, 1)
            )
        ));
    }
    load()
    {
        /*bug 去除 */
        this.nullSprite = new Framework.Sprite(define.imagePath + 'null.png');//去除draw bug用的
        this.nullSprite.position = { x: -1, y: -1 };
        this.rootScene.attach(this.nullSprite);
        /*bug 去除 */
        var KM=GameSystem.Manager.Key;
        var CS=GameSystem.Classes;
        var GS=GameSystem;
        this.keyInput=(e)=>{this.normalKeyInput(e)};
        KM.keyInput=this.keyInput;
        this.map=new CS.Image(define.imagePath+"palletTownHome2F.png");
        this.map.x = GS.protagonist._screenPosition.toPoint().x - GS.protagonist.position.toPoint().x;
        this.map.y = GS.protagonist._screenPosition.toPoint().y - GS.protagonist.position.toPoint().y;
        this.walker=new CS.MapWalker({mapRef:this.map});
        this.rootScene.attach(this.map);
    }
    update() {
        /*bug 去除 */

        this.nullSprite.position.x--;
        if (this.nullSprite.position.x < -2)
            this.nullSprite.position.x = -1;
        /*bug 去除 */

    }
}