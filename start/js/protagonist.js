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

    get pokemons() { this._pokemons; }

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
     * @return {boolean} 是否增加金額成功。
     */
    earnMoney(money) {
        this._money += money;
        return true;
    }

    /**
     * 新增一個新的寶可夢至主人公上。
     * @param {GameSystem.Classes.Pokemon} newPokemon 新的寶可夢。
     */
    addPokemon(newPokemon) {
        this._pokemons.push(newPokemon);
    }

    /**
     * 新增道具至角色上。
     * @param {GameSystem.Classes.PropItem} newItem 新的道具。
     */
    addPropItem(newItem) {
        let index = this._props.reduce((prop, targetIndex, index) => targetIndex < 0 && prop.name == newItem.name ? index : targetIndex, -1);
        if (index >= 0) {
            this._props[index].count += newItem.count;
        }
        else {
            this._props.push(newItem);
        }
    }

    /**
     * 減少指定道具的堆疊數量。
     * @param {GameSystem.Classes.PropItem | number} specify 指定要減少的道具。
     * @return {boolean} 是否成功減少。
     */
    decreaseSpecifiedPropItem(specify) {
        if (typeof specify == 'number') {
            let propItem = this._props[specify];
            // 若指定要刪除的道具存在
            if (propItem) {
                propItem.count -= 1;
                // 若堆疊數量為0，則移除
                if (propItem.count <= 0) {
                    this._props.splice(specify, 1);
                }
                return true;
            }
            else {
                return false;
            }
        }
        else {
            let index = this._props.indexOf(specify);
            // 若該道具存在於使用者上
            if (index >= 0) {
                specify.count -= 1;
                // 若道具堆疊為0
                if (specify.count <= 0) {
                    this._props.splice(index, 1);
                }
                return true;
            }
            else {
                return false;
            }
        }
    }

    /**
     * 以名稱來尋找指定的道具，並回傳其索引。
     * @param {string} propName 欲尋找的道具之名稱。
     * @return {number} 該道具的索引位置。
     */
    indexOfPropItemName(propName) {
        return this._props.reduce((prop, targetIndex, index) => targetIndex < 0 && propName == prop.name ? index : targetIndex, -1);
    }
}
GameSystem.Classes.Protagonist.ScreenPosition= Object.freeze(new GameSystem.Classes.Position(4,4));