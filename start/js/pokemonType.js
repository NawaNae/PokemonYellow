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
 * @extends GameSystem.Classes.StandardStat
 * @classdesc 寶可夢種類。紀錄了該種寶可夢的編號、名稱等等資料。
 * 
 * @prop {number} id 此寶可夢的編號。
 * @prop {GameSystem.Classes.Image} image 此種寶可夢的圖示。
 * @prop {GameSystem.Classes.Image} backImage 此種寶可夢的背圖示。
 * @prop {string} name 寶可夢的種族名稱。
 * @prop {GameSystem.Classes.Move[]} usableMoves 此種寶可夢所有可用的招式。
 * @prop {GameSystem.Classes.StandardStat.Type} typeA 此種寶可夢所擁有的第一屬性。
 * @prop {GameSystem.Classes.StandardStat.Type} typeB 此種寶可夢所擁有的第二屬性。此項可為空。
 */
GameSystem.Classes.PokemonType =
class PokemonType extends GameSystem.Classes.StandardStat {
    /**
     * @param {BasicStandardStatData} basicStat 寶可夢基本的五種屬性值。
     * @param {number} id 此種寶可夢的編號。
     * @param {GameSystem.Classes.Image} image 此種寶可夢的圖示。
     * @param {GameSystem.Classes.Image} backImage 此寶可夢的背圖示。
     * @param {string} name 寶可夢的種族名稱。
     * @param {GameSystem.Classes.Move[]?} usableMoves 此種寶可夢所有可用的招式。
     * @param {GameSystem.Classes.StandardStat.Type?} typeA 此種寶可夢所擁有的第一屬性。
     * @param {GameSystem.Classes.StandardStat.Type?} typeB 此種寶可夢所擁有的第二屬性。此項可為空。
     */
    constructor(basicStat, id, image, backImage, name, usableMoves, typeA, typeB) {
        super(basicStat.maxHP, basicStat.attack, basicStat.defense, basicStat.special, basicStat.speed);
        this._id = id;
        this._image = image;
        this._backImage = backImage;
        this._name = name;
        this._usableMoves = usableMoves || new Set([]);
        this._typeA = typeA;
        this._typeB = typeB;
    }

    set id(newId) { this._id = newId; }
    get id() { return this._id; }

    set image(newImage) { this._image = newImage; }
    get image() { return this._image; }

    set backImage(newBackImage) { this._backImage = newBackImage; }
    get backImage() { return this._backImage; }

    set name(newName) { this._name = newName; }
    get name() { return this._name; }

    set typeA(newType) { this._typeA = typeA; }
    get typeA() { return this._typeA; }

    set typeB(newType) { this._typeB = typeB; }
    get typeB() { return this._typeB; }

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

    /**
     * 取得寶可夢最初所能擁有的招式集。
     * @return {GameSystem.Classes.Move[]} 可用的初始招式清單。
     */
    GetInitialMove() {
        return this._usableMoves.filter(move => move.level == 1);
    }
}

/** 寶可夢字典 */
GameSystem.Classes.PokemonType.Dictionary = {};

// 初始化所有種類的寶可夢資料
(() => {
    let PokemonType = GameSystem.Classes.PokemonType;       // 取得「寶可夢種類」類別
    let Image = GameSystem.Classes.Image;                   // 取得「圖片」類別
    let DEX = GameSystem.Classes.PokemonType.Dictionary;    // 取得寶可夢字典
    let pokemonImagePath = define.imagePath + "pokemons/";  // 定義對應的寶可夢圖片目錄路徑
    let basicStat = {};                                     // 基本狀態值

    basicStat = {maxHP: 45, attack: 49, defense: 49, special: 65, speed: 45};
    DEX["Bulbasaur"] = new PokemonType(basicStat, 1, new Image(pokemonImagePath + "001_Bulbasaur.png"), new Image(pokemonImagePath + "001_Bulbasaur_Back.png"), "Bulbasaur");

    basicStat = {maxHP: 60, attack: 62, defense: 63, special: 80, speed: 60};
    DEX["Ivysaur"] = new PokemonType(basicStat, 2, new Image(pokemonImagePath + "002_Ivysaur.png"), new Image(pokemonImagePath + "002_Ivysaur_Back.png"), "Ivysaur");

    basicStat = {maxHP: 80, attack: 82, defense: 83, special: 100, speed: 80};
    DEX["Venusaur"] = new PokemonType(basicStat, 3, new Image(pokemonImagePath + "003_Venusaur.png"), new Image(pokemonImagePath + "003_Venusaur_Back.png"), "Venusaur");

    basicStat = {maxHP: 39, attack: 52, defense: 43, special: 50, speed: 65};
    DEX["Charmander"] = new PokemonType(basicStat, 4, new Image(pokemonImagePath + "004_Charmander.png"), new Image(pokemonImagePath + "004_Charmander_Back.png"), "Charmander");

    basicStat = {maxHP: 58, attack: 64, defense: 58, special: 65, speed: 80};
    DEX["Charmeleon"] = new PokemonType(basicStat, 5, new Image(pokemonImagePath + "005_Charmeleon.png"), new Image(pokemonImagePath + "005_Charmeleon_Back.png"), "Charmeleon");

    basicStat = {maxHP: 78, attack: 84, defense: 78, special: 85, speed: 100};
    DEX["Charizard"] = new PokemonType(basicStat, 6, new Image(pokemonImagePath + "006_Charizard.png"), new Image(pokemonImagePath + "006_Charizard_Back.png"), "Charizard");

    basicStat = {maxHP: 44, attack: 48, defense: 65, special: 50, speed: 43};
    DEX["Squirtle"] = new PokemonType(basicStat, 7, new Image(pokemonImagePath + "007_Squirtle.png"), new Image(pokemonImagePath + "007_Squirtle_Back.png"), "Squirtle");

    basicStat = {maxHP: 59, attack: 63, defense: 80, special: 65, speed: 58};
    DEX["Wartortle"] = new PokemonType(basicStat, 8, new Image(pokemonImagePath + "008_Wartortle.png"), new Image(pokemonImagePath + "008_Wartortle_Back.png"), "Wartortle");

    basicStat = {maxHP: 79, attack: 83, defense: 100, special: 85, speed: 78};
    DEX["Blastoise"] = new PokemonType(basicStat, 9, new Image(pokemonImagePath + "009_Blastoise.png"), new Image(pokemonImagePath + "009_Blastoise_Back.png"), "Blastoise");

    basicStat = {maxHP: 45, attack: 30, defense: 35, special: 20, speed: 45};
    DEX["Caterpie"] = new PokemonType(basicStat, 10, new Image(pokemonImagePath + "010_Caterpie.png"), new Image(pokemonImagePath + "010_Caterpie_Back.png"), "Caterpie");

    basicStat = {maxHP: 50, attack: 20, defense: 55, special: 25, speed: 30};
    DEX["Metapod"] = new PokemonType(basicStat, 11, new Image(pokemonImagePath + "011_Metapod.png"), new Image(pokemonImagePath + "011_Metapod_Back.png"), "Metapod");

    basicStat = {maxHP: 60, attack: 45, defense: 50, special: 80, speed: 70};
    DEX["Butterfree"] = new PokemonType(basicStat, 12, new Image(pokemonImagePath + "012_Butterfree.png"), new Image(pokemonImagePath + "012_Butterfree_Back.png"), "Butterfree");

    basicStat = {maxHP: 40, attack: 35, defense: 30, special: 20, speed: 50};
    DEX["Weedle"] = new PokemonType(basicStat, 13, new Image(pokemonImagePath + "013_Weedle.png"), new Image(pokemonImagePath + "013_Weedle_Back.png"), "Weedle");

    basicStat = {maxHP: 45, attack: 25, defense: 50, special: 25, speed: 35};
    DEX["Kakuna"] = new PokemonType(basicStat, 14, new Image(pokemonImagePath + "014_Kakuna.png"), new Image(pokemonImagePath + "014_Kakuna_Back.png"), "Kakuna");

    basicStat = {maxHP: 65, attack: 80, defense: 40, special: 45, speed: 75};
    DEX["Beedrill"] = new PokemonType(basicStat, 15, new Image(pokemonImagePath + "015_Beedrill.png"), new Image(pokemonImagePath + "015_Beedrill_Back.png"), "Beedrill");

    basicStat = {maxHP: 40, attack: 45, defense: 40, special: 35, speed: 56};
    DEX["Pidgey"] = new PokemonType(basicStat, 16, new Image(pokemonImagePath + "016_Pidgey.png"), new Image(pokemonImagePath + "016_Pidgey_Back.png"), "Pidgey");

    basicStat = {maxHP: 63, attack: 60, defense: 55, special: 50, speed: 71};
    DEX["Pidgeotto"] = new PokemonType(basicStat, 17, new Image(pokemonImagePath + "017_Pidgeotto.png"), new Image(pokemonImagePath + "017_Pidgeotto_Back.png"), "Pidgeotto");

    basicStat = {maxHP: 83, attack: 80, defense: 75, special: 70, speed: 91};
    DEX["Pidgeot"] = new PokemonType(basicStat, 18, new Image(pokemonImagePath + "018_Pidgeot.png"), new Image(pokemonImagePath + "018_Pidgeot_Back.png"), "Pidgeot");

    basicStat = {maxHP: 30, attack: 56, defense: 35, special: 25, speed: 72};
    DEX["Rattata"] = new PokemonType(basicStat, 19, new Image(pokemonImagePath + "019_Rattata.png"), new Image(pokemonImagePath + "019_Rattata_Back.png"), "Rattata");

    basicStat = {maxHP: 55, attack: 81, defense: 60, special: 50, speed: 97};
    DEX["Raticate"] = new PokemonType(basicStat, 20, new Image(pokemonImagePath + "020_Raticate.png"), new Image(pokemonImagePath + "020_Raticate_Back.png"), "Raticate");

    basicStat = {maxHP: 40, attack: 60, defense: 30, special: 31, speed: 70};
    DEX["Spearow"] = new PokemonType(basicStat, 21, new Image(pokemonImagePath + "021_Spearow.png"), new Image(pokemonImagePath + "021_Spearow_Back.png"), "Spearow");

    basicStat = {maxHP: 65, attack: 90, defense: 65, special: 61, speed: 100};
    DEX["Fearow"] = new PokemonType(basicStat, 22, new Image(pokemonImagePath + "022_Fearow.png"), new Image(pokemonImagePath + "022_Fearow_Back.png"), "Fearow");

    basicStat = {maxHP: 35, attack: 60, defense: 44, special: 40, speed: 55};
    DEX["Ekans"] = new PokemonType(basicStat, 23, new Image(pokemonImagePath + "023_Ekans.png"), new Image(pokemonImagePath + "023_Ekans_Back.png"), "Ekans");

    basicStat = {maxHP: 60, attack: 85, defense: 69, special: 65, speed: 80};
    DEX["Arbok"] = new PokemonType(basicStat, 24, new Image(pokemonImagePath + "024_Arbok.png"), new Image(pokemonImagePath + "024_Arbok_Back.png"), "Arbok");

    basicStat = {maxHP: 35, attack: 55, defense: 30, special: 50, speed: 90};
    DEX["Pikachu"] = new PokemonType(basicStat, 25, new Image(pokemonImagePath + "025_Pikachu.png"), new Image(pokemonImagePath + "025_Pikachu_Back.png"), "Pikachu");

    basicStat = {maxHP: 60, attack: 90, defense: 55, special: 90, speed: 100};
    DEX["Raichu"] = new PokemonType(basicStat, 26, new Image(pokemonImagePath + "026_Raichu.png"), new Image(pokemonImagePath + "026_Raichu_Back.png"), "Raichu");

    basicStat = {maxHP: 50, attack: 75, defense: 85, special: 30, speed: 40};
    DEX["Sandshrew"] = new PokemonType(basicStat, 27, new Image(pokemonImagePath + "027_Sandshrew.png"), new Image(pokemonImagePath + "027_Sandshrew_Back.png"), "Sandshrew");

    basicStat = {maxHP: 75, attack: 100, defense: 110, special: 55, speed: 65};
    DEX["Sandslash"] = new PokemonType(basicStat, 28, new Image(pokemonImagePath + "028_Sandslash.png"), new Image(pokemonImagePath + "028_Sandslash_Back.png"), "Sandslash");

    basicStat = {maxHP: 55, attack: 47, defense: 52, special: 40, speed: 41};
    DEX["Nidoran♀"] = new PokemonType(basicStat, 29, new Image(pokemonImagePath + "029_Nidoran♀.png"), new Image(pokemonImagePath + "029_Nidoran♀_Back.png"), "Nidoran♀");

    basicStat = {maxHP: 70, attack: 62, defense: 67, special: 55, speed: 56};
    DEX["Nidorina"] = new PokemonType(basicStat, 30, new Image(pokemonImagePath + "030_Nidorina.png"), new Image(pokemonImagePath + "030_Nidorina_Back.png"), "Nidorina");

    basicStat = {maxHP: 90, attack: 82, defense: 87, special: 75, speed: 76};
    DEX["Nidoqueen"] = new PokemonType(basicStat, 31, new Image(pokemonImagePath + "031_Nidoqueen.png"), new Image(pokemonImagePath + "031_Nidoqueen_Back.png"), "Nidoqueen");

    basicStat = {maxHP: 46, attack: 57, defense: 40, special: 40, speed: 50};
    DEX["Nidoran♂"] = new PokemonType(basicStat, 32, new Image(pokemonImagePath + "032_Nidoran♂.png"), new Image(pokemonImagePath + "032_Nidoran♂_Back.png"), "Nidoran♂");

    basicStat = {maxHP: 61, attack: 72, defense: 57, special: 55, speed: 65};
    DEX["Nidorino"] = new PokemonType(basicStat, 33, new Image(pokemonImagePath + "033_Nidorino.png"), new Image(pokemonImagePath + "033_Nidorino_Back.png"), "Nidorino");

    basicStat = {maxHP: 81, attack: 92, defense: 77, special: 75, speed: 85};
    DEX["Nidoking"] = new PokemonType(basicStat, 34, new Image(pokemonImagePath + "034_Nidoking.png"), new Image(pokemonImagePath + "034_Nidoking_Back.png"), "Nidoking");

    basicStat = {maxHP: 70, attack: 45, defense: 48, special: 60, speed: 35};
    DEX["Clefairy"] = new PokemonType(basicStat, 35, new Image(pokemonImagePath + "035_Clefairy.png"), new Image(pokemonImagePath + "035_Clefairy_Back.png"), "Clefairy");

    basicStat = {maxHP: 95, attack: 70, defense: 73, special: 85, speed: 60};
    DEX["Clefable"] = new PokemonType(basicStat, 36, new Image(pokemonImagePath + "036_Clefable.png"), new Image(pokemonImagePath + "036_Clefable_Back.png"), "Clefable");

    basicStat = {maxHP: 38, attack: 41, defense: 40, special: 65, speed: 65};
    DEX["Vulpix"] = new PokemonType(basicStat, 37, new Image(pokemonImagePath + "037_Vulpix.png"), new Image(pokemonImagePath + "037_Vulpix_Back.png"), "Vulpix");

    basicStat = {maxHP: 73, attack: 76, defense: 75, special: 100, speed: 100};
    DEX["Ninetales"] = new PokemonType(basicStat, 38, new Image(pokemonImagePath + "038_Ninetales.png"), new Image(pokemonImagePath + "038_Ninetales_Back.png"), "Ninetales");

    basicStat = {maxHP: 115, attack: 45, defense: 20, special: 25, speed: 20};
    DEX["Jigglypuff"] = new PokemonType(basicStat, 39, new Image(pokemonImagePath + "039_Jigglypuff.png"), new Image(pokemonImagePath + "039_Jigglypuff_Back.png"), "Jigglypuff");

    basicStat = {maxHP: 140, attack: 70, defense: 45, special: 50, speed: 45};
    DEX["Wigglytuff"] = new PokemonType(basicStat, 40, new Image(pokemonImagePath + "040_Wigglytuff.png"), new Image(pokemonImagePath + "040_Wigglytuff_Back.png"), "Wigglytuff");

    basicStat = {maxHP: 40, attack: 45, defense: 35, special: 40, speed: 55};
    DEX["Zubat"] = new PokemonType(basicStat, 41, new Image(pokemonImagePath + "041_Zubat.png"), new Image(pokemonImagePath + "041_Zubat_Back.png"), "Zubat");

    basicStat = {maxHP: 75, attack: 80, defense: 70, special: 75, speed: 90};
    DEX["Golbat"] = new PokemonType(basicStat, 42, new Image(pokemonImagePath + "042_Golbat.png"), new Image(pokemonImagePath + "042_Golbat_Back.png"), "Golbat");

    basicStat = {maxHP: 45, attack: 50, defense: 55, special: 75, speed: 30};
    DEX["Oddish"] = new PokemonType(basicStat, 43, new Image(pokemonImagePath + "043_Oddish.png"), new Image(pokemonImagePath + "043_Oddish_Back.png"), "Oddish");

    basicStat = {maxHP: 60, attack: 65, defense: 70, special: 85, speed: 40};
    DEX["Gloom"] = new PokemonType(basicStat, 44, new Image(pokemonImagePath + "044_Gloom.png"), new Image(pokemonImagePath + "044_Gloom_Back.png"), "Gloom");

    basicStat = {maxHP: 75, attack: 80, defense: 85, special: 100, speed: 50};
    DEX["Vileplume"] = new PokemonType(basicStat, 45, new Image(pokemonImagePath + "045_Vileplume.png"), new Image(pokemonImagePath + "045_Vileplume_Back.png"), "Vileplume");

    basicStat = {maxHP: 35, attack: 70, defense: 55, special: 55, speed: 25};
    DEX["Paras"] = new PokemonType(basicStat, 46, new Image(pokemonImagePath + "046_Paras.png"), new Image(pokemonImagePath + "046_Paras_Back.png"), "Paras");

    basicStat = {maxHP: 60, attack: 95, defense: 80, special: 80, speed: 30};
    DEX["Parasect"] = new PokemonType(basicStat, 47, new Image(pokemonImagePath + "047_Parasect.png"), new Image(pokemonImagePath + "047_Parasect_Back.png"), "Parasect");

    basicStat = {maxHP: 60, attack: 55, defense: 50, special: 40, speed: 45};
    DEX["Venonat"] = new PokemonType(basicStat, 48, new Image(pokemonImagePath + "048_Venonat.png"), new Image(pokemonImagePath + "048_Venonat_Back.png"), "Venonat");

    basicStat = {maxHP: 70, attack: 65, defense: 60, special: 90, speed: 90};
    DEX["Venomoth"] = new PokemonType(basicStat, 49, new Image(pokemonImagePath + "049_Venomoth.png"), new Image(pokemonImagePath + "049_Venomoth_Back.png"), "Venomoth");

    basicStat = {maxHP: 10, attack: 55, defense: 25, special: 45, speed: 95};
    DEX["Diglett"] = new PokemonType(basicStat, 50, new Image(pokemonImagePath + "050_Diglett.png"), new Image(pokemonImagePath + "050_Diglett_Back.png"), "Diglett");

    basicStat = {maxHP: 35, attack: 80, defense: 50, special: 70, speed: 120};
    DEX["Dugtrio"] = new PokemonType(basicStat, 51, new Image(pokemonImagePath + "051_Dugtrio.png"), new Image(pokemonImagePath + "051_Dugtrio_Back.png"), "Dugtrio");

    basicStat = {maxHP: 40, attack: 45, defense: 35, special: 40, speed: 90};
    DEX["Meowth"] = new PokemonType(basicStat, 52, new Image(pokemonImagePath + "052_Meowth.png"), new Image(pokemonImagePath + "052_Meowth_Back.png"), "Meowth");

    basicStat = {maxHP: 65, attack: 70, defense: 60, special: 65, speed: 115};
    DEX["Persian"] = new PokemonType(basicStat, 53, new Image(pokemonImagePath + "053_Persian.png"), new Image(pokemonImagePath + "053_Persian_Back.png"), "Persian");

    basicStat = {maxHP: 50, attack: 52, defense: 48, special: 50, speed: 55};
    DEX["Psyduck"] = new PokemonType(basicStat, 54, new Image(pokemonImagePath + "054_Psyduck.png"), new Image(pokemonImagePath + "054_Psyduck_Back.png"), "Psyduck");

    basicStat = {maxHP: 80, attack: 82, defense: 78, special: 80, speed: 85};
    DEX["Golduck"] = new PokemonType(basicStat, 55, new Image(pokemonImagePath + "055_Golduck.png"), new Image(pokemonImagePath + "055_Golduck_Back.png"), "Golduck");

    basicStat = {maxHP: 40, attack: 80, defense: 35, special: 35, speed: 70};
    DEX["Mankey"] = new PokemonType(basicStat, 56, new Image(pokemonImagePath + "056_Mankey.png"), new Image(pokemonImagePath + "056_Mankey_Back.png"), "Mankey");

    basicStat = {maxHP: 65, attack: 105, defense: 60, special: 60, speed: 95};
    DEX["Primeape"] = new PokemonType(basicStat, 57, new Image(pokemonImagePath + "057_Primeape.png"), new Image(pokemonImagePath + "057_Primeape_Back.png"), "Primeape");

    basicStat = {maxHP: 55, attack: 70, defense: 45, special: 50, speed: 60};
    DEX["Growlithe"] = new PokemonType(basicStat, 58, new Image(pokemonImagePath + "058_Growlithe.png"), new Image(pokemonImagePath + "058_Growlithe_Back.png"), "Growlithe");

    basicStat = {maxHP: 90, attack: 110, defense: 80, special: 80, speed: 95};
    DEX["Arcanine"] = new PokemonType(basicStat, 59, new Image(pokemonImagePath + "059_Arcanine.png"), new Image(pokemonImagePath + "059_Arcanine_Back.png"), "Arcanine");

    basicStat = {maxHP: 40, attack: 50, defense: 40, special: 40, speed: 90};
    DEX["Poliwag"] = new PokemonType(basicStat, 60, new Image(pokemonImagePath + "060_Poliwag.png"), new Image(pokemonImagePath + "060_Poliwag_Back.png"), "Poliwag");

    basicStat = {maxHP: 65, attack: 65, defense: 65, special: 50, speed: 90};
    DEX["Poliwhirl"] = new PokemonType(basicStat, 61, new Image(pokemonImagePath + "061_Poliwhirl.png"), new Image(pokemonImagePath + "061_Poliwhirl_Back.png"), "Poliwhirl");

    basicStat = {maxHP: 90, attack: 85, defense: 95, special: 70, speed: 70};
    DEX["Poliwrath"] = new PokemonType(basicStat, 62, new Image(pokemonImagePath + "062_Poliwrath.png"), new Image(pokemonImagePath + "062_Poliwrath_Back.png"), "Poliwrath");

    basicStat = {maxHP: 25, attack: 20, defense: 15, special: 105, speed: 90};
    DEX["Abra"] = new PokemonType(basicStat, 63, new Image(pokemonImagePath + "063_Abra.png"), new Image(pokemonImagePath + "063_Abra_Back.png"), "Abra");

    basicStat = {maxHP: 40, attack: 35, defense: 30, special: 120, speed: 105};
    DEX["Kadabra"] = new PokemonType(basicStat, 64, new Image(pokemonImagePath + "064_Kadabra.png"), new Image(pokemonImagePath + "064_Kadabra_Back.png"), "Kadabra");

    basicStat = {maxHP: 55, attack: 50, defense: 45, special: 135, speed: 120};
    DEX["Alakazam"] = new PokemonType(basicStat, 65, new Image(pokemonImagePath + "065_Alakazam.png"), new Image(pokemonImagePath + "065_Alakazam_Back.png"), "Alakazam");

    basicStat = {maxHP: 70, attack: 80, defense: 50, special: 35, speed: 35};
    DEX["Machop"] = new PokemonType(basicStat, 66, new Image(pokemonImagePath + "066_Machop.png"), new Image(pokemonImagePath + "066_Machop_Back.png"), "Machop");

    basicStat = {maxHP: 80, attack: 100, defense: 70, special: 50, speed: 45};
    DEX["Machoke"] = new PokemonType(basicStat, 67, new Image(pokemonImagePath + "067_Machoke.png"), new Image(pokemonImagePath + "067_Machoke_Back.png"), "Machoke");

    basicStat = {maxHP: 90, attack: 130, defense: 80, special: 65, speed: 55};
    DEX["Machamp"] = new PokemonType(basicStat, 68, new Image(pokemonImagePath + "068_Machamp.png"), new Image(pokemonImagePath + "068_Machamp_Back.png"), "Machamp");

    basicStat = {maxHP: 50, attack: 75, defense: 35, special: 70, speed: 40};
    DEX["Bellsprout"] = new PokemonType(basicStat, 69, new Image(pokemonImagePath + "069_Bellsprout.png"), new Image(pokemonImagePath + "069_Bellsprout_Back.png"), "Bellsprout");

    basicStat = {maxHP: 65, attack: 90, defense: 50, special: 85, speed: 55};
    DEX["Weepinbell"] = new PokemonType(basicStat, 70, new Image(pokemonImagePath + "070_Weepinbell.png"), new Image(pokemonImagePath + "070_Weepinbell_Back.png"), "Weepinbell");

    basicStat = {maxHP: 80, attack: 105, defense: 65, special: 100, speed: 70};
    DEX["Victreebel"] = new PokemonType(basicStat, 71, new Image(pokemonImagePath + "071_Victreebel.png"), new Image(pokemonImagePath + "071_Victreebel_Back.png"), "Victreebel");

    basicStat = {maxHP: 40, attack: 40, defense: 35, special: 100, speed: 70};
    DEX["Tentacool"] = new PokemonType(basicStat, 72, new Image(pokemonImagePath + "072_Tentacool.png"), new Image(pokemonImagePath + "072_Tentacool_Back.png"), "Tentacool");

    basicStat = {maxHP: 80, attack: 70, defense: 65, special: 120, speed: 100};
    DEX["Tentacruel"] = new PokemonType(basicStat, 73, new Image(pokemonImagePath + "073_Tentacruel.png"), new Image(pokemonImagePath + "073_Tentacruel_Back.png"), "Tentacruel");

    basicStat = {maxHP: 40, attack: 80, defense: 100, special: 30, speed: 20};
    DEX["Geodude"] = new PokemonType(basicStat, 74, new Image(pokemonImagePath + "074_Geodude.png"), new Image(pokemonImagePath + "074_Geodude_Back.png"), "Geodude");

    basicStat = {maxHP: 55, attack: 95, defense: 115, special: 45, speed: 35};
    DEX["Graveler"] = new PokemonType(basicStat, 75, new Image(pokemonImagePath + "075_Graveler.png"), new Image(pokemonImagePath + "075_Graveler_Back.png"), "Graveler");

    basicStat = {maxHP: 80, attack: 110, defense: 130, special: 55, speed: 45};
    DEX["Golem"] = new PokemonType(basicStat, 76, new Image(pokemonImagePath + "076_Golem.png"), new Image(pokemonImagePath + "076_Golem_Back.png"), "Golem");

    basicStat = {maxHP: 50, attack: 85, defense: 55, special: 65, speed: 90};
    DEX["Ponyta"] = new PokemonType(basicStat, 77, new Image(pokemonImagePath + "077_Ponyta.png"), new Image(pokemonImagePath + "077_Ponyta_Back.png"), "Ponyta");

    basicStat = {maxHP: 65, attack: 100, defense: 70, special: 80, speed: 105};
    DEX["Rapidash"] = new PokemonType(basicStat, 78, new Image(pokemonImagePath + "078_Rapidash.png"), new Image(pokemonImagePath + "078_Rapidash_Back.png"), "Rapidash");

    basicStat = {maxHP: 90, attack: 65, defense: 65, special: 40, speed: 15};
    DEX["Slowpoke"] = new PokemonType(basicStat, 79, new Image(pokemonImagePath + "079_Slowpoke.png"), new Image(pokemonImagePath + "079_Slowpoke_Back.png"), "Slowpoke");

    basicStat = {maxHP: 95, attack: 75, defense: 110, special: 80, speed: 30};
    DEX["Slowbro"] = new PokemonType(basicStat, 80, new Image(pokemonImagePath + "080_Slowbro.png"), new Image(pokemonImagePath + "080_Slowbro_Back.png"), "Slowbro");

    basicStat = {maxHP: 25, attack: 35, defense: 70, special: 95, speed: 45};
    DEX["Magnemite"] = new PokemonType(basicStat, 81, new Image(pokemonImagePath + "081_Magnemite.png"), new Image(pokemonImagePath + "081_Magnemite_Back.png"), "Magnemite");

    basicStat = {maxHP: 50, attack: 60, defense: 95, special: 120, speed: 70};
    DEX["Magneton"] = new PokemonType(basicStat, 82, new Image(pokemonImagePath + "082_Magneton.png"), new Image(pokemonImagePath + "082_Magneton_Back.png"), "Magneton");

    basicStat = {maxHP: 52, attack: 65, defense: 55, special: 58, speed: 60};
    DEX["Farfetch'd"] = new PokemonType(basicStat, 83, new Image(pokemonImagePath + "083_Farfetch'd.png"), new Image(pokemonImagePath + "083_Farfetch'd_Back.png"), "Farfetch'd");

    basicStat = {maxHP: 35, attack: 85, defense: 45, special: 35, speed: 75};
    DEX["Doduo"] = new PokemonType(basicStat, 84, new Image(pokemonImagePath + "084_Doduo.png"), new Image(pokemonImagePath + "084_Doduo_Back.png"), "Doduo");

    basicStat = {maxHP: 60, attack: 110, defense: 70, special: 60, speed: 100};
    DEX["Dodrio"] = new PokemonType(basicStat, 85, new Image(pokemonImagePath + "085_Dodrio.png"), new Image(pokemonImagePath + "085_Dodrio_Back.png"), "Dodrio");

    basicStat = {maxHP: 65, attack: 45, defense: 55, special: 70, speed: 45};
    DEX["Seel"] = new PokemonType(basicStat, 86, new Image(pokemonImagePath + "086_Seel.png"), new Image(pokemonImagePath + "086_Seel_Back.png"), "Seel");

    basicStat = {maxHP: 90, attack: 70, defense: 80, special: 95, speed: 70};
    DEX["Dewgong"] = new PokemonType(basicStat, 87, new Image(pokemonImagePath + "087_Dewgong.png"), new Image(pokemonImagePath + "087_Dewgong_Back.png"), "Dewgong");

    basicStat = {maxHP: 80, attack: 80, defense: 50, special: 40, speed: 25};
    DEX["Grimer"] = new PokemonType(basicStat, 88, new Image(pokemonImagePath + "088_Grimer.png"), new Image(pokemonImagePath + "088_Grimer_Back.png"), "Grimer");

    basicStat = {maxHP: 105, attack: 105, defense: 75, special: 65, speed: 50};
    DEX["Muk"] = new PokemonType(basicStat, 89, new Image(pokemonImagePath + "089_Muk.png"), new Image(pokemonImagePath + "089_Muk_Back.png"), "Muk");

    basicStat = {maxHP: 30, attack: 65, defense: 100, special: 45, speed: 40};
    DEX["Shellder"] = new PokemonType(basicStat, 90, new Image(pokemonImagePath + "090_Shellder.png"), new Image(pokemonImagePath + "090_Shellder_Back.png"), "Shellder");

    basicStat = {maxHP: 50, attack: 95, defense: 180, special: 85, speed: 70};
    DEX["Cloyster"] = new PokemonType(basicStat, 91, new Image(pokemonImagePath + "091_Cloyster.png"), new Image(pokemonImagePath + "091_Cloyster_Back.png"), "Cloyster");

    basicStat = {maxHP: 30, attack: 35, defense: 30, special: 100, speed: 80};
    DEX["Gastly"] = new PokemonType(basicStat, 92, new Image(pokemonImagePath + "092_Gastly.png"), new Image(pokemonImagePath + "092_Gastly_Back.png"), "Gastly");

    basicStat = {maxHP: 45, attack: 50, defense: 45, special: 115, speed: 95};
    DEX["Haunter"] = new PokemonType(basicStat, 93, new Image(pokemonImagePath + "093_Haunter.png"), new Image(pokemonImagePath + "093_Haunter_Back.png"), "Haunter");

    basicStat = {maxHP: 60, attack: 65, defense: 60, special: 130, speed: 110};
    DEX["Gengar"] = new PokemonType(basicStat, 94, new Image(pokemonImagePath + "094_Gengar.png"), new Image(pokemonImagePath + "094_Gengar_Back.png"), "Gengar");

    basicStat = {maxHP: 35, attack: 45, defense: 160, special: 30, speed: 70};
    DEX["Onix"] = new PokemonType(basicStat, 95, new Image(pokemonImagePath + "095_Onix.png"), new Image(pokemonImagePath + "095_Onix_Back.png"), "Onix");

    basicStat = {maxHP: 60, attack: 48, defense: 45, special: 90, speed: 42};
    DEX["Drowzee"] = new PokemonType(basicStat, 96, new Image(pokemonImagePath + "096_Drowzee.png"), new Image(pokemonImagePath + "096_Drowzee_Back.png"), "Drowzee");

    basicStat = {maxHP: 85, attack: 73, defense: 70, special: 115, speed: 67};
    DEX["Hypno"] = new PokemonType(basicStat, 97, new Image(pokemonImagePath + "097_Hypno.png"), new Image(pokemonImagePath + "097_Hypno_Back.png"), "Hypno");

    basicStat = {maxHP: 30, attack: 105, defense: 90, special: 25, speed: 50};
    DEX["Krabby"] = new PokemonType(basicStat, 98, new Image(pokemonImagePath + "098_Krabby.png"), new Image(pokemonImagePath + "098_Krabby_Back.png"), "Krabby");

    basicStat = {maxHP: 55, attack: 130, defense: 115, special: 50, speed: 75};
    DEX["Kingler"] = new PokemonType(basicStat, 99, new Image(pokemonImagePath + "099_Kingler.png"), new Image(pokemonImagePath + "099_Kingler_Back.png"), "Kingler");

    basicStat = {maxHP: 40, attack: 30, defense: 50, special: 55, speed: 100};
    DEX["Voltorb"] = new PokemonType(basicStat, 100, new Image(pokemonImagePath + "100_Voltorb.png"), new Image(pokemonImagePath + "100_Voltorb_Back.png"), "Voltorb");

    basicStat = {maxHP: 60, attack: 50, defense: 70, special: 80, speed: 140};
    DEX["Electrode"] = new PokemonType(basicStat, 101, new Image(pokemonImagePath + "101_Electrode.png"), new Image(pokemonImagePath + "101_Electrode_Back.png"), "Electrode");

    basicStat = {maxHP: 60, attack: 40, defense: 80, special: 60, speed: 40};
    DEX["Exeggcute"] = new PokemonType(basicStat, 102, new Image(pokemonImagePath + "102_Exeggcute.png"), new Image(pokemonImagePath + "102_Exeggcute_Back.png"), "Exeggcute");

    basicStat = {maxHP: 95, attack: 95, defense: 85, special: 125, speed: 55};
    DEX["Exeggutor"] = new PokemonType(basicStat, 103, new Image(pokemonImagePath + "103_Exeggutor.png"), new Image(pokemonImagePath + "103_Exeggutor_Back.png"), "Exeggutor");

    basicStat = {maxHP: 50, attack: 50, defense: 95, special: 40, speed: 35};
    DEX["Cubone"] = new PokemonType(basicStat, 104, new Image(pokemonImagePath + "104_Cubone.png"), new Image(pokemonImagePath + "104_Cubone_Back.png"), "Cubone");

    basicStat = {maxHP: 60, attack: 80, defense: 110, special: 50, speed: 45};
    DEX["Marowak"] = new PokemonType(basicStat, 105, new Image(pokemonImagePath + "105_Marowak.png"), new Image(pokemonImagePath + "105_Marowak_Back.png"), "Marowak");

    basicStat = {maxHP: 50, attack: 120, defense: 53, special: 35, speed: 87};
    DEX["Hitmonlee"] = new PokemonType(basicStat, 106, new Image(pokemonImagePath + "106_Hitmonlee.png"), new Image(pokemonImagePath + "106_Hitmonlee_Back.png"), "Hitmonlee");

    basicStat = {maxHP: 50, attack: 105, defense: 79, special: 35, speed: 76};
    DEX["Hitmonchan"] = new PokemonType(basicStat, 107, new Image(pokemonImagePath + "107_Hitmonchan.png"), new Image(pokemonImagePath + "107_Hitmonchan_Back.png"), "Hitmonchan");

    basicStat = {maxHP: 90, attack: 55, defense: 75, special: 60, speed: 30};
    DEX["Lickitung"] = new PokemonType(basicStat, 108, new Image(pokemonImagePath + "108_Lickitung.png"), new Image(pokemonImagePath + "108_Lickitung_Back.png"), "Lickitung");

    basicStat = {maxHP: 40, attack: 65, defense: 95, special: 60, speed: 35};
    DEX["Koffing"] = new PokemonType(basicStat, 109, new Image(pokemonImagePath + "109_Koffing.png"), new Image(pokemonImagePath + "109_Koffing_Back.png"), "Koffing");

    basicStat = {maxHP: 65, attack: 90, defense: 120, special: 85, speed: 60};
    DEX["Weezing"] = new PokemonType(basicStat, 110, new Image(pokemonImagePath + "110_Weezing.png"), new Image(pokemonImagePath + "110_Weezing_Back.png"), "Weezing");

    basicStat = {maxHP: 80, attack: 85, defense: 95, special: 30, speed: 25};
    DEX["Rhyhorn"] = new PokemonType(basicStat, 111, new Image(pokemonImagePath + "111_Rhyhorn.png"), new Image(pokemonImagePath + "111_Rhyhorn_Back.png"), "Rhyhorn");

    basicStat = {maxHP: 105, attack: 130, defense: 120, special: 45, speed: 40};
    DEX["Rhydon"] = new PokemonType(basicStat, 112, new Image(pokemonImagePath + "112_Rhydon.png"), new Image(pokemonImagePath + "112_Rhydon_Back.png"), "Rhydon");

    basicStat = {maxHP: 250, attack: 5, defense: 5, special: 105, speed: 50};
    DEX["Chansey"] = new PokemonType(basicStat, 113, new Image(pokemonImagePath + "113_Chansey.png"), new Image(pokemonImagePath + "113_Chansey_Back.png"), "Chansey");

    basicStat = {maxHP: 65, attack: 55, defense: 115, special: 100, speed: 60};
    DEX["Tangela"] = new PokemonType(basicStat, 114, new Image(pokemonImagePath + "114_Tangela.png"), new Image(pokemonImagePath + "114_Tangela_Back.png"), "Tangela");

    basicStat = {maxHP: 105, attack: 95, defense: 80, special: 40, speed: 90};
    DEX["Kangaskhan"] = new PokemonType(basicStat, 115, new Image(pokemonImagePath + "115_Kangaskhan.png"), new Image(pokemonImagePath + "115_Kangaskhan_Back.png"), "Kangaskhan");

    basicStat = {maxHP: 30, attack: 40, defense: 70, special: 70, speed: 60};
    DEX["Horsea"] = new PokemonType(basicStat, 116, new Image(pokemonImagePath + "116_Horsea.png"), new Image(pokemonImagePath + "116_Horsea_Back.png"), "Horsea");

    basicStat = {maxHP: 55, attack: 65, defense: 95, special: 95, speed: 85};
    DEX["Seadra"] = new PokemonType(basicStat, 117, new Image(pokemonImagePath + "117_Seadra.png"), new Image(pokemonImagePath + "117_Seadra_Back.png"), "Seadra");

    basicStat = {maxHP: 45, attack: 67, defense: 60, special: 50, speed: 63};
    DEX["Goldeen"] = new PokemonType(basicStat, 118, new Image(pokemonImagePath + "118_Goldeen.png"), new Image(pokemonImagePath + "118_Goldeen_Back.png"), "Goldeen");

    basicStat = {maxHP: 80, attack: 92, defense: 65, special: 80, speed: 68};
    DEX["Seaking"] = new PokemonType(basicStat, 119, new Image(pokemonImagePath + "119_Seaking.png"), new Image(pokemonImagePath + "119_Seaking_Back.png"), "Seaking");

    basicStat = {maxHP: 30, attack: 45, defense: 55, special: 70, speed: 85};
    DEX["Staryu"] = new PokemonType(basicStat, 120, new Image(pokemonImagePath + "120_Staryu.png"), new Image(pokemonImagePath + "120_Staryu_Back.png"), "Staryu");

    basicStat = {maxHP: 60, attack: 75, defense: 85, special: 100, speed: 115};
    DEX["Starmie"] = new PokemonType(basicStat, 121, new Image(pokemonImagePath + "121_Starmie.png"), new Image(pokemonImagePath + "121_Starmie_Back.png"), "Starmie");

    basicStat = {maxHP: 40, attack: 45, defense: 65, special: 100, speed: 90};
    DEX["Mr.Mime"] = new PokemonType(basicStat, 122, new Image(pokemonImagePath + "122_Mr.Mime.png"), new Image(pokemonImagePath + "122_Mr.Mime_Back.png"), "Mr.Mime");

    basicStat = {maxHP: 70, attack: 110, defense: 80, special: 55, speed: 105};
    DEX["Scyther"] = new PokemonType(basicStat, 123, new Image(pokemonImagePath + "123_Scyther.png"), new Image(pokemonImagePath + "123_Scyther_Back.png"), "Scyther");

    basicStat = {maxHP: 65, attack: 50, defense: 35, special: 95, speed: 95};
    DEX["Jynx"] = new PokemonType(basicStat, 124, new Image(pokemonImagePath + "124_Jynx.png"), new Image(pokemonImagePath + "124_Jynx_Back.png"), "Jynx");

    basicStat = {maxHP: 65, attack: 83, defense: 57, special: 85, speed: 105};
    DEX["Electabuzz"] = new PokemonType(basicStat, 125, new Image(pokemonImagePath + "125_Electabuzz.png"), new Image(pokemonImagePath + "125_Electabuzz_Back.png"), "Electabuzz");

    basicStat = {maxHP: 65, attack: 95, defense: 57, special: 85, speed: 93};
    DEX["Magmar"] = new PokemonType(basicStat, 126, new Image(pokemonImagePath + "126_Magmar.png"), new Image(pokemonImagePath + "126_Magmar_Back.png"), "Magmar");

    basicStat = {maxHP: 65, attack: 125, defense: 100, special: 55, speed: 85};
    DEX["Pinsir"] = new PokemonType(basicStat, 127, new Image(pokemonImagePath + "127_Pinsir.png"), new Image(pokemonImagePath + "127_Pinsir_Back.png"), "Pinsir");

    basicStat = {maxHP: 75, attack: 100, defense: 95, special: 70, speed: 110};
    DEX["Tauros"] = new PokemonType(basicStat, 128, new Image(pokemonImagePath + "128_Tauros.png"), new Image(pokemonImagePath + "128_Tauros_Back.png"), "Tauros");

    basicStat = {maxHP: 20, attack: 10, defense: 55, special: 20, speed: 80};
    DEX["Magikarp"] = new PokemonType(basicStat, 129, new Image(pokemonImagePath + "129_Magikarp.png"), new Image(pokemonImagePath + "129_Magikarp_Back.png"), "Magikarp");

    basicStat = {maxHP: 95, attack: 125, defense: 79, special: 100, speed: 81};
    DEX["Gyarados"] = new PokemonType(basicStat, 130, new Image(pokemonImagePath + "130_Gyarados.png"), new Image(pokemonImagePath + "130_Gyarados_Back.png"), "Gyarados");

    basicStat = {maxHP: 130, attack: 85, defense: 80, special: 95, speed: 60};
    DEX["Lapras"] = new PokemonType(basicStat, 131, new Image(pokemonImagePath + "131_Lapras.png"), new Image(pokemonImagePath + "131_Lapras_Back.png"), "Lapras");

    basicStat = {maxHP: 48, attack: 48, defense: 48, special: 48, speed: 48};
    DEX["Ditto"] = new PokemonType(basicStat, 132, new Image(pokemonImagePath + "132_Ditto.png"), new Image(pokemonImagePath + "132_Ditto_Back.png"), "Ditto");

    basicStat = {maxHP: 55, attack: 55, defense: 50, special: 65, speed: 55};
    DEX["Eevee"] = new PokemonType(basicStat, 133, new Image(pokemonImagePath + "133_Eevee.png"), new Image(pokemonImagePath + "133_Eevee_Back.png"), "Eevee");

    basicStat = {maxHP: 130, attack: 65, defense: 60, special: 110, speed: 65};
    DEX["Vaporeon"] = new PokemonType(basicStat, 134, new Image(pokemonImagePath + "134_Vaporeon.png"), new Image(pokemonImagePath + "134_Vaporeon_Back.png"), "Vaporeon");

    basicStat = {maxHP: 65, attack: 65, defense: 60, special: 110, speed: 130};
    DEX["Jolteon"] = new PokemonType(basicStat, 135, new Image(pokemonImagePath + "135_Jolteon.png"), new Image(pokemonImagePath + "135_Jolteon_Back.png"), "Jolteon");

    basicStat = {maxHP: 65, attack: 130, defense: 60, special: 110, speed: 65};
    DEX["Flareon"] = new PokemonType(basicStat, 136, new Image(pokemonImagePath + "136_Flareon.png"), new Image(pokemonImagePath + "136_Flareon_Back.png"), "Flareon");

    basicStat = {maxHP: 65, attack: 60, defense: 70, special: 75, speed: 40};
    DEX["Porygon"] = new PokemonType(basicStat, 137, new Image(pokemonImagePath + "137_Porygon.png"), new Image(pokemonImagePath + "137_Porygon_Back.png"), "Porygon");

    basicStat = {maxHP: 35, attack: 40, defense: 100, special: 90, speed: 35};
    DEX["Omanyte"] = new PokemonType(basicStat, 138, new Image(pokemonImagePath + "138_Omanyte.png"), new Image(pokemonImagePath + "138_Omanyte_Back.png"), "Omanyte");

    basicStat = {maxHP: 70, attack: 60, defense: 125, special: 115, speed: 55};
    DEX["Omastar"] = new PokemonType(basicStat, 139, new Image(pokemonImagePath + "139_Omastar.png"), new Image(pokemonImagePath + "139_Omastar_Back.png"), "Omastar");

    basicStat = {maxHP: 30, attack: 80, defense: 90, special: 45, speed: 55};
    DEX["Kabuto"] = new PokemonType(basicStat, 140, new Image(pokemonImagePath + "140_Kabuto.png"), new Image(pokemonImagePath + "140_Kabuto_Back.png"), "Kabuto");

    basicStat = {maxHP: 60, attack: 115, defense: 105, special: 70, speed: 80};
    DEX["Kabutops"] = new PokemonType(basicStat, 141, new Image(pokemonImagePath + "141_Kabutops.png"), new Image(pokemonImagePath + "141_Kabutops_Back.png"), "Kabutops");

    basicStat = {maxHP: 80, attack: 105, defense: 65, special: 60, speed: 130};
    DEX["Aerodactyl"] = new PokemonType(basicStat, 142, new Image(pokemonImagePath + "142_Aerodactyl.png"), new Image(pokemonImagePath + "142_Aerodactyl_Back.png"), "Aerodactyl");

    basicStat = {maxHP: 160, attack: 110, defense: 65, special: 65, speed: 30};
    DEX["Snorlax"] = new PokemonType(basicStat, 143, new Image(pokemonImagePath + "143_Snorlax.png"), new Image(pokemonImagePath + "143_Snorlax_Back.png"), "Snorlax");

    basicStat = {maxHP: 90, attack: 85, defense: 100, special: 125, speed: 85};
    DEX["Articuno"] = new PokemonType(basicStat, 144, new Image(pokemonImagePath + "144_Articuno.png"), new Image(pokemonImagePath + "144_Articuno_Back.png"), "Articuno");

    basicStat = {maxHP: 90, attack: 90, defense: 85, special: 125, speed: 100};
    DEX["Zapdos"] = new PokemonType(basicStat, 145, new Image(pokemonImagePath + "145_Zapdos.png"), new Image(pokemonImagePath + "145_Zapdos_Back.png"), "Zapdos");

    basicStat = {maxHP: 90, attack: 100, defense: 90, special: 125, speed: 90};
    DEX["Moltres"] = new PokemonType(basicStat, 146, new Image(pokemonImagePath + "146_Moltres.png"), new Image(pokemonImagePath + "146_Moltres_Back.png"), "Moltres");

    basicStat = {maxHP: 41, attack: 64, defense: 45, special: 50, speed: 50};
    DEX["Dratini"] = new PokemonType(basicStat, 147, new Image(pokemonImagePath + "147_Dratini.png"), new Image(pokemonImagePath + "147_Dratini_Back.png"), "Dratini");

    basicStat = {maxHP: 61, attack: 84, defense: 65, special: 70, speed: 70};
    DEX["Dragonair"] = new PokemonType(basicStat, 148, new Image(pokemonImagePath + "148_Dragonair.png"), new Image(pokemonImagePath + "148_Dragonair_Back.png"), "Dragonair");

    basicStat = {maxHP: 91, attack: 134, defense: 95, special: 100, speed: 80};
    DEX["Dragonite"] = new PokemonType(basicStat, 149, new Image(pokemonImagePath + "149_Dragonite.png"), new Image(pokemonImagePath + "149_Dragonite_Back.png"), "Dragonite");

    basicStat = {maxHP: 106, attack: 110, defense: 90, special: 154, speed: 130};
    DEX["Mewtwo"] = new PokemonType(basicStat, 150, new Image(pokemonImagePath + "150_Mewtwo.png"), new Image(pokemonImagePath + "150_Mewtwo_Back.png"), "Mewtwo");

    basicStat = {maxHP: 100, attack: 100, defense: 100, special: 100, speed: 100};
    DEX["Mew"] = new PokemonType(basicStat, 151, new Image(pokemonImagePath + "151_Mew.png"), new Image(pokemonImagePath + "151_Mew_Back.png"), "Mew");
})();
