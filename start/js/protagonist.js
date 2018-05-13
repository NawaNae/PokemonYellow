/**
 * @class Protagonist
 * @classdesc 主人公。表示玩家操縱的角色。
 * 
 * @prop {string} atMap 主人公所在的地圖之名稱。
 * @prop {GameSystem.Classes.Pokemon[]} pokemons 主人公所擁有的寶可夢。
 * @prop {GameSystem.Classes.PropItem[]} props 主人公所擁有的道具。
 * @prop {number} money 主人公的金錢。
 * @prop {GameSystem.Classes.Position} screenPosition 主人公在螢幕上的位置。
 */
GameSystem.Classes.Protagonist = 
class Protagonist extends GameSystem.Classes.Character {
    constructor(name = "", position=new GameSystem.Classes.Position(3,6), atMap= "protagonistHome2F", storyLineIndex=0) {
        super(name,undefined, position,new GameSystem.Classes.Image( //picture
            define.characterImagePath+"protagonist.png",
            {
                cutStartPosition:{x:0,y:0},
                cutSize:{x:16,y:16}
            }
        ));
        this.storyLineIndex=storyLineIndex;
        this._atMap = atMap;
        this._pokemons = [];
        this._props = [];
        this._money = 3000;
        this._screenPosition=GameSystem.Classes.Protagonist.ScreenPosition;
    }
    copyFrom(mainChar)
    {
        super.copyFrom(mainChar);
        if(!mainChar)return;
        this.storyLineIndex=mainChar.storyLineIndex||this.storyLineIndex;
        this.atMap=mainChar._atMap||mainChar.atMap||this.atMap;
        this.props=mainChar._props||mainChar.props||this._props;
        this.money=mainChar._money||mainChar.money||this._money;
    }
    initialize()
    {
       //this.initAnimationImages();
       this.initializeAnimationLists10PbySrc();
    }
    initAnimationImages()
    {
        var GS = GameSystem, CS = GS.Classes, Item = CS.AnimationItem, Position = CS.Position;
        var quickItem = (group, x, y=0) => new Item(
            define.characterImagePath + "protagonist.png",
            {
                group: group,
                cutStartPosition: new Position(x, y),
                cutSize: new Position(1, 1)
            }
        )
        this.animationLists.Up.push(quickItem("Up", 0));
        this.animationLists.Up.push(quickItem("Up", 1));
        this.animationLists.Up.push(quickItem("Up", 0));
        this.animationLists.Up.push(quickItem("Up", 2));
        
        this.animationLists.Down.push(quickItem("Down", 3));
        this.animationLists.Down.push(quickItem("Down", 4));
        this.animationLists.Down.push(quickItem("Down", 3));
        this.animationLists.Down.push(quickItem("Down", 5));

        this.animationLists.Left.push(quickItem("Left", 6));
        this.animationLists.Left.push(quickItem("Left", 7));


        this.animationLists.Right.push(quickItem("Right", 8));
        this.animationLists.Right.push(quickItem("Right", 9));
    }
    updateImagePosition()
    {
        let pos=GameSystem.Classes.Protagonist.ScreenPosition.toPoint();
        if(this._image)
        {
            this.image.position.x=pos.x;
            this.image.position.y=pos.y;
        }
    }
    set atMap(newMap) { 
        this._atMap = newMap 
        Framework.Game.goToLevel(newMap);
    }
    get atMap() { return this._atMap; }

    set position(np){super.position=np;this.updateImagePosition();}
    get position(){return super.position;}
    set money(newMoney) { this._money = newMoney; }
    get money() { return this._money; }

    /**
     * 減少目前身上的金錢量。
     * @param {number} cost 花費、減少的金額量。
     * @return {boolean}是否扣除金額成功。若所持金錢數量足夠扣除，則回傳true，反之false。
     */
    costMoney(cost) {
        if (this._money >= cost) {
            this._money -= cost;
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * 增加目前身上的金錢量。
     * @param {number} money 增加的金錢量。
     * @return {number}是否增加金額成功。
     */
    earnMoney(money) {
        this._money += money;
        return true;
    }
    get x()
    {return this.point.x;}
    set x(val)
    {
        var Point=GameSystem.Classes.Point,screenPoint=this._screenPosition.toPoint(),mapPos=Framework.Game._currentLevel.map.position;
        mapPos.x=-val+screenPoint.x;
    } 
    get y()
    {return this.point.y;}
    set y(val)
    {
    var Point=GameSystem.Classes.Point,screenPoint=this._screenPosition.toPoint(),mapPos=Framework.Game._currentLevel.map.position;
    mapPos.y=-val+screenPoint.y;}
    get point()
    {
        var Point=GameSystem.Classes.Point,screenPoint=this._screenPosition.toPoint(),mapPos=(Framework&&Framework.Game&&Framework.Game._currentLevel&&Framework.Game._currentLevel.map)?Framework.Game._currentLevel.map.position:undefined;
        if(!mapPos){console.log("無法取得Map以至於算不出主角座標點位置");return this.position.toPoint();}
        return new Point(screenPoint.x-mapPos.x,screenPoint.y-mapPos.y);
    }
    set point(val)
    {
        var Point=GameSystem.Classes.Point,screenPoint=this._screenPosition.toPoint(),map=Framework.Game._currentLevel.map;
        val=val.constructor.name==="Position"?val.toPoint():val;
        map.x=-val.x+screenPoint.x;
        map.y=-val.y+screenPoint.y;
    }
}
GameSystem.Classes.Protagonist.ScreenPosition= Object.freeze(new GameSystem.Classes.Position(4,4));