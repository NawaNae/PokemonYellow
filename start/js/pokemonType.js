/**
 * 寶可夢基本狀態值的資料。
 * @typedef BasicStandardStatData
 * @prop {number} maxHP 最大生命值。
 * @prop {number} attack 攻擊力。
 * @prop {number} defense 防禦力。
 * @prop {number} special 特殊值。
 * @prop {number} speed 速度值。
 */

/**
 * @class PokemonType
 * @classdesc 寶可夢種類。紀錄了該種寶可夢的編號、名稱等等資料。
 */
GameSystem.Classes.PokemonType =
class PokemonType extends GameSystem.Classes.StandardStat {
    /**
     * @param {BasicStandardStatData} basicStat 寶可夢基本的五種屬性值。
     * @param {number} id 此種寶可夢的編號。
     * @param {GameSystem.Classes.Image} image 此種寶可夢的圖示。
     * @param {string} name 寶可夢的種族名稱。
     * @param {GameSystem.Classes.StandardStat.Type[]?} types 此種寶可夢所擁有的屬性。
     * @param {GameSystem.Classes.Move[]?} usableMoves 此種寶可夢所有可用的招式。
     */
    constructor(basicStat, id, image, name, types, usableMoves) {
        super(basicStat.maxHP, basicStat.attack, basicStat.defense, basicStat.special, basicStat.speed);
        this._id = id;
        this._image = image;
        this._name = name;
        this._types = types || new Set([]);
        this._usableMoves = usableMoves || new Set([]);
    }

    set id(newId) { this._id = newId; }
    get id() { return this._id; }

    set image(newImage) { this._image = newImage; }
    get image() { return this._image; }

    set name(newName) { this._name = newName; }
    get name() { return this._name; }

    /**
     * 新增屬性至屬性清單(type)之中
     * @param {GameSystem.Classes.Move} newType 要新增的屬性。
     */
    addType(newType) {
        this._usableMoves.add(newType);
    }

    /**
     * 將指定的招式自可用招式清單(usableMoves)中移除。
     * @param {GameSystem.Classes.Move} targetType 要移除的目標屬性。
     * @return {boolean} 移除動作是否成功。不成功表示原先的集合中就不存在該招式。
     */
    removeType(targetType) {
        return this._usableMoves.delete(targetType);
    }

    /**
     * 新增招式至可用招式清單之中(usableMoves)。
     * @param {GameSystem.Classes.Move} newMove 要新增的招式。
     */
    addMove(newMove) {
        this._usableMoves.add(newMove);
    }

    /**
     * 將指定的招式自可用招式清單(usableMoves)中移除。
     * @param {GameSystem.Classes.Move} targetMove 要移除的目標招式。
     * @return {boolean} 移除動作是否成功。不成功表示原先的集合中就不存在該招式。
     */
    removeMove(targetMove) {
        return this._usableMoves.delete(targetMove);
    }
}