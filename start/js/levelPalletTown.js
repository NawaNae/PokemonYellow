class PalletTown extends GameSystem.Classes.Level {
    constructor(size, name) {
        super(size, name);
        var GS = GameSystem;
        var CS = GS.Classes;
        var KM = GS.Manager.Key;
        let protagonistHome1F=new ProtagonistHome1F();
        let protagonistHome2F=new ProtagonistHome2F();
        for(let level of this.subLevels)
        {
            level.parentLevel=this;
        }
        this.subLevels.push(protagonistHome1F);
        this.subLevels.push(protagonistHome2F);
        this.npcs.push(
            new GameSystem.Classes.NPC("TestNPC", 
                                       CS.Character.Face.Up,
                                       new CS.Position(6, 7),
                                       CS.Image("URL"),
                                       undefined,
                                       GS.Resource.PlotExample  ));

        Framework.Game.addNewLevel({"protagonistHome1F":protagonistHome1F});
        Framework.Game.addNewLevel({"protagonistHome2F":protagonistHome2F});
        this.counter =
            new (class Counter {
                constructor(countTo) {
                    this.count = 0;
                    this.lastTime = 0;
                    this.countTo = countTo;
                    this.fpsNow = 0;
                    this._fpsCount = false;

                }
                set fpsCount(value) {
                    this._fpsCount = value;
                    if (value) {
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
        //this.counter.fpsCount = true;
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
            
            this.keyInput = (e) => {
                this.normalKeyInput(e);
            };
        
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

        GS.Manager.Key.keyInput = this.keyInput;

        this.map = new CS.Image(define.imagePath + 'palletTown.png');
        this.map.x = GS.protagonist._screenPosition.toPoint().x - GS.protagonist.position.toPoint().x;
        this.map.y = GS.protagonist._screenPosition.toPoint().y - GS.protagonist.position.toPoint().y;
        this.rootScene.attach(this.map);
  


        this.walker = new CS.MapWalker({ mapRef: this.map });






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