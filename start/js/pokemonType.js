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
 * @prop {GameSystem.Classes.GradingMove[]} usableMoves 此種寶可夢所有可用的招式。
 * @prop {GameSystem.Classes.StandardStat.Type} typeA 此種寶可夢所擁有的第一屬性。
 * @prop {GameSystem.Classes.StandardStat.Type} typeB 此種寶可夢所擁有的第二屬性。此項可為空。
 * @prop {String} description 寶可夢描述
 */
GameSystem.Classes.PokemonType =
class PokemonType extends GameSystem.Classes.StandardStat {
    /**
     * @param {BasicStandardStatData} basicStat 寶可夢基本的五種屬性值。
     * @param {number} id 此種寶可夢的編號。
     * @param {GameSystem.Classes.Image} image 此種寶可夢的圖示。
     * @param {GameSystem.Classes.Image} backImage 此寶可夢的背圖示。
     * @param {string} name 寶可夢的種族名稱。
     * @param {GameSystem.Classes.GradingMove[]?} usableMoves 此種寶可夢所有可用的招式。
     * @param {GameSystem.Classes.StandardStat.Type?} typeA 此種寶可夢所擁有的第一屬性。
     * @param {GameSystem.Classes.StandardStat.Type?} typeB 此種寶可夢所擁有的第二屬性。此項可為空。
     * @param {String} description 寶可夢描述
     */
    constructor(basicStat, id, image, backImage, name, usableMoves, typeA, typeB, description) {
        super(basicStat.maxHP, basicStat.attack, basicStat.defense, basicStat.special, basicStat.speed);
        this._id = id;
        this._image = image;
        this._backImage = backImage;
        this._name = name;
        this._usableMoves = usableMoves || new Set([]);
        this._typeA = typeA;
        this._typeB = typeB;
        this._description=description;
    }

    set id(newId) { this._id = newId; }
    get id() { return this._id; }

    set description(val){this._description=val}
    get description(){return this._description;}

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
    GetInitialMoves() {
        return this._usableMoves.filter(gMove => gMove.minLevel == 1 || !gMove.minLevel).map(gMove => gMove.move);
    }

    /**
     * 取得在指定等級下，可能習得到的招式。
     * @param {number} level 指定的等級。
     * @return {Array | undefined} 若在該等級下有可以習得的招式，則回傳可習得招式；若無則回傳undefined。
     */
    GetPossibleMovesToLearnByLevel(level) {
        let newMoves = this._usableMoves.filter(gMove => gMove.minLevel == level).map(gMove => gMove.move);
        return newMoves.length > 0 ? newMoves : undefined;
    }
}

/** 寶可夢字典 */
GameSystem.Classes.PokemonType.Dictionary = {};

/** 初始化所有種類的寶可夢資料 */
/** !!! 請先初始化「招式 (Move)」類別之後再執行此檔案 !!! */
(() => {
    let PokemonType = GameSystem.Classes.PokemonType;       // 取得「寶可夢種類」類別
    let Type = GameSystem.Classes.StandardStat.Type;        // 取得「寶可夢、招式屬性」列舉
    let Image = GameSystem.Classes.Image;                   // 取得「圖片」類別
    let GradingMove = GameSystem.Classes.GradingMove;       // 取得「門檻招式」類別
    let DEX = GameSystem.Classes.PokemonType.Dictionary;    // 取得寶可夢字典
    let MoveDEX = GameSystem.Classes.Move.Dictionary;       // 取得招式字典
    let pokemonImagePath = define.imagePath + "pokemons/";  // 定義對應的寶可夢圖片目錄路徑
    let basicStat, moves, typeA, typeB;                     // 基本狀態值
    
    basicStat = {maxHP: 45, attack: 49, defense: 49, special: 65, speed: 45};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(7, MoveDEX["寄生種子"]), new GradingMove(13, MoveDEX["藤鞭"]), new GradingMove(20, MoveDEX["毒粉"]), new GradingMove(27, MoveDEX["飛葉快刀"]), new GradingMove(34, MoveDEX["生長"]), new GradingMove(41, MoveDEX["催眠粉"]), new GradingMove(48, MoveDEX["日光束"])];
    DEX["妙蛙種子"] = new PokemonType(basicStat, 1, new Image(pokemonImagePath + "001_妙蛙種子.png"), new Image(pokemonImagePath + "001_妙蛙種子_Back.png"), "妙蛙種子", moves, Type.Grass, Type.Poison);

    basicStat = {maxHP: 60, attack: 62, defense: 63, special: 80, speed: 60};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(7, MoveDEX["寄生種子"]), new GradingMove(13, MoveDEX["藤鞭"]), new GradingMove(22, MoveDEX["毒粉"]), new GradingMove(30, MoveDEX["飛葉快刀"]), new GradingMove(38, MoveDEX["生長"]), new GradingMove(46, MoveDEX["催眠粉"]), new GradingMove(54, MoveDEX["日光束"])];
    DEX["妙蛙草"] = new PokemonType(basicStat, 2, new Image(pokemonImagePath + "002_妙蛙草.png"), new Image(pokemonImagePath + "002_妙蛙草_Back.png"), "妙蛙草", moves, Type.Grass, Type.Poison);

    basicStat = {maxHP: 80, attack: 82, defense: 83, special: 100, speed: 80};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(undefined, MoveDEX["寄生種子"]), new GradingMove(undefined, MoveDEX["藤鞭"]), new GradingMove(7, MoveDEX["寄生種子"]), new GradingMove(13, MoveDEX["藤鞭"]), new GradingMove(22, MoveDEX["毒粉"]), new GradingMove(30, MoveDEX["飛葉快刀"]), new GradingMove(43, MoveDEX["生長"]), new GradingMove(55, MoveDEX["催眠粉"]), new GradingMove(65, MoveDEX["日光束"])];
    DEX["妙蛙花"] = new PokemonType(basicStat, 3, new Image(pokemonImagePath + "003_妙蛙花.png"), new Image(pokemonImagePath + "003_妙蛙花_Back.png"), "妙蛙花", moves, Type.Grass, Type.Poison);

    basicStat = {maxHP: 39, attack: 52, defense: 43, special: 50, speed: 65};
    moves = [new GradingMove(undefined, MoveDEX["抓"]), new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(9, MoveDEX["火花"]), new GradingMove(15, MoveDEX["瞪眼"]), new GradingMove(22, MoveDEX["憤怒"]), new GradingMove(30, MoveDEX["劈開"]), new GradingMove(38, MoveDEX["噴射火焰"]), new GradingMove(49, MoveDEX["火焰旋渦"])];
    DEX["小火龍"] = new PokemonType(basicStat, 4, new Image(pokemonImagePath + "004_小火龍.png"), new Image(pokemonImagePath + "004_小火龍_Back.png"), "小火龍", moves, Type.Fire, Type.Normal);

    basicStat = {maxHP: 58, attack: 64, defense: 58, special: 65, speed: 80};
    moves = [new GradingMove(undefined, MoveDEX["抓"]), new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(9, MoveDEX["火花"]), new GradingMove(15, MoveDEX["瞪眼"]), new GradingMove(24, MoveDEX["憤怒"]), new GradingMove(33, MoveDEX["劈開"]), new GradingMove(42, MoveDEX["噴射火焰"]), new GradingMove(56, MoveDEX["火焰旋渦"])];
    DEX["火恐龍"] = new PokemonType(basicStat, 5, new Image(pokemonImagePath + "005_火恐龍.png"), new Image(pokemonImagePath + "005_火恐龍_Back.png"), "火恐龍", moves, Type.Fire, undefined);

    basicStat = {maxHP: 78, attack: 84, defense: 78, special: 85, speed: 100};
    moves = [new GradingMove(undefined, MoveDEX["抓"]), new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(9, MoveDEX["火花"]), new GradingMove(15, MoveDEX["瞪眼"]), new GradingMove(24, MoveDEX["憤怒"]), new GradingMove(36, MoveDEX["劈開"]), new GradingMove(46, MoveDEX["噴射火焰"]), new GradingMove(55, MoveDEX["火焰旋渦"])];
    DEX["噴火龍"] = new PokemonType(basicStat, 6, new Image(pokemonImagePath + "006_噴火龍.png"), new Image(pokemonImagePath + "006_噴火龍_Back.png"), "噴火龍", moves, Type.Fire, Type.Flying);

    basicStat = {maxHP: 44, attack: 48, defense: 65, special: 50, speed: 43};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["搖尾巴"]), new GradingMove(8, MoveDEX["泡沫"]), new GradingMove(15, MoveDEX["水槍"]), new GradingMove(22, MoveDEX["咬住"]), new GradingMove(28, MoveDEX["縮入殼中"]), new GradingMove(35, MoveDEX["火箭頭錘"]), new GradingMove(42, MoveDEX["水炮"])];
    DEX["傑尼龜"] = new PokemonType(basicStat, 7, new Image(pokemonImagePath + "007_傑尼龜.png"), new Image(pokemonImagePath + "007_傑尼龜_Back.png"), "傑尼龜", moves, Type.Water, undefined);

    basicStat = {maxHP: 59, attack: 63, defense: 80, special: 65, speed: 58};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["搖尾巴"]), new GradingMove(8, MoveDEX["泡沫"]), new GradingMove(15, MoveDEX["水槍"]), new GradingMove(24, MoveDEX["咬住"]), new GradingMove(31, MoveDEX["縮入殼中"]), new GradingMove(39, MoveDEX["火箭頭錘"]), new GradingMove(47, MoveDEX["水炮"])];
    DEX["卡咪龜"] = new PokemonType(basicStat, 8, new Image(pokemonImagePath + "008_卡咪龜.png"), new Image(pokemonImagePath + "008_卡咪龜_Back.png"), "卡咪龜", moves, Type.Water, undefined);

    basicStat = {maxHP: 79, attack: 83, defense: 100, special: 85, speed: 78};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["搖尾巴"]), new GradingMove(8, MoveDEX["泡沫"]), new GradingMove(15, MoveDEX["水槍"]), new GradingMove(24, MoveDEX["咬住"]), new GradingMove(31, MoveDEX["縮入殼中"]), new GradingMove(42, MoveDEX["火箭頭錘"]), new GradingMove(52, MoveDEX["水炮"])];
    DEX["水箭龜"] = new PokemonType(basicStat, 9, new Image(pokemonImagePath + "009_水箭龜.png"), new Image(pokemonImagePath + "009_水箭龜_Back.png"), "水箭龜", moves, Type.Water, undefined);

    basicStat = {maxHP: 45, attack: 30, defense: 35, special: 20, speed: 45};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["吐絲"])];
    DEX["綠毛蟲"] = new PokemonType(basicStat, 10, new Image(pokemonImagePath + "010_綠毛蟲.png"), new Image(pokemonImagePath + "010_綠毛蟲_Back.png"), "綠毛蟲", moves, Type.Bug, undefined);

    basicStat = {maxHP: 50, attack: 20, defense: 55, special: 25, speed: 30};
    moves = [new GradingMove(undefined, MoveDEX["變硬"]), new GradingMove(7, MoveDEX["變硬"])];
    DEX["鐵甲蛹"] = new PokemonType(basicStat, 11, new Image(pokemonImagePath + "011_鐵甲蛹.png"), new Image(pokemonImagePath + "011_鐵甲蛹_Back.png"), "鐵甲蛹", moves, Type.Bug, undefined);

    basicStat = {maxHP: 60, attack: 45, defense: 50, special: 80, speed: 70};
    moves = [new GradingMove(10, MoveDEX["念力"]), new GradingMove(13, MoveDEX["毒粉"]), new GradingMove(14, MoveDEX["麻痺粉"]), new GradingMove(15, MoveDEX["催眠粉"]), new GradingMove(18, MoveDEX["超音波"]), new GradingMove(23, MoveDEX["吹飛"]), new GradingMove(28, MoveDEX["起風"]), new GradingMove(34, MoveDEX["幻象光線"])];
    DEX["巴大蝶"] = new PokemonType(basicStat, 12, new Image(pokemonImagePath + "012_巴大蝶.png"), new Image(pokemonImagePath + "012_巴大蝶_Back.png"), "巴大蝶", moves, Type.Bug, Type.Flying);

    basicStat = {maxHP: 40, attack: 35, defense: 30, special: 20, speed: 50};
    moves = [new GradingMove(undefined, MoveDEX["毒針"]), new GradingMove(undefined, MoveDEX["吐絲"])];
    DEX["獨角蟲"] = new PokemonType(basicStat, 13, new Image(pokemonImagePath + "013_獨角蟲.png"), new Image(pokemonImagePath + "013_獨角蟲_Back.png"), "獨角蟲", moves, Type.Bug, Type.Poison);

    basicStat = {maxHP: 45, attack: 25, defense: 50, special: 25, speed: 35};
    moves = [new GradingMove(undefined, MoveDEX["變硬"])];
    DEX["鐵殼蛹"] = new PokemonType(basicStat, 14, new Image(pokemonImagePath + "014_鐵殼蛹.png"), new Image(pokemonImagePath + "014_鐵殼蛹_Back.png"), "鐵殼蛹", moves, Type.Bug, Type.Poison);

    basicStat = {maxHP: 65, attack: 80, defense: 40, special: 45, speed: 75};
    moves = [new GradingMove(12, MoveDEX["亂擊"]), new GradingMove(16, MoveDEX["聚氣"]), new GradingMove(20, MoveDEX["雙針"]), new GradingMove(25, MoveDEX["憤怒"]), new GradingMove(30, MoveDEX["飛彈針"]), new GradingMove(35, MoveDEX["高速移動"])];
    DEX["大針蜂"] = new PokemonType(basicStat, 15, new Image(pokemonImagePath + "015_大針蜂.png"), new Image(pokemonImagePath + "015_大針蜂_Back.png"), "大針蜂", moves, Type.Bug, Type.Poison);

    basicStat = {maxHP: 40, attack: 45, defense: 40, special: 35, speed: 56};
    moves = [new GradingMove(undefined, MoveDEX["起風"]), new GradingMove(5, MoveDEX["潑沙"]), new GradingMove(12, MoveDEX["電光一閃"]), new GradingMove(19, MoveDEX["吹飛"]), new GradingMove(28, MoveDEX["翅膀攻擊"]), new GradingMove(36, MoveDEX["高速移動"]), new GradingMove(44, MoveDEX["鸚鵡學舌"])];
    DEX["波波"] = new PokemonType(basicStat, 16, new Image(pokemonImagePath + "016_波波.png"), new Image(pokemonImagePath + "016_波波_Back.png"), "波波", moves, Type.Normal, Type.Flying);

    basicStat = {maxHP: 63, attack: 60, defense: 55, special: 50, speed: 71};
    moves = [new GradingMove(undefined, MoveDEX["起風"]), new GradingMove(5, MoveDEX["潑沙"]), new GradingMove(12, MoveDEX["電光一閃"]), new GradingMove(21, MoveDEX["吹飛"]), new GradingMove(31, MoveDEX["翅膀攻擊"]), new GradingMove(40, MoveDEX["高速移動"]), new GradingMove(49, MoveDEX["鸚鵡學舌"])];
    DEX["比比鳥"] = new PokemonType(basicStat, 17, new Image(pokemonImagePath + "017_比比鳥.png"), new Image(pokemonImagePath + "017_比比鳥_Back.png"), "比比鳥", moves, Type.Normal, Type.Flying);

    basicStat = {maxHP: 83, attack: 80, defense: 75, special: 70, speed: 91};
    moves = [new GradingMove(undefined, MoveDEX["起風"]), new GradingMove(5, MoveDEX["潑沙"]), new GradingMove(12, MoveDEX["電光一閃"]), new GradingMove(21, MoveDEX["吹飛"]), new GradingMove(31, MoveDEX["翅膀攻擊"]), new GradingMove(44, MoveDEX["高速移動"]), new GradingMove(54, MoveDEX["鸚鵡學舌"])];
    DEX["大比鳥"] = new PokemonType(basicStat, 18, new Image(pokemonImagePath + "018_大比鳥.png"), new Image(pokemonImagePath + "018_大比鳥_Back.png"), "大比鳥", moves, Type.Normal, Type.Flying);

    basicStat = {maxHP: 30, attack: 56, defense: 35, special: 25, speed: 72};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["搖尾巴"]), new GradingMove(7, MoveDEX["電光一閃"]), new GradingMove(14, MoveDEX["必殺門牙"]), new GradingMove(23, MoveDEX["聚氣"]), new GradingMove(34, MoveDEX["憤怒門牙"])];
    DEX["小拉達"] = new PokemonType(basicStat, 19, new Image(pokemonImagePath + "019_小拉達.png"), new Image(pokemonImagePath + "019_小拉達_Back.png"), "小拉達", moves, Type.Normal, undefined);

    basicStat = {maxHP: 55, attack: 81, defense: 60, special: 50, speed: 97};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["搖尾巴"]), new GradingMove(7, MoveDEX["電光一閃"]), new GradingMove(14, MoveDEX["必殺門牙"]), new GradingMove(27, MoveDEX["聚氣"]), new GradingMove(41, MoveDEX["憤怒門牙"])];
    DEX["拉達"] = new PokemonType(basicStat, 20, new Image(pokemonImagePath + "020_拉達.png"), new Image(pokemonImagePath + "020_拉達_Back.png"), "拉達", moves, Type.Normal, undefined);

    basicStat = {maxHP: 40, attack: 60, defense: 30, special: 31, speed: 70};
    moves = [new GradingMove(undefined, MoveDEX["啄"]), new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(9, MoveDEX["瞪眼"]), new GradingMove(15, MoveDEX["亂擊"]), new GradingMove(22, MoveDEX["鸚鵡學舌"]), new GradingMove(29, MoveDEX["啄鑽"]), new GradingMove(36, MoveDEX["高速移動"])];
    DEX["烈雀"] = new PokemonType(basicStat, 21, new Image(pokemonImagePath + "021_烈雀.png"), new Image(pokemonImagePath + "021_烈雀_Back.png"), "烈雀", moves, Type.Normal, Type.Flying);

    basicStat = {maxHP: 65, attack: 90, defense: 65, special: 61, speed: 100};
    moves = [new GradingMove(undefined, MoveDEX["啄"]), new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(9, MoveDEX["瞪眼"]), new GradingMove(15, MoveDEX["亂擊"]), new GradingMove(25, MoveDEX["鸚鵡學舌"]), new GradingMove(34, MoveDEX["啄鑽"]), new GradingMove(43, MoveDEX["高速移動"])];
    DEX["大嘴雀"] = new PokemonType(basicStat, 22, new Image(pokemonImagePath + "022_大嘴雀.png"), new Image(pokemonImagePath + "022_大嘴雀_Back.png"), "大嘴雀", moves, Type.Normal, Type.Flying);

    basicStat = {maxHP: 35, attack: 60, defense: 44, special: 40, speed: 55};
    moves = [new GradingMove(undefined, MoveDEX["緊束"]), new GradingMove(undefined, MoveDEX["瞪眼"]), new GradingMove(10, MoveDEX["毒針"]), new GradingMove(17, MoveDEX["咬住"]), new GradingMove(24, MoveDEX["大蛇瞪眼"]), new GradingMove(31, MoveDEX["刺耳聲"]), new GradingMove(38, MoveDEX["溶解液"])];
    DEX["阿柏蛇"] = new PokemonType(basicStat, 23, new Image(pokemonImagePath + "023_阿柏蛇.png"), new Image(pokemonImagePath + "023_阿柏蛇_Back.png"), "阿柏蛇", moves, Type.Poison, undefined);

    basicStat = {maxHP: 60, attack: 85, defense: 69, special: 65, speed: 80};
    moves = [new GradingMove(undefined, MoveDEX["緊束"]), new GradingMove(undefined, MoveDEX["瞪眼"]), new GradingMove(10, MoveDEX["毒針"]), new GradingMove(17, MoveDEX["咬住"]), new GradingMove(27, MoveDEX["大蛇瞪眼"]), new GradingMove(36, MoveDEX["刺耳聲"]), new GradingMove(47, MoveDEX["溶解液"])];
    DEX["阿柏怪"] = new PokemonType(basicStat, 24, new Image(pokemonImagePath + "024_阿柏怪.png"), new Image(pokemonImagePath + "024_阿柏怪_Back.png"), "阿柏怪", moves, Type.Poison, Type.Normal);

    basicStat = {maxHP: 35, attack: 55, defense: 30, special: 50, speed: 90};
    moves = [new GradingMove(undefined, MoveDEX["電擊"]), new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(6, MoveDEX["搖尾巴"]), new GradingMove(8, MoveDEX["電磁波"]), new GradingMove(11, MoveDEX["電光一閃"]), new GradingMove(15, MoveDEX["影子分身"]), new GradingMove(20, MoveDEX["摔打"]), new GradingMove(26, MoveDEX["十萬伏特"]), new GradingMove(33, MoveDEX["高速移動"]), new GradingMove(41, MoveDEX["打雷"]), new GradingMove(50, MoveDEX["光牆"])];
    DEX["皮卡丘"] = new PokemonType(basicStat, 25, new Image(pokemonImagePath + "025_皮卡丘.png"), new Image(pokemonImagePath + "025_皮卡丘_Back.png"), "皮卡丘", moves, Type.Electric, undefined);

    basicStat = {maxHP: 60, attack: 90, defense: 55, special: 90, speed: 100};
    moves = [new GradingMove(undefined, MoveDEX["電擊"]), new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(undefined, MoveDEX["電磁波"])];
    DEX["雷丘"] = new PokemonType(basicStat, 26, new Image(pokemonImagePath + "026_雷丘.png"), new Image(pokemonImagePath + "026_雷丘_Back.png"), "雷丘", moves, Type.Electric, undefined);

    basicStat = {maxHP: 50, attack: 75, defense: 85, special: 30, speed: 40};
    moves = [new GradingMove(undefined, MoveDEX["抓"]), new GradingMove(10, MoveDEX["潑沙"]), new GradingMove(17, MoveDEX["劈開"]), new GradingMove(24, MoveDEX["毒針"]), new GradingMove(31, MoveDEX["高速星星"]), new GradingMove(38, MoveDEX["亂抓"])];
    DEX["穿山鼠"] = new PokemonType(basicStat, 27, new Image(pokemonImagePath + "027_穿山鼠.png"), new Image(pokemonImagePath + "027_穿山鼠_Back.png"), "穿山鼠", moves, Type.Ground, Type.Ice);

    basicStat = {maxHP: 75, attack: 100, defense: 110, special: 55, speed: 65};
    moves = [new GradingMove(undefined, MoveDEX["抓"]), new GradingMove(10, MoveDEX["潑沙"]), new GradingMove(17, MoveDEX["劈開"]), new GradingMove(27, MoveDEX["毒針"]), new GradingMove(36, MoveDEX["高速星星"]), new GradingMove(47, MoveDEX["亂抓"])];
    DEX["穿山王"] = new PokemonType(basicStat, 28, new Image(pokemonImagePath + "028_穿山王.png"), new Image(pokemonImagePath + "028_穿山王_Back.png"), "穿山王", moves, Type.Ground, Type.Ice);

    basicStat = {maxHP: 55, attack: 47, defense: 52, special: 40, speed: 41};
    moves = [new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(8, MoveDEX["抓"]), new GradingMove(12, MoveDEX["二連踢"]), new GradingMove(17, MoveDEX["毒針"]), new GradingMove(23, MoveDEX["搖尾巴"]), new GradingMove(30, MoveDEX["咬住"]), new GradingMove(38, MoveDEX["亂抓"])];
    DEX["尼多蘭"] = new PokemonType(basicStat, 29, new Image(pokemonImagePath + "029_尼多蘭.png"), new Image(pokemonImagePath + "029_尼多蘭_Back.png"), "尼多蘭", moves, Type.Poison, undefined);

    basicStat = {maxHP: 70, attack: 62, defense: 67, special: 55, speed: 56};
    moves = [new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(8, MoveDEX["抓"]), new GradingMove(12, MoveDEX["二連踢"]), new GradingMove(19, MoveDEX["毒針"]), new GradingMove(27, MoveDEX["搖尾巴"]), new GradingMove(36, MoveDEX["咬住"]), new GradingMove(46, MoveDEX["亂抓"])];
    DEX["尼多娜"] = new PokemonType(basicStat, 30, new Image(pokemonImagePath + "030_尼多娜.png"), new Image(pokemonImagePath + "030_尼多娜_Back.png"), "尼多娜", moves, Type.Poison, undefined);

    basicStat = {maxHP: 90, attack: 82, defense: 87, special: 75, speed: 76};
    moves = [new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(8, MoveDEX["抓"]), new GradingMove(12, MoveDEX["二連踢"]), new GradingMove(23, MoveDEX["泰山壓頂"])];
    DEX["尼多后"] = new PokemonType(basicStat, 31, new Image(pokemonImagePath + "031_尼多后.png"), new Image(pokemonImagePath + "031_尼多后_Back.png"), "尼多后", moves, Type.Poison, Type.Ground);

    basicStat = {maxHP: 46, attack: 57, defense: 40, special: 40, speed: 50};
    moves = [new GradingMove(undefined, MoveDEX["瞪眼"]), new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(8, MoveDEX["角撞"]), new GradingMove(12, MoveDEX["二連踢"]), new GradingMove(17, MoveDEX["毒針"]), new GradingMove(23, MoveDEX["聚氣"]), new GradingMove(30, MoveDEX["亂擊"]), new GradingMove(38, MoveDEX["角鑽"])];
    DEX["尼多朗"] = new PokemonType(basicStat, 32, new Image(pokemonImagePath + "032_尼多朗.png"), new Image(pokemonImagePath + "032_尼多朗_Back.png"), "尼多朗", moves, Type.Poison, undefined);

    basicStat = {maxHP: 61, attack: 72, defense: 57, special: 55, speed: 65};
    moves = [new GradingMove(undefined, MoveDEX["瞪眼"]), new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(8, MoveDEX["角撞"]), new GradingMove(12, MoveDEX["二連踢"]), new GradingMove(19, MoveDEX["毒針"]), new GradingMove(27, MoveDEX["聚氣"]), new GradingMove(36, MoveDEX["亂擊"]), new GradingMove(46, MoveDEX["角鑽"])];
    DEX["尼多力諾"] = new PokemonType(basicStat, 33, new Image(pokemonImagePath + "033_尼多力諾.png"), new Image(pokemonImagePath + "033_尼多力諾_Back.png"), "尼多力諾", moves, Type.Poison, undefined);

    basicStat = {maxHP: 81, attack: 92, defense: 77, special: 75, speed: 85};
    moves = [new GradingMove(undefined, MoveDEX["瞪眼"]), new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(8, MoveDEX["角撞"]), new GradingMove(12, MoveDEX["二連踢"]), new GradingMove(23, MoveDEX["大鬧一番"])];
    DEX["尼多王"] = new PokemonType(basicStat, 34, new Image(pokemonImagePath + "034_尼多王.png"), new Image(pokemonImagePath + "034_尼多王_Back.png"), "尼多王", moves, Type.Poison, Type.Ground);

    basicStat = {maxHP: 70, attack: 45, defense: 48, special: 60, speed: 35};
    moves = [new GradingMove(undefined, MoveDEX["拍擊"]), new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(13, MoveDEX["唱歌"]), new GradingMove(18, MoveDEX["連環巴掌"]), new GradingMove(24, MoveDEX["變小"]), new GradingMove(31, MoveDEX["揮指"]), new GradingMove(39, MoveDEX["變圓"]), new GradingMove(48, MoveDEX["光牆"])];
    DEX["皮皮"] = new PokemonType(basicStat, 35, new Image(pokemonImagePath + "035_皮皮.png"), new Image(pokemonImagePath + "035_皮皮_Back.png"), "皮皮", moves, Type.Normal, undefined);

    basicStat = {maxHP: 95, attack: 70, defense: 73, special: 85, speed: 60};
    moves = [new GradingMove(undefined, MoveDEX["唱歌"]), new GradingMove(undefined, MoveDEX["連環巴掌"]), new GradingMove(undefined, MoveDEX["變小"]), new GradingMove(undefined, MoveDEX["揮指"])];
    DEX["皮可西"] = new PokemonType(basicStat, 36, new Image(pokemonImagePath + "036_皮可西.png"), new Image(pokemonImagePath + "036_皮可西_Back.png"), "皮可西", moves, Type.Normal, undefined);

    basicStat = {maxHP: 38, attack: 41, defense: 40, special: 65, speed: 65};
    moves = [new GradingMove(undefined, MoveDEX["火花"]), new GradingMove(undefined, MoveDEX["搖尾巴"]), new GradingMove(16, MoveDEX["電光一閃"]), new GradingMove(21, MoveDEX["吼叫"]), new GradingMove(28, MoveDEX["奇異之光"]), new GradingMove(35, MoveDEX["噴射火焰"]), new GradingMove(42, MoveDEX["火焰旋渦"])];
    DEX["六尾"] = new PokemonType(basicStat, 37, new Image(pokemonImagePath + "037_六尾.png"), new Image(pokemonImagePath + "037_六尾_Back.png"), "六尾", moves, Type.Fire, Type.Ice);

    basicStat = {maxHP: 73, attack: 76, defense: 75, special: 100, speed: 100};
    moves = [new GradingMove(undefined, MoveDEX["火花"]), new GradingMove(undefined, MoveDEX["搖尾巴"]), new GradingMove(undefined, MoveDEX["電光一閃"]), new GradingMove(undefined, MoveDEX["吼叫"])];
    DEX["九尾"] = new PokemonType(basicStat, 38, new Image(pokemonImagePath + "038_九尾.png"), new Image(pokemonImagePath + "038_九尾_Back.png"), "九尾", moves, Type.Fire, Type.Ice);

    basicStat = {maxHP: 115, attack: 45, defense: 20, special: 25, speed: 20};
    moves = [new GradingMove(undefined, MoveDEX["唱歌"]), new GradingMove(9, MoveDEX["拍擊"]), new GradingMove(14, MoveDEX["定身法"]), new GradingMove(19, MoveDEX["變圓"]), new GradingMove(24, MoveDEX["連環巴掌"]), new GradingMove(29, MoveDEX["睡覺"]), new GradingMove(34, MoveDEX["泰山壓頂"]), new GradingMove(39, MoveDEX["捨身衝撞"])];
    DEX["胖丁"] = new PokemonType(basicStat, 39, new Image(pokemonImagePath + "039_胖丁.png"), new Image(pokemonImagePath + "039_胖丁_Back.png"), "胖丁", moves, Type.Normal, undefined);

    basicStat = {maxHP: 140, attack: 70, defense: 45, special: 50, speed: 45};
    moves = [new GradingMove(undefined, MoveDEX["唱歌"]), new GradingMove(undefined, MoveDEX["定身法"]), new GradingMove(undefined, MoveDEX["變圓"]), new GradingMove(undefined, MoveDEX["連環巴掌"])];
    DEX["胖可丁"] = new PokemonType(basicStat, 40, new Image(pokemonImagePath + "040_胖可丁.png"), new Image(pokemonImagePath + "040_胖可丁_Back.png"), "胖可丁", moves, Type.Normal, undefined);

    basicStat = {maxHP: 40, attack: 45, defense: 35, special: 40, speed: 55};
    moves = [new GradingMove(undefined, MoveDEX["吸血"]), new GradingMove(10, MoveDEX["超音波"]), new GradingMove(15, MoveDEX["咬住"]), new GradingMove(21, MoveDEX["奇異之光"]), new GradingMove(28, MoveDEX["翅膀攻擊"]), new GradingMove(36, MoveDEX["黑霧"])];
    DEX["超音蝠"] = new PokemonType(basicStat, 41, new Image(pokemonImagePath + "041_超音蝠.png"), new Image(pokemonImagePath + "041_超音蝠_Back.png"), "超音蝠", moves, Type.Poison, Type.Flying);

    basicStat = {maxHP: 75, attack: 80, defense: 70, special: 75, speed: 90};
    moves = [new GradingMove(undefined, MoveDEX["吸血"]), new GradingMove(undefined, MoveDEX["刺耳聲"]), new GradingMove(10, MoveDEX["超音波"]), new GradingMove(15, MoveDEX["咬住"]), new GradingMove(21, MoveDEX["奇異之光"]), new GradingMove(32, MoveDEX["翅膀攻擊"]), new GradingMove(43, MoveDEX["黑霧"])];
    DEX["大嘴蝠"] = new PokemonType(basicStat, 42, new Image(pokemonImagePath + "042_大嘴蝠.png"), new Image(pokemonImagePath + "042_大嘴蝠_Back.png"), "大嘴蝠", moves, Type.Poison, Type.Flying);

    basicStat = {maxHP: 45, attack: 50, defense: 55, special: 75, speed: 30};
    moves = [new GradingMove(undefined, MoveDEX["吸取"]), new GradingMove(15, MoveDEX["毒粉"]), new GradingMove(17, MoveDEX["麻痺粉"]), new GradingMove(19, MoveDEX["催眠粉"]), new GradingMove(24, MoveDEX["溶解液"]), new GradingMove(33, MoveDEX["花瓣舞"]), new GradingMove(46, MoveDEX["日光束"])];
    DEX["走路草"] = new PokemonType(basicStat, 43, new Image(pokemonImagePath + "043_走路草.png"), new Image(pokemonImagePath + "043_走路草_Back.png"), "走路草", moves, Type.Grass, Type.Poison);

    basicStat = {maxHP: 60, attack: 65, defense: 70, special: 85, speed: 40};
    moves = [new GradingMove(undefined, MoveDEX["吸取"]), new GradingMove(15, MoveDEX["毒粉"]), new GradingMove(17, MoveDEX["麻痺粉"]), new GradingMove(19, MoveDEX["催眠粉"]), new GradingMove(28, MoveDEX["溶解液"]), new GradingMove(38, MoveDEX["花瓣舞"]), new GradingMove(52, MoveDEX["日光束"])];
    DEX["臭臭花"] = new PokemonType(basicStat, 44, new Image(pokemonImagePath + "044_臭臭花.png"), new Image(pokemonImagePath + "044_臭臭花_Back.png"), "臭臭花", moves, Type.Grass, Type.Poison);

    basicStat = {maxHP: 75, attack: 80, defense: 85, special: 100, speed: 50};
    moves = [new GradingMove(15, MoveDEX["毒粉"]), new GradingMove(17, MoveDEX["麻痺粉"]), new GradingMove(19, MoveDEX["催眠粉"])];
    DEX["霸王花"] = new PokemonType(basicStat, 45, new Image(pokemonImagePath + "045_霸王花.png"), new Image(pokemonImagePath + "045_霸王花_Back.png"), "霸王花", moves, Type.Grass, Type.Poison);

    basicStat = {maxHP: 35, attack: 70, defense: 55, special: 55, speed: 25};
    moves = [new GradingMove(undefined, MoveDEX["抓"]), new GradingMove(13, MoveDEX["麻痺粉"]), new GradingMove(20, MoveDEX["吸血"]), new GradingMove(27, MoveDEX["蘑菇孢子"]), new GradingMove(34, MoveDEX["劈開"]), new GradingMove(41, MoveDEX["生長"])];
    DEX["派拉斯"] = new PokemonType(basicStat, 46, new Image(pokemonImagePath + "046_派拉斯.png"), new Image(pokemonImagePath + "046_派拉斯_Back.png"), "派拉斯", moves, Type.Bug, Type.Grass);

    basicStat = {maxHP: 60, attack: 95, defense: 80, special: 80, speed: 30};
    moves = [new GradingMove(undefined, MoveDEX["抓"]), new GradingMove(13, MoveDEX["麻痺粉"]), new GradingMove(20, MoveDEX["吸血"]), new GradingMove(30, MoveDEX["蘑菇孢子"]), new GradingMove(39, MoveDEX["劈開"]), new GradingMove(48, MoveDEX["生長"])];
    DEX["派拉斯特"] = new PokemonType(basicStat, 47, new Image(pokemonImagePath + "047_派拉斯特.png"), new Image(pokemonImagePath + "047_派拉斯特_Back.png"), "派拉斯特", moves, Type.Bug, Type.Grass);

    basicStat = {maxHP: 60, attack: 55, defense: 50, special: 40, speed: 45};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["定身法"]), new GradingMove(11, MoveDEX["超音波"]), new GradingMove(19, MoveDEX["念力"]), new GradingMove(22, MoveDEX["毒粉"]), new GradingMove(27, MoveDEX["吸血"]), new GradingMove(30, MoveDEX["麻痺粉"]), new GradingMove(35, MoveDEX["幻象光線"]), new GradingMove(38, MoveDEX["催眠粉"]), new GradingMove(43, MoveDEX["精神強念"])];
    DEX["毛球"] = new PokemonType(basicStat, 48, new Image(pokemonImagePath + "048_毛球.png"), new Image(pokemonImagePath + "048_毛球_Back.png"), "毛球", moves, Type.Bug, Type.Poison);

    basicStat = {maxHP: 70, attack: 65, defense: 60, special: 90, speed: 90};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["定身法"]), new GradingMove(undefined, MoveDEX["超音波"]), new GradingMove(undefined, MoveDEX["念力"]), new GradingMove(22, MoveDEX["毒粉"]), new GradingMove(27, MoveDEX["吸血"]), new GradingMove(30, MoveDEX["麻痺粉"]), new GradingMove(38, MoveDEX["幻象光線"]), new GradingMove(43, MoveDEX["催眠粉"]), new GradingMove(50, MoveDEX["精神強念"])];
    DEX["摩魯蛾"] = new PokemonType(basicStat, 49, new Image(pokemonImagePath + "049_摩魯蛾.png"), new Image(pokemonImagePath + "049_摩魯蛾_Back.png"), "摩魯蛾", moves, Type.Bug, Type.Poison);

    basicStat = {maxHP: 10, attack: 55, defense: 25, special: 45, speed: 95};
    moves = [new GradingMove(undefined, MoveDEX["抓"]), new GradingMove(15, MoveDEX["叫聲"]), new GradingMove(19, MoveDEX["挖洞"]), new GradingMove(24, MoveDEX["潑沙"]), new GradingMove(31, MoveDEX["劈開"]), new GradingMove(40, MoveDEX["地震"])];
    DEX["地鼠"] = new PokemonType(basicStat, 50, new Image(pokemonImagePath + "050_地鼠.png"), new Image(pokemonImagePath + "050_地鼠_Back.png"), "地鼠", moves, Type.Ground, undefined);

    basicStat = {maxHP: 35, attack: 80, defense: 50, special: 70, speed: 120};
    moves = [new GradingMove(undefined, MoveDEX["抓"]), new GradingMove(15, MoveDEX["叫聲"]), new GradingMove(19, MoveDEX["挖洞"]), new GradingMove(24, MoveDEX["潑沙"]), new GradingMove(35, MoveDEX["劈開"]), new GradingMove(47, MoveDEX["地震"])];
    DEX["三地鼠"] = new PokemonType(basicStat, 51, new Image(pokemonImagePath + "051_三地鼠.png"), new Image(pokemonImagePath + "051_三地鼠_Back.png"), "三地鼠", moves, Type.Ground, undefined);

    basicStat = {maxHP: 40, attack: 45, defense: 35, special: 40, speed: 90};
    moves = [new GradingMove(undefined, MoveDEX["抓"]), new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(12, MoveDEX["咬住"]), new GradingMove(17, MoveDEX["聚寶功"]), new GradingMove(24, MoveDEX["刺耳聲"]), new GradingMove(33, MoveDEX["亂抓"]), new GradingMove(44, MoveDEX["劈開"])];
    DEX["喵喵"] = new PokemonType(basicStat, 52, new Image(pokemonImagePath + "052_喵喵.png"), new Image(pokemonImagePath + "052_喵喵_Back.png"), "喵喵", moves, Type.Normal, undefined);

    basicStat = {maxHP: 65, attack: 70, defense: 60, special: 65, speed: 115};
    moves = [new GradingMove(undefined, MoveDEX["抓"]), new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(undefined, MoveDEX["咬住"]), new GradingMove(undefined, MoveDEX["刺耳聲"]), new GradingMove(12, MoveDEX["咬住"]), new GradingMove(17, MoveDEX["聚寶功"]), new GradingMove(24, MoveDEX["刺耳聲"]), new GradingMove(37, MoveDEX["亂抓"]), new GradingMove(51, MoveDEX["劈開"])];
    DEX["貓老大"] = new PokemonType(basicStat, 53, new Image(pokemonImagePath + "053_貓老大.png"), new Image(pokemonImagePath + "053_貓老大_Back.png"), "貓老大", moves, Type.Normal, undefined);

    basicStat = {maxHP: 50, attack: 52, defense: 48, special: 50, speed: 55};
    moves = [new GradingMove(undefined, MoveDEX["抓"]), new GradingMove(28, MoveDEX["搖尾巴"]), new GradingMove(31, MoveDEX["定身法"]), new GradingMove(36, MoveDEX["念力"]), new GradingMove(43, MoveDEX["亂抓"]), new GradingMove(52, MoveDEX["水炮"])];
    DEX["可達鴨"] = new PokemonType(basicStat, 54, new Image(pokemonImagePath + "054_可達鴨.png"), new Image(pokemonImagePath + "054_可達鴨_Back.png"), "可達鴨", moves, Type.Water, undefined);

    basicStat = {maxHP: 80, attack: 82, defense: 78, special: 80, speed: 85};
    moves = [new GradingMove(undefined, MoveDEX["抓"]), new GradingMove(28, MoveDEX["搖尾巴"]), new GradingMove(31, MoveDEX["定身法"]), new GradingMove(39, MoveDEX["念力"]), new GradingMove(48, MoveDEX["亂抓"]), new GradingMove(59, MoveDEX["水炮"])];
    DEX["哥達鴨"] = new PokemonType(basicStat, 55, new Image(pokemonImagePath + "055_哥達鴨.png"), new Image(pokemonImagePath + "055_哥達鴨_Back.png"), "哥達鴨", moves, Type.Water, undefined);

    basicStat = {maxHP: 40, attack: 80, defense: 35, special: 35, speed: 70};
    moves = [new GradingMove(undefined, MoveDEX["抓"]), new GradingMove(undefined, MoveDEX["瞪眼"]), new GradingMove(9, MoveDEX["踢倒"]), new GradingMove(15, MoveDEX["空手劈"]), new GradingMove(21, MoveDEX["亂抓"]), new GradingMove(27, MoveDEX["聚氣"]), new GradingMove(33, MoveDEX["地球上投"]), new GradingMove(39, MoveDEX["大鬧一番"]), new GradingMove(45, MoveDEX["刺耳聲"])];
    DEX["猴怪"] = new PokemonType(basicStat, 56, new Image(pokemonImagePath + "056_猴怪.png"), new Image(pokemonImagePath + "056_猴怪_Back.png"), "猴怪", moves, Type.Fighting, undefined);

    basicStat = {maxHP: 65, attack: 105, defense: 60, special: 60, speed: 95};
    moves = [new GradingMove(undefined, MoveDEX["抓"]), new GradingMove(undefined, MoveDEX["瞪眼"]), new GradingMove(undefined, MoveDEX["踢倒"]), new GradingMove(9, MoveDEX["踢倒"]), new GradingMove(15, MoveDEX["空手劈"]), new GradingMove(21, MoveDEX["亂抓"]), new GradingMove(27, MoveDEX["聚氣"]), new GradingMove(28, MoveDEX["憤怒"]), new GradingMove(37, MoveDEX["地球上投"]), new GradingMove(45, MoveDEX["刺耳聲"]), new GradingMove(46, MoveDEX["大鬧一番"])];
    DEX["火爆猴"] = new PokemonType(basicStat, 57, new Image(pokemonImagePath + "057_火爆猴.png"), new Image(pokemonImagePath + "057_火爆猴_Back.png"), "火爆猴", moves, Type.Fighting, undefined);

    basicStat = {maxHP: 55, attack: 70, defense: 45, special: 50, speed: 60};
    moves = [new GradingMove(undefined, MoveDEX["咬住"]), new GradingMove(undefined, MoveDEX["吼叫"]), new GradingMove(18, MoveDEX["火花"]), new GradingMove(23, MoveDEX["瞪眼"]), new GradingMove(30, MoveDEX["猛撞"]), new GradingMove(39, MoveDEX["高速移動"]), new GradingMove(50, MoveDEX["噴射火焰"])];
    DEX["卡蒂狗"] = new PokemonType(basicStat, 58, new Image(pokemonImagePath + "058_卡蒂狗.png"), new Image(pokemonImagePath + "058_卡蒂狗_Back.png"), "卡蒂狗", moves, Type.Fire, undefined);

    basicStat = {maxHP: 90, attack: 110, defense: 80, special: 80, speed: 95};
    moves = [new GradingMove(undefined, MoveDEX["吼叫"]), new GradingMove(undefined, MoveDEX["火花"]), new GradingMove(undefined, MoveDEX["瞪眼"]), new GradingMove(undefined, MoveDEX["猛撞"])];
    DEX["風速狗"] = new PokemonType(basicStat, 59, new Image(pokemonImagePath + "059_風速狗.png"), new Image(pokemonImagePath + "059_風速狗_Back.png"), "風速狗", moves, Type.Fire, undefined);

    basicStat = {maxHP: 40, attack: 50, defense: 40, special: 40, speed: 90};
    moves = [new GradingMove(undefined, MoveDEX["泡沫"]), new GradingMove(16, MoveDEX["催眠術"]), new GradingMove(19, MoveDEX["水槍"]), new GradingMove(25, MoveDEX["連環巴掌"]), new GradingMove(31, MoveDEX["泰山壓頂"]), new GradingMove(38, MoveDEX["瞬間失憶"]), new GradingMove(45, MoveDEX["水炮"])];
    DEX["蚊香蝌蚪"] = new PokemonType(basicStat, 60, new Image(pokemonImagePath + "060_蚊香蝌蚪.png"), new Image(pokemonImagePath + "060_蚊香蝌蚪_Back.png"), "蚊香蝌蚪", moves, Type.Water, undefined);

    basicStat = {maxHP: 65, attack: 65, defense: 65, special: 50, speed: 90};
    moves = [new GradingMove(undefined, MoveDEX["泡沫"]), new GradingMove(16, MoveDEX["催眠術"]), new GradingMove(19, MoveDEX["水槍"]), new GradingMove(26, MoveDEX["連環巴掌"]), new GradingMove(33, MoveDEX["泰山壓頂"]), new GradingMove(41, MoveDEX["瞬間失憶"]), new GradingMove(49, MoveDEX["水炮"])];
    DEX["蚊香君"] = new PokemonType(basicStat, 61, new Image(pokemonImagePath + "061_蚊香君.png"), new Image(pokemonImagePath + "061_蚊香君_Back.png"), "蚊香君", moves, Type.Water, Type.Normal);

    basicStat = {maxHP: 90, attack: 85, defense: 95, special: 70, speed: 70};
    moves = [new GradingMove(undefined, MoveDEX["連環巴掌"]), new GradingMove(undefined, MoveDEX["泰山壓頂"]), new GradingMove(16, MoveDEX["催眠術"]), new GradingMove(19, MoveDEX["水槍"])];
    DEX["蚊香泳士"] = new PokemonType(basicStat, 62, new Image(pokemonImagePath + "062_蚊香泳士.png"), new Image(pokemonImagePath + "062_蚊香泳士_Back.png"), "蚊香泳士", moves, Type.Water, Type.Fighting);

    basicStat = {maxHP: 25, attack: 20, defense: 15, special: 105, speed: 90};
    moves = [new GradingMove(undefined, MoveDEX["瞬間移動"])];
    DEX["凱西"] = new PokemonType(basicStat, 63, new Image(pokemonImagePath + "063_凱西.png"), new Image(pokemonImagePath + "063_凱西_Back.png"), "凱西", moves, Type.Phycsic, undefined);

    basicStat = {maxHP: 40, attack: 35, defense: 30, special: 120, speed: 105};
    moves = [new GradingMove(undefined, MoveDEX["瞬間移動"]), new GradingMove(undefined, MoveDEX["折彎湯匙"]), new GradingMove(16, MoveDEX["念力"]), new GradingMove(20, MoveDEX["定身法"]), new GradingMove(27, MoveDEX["幻象光線"]), new GradingMove(31, MoveDEX["自我再生"]), new GradingMove(38, MoveDEX["精神強念"]), new GradingMove(42, MoveDEX["反射壁"])];
    DEX["勇基拉"] = new PokemonType(basicStat, 64, new Image(pokemonImagePath + "064_勇基拉.png"), new Image(pokemonImagePath + "064_勇基拉_Back.png"), "勇基拉", moves, Type.Phycsic, undefined);

    basicStat = {maxHP: 55, attack: 50, defense: 45, special: 135, speed: 120};
    moves = [new GradingMove(undefined, MoveDEX["瞬間移動"]), new GradingMove(undefined, MoveDEX["折彎湯匙"]), new GradingMove(16, MoveDEX["念力"]), new GradingMove(20, MoveDEX["定身法"]), new GradingMove(27, MoveDEX["幻象光線"]), new GradingMove(31, MoveDEX["自我再生"]), new GradingMove(38, MoveDEX["精神強念"]), new GradingMove(42, MoveDEX["反射壁"])];
    DEX["胡地"] = new PokemonType(basicStat, 65, new Image(pokemonImagePath + "065_胡地.png"), new Image(pokemonImagePath + "065_胡地_Back.png"), "胡地", moves, Type.Phycsic, undefined);

    basicStat = {maxHP: 70, attack: 80, defense: 50, special: 35, speed: 35};
    moves = [new GradingMove(undefined, MoveDEX["空手劈"]), new GradingMove(20, MoveDEX["踢倒"]), new GradingMove(25, MoveDEX["瞪眼"]), new GradingMove(32, MoveDEX["聚氣"]), new GradingMove(39, MoveDEX["地球上投"]), new GradingMove(46, MoveDEX["地獄翻滾"])];
    DEX["腕力"] = new PokemonType(basicStat, 66, new Image(pokemonImagePath + "066_腕力.png"), new Image(pokemonImagePath + "066_腕力_Back.png"), "腕力", moves, Type.Fighting, undefined);

    basicStat = {maxHP: 80, attack: 100, defense: 70, special: 50, speed: 45};
    moves = [new GradingMove(undefined, MoveDEX["空手劈"]), new GradingMove(undefined, MoveDEX["踢倒"]), new GradingMove(undefined, MoveDEX["瞪眼"]), new GradingMove(20, MoveDEX["踢倒"]), new GradingMove(25, MoveDEX["瞪眼"]), new GradingMove(36, MoveDEX["聚氣"]), new GradingMove(44, MoveDEX["地球上投"]), new GradingMove(52, MoveDEX["地獄翻滾"])];
    DEX["豪力"] = new PokemonType(basicStat, 67, new Image(pokemonImagePath + "067_豪力.png"), new Image(pokemonImagePath + "067_豪力_Back.png"), "豪力", moves, Type.Fighting, undefined);

    basicStat = {maxHP: 90, attack: 130, defense: 80, special: 65, speed: 55};
    moves = [new GradingMove(undefined, MoveDEX["空手劈"]), new GradingMove(undefined, MoveDEX["踢倒"]), new GradingMove(undefined, MoveDEX["瞪眼"]), new GradingMove(20, MoveDEX["踢倒"]), new GradingMove(25, MoveDEX["瞪眼"]), new GradingMove(36, MoveDEX["聚氣"]), new GradingMove(44, MoveDEX["地球上投"]), new GradingMove(52, MoveDEX["地獄翻滾"])];
    DEX["怪力"] = new PokemonType(basicStat, 68, new Image(pokemonImagePath + "068_怪力.png"), new Image(pokemonImagePath + "068_怪力_Back.png"), "怪力", moves, Type.Fighting, undefined);

    basicStat = {maxHP: 50, attack: 75, defense: 35, special: 70, speed: 40};
    moves = [new GradingMove(undefined, MoveDEX["藤鞭"]), new GradingMove(undefined, MoveDEX["生長"]), new GradingMove(13, MoveDEX["緊束"]), new GradingMove(15, MoveDEX["毒粉"]), new GradingMove(18, MoveDEX["催眠粉"]), new GradingMove(21, MoveDEX["麻痺粉"]), new GradingMove(26, MoveDEX["溶解液"]), new GradingMove(33, MoveDEX["飛葉快刀"]), new GradingMove(42, MoveDEX["摔打"])];
    DEX["喇叭芽"] = new PokemonType(basicStat, 69, new Image(pokemonImagePath + "069_喇叭芽.png"), new Image(pokemonImagePath + "069_喇叭芽_Back.png"), "喇叭芽", moves, Type.Grass, Type.Poison);

    basicStat = {maxHP: 65, attack: 90, defense: 50, special: 85, speed: 55};
    moves = [new GradingMove(undefined, MoveDEX["藤鞭"]), new GradingMove(undefined, MoveDEX["生長"]), new GradingMove(undefined, MoveDEX["緊束"]), new GradingMove(15, MoveDEX["毒粉"]), new GradingMove(18, MoveDEX["催眠粉"]), new GradingMove(23, MoveDEX["麻痺粉"]), new GradingMove(29, MoveDEX["溶解液"]), new GradingMove(38, MoveDEX["飛葉快刀"]), new GradingMove(49, MoveDEX["摔打"])];
    DEX["口呆花"] = new PokemonType(basicStat, 70, new Image(pokemonImagePath + "070_口呆花.png"), new Image(pokemonImagePath + "070_口呆花_Back.png"), "口呆花", moves, Type.Grass, Type.Poison);

    basicStat = {maxHP: 80, attack: 105, defense: 65, special: 100, speed: 70};
    moves = [new GradingMove(undefined, MoveDEX["催眠粉"]), new GradingMove(undefined, MoveDEX["麻痺粉"]), new GradingMove(undefined, MoveDEX["溶解液"]), new GradingMove(undefined, MoveDEX["飛葉快刀"]), new GradingMove(13, MoveDEX["緊束"]), new GradingMove(15, MoveDEX["毒粉"]), new GradingMove(18, MoveDEX["催眠粉"])];
    DEX["大食花"] = new PokemonType(basicStat, 71, new Image(pokemonImagePath + "071_大食花.png"), new Image(pokemonImagePath + "071_大食花_Back.png"), "大食花", moves, Type.Grass, Type.Poison);

    basicStat = {maxHP: 40, attack: 40, defense: 35, special: 100, speed: 70};
    moves = [new GradingMove(undefined, MoveDEX["溶解液"]), new GradingMove(7, MoveDEX["超音波"]), new GradingMove(13, MoveDEX["緊束"]), new GradingMove(18, MoveDEX["毒針"]), new GradingMove(22, MoveDEX["水槍"]), new GradingMove(27, MoveDEX["纏繞"]), new GradingMove(33, MoveDEX["屏障"]), new GradingMove(40, MoveDEX["刺耳聲"]), new GradingMove(48, MoveDEX["水炮"])];
    DEX["瑪瑙水母"] = new PokemonType(basicStat, 72, new Image(pokemonImagePath + "072_瑪瑙水母.png"), new Image(pokemonImagePath + "072_瑪瑙水母_Back.png"), "瑪瑙水母", moves, Type.Water, Type.Poison);

    basicStat = {maxHP: 80, attack: 70, defense: 65, special: 120, speed: 100};
    moves = [new GradingMove(undefined, MoveDEX["溶解液"]), new GradingMove(undefined, MoveDEX["超音波"]), new GradingMove(undefined, MoveDEX["緊束"]), new GradingMove(18, MoveDEX["毒針"]), new GradingMove(22, MoveDEX["水槍"]), new GradingMove(27, MoveDEX["纏繞"]), new GradingMove(35, MoveDEX["屏障"]), new GradingMove(43, MoveDEX["刺耳聲"]), new GradingMove(50, MoveDEX["水炮"])];
    DEX["毒刺水母"] = new PokemonType(basicStat, 73, new Image(pokemonImagePath + "073_毒刺水母.png"), new Image(pokemonImagePath + "073_毒刺水母_Back.png"), "毒刺水母", moves, Type.Water, Type.Poison);

    basicStat = {maxHP: 40, attack: 80, defense: 100, special: 30, speed: 20};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(11, MoveDEX["變圓"]), new GradingMove(16, MoveDEX["落石"]), new GradingMove(21, MoveDEX["自爆"]), new GradingMove(26, MoveDEX["變硬"]), new GradingMove(31, MoveDEX["地震"]), new GradingMove(36, MoveDEX["大爆炸"])];
    DEX["小拳石"] = new PokemonType(basicStat, 74, new Image(pokemonImagePath + "074_小拳石.png"), new Image(pokemonImagePath + "074_小拳石_Back.png"), "小拳石", moves, Type.Rock, Type.Ground);

    basicStat = {maxHP: 55, attack: 95, defense: 115, special: 45, speed: 35};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["變圓"]), new GradingMove(16, MoveDEX["落石"]), new GradingMove(21, MoveDEX["自爆"]), new GradingMove(29, MoveDEX["變硬"]), new GradingMove(36, MoveDEX["地震"]), new GradingMove(43, MoveDEX["大爆炸"])];
    DEX["隆隆石"] = new PokemonType(basicStat, 75, new Image(pokemonImagePath + "075_隆隆石.png"), new Image(pokemonImagePath + "075_隆隆石_Back.png"), "隆隆石", moves, Type.Rock, Type.Ground);

    basicStat = {maxHP: 80, attack: 110, defense: 130, special: 55, speed: 45};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["變圓"]), new GradingMove(16, MoveDEX["落石"]), new GradingMove(21, MoveDEX["自爆"]), new GradingMove(29, MoveDEX["變硬"]), new GradingMove(36, MoveDEX["地震"]), new GradingMove(43, MoveDEX["大爆炸"])];
    DEX["隆隆岩"] = new PokemonType(basicStat, 76, new Image(pokemonImagePath + "076_隆隆岩.png"), new Image(pokemonImagePath + "076_隆隆岩_Back.png"), "隆隆岩", moves, Type.Rock, Type.Ground);

    basicStat = {maxHP: 50, attack: 85, defense: 55, special: 65, speed: 90};
    moves = [new GradingMove(undefined, MoveDEX["火花"]), new GradingMove(30, MoveDEX["搖尾巴"]), new GradingMove(32, MoveDEX["踩踏"]), new GradingMove(35, MoveDEX["叫聲"]), new GradingMove(39, MoveDEX["火焰旋渦"]), new GradingMove(43, MoveDEX["猛撞"]), new GradingMove(48, MoveDEX["高速移動"])];
    DEX["小火馬"] = new PokemonType(basicStat, 77, new Image(pokemonImagePath + "077_小火馬.png"), new Image(pokemonImagePath + "077_小火馬_Back.png"), "小火馬", moves, Type.Fire, undefined);

    basicStat = {maxHP: 65, attack: 100, defense: 70, special: 80, speed: 105};
    moves = [new GradingMove(undefined, MoveDEX["火花"]), new GradingMove(undefined, MoveDEX["搖尾巴"]), new GradingMove(undefined, MoveDEX["踩踏"]), new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(30, MoveDEX["搖尾巴"]), new GradingMove(32, MoveDEX["踩踏"]), new GradingMove(35, MoveDEX["叫聲"]), new GradingMove(39, MoveDEX["火焰旋渦"]), new GradingMove(47, MoveDEX["猛撞"]), new GradingMove(55, MoveDEX["高速移動"])];
    DEX["烈焰馬"] = new PokemonType(basicStat, 78, new Image(pokemonImagePath + "078_烈焰馬.png"), new Image(pokemonImagePath + "078_烈焰馬_Back.png"), "烈焰馬", moves, Type.Fire, undefined);

    basicStat = {maxHP: 90, attack: 65, defense: 65, special: 40, speed: 15};
    moves = [new GradingMove(undefined, MoveDEX["念力"]), new GradingMove(18, MoveDEX["定身法"]), new GradingMove(22, MoveDEX["頭錘"]), new GradingMove(27, MoveDEX["叫聲"]), new GradingMove(33, MoveDEX["水槍"]), new GradingMove(40, MoveDEX["瞬間失憶"]), new GradingMove(48, MoveDEX["精神強念"])];
    DEX["呆呆獸"] = new PokemonType(basicStat, 79, new Image(pokemonImagePath + "079_呆呆獸.png"), new Image(pokemonImagePath + "079_呆呆獸_Back.png"), "呆呆獸", moves, Type.Water, Type.Phycsic);

    basicStat = {maxHP: 95, attack: 75, defense: 110, special: 80, speed: 30};
    moves = [new GradingMove(undefined, MoveDEX["念力"]), new GradingMove(undefined, MoveDEX["定身法"]), new GradingMove(undefined, MoveDEX["頭錘"]), new GradingMove(18, MoveDEX["定身法"]), new GradingMove(22, MoveDEX["頭錘"]), new GradingMove(27, MoveDEX["叫聲"]), new GradingMove(33, MoveDEX["水槍"]), new GradingMove(37, MoveDEX["縮入殼中"]), new GradingMove(44, MoveDEX["瞬間失憶"]), new GradingMove(55, MoveDEX["精神強念"])];
    DEX["呆殼獸"] = new PokemonType(basicStat, 80, new Image(pokemonImagePath + "080_呆殼獸.png"), new Image(pokemonImagePath + "080_呆殼獸_Back.png"), "呆殼獸", moves, Type.Water, Type.Phycsic);

    basicStat = {maxHP: 25, attack: 35, defense: 70, special: 95, speed: 45};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(21, MoveDEX["音爆"]), new GradingMove(25, MoveDEX["電擊"]), new GradingMove(29, MoveDEX["超音波"]), new GradingMove(35, MoveDEX["電磁波"]), new GradingMove(41, MoveDEX["高速星星"]), new GradingMove(47, MoveDEX["刺耳聲"])];
    DEX["小磁怪"] = new PokemonType(basicStat, 81, new Image(pokemonImagePath + "081_小磁怪.png"), new Image(pokemonImagePath + "081_小磁怪_Back.png"), "小磁怪", moves, Type.Electric, undefined);

    basicStat = {maxHP: 50, attack: 60, defense: 95, special: 120, speed: 70};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["音爆"]), new GradingMove(undefined, MoveDEX["電擊"]), new GradingMove(undefined, MoveDEX["超音波"]), new GradingMove(38, MoveDEX["電磁波"]), new GradingMove(46, MoveDEX["高速星星"]), new GradingMove(54, MoveDEX["刺耳聲"])];
    DEX["三合一磁怪"] = new PokemonType(basicStat, 82, new Image(pokemonImagePath + "082_三合一磁怪.png"), new Image(pokemonImagePath + "082_三合一磁怪_Back.png"), "三合一磁怪", moves, Type.Electric, undefined);

    basicStat = {maxHP: 52, attack: 65, defense: 55, special: 58, speed: 60};
    moves = [new GradingMove(undefined, MoveDEX["啄"]), new GradingMove(undefined, MoveDEX["潑沙"]), new GradingMove(7, MoveDEX["瞪眼"]), new GradingMove(15, MoveDEX["亂擊"]), new GradingMove(23, MoveDEX["劍舞"]), new GradingMove(31, MoveDEX["高速移動"]), new GradingMove(39, MoveDEX["劈開"])];
    DEX["大蔥鴨"] = new PokemonType(basicStat, 83, new Image(pokemonImagePath + "083_大蔥鴨.png"), new Image(pokemonImagePath + "083_大蔥鴨_Back.png"), "大蔥鴨", moves, Type.Normal, Type.Flying);

    basicStat = {maxHP: 35, attack: 85, defense: 45, special: 35, speed: 75};
    moves = [new GradingMove(undefined, MoveDEX["啄"]), new GradingMove(20, MoveDEX["叫聲"]), new GradingMove(24, MoveDEX["亂擊"]), new GradingMove(30, MoveDEX["啄鑽"]), new GradingMove(36, MoveDEX["憤怒"]), new GradingMove(40, MoveDEX["三重攻擊"]), new GradingMove(44, MoveDEX["高速移動"])];
    DEX["嘟嘟"] = new PokemonType(basicStat, 84, new Image(pokemonImagePath + "084_嘟嘟.png"), new Image(pokemonImagePath + "084_嘟嘟_Back.png"), "嘟嘟", moves, Type.Normal, Type.Flying);

    basicStat = {maxHP: 60, attack: 110, defense: 70, special: 60, speed: 100};
    moves = [new GradingMove(undefined, MoveDEX["啄"]), new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(undefined, MoveDEX["亂擊"]), new GradingMove(20, MoveDEX["叫聲"]), new GradingMove(24, MoveDEX["亂擊"]), new GradingMove(30, MoveDEX["啄鑽"]), new GradingMove(39, MoveDEX["憤怒"]), new GradingMove(45, MoveDEX["三重攻擊"]), new GradingMove(51, MoveDEX["高速移動"])];
    DEX["嘟嘟利"] = new PokemonType(basicStat, 85, new Image(pokemonImagePath + "085_嘟嘟利.png"), new Image(pokemonImagePath + "085_嘟嘟利_Back.png"), "嘟嘟利", moves, Type.Normal, Type.Flying);

    basicStat = {maxHP: 65, attack: 45, defense: 55, special: 70, speed: 45};
    moves = [new GradingMove(undefined, MoveDEX["頭錘"]), new GradingMove(30, MoveDEX["叫聲"]), new GradingMove(35, MoveDEX["極光束"]), new GradingMove(40, MoveDEX["睡覺"]), new GradingMove(45, MoveDEX["猛撞"]), new GradingMove(50, MoveDEX["冰凍光束"])];
    DEX["小海獅"] = new PokemonType(basicStat, 86, new Image(pokemonImagePath + "086_小海獅.png"), new Image(pokemonImagePath + "086_小海獅_Back.png"), "小海獅", moves, Type.Water, undefined);

    basicStat = {maxHP: 90, attack: 70, defense: 80, special: 95, speed: 70};
    moves = [new GradingMove(undefined, MoveDEX["頭錘"]), new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(undefined, MoveDEX["極光束"]), new GradingMove(30, MoveDEX["叫聲"]), new GradingMove(35, MoveDEX["極光束"]), new GradingMove(44, MoveDEX["睡覺"]), new GradingMove(50, MoveDEX["猛撞"]), new GradingMove(56, MoveDEX["冰凍光束"])];
    DEX["白海獅"] = new PokemonType(basicStat, 87, new Image(pokemonImagePath + "087_白海獅.png"), new Image(pokemonImagePath + "087_白海獅_Back.png"), "白海獅", moves, Type.Water, Type.Ice);

    basicStat = {maxHP: 80, attack: 80, defense: 50, special: 40, speed: 25};
    moves = [new GradingMove(undefined, MoveDEX["拍擊"]), new GradingMove(undefined, MoveDEX["定身法"]), new GradingMove(30, MoveDEX["毒瓦斯"]), new GradingMove(33, MoveDEX["變小"]), new GradingMove(37, MoveDEX["污泥攻擊"]), new GradingMove(42, MoveDEX["變硬"]), new GradingMove(48, MoveDEX["刺耳聲"]), new GradingMove(55, MoveDEX["溶化"])];
    DEX["臭泥"] = new PokemonType(basicStat, 88, new Image(pokemonImagePath + "088_臭泥.png"), new Image(pokemonImagePath + "088_臭泥_Back.png"), "臭泥", moves, Type.Poison, undefined);

    basicStat = {maxHP: 105, attack: 105, defense: 75, special: 65, speed: 50};
    moves = [new GradingMove(undefined, MoveDEX["拍擊"]), new GradingMove(undefined, MoveDEX["定身法"]), new GradingMove(undefined, MoveDEX["毒瓦斯"]), new GradingMove(30, MoveDEX["毒瓦斯"]), new GradingMove(33, MoveDEX["變小"]), new GradingMove(37, MoveDEX["污泥攻擊"]), new GradingMove(45, MoveDEX["變硬"]), new GradingMove(53, MoveDEX["刺耳聲"]), new GradingMove(60, MoveDEX["溶化"])];
    DEX["臭臭泥"] = new PokemonType(basicStat, 89, new Image(pokemonImagePath + "089_臭臭泥.png"), new Image(pokemonImagePath + "089_臭臭泥_Back.png"), "臭臭泥", moves, Type.Poison, undefined);

    basicStat = {maxHP: 30, attack: 65, defense: 100, special: 45, speed: 40};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["縮入殼中"]), new GradingMove(18, MoveDEX["超音波"]), new GradingMove(23, MoveDEX["貝殼夾擊"]), new GradingMove(30, MoveDEX["極光束"]), new GradingMove(39, MoveDEX["瞪眼"]), new GradingMove(50, MoveDEX["冰凍光束"])];
    DEX["大舌貝"] = new PokemonType(basicStat, 90, new Image(pokemonImagePath + "090_大舌貝.png"), new Image(pokemonImagePath + "090_大舌貝_Back.png"), "大舌貝", moves, Type.Water, undefined);

    basicStat = {maxHP: 50, attack: 95, defense: 180, special: 85, speed: 70};
    moves = [new GradingMove(undefined, MoveDEX["縮入殼中"]), new GradingMove(undefined, MoveDEX["超音波"]), new GradingMove(undefined, MoveDEX["貝殼夾擊"]), new GradingMove(undefined, MoveDEX["極光束"]), new GradingMove(50, MoveDEX["尖刺加農炮"])];
    DEX["刺甲貝"] = new PokemonType(basicStat, 91, new Image(pokemonImagePath + "091_刺甲貝.png"), new Image(pokemonImagePath + "091_刺甲貝_Back.png"), "刺甲貝", moves, Type.Water, Type.Ice);

    basicStat = {maxHP: 30, attack: 35, defense: 30, special: 100, speed: 80};
    moves = [new GradingMove(undefined, MoveDEX["舌舔"]), new GradingMove(undefined, MoveDEX["奇異之光"]), new GradingMove(undefined, MoveDEX["黑夜魔影"]), new GradingMove(27, MoveDEX["催眠術"]), new GradingMove(35, MoveDEX["食夢"])];
    DEX["鬼斯"] = new PokemonType(basicStat, 92, new Image(pokemonImagePath + "092_鬼斯.png"), new Image(pokemonImagePath + "092_鬼斯_Back.png"), "鬼斯", moves, Type.Ghost, Type.Poison);

    basicStat = {maxHP: 45, attack: 50, defense: 45, special: 115, speed: 95};
    moves = [new GradingMove(undefined, MoveDEX["舌舔"]), new GradingMove(undefined, MoveDEX["奇異之光"]), new GradingMove(undefined, MoveDEX["黑夜魔影"]), new GradingMove(29, MoveDEX["催眠術"]), new GradingMove(38, MoveDEX["食夢"])];
    DEX["鬼斯通"] = new PokemonType(basicStat, 93, new Image(pokemonImagePath + "093_鬼斯通.png"), new Image(pokemonImagePath + "093_鬼斯通_Back.png"), "鬼斯通", moves, Type.Ghost, Type.Poison);

    basicStat = {maxHP: 60, attack: 65, defense: 60, special: 130, speed: 110};
    moves = [new GradingMove(undefined, MoveDEX["舌舔"]), new GradingMove(undefined, MoveDEX["奇異之光"]), new GradingMove(undefined, MoveDEX["黑夜魔影"]), new GradingMove(29, MoveDEX["催眠術"]), new GradingMove(38, MoveDEX["食夢"])];
    DEX["耿鬼"] = new PokemonType(basicStat, 94, new Image(pokemonImagePath + "094_耿鬼.png"), new Image(pokemonImagePath + "094_耿鬼_Back.png"), "耿鬼", moves, Type.Ghost, Type.Poison);

    basicStat = {maxHP: 35, attack: 45, defense: 160, special: 30, speed: 70};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["刺耳聲"]), new GradingMove(15, MoveDEX["綁緊"]), new GradingMove(19, MoveDEX["落石"]), new GradingMove(25, MoveDEX["憤怒"]), new GradingMove(33, MoveDEX["摔打"]), new GradingMove(43, MoveDEX["變硬"])];
    DEX["大岩蛇"] = new PokemonType(basicStat, 95, new Image(pokemonImagePath + "095_大岩蛇.png"), new Image(pokemonImagePath + "095_大岩蛇_Back.png"), "大岩蛇", moves, Type.Rock, Type.Ground);

    basicStat = {maxHP: 60, attack: 48, defense: 45, special: 90, speed: 42};
    moves = [new GradingMove(undefined, MoveDEX["拍擊"]), new GradingMove(undefined, MoveDEX["催眠術"]), new GradingMove(12, MoveDEX["定身法"]), new GradingMove(17, MoveDEX["念力"]), new GradingMove(24, MoveDEX["頭錘"]), new GradingMove(29, MoveDEX["毒瓦斯"]), new GradingMove(32, MoveDEX["精神強念"]), new GradingMove(37, MoveDEX["瑜伽姿勢"])];
    DEX["催眠貘"] = new PokemonType(basicStat, 96, new Image(pokemonImagePath + "096_催眠貘.png"), new Image(pokemonImagePath + "096_催眠貘_Back.png"), "催眠貘", moves, Type.Phycsic, undefined);

    basicStat = {maxHP: 85, attack: 73, defense: 70, special: 115, speed: 67};
    moves = [new GradingMove(undefined, MoveDEX["拍擊"]), new GradingMove(undefined, MoveDEX["催眠術"]), new GradingMove(undefined, MoveDEX["定身法"]), new GradingMove(undefined, MoveDEX["念力"]), new GradingMove(12, MoveDEX["定身法"]), new GradingMove(17, MoveDEX["念力"]), new GradingMove(24, MoveDEX["頭錘"]), new GradingMove(33, MoveDEX["毒瓦斯"]), new GradingMove(37, MoveDEX["精神強念"]), new GradingMove(43, MoveDEX["瑜伽姿勢"])];
    DEX["引夢貘人"] = new PokemonType(basicStat, 97, new Image(pokemonImagePath + "097_引夢貘人.png"), new Image(pokemonImagePath + "097_引夢貘人_Back.png"), "引夢貘人", moves, Type.Phycsic, undefined);

    basicStat = {maxHP: 30, attack: 105, defense: 90, special: 25, speed: 50};
    moves = [new GradingMove(undefined, MoveDEX["泡沫"]), new GradingMove(undefined, MoveDEX["瞪眼"]), new GradingMove(20, MoveDEX["夾住"]), new GradingMove(25, MoveDEX["斷頭鉗"]), new GradingMove(30, MoveDEX["踩踏"]), new GradingMove(35, MoveDEX["蟹鉗錘"]), new GradingMove(40, MoveDEX["變硬"])];
    DEX["大鉗蟹"] = new PokemonType(basicStat, 98, new Image(pokemonImagePath + "098_大鉗蟹.png"), new Image(pokemonImagePath + "098_大鉗蟹_Back.png"), "大鉗蟹", moves, Type.Water, undefined);

    basicStat = {maxHP: 55, attack: 130, defense: 115, special: 50, speed: 75};
    moves = [new GradingMove(undefined, MoveDEX["泡沫"]), new GradingMove(undefined, MoveDEX["瞪眼"]), new GradingMove(undefined, MoveDEX["夾住"]), new GradingMove(20, MoveDEX["夾住"]), new GradingMove(25, MoveDEX["斷頭鉗"]), new GradingMove(34, MoveDEX["踩踏"]), new GradingMove(42, MoveDEX["蟹鉗錘"]), new GradingMove(49, MoveDEX["變硬"])];
    DEX["巨鉗蟹"] = new PokemonType(basicStat, 99, new Image(pokemonImagePath + "099_巨鉗蟹.png"), new Image(pokemonImagePath + "099_巨鉗蟹_Back.png"), "巨鉗蟹", moves, Type.Water, undefined);

    basicStat = {maxHP: 40, attack: 30, defense: 50, special: 55, speed: 100};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["刺耳聲"]), new GradingMove(17, MoveDEX["音爆"]), new GradingMove(22, MoveDEX["自爆"]), new GradingMove(29, MoveDEX["光牆"]), new GradingMove(36, MoveDEX["高速星星"]), new GradingMove(43, MoveDEX["大爆炸"])];
    DEX["霹靂電球"] = new PokemonType(basicStat, 100, new Image(pokemonImagePath + "100_霹靂電球.png"), new Image(pokemonImagePath + "100_霹靂電球_Back.png"), "霹靂電球", moves, Type.Electric, undefined);

    basicStat = {maxHP: 60, attack: 50, defense: 70, special: 80, speed: 140};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["刺耳聲"]), new GradingMove(undefined, MoveDEX["音爆"]), new GradingMove(22, MoveDEX["自爆"]), new GradingMove(29, MoveDEX["光牆"]), new GradingMove(40, MoveDEX["高速星星"]), new GradingMove(50, MoveDEX["大爆炸"])];
    DEX["頑皮雷彈"] = new PokemonType(basicStat, 101, new Image(pokemonImagePath + "101_頑皮雷彈.png"), new Image(pokemonImagePath + "101_頑皮雷彈_Back.png"), "頑皮雷彈", moves, Type.Electric, undefined);

    basicStat = {maxHP: 60, attack: 40, defense: 80, special: 60, speed: 40};
    moves = [new GradingMove(undefined, MoveDEX["投球"]), new GradingMove(undefined, MoveDEX["催眠術"]), new GradingMove(25, MoveDEX["反射壁"]), new GradingMove(28, MoveDEX["寄生種子"]), new GradingMove(32, MoveDEX["麻痺粉"]), new GradingMove(37, MoveDEX["毒粉"]), new GradingMove(42, MoveDEX["日光束"]), new GradingMove(48, MoveDEX["催眠粉"])];
    DEX["蛋蛋"] = new PokemonType(basicStat, 102, new Image(pokemonImagePath + "102_蛋蛋.png"), new Image(pokemonImagePath + "102_蛋蛋_Back.png"), "蛋蛋", moves, Type.Grass, Type.Phycsic);

    basicStat = {maxHP: 95, attack: 95, defense: 85, special: 125, speed: 55};
    moves = [new GradingMove(undefined, MoveDEX["投球"]), new GradingMove(undefined, MoveDEX["催眠術"]), new GradingMove(28, MoveDEX["踩踏"])];
    DEX["椰蛋樹"] = new PokemonType(basicStat, 103, new Image(pokemonImagePath + "103_椰蛋樹.png"), new Image(pokemonImagePath + "103_椰蛋樹_Back.png"), "椰蛋樹", moves, Type.Grass, Type.Phycsic);

    basicStat = {maxHP: 50, attack: 50, defense: 95, special: 40, speed: 35};
    moves = [new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(10, MoveDEX["骨棒"]), new GradingMove(13, MoveDEX["搖尾巴"]), new GradingMove(18, MoveDEX["頭錘"]), new GradingMove(25, MoveDEX["瞪眼"]), new GradingMove(31, MoveDEX["聚氣"]), new GradingMove(38, MoveDEX["大鬧一番"]), new GradingMove(43, MoveDEX["骨頭回力鏢"]), new GradingMove(46, MoveDEX["憤怒"])];
    DEX["卡拉卡拉"] = new PokemonType(basicStat, 104, new Image(pokemonImagePath + "104_卡拉卡拉.png"), new Image(pokemonImagePath + "104_卡拉卡拉_Back.png"), "卡拉卡拉", moves, Type.Ground, undefined);

    basicStat = {maxHP: 60, attack: 80, defense: 110, special: 50, speed: 45};
    moves = [new GradingMove(undefined, MoveDEX["搖尾巴"]), new GradingMove(10, MoveDEX["骨棒"]), new GradingMove(13, MoveDEX["搖尾巴"]), new GradingMove(18, MoveDEX["頭錘"]), new GradingMove(25, MoveDEX["瞪眼"]), new GradingMove(33, MoveDEX["聚氣"]), new GradingMove(41, MoveDEX["大鬧一番"]), new GradingMove(48, MoveDEX["骨頭回力鏢"]), new GradingMove(55, MoveDEX["憤怒"])];
    DEX["嘎啦嘎啦"] = new PokemonType(basicStat, 105, new Image(pokemonImagePath + "105_嘎啦嘎啦.png"), new Image(pokemonImagePath + "105_嘎啦嘎啦_Back.png"), "嘎啦嘎啦", moves, Type.Ground, Type.Fire);

    basicStat = {maxHP: 50, attack: 120, defense: 53, special: 35, speed: 87};
    moves = [new GradingMove(undefined, MoveDEX["二連踢"]), new GradingMove(undefined, MoveDEX["瑜伽姿勢"]), new GradingMove(33, MoveDEX["迴旋踢"]), new GradingMove(38, MoveDEX["飛踢"]), new GradingMove(43, MoveDEX["聚氣"]), new GradingMove(48, MoveDEX["飛膝踢"]), new GradingMove(53, MoveDEX["百萬噸重踢"])];
    DEX["飛腿郎"] = new PokemonType(basicStat, 106, new Image(pokemonImagePath + "106_飛腿郎.png"), new Image(pokemonImagePath + "106_飛腿郎_Back.png"), "飛腿郎", moves, Type.Fighting, undefined);

    basicStat = {maxHP: 50, attack: 105, defense: 79, special: 35, speed: 76};
    moves = [new GradingMove(undefined, MoveDEX["連續拳"]), new GradingMove(undefined, MoveDEX["高速移動"]), new GradingMove(33, MoveDEX["火焰拳"]), new GradingMove(38, MoveDEX["冰凍拳"]), new GradingMove(43, MoveDEX["雷電拳"]), new GradingMove(48, MoveDEX["百萬噸重拳"]), new GradingMove(53, MoveDEX["雙倍奉還"])];
    DEX["快拳郎"] = new PokemonType(basicStat, 107, new Image(pokemonImagePath + "107_快拳郎.png"), new Image(pokemonImagePath + "107_快拳郎_Back.png"), "快拳郎", moves, Type.Fighting, undefined);

    basicStat = {maxHP: 90, attack: 55, defense: 75, special: 60, speed: 30};
    moves = [new GradingMove(undefined, MoveDEX["緊束"]), new GradingMove(undefined, MoveDEX["超音波"]), new GradingMove(7, MoveDEX["踩踏"]), new GradingMove(15, MoveDEX["定身法"]), new GradingMove(23, MoveDEX["變圓"]), new GradingMove(31, MoveDEX["摔打"]), new GradingMove(39, MoveDEX["刺耳聲"])];
    DEX["大舌頭"] = new PokemonType(basicStat, 108, new Image(pokemonImagePath + "108_大舌頭.png"), new Image(pokemonImagePath + "108_大舌頭_Back.png"), "大舌頭", moves, Type.Normal, undefined);

    basicStat = {maxHP: 40, attack: 65, defense: 95, special: 60, speed: 35};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["濁霧"]), new GradingMove(32, MoveDEX["污泥攻擊"]), new GradingMove(37, MoveDEX["煙幕"]), new GradingMove(40, MoveDEX["自爆"]), new GradingMove(45, MoveDEX["黑霧"]), new GradingMove(48, MoveDEX["大爆炸"])];
    DEX["瓦斯彈"] = new PokemonType(basicStat, 109, new Image(pokemonImagePath + "109_瓦斯彈.png"), new Image(pokemonImagePath + "109_瓦斯彈_Back.png"), "瓦斯彈", moves, Type.Poison, undefined);

    basicStat = {maxHP: 65, attack: 90, defense: 120, special: 85, speed: 60};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["濁霧"]), new GradingMove(undefined, MoveDEX["污泥攻擊"]), new GradingMove(39, MoveDEX["煙幕"]), new GradingMove(43, MoveDEX["自爆"]), new GradingMove(49, MoveDEX["黑霧"]), new GradingMove(53, MoveDEX["大爆炸"])];
    DEX["雙彈瓦斯"] = new PokemonType(basicStat, 110, new Image(pokemonImagePath + "110_雙彈瓦斯.png"), new Image(pokemonImagePath + "110_雙彈瓦斯_Back.png"), "雙彈瓦斯", moves, Type.Poison, undefined);

    basicStat = {maxHP: 80, attack: 85, defense: 95, special: 30, speed: 25};
    moves = [new GradingMove(undefined, MoveDEX["角撞"]), new GradingMove(30, MoveDEX["踩踏"]), new GradingMove(35, MoveDEX["搖尾巴"]), new GradingMove(40, MoveDEX["亂擊"]), new GradingMove(45, MoveDEX["角鑽"]), new GradingMove(50, MoveDEX["瞪眼"]), new GradingMove(55, MoveDEX["猛撞"])];
    DEX["獨角犀牛"] = new PokemonType(basicStat, 111, new Image(pokemonImagePath + "111_獨角犀牛.png"), new Image(pokemonImagePath + "111_獨角犀牛_Back.png"), "獨角犀牛", moves, Type.Ground, Type.Rock);

    basicStat = {maxHP: 105, attack: 130, defense: 120, special: 45, speed: 40};
    moves = [new GradingMove(undefined, MoveDEX["角撞"]), new GradingMove(undefined, MoveDEX["踩踏"]), new GradingMove(undefined, MoveDEX["搖尾巴"]), new GradingMove(undefined, MoveDEX["亂擊"]), new GradingMove(30, MoveDEX["踩踏"]), new GradingMove(35, MoveDEX["搖尾巴"]), new GradingMove(40, MoveDEX["亂擊"]), new GradingMove(48, MoveDEX["角鑽"]), new GradingMove(55, MoveDEX["瞪眼"]), new GradingMove(64, MoveDEX["猛撞"])];
    DEX["鑽角犀獸"] = new PokemonType(basicStat, 112, new Image(pokemonImagePath + "112_鑽角犀獸.png"), new Image(pokemonImagePath + "112_鑽角犀獸_Back.png"), "鑽角犀獸", moves, Type.Ground, Type.Rock);

    basicStat = {maxHP: 250, attack: 5, defense: 5, special: 105, speed: 50};
    moves = [new GradingMove(undefined, MoveDEX["拍擊"]), new GradingMove(undefined, MoveDEX["搖尾巴"]), new GradingMove(12, MoveDEX["連環巴掌"]), new GradingMove(24, MoveDEX["唱歌"]), new GradingMove(30, MoveDEX["叫聲"]), new GradingMove(38, MoveDEX["變小"]), new GradingMove(44, MoveDEX["變圓"]), new GradingMove(48, MoveDEX["光牆"]), new GradingMove(54, MoveDEX["捨身衝撞"])];
    DEX["吉利蛋"] = new PokemonType(basicStat, 113, new Image(pokemonImagePath + "113_吉利蛋.png"), new Image(pokemonImagePath + "113_吉利蛋_Back.png"), "吉利蛋", moves, Type.Normal, undefined);

    basicStat = {maxHP: 65, attack: 55, defense: 115, special: 100, speed: 60};
    moves = [new GradingMove(undefined, MoveDEX["纏繞"]), new GradingMove(24, MoveDEX["綁緊"]), new GradingMove(27, MoveDEX["吸取"]), new GradingMove(29, MoveDEX["藤鞭"]), new GradingMove(32, MoveDEX["毒粉"]), new GradingMove(36, MoveDEX["麻痺粉"]), new GradingMove(39, MoveDEX["催眠粉"]), new GradingMove(45, MoveDEX["摔打"]), new GradingMove(48, MoveDEX["生長"])];
    DEX["蔓藤怪"] = new PokemonType(basicStat, 114, new Image(pokemonImagePath + "114_蔓藤怪.png"), new Image(pokemonImagePath + "114_蔓藤怪_Back.png"), "蔓藤怪", moves, Type.Grass, undefined);

    basicStat = {maxHP: 105, attack: 95, defense: 80, special: 40, speed: 90};
    moves = [new GradingMove(undefined, MoveDEX["連續拳"]), new GradingMove(undefined, MoveDEX["憤怒"]), new GradingMove(26, MoveDEX["咬住"]), new GradingMove(31, MoveDEX["搖尾巴"]), new GradingMove(36, MoveDEX["百萬噸重拳"]), new GradingMove(41, MoveDEX["瞪眼"]), new GradingMove(46, MoveDEX["迷昏拳"])];
    DEX["袋獸"] = new PokemonType(basicStat, 115, new Image(pokemonImagePath + "115_袋獸.png"), new Image(pokemonImagePath + "115_袋獸_Back.png"), "袋獸", moves, Type.Normal, undefined);

    basicStat = {maxHP: 30, attack: 40, defense: 70, special: 70, speed: 60};
    moves = [new GradingMove(undefined, MoveDEX["泡沫"]), new GradingMove(19, MoveDEX["煙幕"]), new GradingMove(24, MoveDEX["瞪眼"]), new GradingMove(30, MoveDEX["水槍"]), new GradingMove(37, MoveDEX["高速移動"]), new GradingMove(45, MoveDEX["水炮"])];
    DEX["墨海馬"] = new PokemonType(basicStat, 116, new Image(pokemonImagePath + "116_墨海馬.png"), new Image(pokemonImagePath + "116_墨海馬_Back.png"), "墨海馬", moves, Type.Water, undefined);

    basicStat = {maxHP: 55, attack: 65, defense: 95, special: 95, speed: 85};
    moves = [new GradingMove(undefined, MoveDEX["泡沫"]), new GradingMove(undefined, MoveDEX["煙幕"]), new GradingMove(19, MoveDEX["煙幕"]), new GradingMove(24, MoveDEX["瞪眼"]), new GradingMove(30, MoveDEX["水槍"]), new GradingMove(41, MoveDEX["高速移動"]), new GradingMove(52, MoveDEX["水炮"])];
    DEX["海刺龍"] = new PokemonType(basicStat, 117, new Image(pokemonImagePath + "117_海刺龍.png"), new Image(pokemonImagePath + "117_海刺龍_Back.png"), "海刺龍", moves, Type.Water, undefined);

    basicStat = {maxHP: 45, attack: 67, defense: 60, special: 50, speed: 63};
    moves = [new GradingMove(undefined, MoveDEX["啄"]), new GradingMove(undefined, MoveDEX["搖尾巴"]), new GradingMove(19, MoveDEX["超音波"]), new GradingMove(24, MoveDEX["角撞"]), new GradingMove(30, MoveDEX["亂擊"]), new GradingMove(37, MoveDEX["攀瀑"]), new GradingMove(45, MoveDEX["角鑽"]), new GradingMove(54, MoveDEX["高速移動"])];
    DEX["角金魚"] = new PokemonType(basicStat, 118, new Image(pokemonImagePath + "118_角金魚.png"), new Image(pokemonImagePath + "118_角金魚_Back.png"), "角金魚", moves, Type.Water, undefined);

    basicStat = {maxHP: 80, attack: 92, defense: 65, special: 80, speed: 68};
    moves = [new GradingMove(undefined, MoveDEX["啄"]), new GradingMove(undefined, MoveDEX["搖尾巴"]), new GradingMove(undefined, MoveDEX["超音波"]), new GradingMove(19, MoveDEX["超音波"]), new GradingMove(24, MoveDEX["角撞"]), new GradingMove(30, MoveDEX["亂擊"]), new GradingMove(39, MoveDEX["攀瀑"]), new GradingMove(48, MoveDEX["角鑽"]), new GradingMove(54, MoveDEX["高速移動"])];
    DEX["金魚王"] = new PokemonType(basicStat, 119, new Image(pokemonImagePath + "119_金魚王.png"), new Image(pokemonImagePath + "119_金魚王_Back.png"), "金魚王", moves, Type.Water, undefined);

    basicStat = {maxHP: 30, attack: 45, defense: 55, special: 70, speed: 85};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(17, MoveDEX["水槍"]), new GradingMove(22, MoveDEX["變硬"]), new GradingMove(27, MoveDEX["自我再生"]), new GradingMove(32, MoveDEX["高速星星"]), new GradingMove(37, MoveDEX["變小"]), new GradingMove(42, MoveDEX["光牆"]), new GradingMove(47, MoveDEX["水炮"])];
    DEX["海星星"] = new PokemonType(basicStat, 120, new Image(pokemonImagePath + "120_海星星.png"), new Image(pokemonImagePath + "120_海星星_Back.png"), "海星星", moves, Type.Water, undefined);

    basicStat = {maxHP: 60, attack: 75, defense: 85, special: 100, speed: 115};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["水槍"]), new GradingMove(undefined, MoveDEX["變硬"])];
    DEX["寶石海星"] = new PokemonType(basicStat, 121, new Image(pokemonImagePath + "121_寶石海星.png"), new Image(pokemonImagePath + "121_寶石海星_Back.png"), "寶石海星", moves, Type.Water, Type.Phycsic);

    basicStat = {maxHP: 40, attack: 45, defense: 65, special: 100, speed: 90};
    moves = [new GradingMove(undefined, MoveDEX["念力"]), new GradingMove(undefined, MoveDEX["屏障"]), new GradingMove(15, MoveDEX["念力"]), new GradingMove(23, MoveDEX["光牆"]), new GradingMove(31, MoveDEX["連環巴掌"]), new GradingMove(39, MoveDEX["瑜伽姿勢"]), new GradingMove(47, MoveDEX["替身"])];
    DEX["魔牆人偶"] = new PokemonType(basicStat, 122, new Image(pokemonImagePath + "122_魔牆人偶.png"), new Image(pokemonImagePath + "122_魔牆人偶_Back.png"), "魔牆人偶", moves, Type.Phycsic, undefined);

    basicStat = {maxHP: 70, attack: 110, defense: 80, special: 55, speed: 105};
    moves = [new GradingMove(undefined, MoveDEX["電光一閃"]), new GradingMove(17, MoveDEX["瞪眼"]), new GradingMove(20, MoveDEX["聚氣"]), new GradingMove(24, MoveDEX["影子分身"]), new GradingMove(29, MoveDEX["劈開"]), new GradingMove(35, MoveDEX["劍舞"]), new GradingMove(42, MoveDEX["高速移動"]), new GradingMove(50, MoveDEX["翅膀攻擊"])];
    DEX["飛天螳螂"] = new PokemonType(basicStat, 123, new Image(pokemonImagePath + "123_飛天螳螂.png"), new Image(pokemonImagePath + "123_飛天螳螂_Back.png"), "飛天螳螂", moves, Type.Bug, Type.Flying);

    basicStat = {maxHP: 65, attack: 50, defense: 35, special: 95, speed: 95};
    moves = [new GradingMove(undefined, MoveDEX["拍擊"]), new GradingMove(undefined, MoveDEX["惡魔之吻"]), new GradingMove(18, MoveDEX["舌舔"]), new GradingMove(23, MoveDEX["連環巴掌"]), new GradingMove(31, MoveDEX["冰凍拳"]), new GradingMove(39, MoveDEX["泰山壓頂"]), new GradingMove(47, MoveDEX["大鬧一番"]), new GradingMove(58, MoveDEX["暴風雪"])];
    DEX["迷唇姐"] = new PokemonType(basicStat, 124, new Image(pokemonImagePath + "124_迷唇姐.png"), new Image(pokemonImagePath + "124_迷唇姐_Back.png"), "迷唇姐", moves, Type.Ice, Type.Phycsic);

    basicStat = {maxHP: 65, attack: 83, defense: 57, special: 85, speed: 105};
    moves = [new GradingMove(undefined, MoveDEX["電光一閃"]), new GradingMove(undefined, MoveDEX["瞪眼"]), new GradingMove(34, MoveDEX["電擊"]), new GradingMove(37, MoveDEX["刺耳聲"]), new GradingMove(42, MoveDEX["雷電拳"]), new GradingMove(49, MoveDEX["光牆"]), new GradingMove(54, MoveDEX["打雷"])];
    DEX["電擊獸"] = new PokemonType(basicStat, 125, new Image(pokemonImagePath + "125_電擊獸.png"), new Image(pokemonImagePath + "125_電擊獸_Back.png"), "電擊獸", moves, Type.Electric, undefined);

    basicStat = {maxHP: 65, attack: 95, defense: 57, special: 85, speed: 93};
    moves = [new GradingMove(undefined, MoveDEX["火花"]), new GradingMove(36, MoveDEX["瞪眼"]), new GradingMove(39, MoveDEX["奇異之光"]), new GradingMove(43, MoveDEX["火焰拳"]), new GradingMove(48, MoveDEX["煙幕"]), new GradingMove(52, MoveDEX["濁霧"]), new GradingMove(55, MoveDEX["噴射火焰"])];
    DEX["鴨嘴火獸"] = new PokemonType(basicStat, 126, new Image(pokemonImagePath + "126_鴨嘴火獸.png"), new Image(pokemonImagePath + "126_鴨嘴火獸_Back.png"), "鴨嘴火獸", moves, Type.Fire, undefined);

    basicStat = {maxHP: 65, attack: 125, defense: 100, special: 55, speed: 85};
    moves = [new GradingMove(undefined, MoveDEX["夾住"]), new GradingMove(21, MoveDEX["綁緊"]), new GradingMove(25, MoveDEX["地球上投"]), new GradingMove(30, MoveDEX["斷頭鉗"]), new GradingMove(36, MoveDEX["聚氣"]), new GradingMove(43, MoveDEX["變硬"]), new GradingMove(49, MoveDEX["劈開"]), new GradingMove(54, MoveDEX["劍舞"])];
    DEX["凱羅斯"] = new PokemonType(basicStat, 127, new Image(pokemonImagePath + "127_凱羅斯.png"), new Image(pokemonImagePath + "127_凱羅斯_Back.png"), "凱羅斯", moves, Type.Bug, undefined);

    basicStat = {maxHP: 75, attack: 100, defense: 95, special: 70, speed: 110};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(21, MoveDEX["踩踏"]), new GradingMove(28, MoveDEX["搖尾巴"]), new GradingMove(35, MoveDEX["瞪眼"]), new GradingMove(44, MoveDEX["憤怒"]), new GradingMove(51, MoveDEX["猛撞"])];
    DEX["肯泰羅"] = new PokemonType(basicStat, 128, new Image(pokemonImagePath + "128_肯泰羅.png"), new Image(pokemonImagePath + "128_肯泰羅_Back.png"), "肯泰羅", moves, Type.Normal, undefined);

    basicStat = {maxHP: 20, attack: 10, defense: 55, special: 20, speed: 80};
    moves = [new GradingMove(undefined, MoveDEX["躍起"]), new GradingMove(15, MoveDEX["撞擊"])];
    DEX["鯉魚王"] = new PokemonType(basicStat, 129, new Image(pokemonImagePath + "129_鯉魚王.png"), new Image(pokemonImagePath + "129_鯉魚王_Back.png"), "鯉魚王", moves, Type.Water, undefined);

    basicStat = {maxHP: 95, attack: 125, defense: 79, special: 100, speed: 81};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(20, MoveDEX["咬住"]), new GradingMove(25, MoveDEX["龍之怒"]), new GradingMove(32, MoveDEX["瞪眼"]), new GradingMove(41, MoveDEX["水炮"]), new GradingMove(52, MoveDEX["破壞光線"])];
    DEX["暴鯉龍"] = new PokemonType(basicStat, 130, new Image(pokemonImagePath + "130_暴鯉龍.png"), new Image(pokemonImagePath + "130_暴鯉龍_Back.png"), "暴鯉龍", moves, Type.Water, Type.Flying);

    basicStat = {maxHP: 130, attack: 85, defense: 80, special: 95, speed: 60};
    moves = [new GradingMove(undefined, MoveDEX["水槍"]), new GradingMove(undefined, MoveDEX["叫聲"]), new GradingMove(16, MoveDEX["唱歌"]), new GradingMove(20, MoveDEX["白霧"]), new GradingMove(25, MoveDEX["泰山壓頂"]), new GradingMove(31, MoveDEX["奇異之光"]), new GradingMove(38, MoveDEX["冰凍光束"]), new GradingMove(46, MoveDEX["水炮"])];
    DEX["拉普拉斯"] = new PokemonType(basicStat, 131, new Image(pokemonImagePath + "131_拉普拉斯.png"), new Image(pokemonImagePath + "131_拉普拉斯_Back.png"), "拉普拉斯", moves, Type.Water, Type.Ice);

    basicStat = {maxHP: 48, attack: 48, defense: 48, special: 48, speed: 48};
    moves = [new GradingMove(undefined, MoveDEX["變身"])];
    DEX["百變怪"] = new PokemonType(basicStat, 132, new Image(pokemonImagePath + "132_百變怪.png"), new Image(pokemonImagePath + "132_百變怪_Back.png"), "百變怪", moves, Type.Normal, undefined);

    basicStat = {maxHP: 55, attack: 55, defense: 50, special: 65, speed: 55};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["搖尾巴"]), new GradingMove(8, MoveDEX["潑沙"]), new GradingMove(16, MoveDEX["叫聲"]), new GradingMove(23, MoveDEX["電光一閃"]), new GradingMove(30, MoveDEX["咬住"]), new GradingMove(36, MoveDEX["聚氣"]), new GradingMove(42, MoveDEX["猛撞"])];
    DEX["伊布"] = new PokemonType(basicStat, 133, new Image(pokemonImagePath + "133_伊布.png"), new Image(pokemonImagePath + "133_伊布_Back.png"), "伊布", moves, Type.Normal, Type.Water);

    basicStat = {maxHP: 130, attack: 65, defense: 60, special: 110, speed: 65};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["搖尾巴"]), new GradingMove(undefined, MoveDEX["電光一閃"]), new GradingMove(undefined, MoveDEX["水槍"]), new GradingMove(8, MoveDEX["潑沙"]), new GradingMove(16, MoveDEX["水槍"]), new GradingMove(23, MoveDEX["電光一閃"]), new GradingMove(30, MoveDEX["咬住"]), new GradingMove(36, MoveDEX["極光束"]), new GradingMove(42, MoveDEX["黑霧"]), new GradingMove(47, MoveDEX["溶化"]), new GradingMove(52, MoveDEX["水炮"])];
    DEX["水伊布"] = new PokemonType(basicStat, 134, new Image(pokemonImagePath + "134_水伊布.png"), new Image(pokemonImagePath + "134_水伊布_Back.png"), "水伊布", moves, Type.Water, Type.Normal);

    basicStat = {maxHP: 65, attack: 65, defense: 60, special: 110, speed: 130};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["搖尾巴"]), new GradingMove(8, MoveDEX["潑沙"]), new GradingMove(16, MoveDEX["電擊"]), new GradingMove(23, MoveDEX["電光一閃"]), new GradingMove(30, MoveDEX["二連踢"]), new GradingMove(36, MoveDEX["飛彈針"]), new GradingMove(42, MoveDEX["電磁波"]), new GradingMove(47, MoveDEX["高速移動"]), new GradingMove(52, MoveDEX["打雷"])];
    DEX["雷伊布"] = new PokemonType(basicStat, 135, new Image(pokemonImagePath + "135_雷伊布.png"), new Image(pokemonImagePath + "135_雷伊布_Back.png"), "雷伊布", moves, Type.Electric, Type.Normal);

    basicStat = {maxHP: 65, attack: 130, defense: 60, special: 110, speed: 65};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["搖尾巴"]), new GradingMove(undefined, MoveDEX["電光一閃"]), new GradingMove(undefined, MoveDEX["火花"]), new GradingMove(8, MoveDEX["潑沙"]), new GradingMove(16, MoveDEX["火花"]), new GradingMove(23, MoveDEX["電光一閃"]), new GradingMove(30, MoveDEX["咬住"]), new GradingMove(36, MoveDEX["火焰旋渦"]), new GradingMove(42, MoveDEX["濁霧"]), new GradingMove(47, MoveDEX["瞪眼"]), new GradingMove(52, MoveDEX["噴射火焰"])];
    DEX["火伊布"] = new PokemonType(basicStat, 136, new Image(pokemonImagePath + "136_火伊布.png"), new Image(pokemonImagePath + "136_火伊布_Back.png"), "火伊布", moves, Type.Fire, Type.Normal);

    basicStat = {maxHP: 65, attack: 60, defense: 70, special: 75, speed: 40};
    moves = [new GradingMove(undefined, MoveDEX["撞擊"]), new GradingMove(undefined, MoveDEX["稜角化"]), new GradingMove(undefined, MoveDEX["紋理"]), new GradingMove(23, MoveDEX["幻象光線"]), new GradingMove(28, MoveDEX["自我再生"]), new GradingMove(35, MoveDEX["高速移動"]), new GradingMove(42, MoveDEX["三重攻擊"])];
    DEX["多邊獸"] = new PokemonType(basicStat, 137, new Image(pokemonImagePath + "137_多邊獸.png"), new Image(pokemonImagePath + "137_多邊獸_Back.png"), "多邊獸", moves, Type.Normal, undefined);

    basicStat = {maxHP: 35, attack: 40, defense: 100, special: 90, speed: 35};
    moves = [new GradingMove(undefined, MoveDEX["水槍"]), new GradingMove(undefined, MoveDEX["縮入殼中"]), new GradingMove(34, MoveDEX["角撞"]), new GradingMove(39, MoveDEX["瞪眼"]), new GradingMove(46, MoveDEX["尖刺加農炮"]), new GradingMove(53, MoveDEX["水炮"])];
    DEX["菊石獸"] = new PokemonType(basicStat, 138, new Image(pokemonImagePath + "138_菊石獸.png"), new Image(pokemonImagePath + "138_菊石獸_Back.png"), "菊石獸", moves, Type.Rock, Type.Water);

    basicStat = {maxHP: 70, attack: 60, defense: 125, special: 115, speed: 55};
    moves = [new GradingMove(undefined, MoveDEX["水槍"]), new GradingMove(undefined, MoveDEX["縮入殼中"]), new GradingMove(undefined, MoveDEX["角撞"]), new GradingMove(34, MoveDEX["角撞"]), new GradingMove(39, MoveDEX["瞪眼"]), new GradingMove(44, MoveDEX["尖刺加農炮"]), new GradingMove(49, MoveDEX["水炮"])];
    DEX["多刺菊石獸"] = new PokemonType(basicStat, 139, new Image(pokemonImagePath + "139_多刺菊石獸.png"), new Image(pokemonImagePath + "139_多刺菊石獸_Back.png"), "多刺菊石獸", moves, Type.Rock, Type.Water);

    basicStat = {maxHP: 30, attack: 80, defense: 90, special: 45, speed: 55};
    moves = [new GradingMove(undefined, MoveDEX["抓"]), new GradingMove(undefined, MoveDEX["變硬"]), new GradingMove(34, MoveDEX["吸取"]), new GradingMove(39, MoveDEX["劈開"]), new GradingMove(44, MoveDEX["瞪眼"]), new GradingMove(49, MoveDEX["水炮"])];
    DEX["化石盔"] = new PokemonType(basicStat, 140, new Image(pokemonImagePath + "140_化石盔.png"), new Image(pokemonImagePath + "140_化石盔_Back.png"), "化石盔", moves, Type.Rock, Type.Water);

    basicStat = {maxHP: 60, attack: 115, defense: 105, special: 70, speed: 80};
    moves = [new GradingMove(undefined, MoveDEX["抓"]), new GradingMove(undefined, MoveDEX["變硬"]), new GradingMove(undefined, MoveDEX["吸取"]), new GradingMove(34, MoveDEX["吸取"]), new GradingMove(39, MoveDEX["劈開"]), new GradingMove(46, MoveDEX["瞪眼"]), new GradingMove(53, MoveDEX["水炮"])];
    DEX["鐮刀盔"] = new PokemonType(basicStat, 141, new Image(pokemonImagePath + "141_鐮刀盔.png"), new Image(pokemonImagePath + "141_鐮刀盔_Back.png"), "鐮刀盔", moves, Type.Rock, Type.Water);

    basicStat = {maxHP: 80, attack: 105, defense: 65, special: 60, speed: 130};
    moves = [new GradingMove(undefined, MoveDEX["翅膀攻擊"]), new GradingMove(undefined, MoveDEX["高速移動"]), new GradingMove(33, MoveDEX["超音波"]), new GradingMove(38, MoveDEX["咬住"]), new GradingMove(45, MoveDEX["猛撞"]), new GradingMove(54, MoveDEX["破壞光線"])];
    DEX["化石翼龍"] = new PokemonType(basicStat, 142, new Image(pokemonImagePath + "142_化石翼龍.png"), new Image(pokemonImagePath + "142_化石翼龍_Back.png"), "化石翼龍", moves, Type.Rock, Type.Flying);

    basicStat = {maxHP: 160, attack: 110, defense: 65, special: 65, speed: 30};
    moves = [new GradingMove(undefined, MoveDEX["頭錘"]), new GradingMove(undefined, MoveDEX["瞬間失憶"]), new GradingMove(undefined, MoveDEX["睡覺"]), new GradingMove(35, MoveDEX["泰山壓頂"]), new GradingMove(41, MoveDEX["變硬"]), new GradingMove(48, MoveDEX["捨身衝撞"]), new GradingMove(56, MoveDEX["破壞光線"])];
    DEX["卡比獸"] = new PokemonType(basicStat, 143, new Image(pokemonImagePath + "143_卡比獸.png"), new Image(pokemonImagePath + "143_卡比獸_Back.png"), "卡比獸", moves, Type.Normal, undefined);

    basicStat = {maxHP: 90, attack: 85, defense: 100, special: 125, speed: 85};
    moves = [new GradingMove(undefined, MoveDEX["啄"]), new GradingMove(undefined, MoveDEX["冰凍光束"]), new GradingMove(51, MoveDEX["暴風雪"]), new GradingMove(55, MoveDEX["高速移動"]), new GradingMove(60, MoveDEX["白霧"])];
    DEX["急凍鳥"] = new PokemonType(basicStat, 144, new Image(pokemonImagePath + "144_急凍鳥.png"), new Image(pokemonImagePath + "144_急凍鳥_Back.png"), "急凍鳥", moves, Type.Ice, Type.Flying);

    basicStat = {maxHP: 90, attack: 90, defense: 85, special: 125, speed: 100};
    moves = [new GradingMove(undefined, MoveDEX["電擊"]), new GradingMove(undefined, MoveDEX["啄鑽"]), new GradingMove(51, MoveDEX["打雷"]), new GradingMove(55, MoveDEX["高速移動"]), new GradingMove(60, MoveDEX["光牆"])];
    DEX["閃電鳥"] = new PokemonType(basicStat, 145, new Image(pokemonImagePath + "145_閃電鳥.png"), new Image(pokemonImagePath + "145_閃電鳥_Back.png"), "閃電鳥", moves, Type.Electric, Type.Flying);

    basicStat = {maxHP: 90, attack: 100, defense: 90, special: 125, speed: 90};
    moves = [new GradingMove(undefined, MoveDEX["啄"]), new GradingMove(undefined, MoveDEX["火焰旋渦"]), new GradingMove(51, MoveDEX["瞪眼"]), new GradingMove(55, MoveDEX["高速移動"]), new GradingMove(60, MoveDEX["神鳥猛擊"])];
    DEX["火焰鳥"] = new PokemonType(basicStat, 146, new Image(pokemonImagePath + "146_火焰鳥.png"), new Image(pokemonImagePath + "146_火焰鳥_Back.png"), "火焰鳥", moves, Type.Fire, Type.Flying);

    basicStat = {maxHP: 41, attack: 64, defense: 45, special: 50, speed: 50};
    moves = [new GradingMove(undefined, MoveDEX["緊束"]), new GradingMove(undefined, MoveDEX["瞪眼"]), new GradingMove(10, MoveDEX["電磁波"]), new GradingMove(20, MoveDEX["高速移動"]), new GradingMove(30, MoveDEX["摔打"]), new GradingMove(40, MoveDEX["龍之怒"]), new GradingMove(50, MoveDEX["破壞光線"])];
    DEX["迷你龍"] = new PokemonType(basicStat, 147, new Image(pokemonImagePath + "147_迷你龍.png"), new Image(pokemonImagePath + "147_迷你龍_Back.png"), "迷你龍", moves, Type.Dragon, undefined);

    basicStat = {maxHP: 61, attack: 84, defense: 65, special: 70, speed: 70};
    moves = [new GradingMove(undefined, MoveDEX["緊束"]), new GradingMove(undefined, MoveDEX["瞪眼"]), new GradingMove(undefined, MoveDEX["電磁波"]), new GradingMove(10, MoveDEX["電磁波"]), new GradingMove(20, MoveDEX["高速移動"]), new GradingMove(35, MoveDEX["摔打"]), new GradingMove(45, MoveDEX["龍之怒"]), new GradingMove(55, MoveDEX["破壞光線"])];
    DEX["哈克龍"] = new PokemonType(basicStat, 148, new Image(pokemonImagePath + "148_哈克龍.png"), new Image(pokemonImagePath + "148_哈克龍_Back.png"), "哈克龍", moves, Type.Dragon, Type.Normal);

    basicStat = {maxHP: 91, attack: 134, defense: 95, special: 100, speed: 80};
    moves = [new GradingMove(undefined, MoveDEX["緊束"]), new GradingMove(undefined, MoveDEX["瞪眼"]), new GradingMove(undefined, MoveDEX["電磁波"]), new GradingMove(undefined, MoveDEX["高速移動"]), new GradingMove(10, MoveDEX["電磁波"]), new GradingMove(20, MoveDEX["高速移動"]), new GradingMove(35, MoveDEX["摔打"]), new GradingMove(45, MoveDEX["龍之怒"]), new GradingMove(60, MoveDEX["破壞光線"])];
    DEX["快龍"] = new PokemonType(basicStat, 149, new Image(pokemonImagePath + "149_快龍.png"), new Image(pokemonImagePath + "149_快龍_Back.png"), "快龍", moves, Type.Dragon, Type.Flying);

    basicStat = {maxHP: 106, attack: 110, defense: 90, special: 154, speed: 130};
    moves = [new GradingMove(undefined, MoveDEX["念力"]), new GradingMove(undefined, MoveDEX["定身法"]), new GradingMove(undefined, MoveDEX["高速星星"]), new GradingMove(undefined, MoveDEX["精神強念"]), new GradingMove(63, MoveDEX["屏障"]), new GradingMove(66, MoveDEX["精神強念"]), new GradingMove(70, MoveDEX["自我再生"]), new GradingMove(75, MoveDEX["白霧"]), new GradingMove(81, MoveDEX["瞬間失憶"])];
    DEX["超夢"] = new PokemonType(basicStat, 150, new Image(pokemonImagePath + "150_超夢.png"), new Image(pokemonImagePath + "150_超夢_Back.png"), "超夢", moves, Type.Phycsic, undefined);

    basicStat = {maxHP: 100, attack: 100, defense: 100, special: 100, speed: 100};
    moves = [new GradingMove(undefined, MoveDEX["拍擊"]), new GradingMove(10, MoveDEX["變身"]), new GradingMove(20, MoveDEX["百萬噸重拳"]), new GradingMove(30, MoveDEX["揮指"]), new GradingMove(40, MoveDEX["精神強念"])];
    DEX["夢幻"] = new PokemonType(basicStat, 151, new Image(pokemonImagePath + "151_夢幻.png"), new Image(pokemonImagePath + "151_夢幻_Back.png"), "夢幻", moves, Type.Phycsic, undefined,"神獸，超棒der");
    
    DEX.length=151;
})();
 