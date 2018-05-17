/**
 * @class BattleField
 * 
 * @prop {GameSystem.Classes.Rectangle} area 會遇到的野生寶可夢的矩陣範圍。
 * @prop {GameSystem.Classes.Occurrence[]} events 遇到寶可夢的機率清單。
 * @prop {number} steps 紀錄玩家走此草叢的步數。用於計算機率而用。
 */
GameSystem.Classes.BattleField =
class BattleField {
    /**
     * @param {GameSystem.Classes.Rectangle} area 會遇到的野生寶可夢的矩陣範圍。
     * @param {GameSystem.Classes.Occurrence[]?} occurrences 遇到寶可夢的機率清單。
     */
    constructor(area, occurrences = []) {
        this._area = area;
        this._steps = 0;
        if (BattleField.isCompleteProbability(occurrences)) {
            this._events = occurrences;
        }
        else {
            throw new Error("BattleField constructor: the sum of pokemon's occuring probability must less than or equal to 100.");
        }
    }

    get area() { return this._area; }
    set area(newArea) { this._area = newArea; }
    
    get occurrences() { return this._events; }
    set occurrences(newOccurrences) {
        if (BattleField.isCompleteProbability(newOccurrences)) {
            this._events = newOccurrences;
        }
        else {
            throw new Error("BattleField setter: the sum of pokemon's occuring probability must less than or equal to 100.");
        }
    }

    /**
     * 新增寶可夢出現機率。
     * 若原先就有相同寶可夢種類的出現機率物件在清單中，則會以新的機率覆蓋它。
     * @param {GameSystem.Classes.Occurrence} newOccurrence 新的寶可夢出現機率物件。
     * @return {boolean} 表示是否有覆蓋發生。
     */
    addOccurrence(newOccurrence) {
        // 先確認新機率加入後是否不使整體機率超過100%
        if (this._events.reduce((sum, ocur) => sum + ocur.probabilty, 0) + newOccurrence.probabilty <= 100) {
            let index = this._events.reduce((index, ocur, curIndex) => (index < 0 && ocur.pokemonType == newOccurrence.pokemonType) ? curIndex : index, -1);
            if (index >= 0) {
                this._events[index] = newOccurrence;
                return true;
            }
            else {
                this._events.push(newOccurrence);
                return false;
            }
        }
        else {
            throw new Error("BattleField addOccurrence: the sum of pokemon's occuring probability must less than or equal to 100.");
        }
    }

    /**
     * 透過寶可夢種類(PokemonType)來尋找，刪除指定的寶可夢發生機率物件。
     * @param {string} name 指定的寶可夢種族名稱。
     * @return {boolean} 刪除是否成功。
     */
    removeOccurrenceByPokemonTypeName(name) {
        let index = this._events.findIndex(ocur => ocur.pokemonType.name == name);
        if (index >= 0) {
            this._events.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * 觸發野生寶可夢出現的方法。
     * @param {GameSystem.Classes.Position?} position 玩家的位置。若未傳入此參數則視為玩家有在此出現野生寶可夢範圍內。
     * @return {GameSystem.Classes.Pokemon | undefined} 若有遇到野生寶可夢則回傳Pokemon；若無則回傳undefined。
     */
    trigger(position) {
        // 若有傳進position參數，則判斷該位置是否在範圍內
        const x=10;
        if (position && !position.isIn(this._area))
            return undefined;

        this._steps += 1;
        if (Math.random() <= BattleField.probabilityFormula(x) * 2) {
            this._steps = 0;
            let rndVal = Math.random() * 100;
            let base = 0;
            let occurrence = this._events.find(ocur => base <= rndVal && rndVal < base + ocur.probabilty ? true : (base += ocur.probabilty, false));
            // 若有取得到機率寶可夢
            if (occurrence) {
                let newPokemon = new GameSystem.Classes.Pokemon(occurrence.pokemonType.name, occurrence.pokemonType);
                newPokemon.level = occurrence.getLevelRandomly();
                newPokemon.updateAbilities();
                return newPokemon;
            }
            else {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    }

    /**
     * 檢查是否為完整機率。
     * @param {GameSystem.Classes.Occurrence[]} list 寶可夢遭遇機率清單。
     * @return {boolean} 總和機率是否小於等於100。
     */
    static isCompleteProbability(list) {
        return list.reduce((sum, ocur) => sum + ocur.probabilty, 0) <= 100;
    }

    /**
     * 寶可夢出現機率的公式。
     * @param {number} x 影響因素。
     */
    static probabilityFormula(x) {
        return 1 / (187.5 * x);
    }
};