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
    constructor(name = "", position, image, atMap) {
        super(name,undefined, position, image);
        this._atMap = atMap;
        this._pokemons = [];
        this._props = [];
        this._money = 3000;
        this._screenPosition=GameSystem.Classes.Protagonist.ScreenPosition;
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
    set atMap(newMap) { this._atMap = newMap }
    get atMap() { return this._atMap; }

    set money(newMap) { this._money = money; }
    get money() { return this._money; }

    /**
     * 減少目前身上的金錢量。
     * @param {number} cost 花費、減少的金額量。
     * @return 是否扣除金額成功。若所持金錢數量足夠扣除，則回傳true，反之false。
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
     * @return 是否增加金額成功。
     */
    earnMoney(money) {
        this._money += money;
        return true;
    }
}
GameSystem.Classes.Protagonist.ScreenPosition= Object.freeze(new GameSystem.Classes.Position(4,4));