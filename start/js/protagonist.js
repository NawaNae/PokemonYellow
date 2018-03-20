GameSystem.Classes.Protagonist = 
class Protagonist extends GameSystem.Classes.Character {
    constructor(name = "", position, image, atMap) {
        super(name, position, image);
        this._atMap = atMap;
        this._pokemons = [];
        this._props = [];
        this._money = 3000;
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
     * @return 增加的金錢量是否成功。
     */
    earnMoney(money) {
        this._money += money;
        return true;
    }
}