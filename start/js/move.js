var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.Move =
/**
 * @class Move
 * @classdesc 寶可夢可用的招式。
 * 
 * @prop {string} name 招式名稱。
 * @prop {string} description 此招式的敘述。
 * @prop {GameSystem.Classes.StandardStat.Type} type 招式的屬性。
 * @prop {GameSystem.Classes.Move.Types} moveType 招式的種類。
 * @prop {number} power 招式的威力。
 * @prop {number} accuracy 招式的命中率。
 * @prop {number} priority 招式的優先度。
 */
class Move {
    /**
     * @param {string} name 此招式的招式名稱。
     * @param {string} description 招式的敘述。
     * @param {GameSystem.Classes.StandardStat.Type} type 此招式的屬性。
     * @param {GameSystem.Classes.Move.Types} moveType 招式的種類。
     * @param {number} power 招式的威力。當招式種類為「變化」時，此項為階級變化。
     * @param {number | GameSystem.Classes.Move.StatType} accuracy 招式的命中率。當招式種類為「變化」時，此項為能力種類。
     * @param {number?} priority 招式的優先度。當招式種類為「變化」時，此項為指定效果作用為「自己」或「對方」。
     */
    constructor(name, description, type, moveType, power, accuracy, priority = 0) {
        this._name = name;
        this._description = description;
        this._type = type;
        this._moveType = moveType;
        // 招式種類為「物理」時
        if (moveType == GameSystem.Classes.Move.Types.Physical) {
            this._power = power;
            this._accuracy = accuracy;
            this._priority = priority;   
        }
        // 當招式種類為「狀態」時
        else if (moveType == GameSystem.Classes.Move.Types.Status) {
            this._levelChange = power;
            this._statType = accuracy;
            this._isOpponent = priority;
            this._priority = 0; 
        }
        // 當招式種類為「特殊」時 (Haven't done yet)
        else if (moveType == GameSystem.Classes.Move.Types.Special) {
            this._power = power;
            this._accuracy = accuracy;
            this._priority = priority; 
        }
    }

    set name(newName) { this._name = newName; }
    get name() { return this._name; }

    set description(newDescription) { this._description = newDescription; }
    get description() { return this._description; }

    set type(newType) { this._type = newType; }
    get type() { return this._type; }

    get moveType() { return this._moveType; }

    set power(newPower) { this._power = newPower; }
    get power() { return this._power; }

    set accuracy(newAccuracy) { this._accuracy = newAccuracy; }
    get accuracy() { return this._accuracy; }

    set priority(newPriority) { this._priority = newPriority; }
    get priority() { return this._priority; }

    /** 能力階級變化 */
    get levelChange() { return this._levelChange; }

    /** 階級變更的目標狀態 */
    get statType() { return this._statType; }

    /** 是否施用對象為對手 */
    get isEffectToOpponent() { return this._isOpponent; }

    /**
     * 取得狀態效果的文字敘述。
     * @param {GameSystem.Classes.Move.StatType} statType 狀態種類。
     * @param {number} curLevel 變更後的等級。
     * @param {number} diff 等級的差。
     * @return {string} 文字敘述。
     */
    static getStatEffectInfo(statType, curLevel, diff) {
        switch (diff) {
            case 1: return statType.name + "降低了！";
            case 2: return statType.name + "大幅提高了！";
            case 6: return statType == GameSystem.Classes.Move.StatType.Attack ? "釋放了全部力量！" : statType.name + "被提高到了最大！";
            case -1: return statType.name + "提高了！";
            case -2: return statType.name + "大幅降低了！";
            case 0: return curLevel == 6 ? statType.name + "已經無法再提高了！" : statType.name + "已經無法再降低了！";
        }
        if (diff >= 3)
            return statType.name + "極大幅提高了！";
        else if (diff <= -3)
            return statType.name + "極大幅降低了！";
        else
            return "能力變化解除了！";
    }
}

/** 招式的種類列舉
 * @enum
 * @readonly
 */
GameSystem.Classes.Move.Types = Object.freeze({
    Physical: Symbol("Physical"),
    Status: Symbol("Status"),
    Special: Symbol("Special")
});

/** 變化類招式所要變更的目標
 * @enum
 * @readonly
 */
GameSystem.Classes.Move.StatType = Object.freeze({
    /** 攻擊力 */
    Attack: Symbol("Attack"),
    /** 防禦力 */
    Defnese: Symbol("Defnese"),
    /** 速度值 */
    Speed: Symbol("Speed"),
    /** 準確度 */
    Accuracy: Symbol("Accuracy"),
    /** 迴避率 */
    EvasionRate: Symbol("EvasionRate")
});

/** 新增每個狀態相對應的中文名稱。 */
GameSystem.Classes.Move.StatType.Attack.name = "攻擊力";
GameSystem.Classes.Move.StatType.Defnese.name = "防禦力";
GameSystem.Classes.Move.StatType.Speed.name = "速度值";
GameSystem.Classes.Move.StatType.Accuracy.name = "精準度";
GameSystem.Classes.Move.StatType.EvasionRate.name = "迴避率";

/** 所有招式集 */
GameSystem.Classes.Move.Dictionary = {};

// 初始化所有可用的招式
(() => {
    let Move = GameSystem.Classes.Move;
    let MoveTypes = GameSystem.Classes.Move.Types;
    let StatusTypes = GameSystem.Classes.Move.StatType;
    let Types = GameSystem.Classes.StandardStat.Type;
    let DEX = GameSystem.Classes.Move.Dictionary;
    
    // 初始化所有可用的「一般」屬性招式
    DEX["投球"] = new Move("投球", "向對手投擲球狀物體進行攻擊。可連續攻擊２～５次。", Types.Normal, MoveTypes.Physical, 15, 85);
    DEX["連續拳"] = new Move("連續拳", "用怒濤般的拳頭毆打對手進行攻擊。連續攻擊２～５次。", Types.Normal, MoveTypes.Physical, 18, 85);
    DEX["纏繞"] = new Move("纏繞", "用觸手或青藤等纏繞對手進行攻擊。有時會降低對手的速度。", Types.Normal, MoveTypes.Physical, 10, 100);
    DEX["紋理"] = new Move("紋理", "將自己的屬性轉換成與已學會的招式中第１個招式相同的屬性。", Types.Normal, MoveTypes.Status, undefined, undefined);                   // 效果特殊
    DEX["居合斬"] = new Move("居合斬", "用鐮刀或爪子等斬切對手進行攻擊。", Types.Normal, MoveTypes.Physical, 50, 95);
    DEX["變圓"] = new Move("變圓", "將身體蜷縮成圓形，提高自己的防禦。", Types.Normal, MoveTypes.Status, 1, StatusTypes.Defnese, false);                            // Done
    DEX["定身法"] = new Move("定身法", "阻止對手出招，最近一次使用的招式在４回合內無法使用。", Types.Normal, MoveTypes.Status, undefined, 100);
    DEX["迷昏拳"] = new Move("迷昏拳", "有節奏地出拳攻擊對手。有時會使對手混亂。", Types.Normal, MoveTypes.Physical, 70, 100);
    DEX["忍耐"] = new Move("忍耐", "在２回合內忍受攻擊，然後將受到的傷害加倍返還給對手。", Types.Normal, MoveTypes.Physical, undefined, undefined, 1);
    DEX["泰山壓頂"] = new Move("泰山壓頂", "用整個身體壓住對手進行攻擊。有時會讓對手陷入麻痺狀態。", Types.Normal, MoveTypes.Physical, 85, 100);
    DEX["綁緊"] = new Move("綁緊", "使用長長的身體或藤蔓等，在４～５回合內綁緊對手進行攻擊。", Types.Normal, MoveTypes.Physical, 15, 85);                               // 招式特殊 (小剛)
    DEX["影子分身"] = new Move("影子分身", "利用快速移動製造出分身擾亂對手，提高自己的閃避率。", Types.Normal, MoveTypes.Status, 1, StatusTypes.EvasionRate, false);    // Done
    DEX["捨身衝撞"] = new Move("捨身衝撞", "捨身衝撞對手進行攻擊。自己也會受到不小的傷害。", Types.Normal, MoveTypes.Physical, 120, 100);
    DEX["連環巴掌"] = new Move("連環巴掌", "用連環巴掌拍打對手進行攻擊。會連續攻擊２～５次。", Types.Normal, MoveTypes.Physical, 15, 85);
    DEX["炸蛋"] = new Move("炸蛋", "向對手用力投擲大大的蛋進行攻擊。", Types.Normal, MoveTypes.Physical, 100, 75);
    DEX["大爆炸"] = new Move("大爆炸", "引起大爆炸，攻擊自己周圍所有的寶可夢。使用後自己會陷入瀕死。", Types.Normal, MoveTypes.Physical, 250, 100);
    DEX["閃光"] = new Move("閃光", "放出耀眼的光芒，降低對手的命中率。", Types.Normal, MoveTypes.Status, -1, StatusTypes.Accuracy, true);                           // Done
    DEX["聚氣"] = new Move("聚氣", "深呼吸後集中精神。讓自己的攻擊變得容易擊中要害。", Types.Normal, MoveTypes.Status, undefined, undefined);                         // 效果特殊
    DEX["亂擊"] = new Move("亂擊", "用角或喙刺向對手進行攻擊。連續攻擊２～５次。", Types.Normal, MoveTypes.Physical, 15, 85);
    DEX["亂抓"] = new Move("亂抓", "用爪子或鐮刀等向對手進行攻擊。可連續攻擊２～５次。", Types.Normal, MoveTypes.Physical, 18, 80);
    DEX["大蛇瞪眼"] = new Move("大蛇瞪眼", "用腹部的花紋使對手心生恐懼，讓對手陷入麻痺狀態。", Types.Normal, MoveTypes.Status, undefined, 90);                         // 效果特殊
    DEX["叫聲"] = new Move("叫聲", "發出可愛的叫聲，誘使對手疏忽大意，降低對手的攻擊。", Types.Normal, MoveTypes.Status, -1, StatusTypes.Attack, true);               // Done
    DEX["生長"] = new Move("生長", "讓身體瞬間長大，提高自己的攻擊和特攻。", Types.Normal, MoveTypes.Status, 1, StatusTypes.Attack, false);                         // Half Done
    DEX["斷頭鉗"] = new Move("斷頭鉗", "用巨大的鉗子或剪刀等撕裂對手進行攻擊。只要命中就會一擊瀕死。", Types.Normal, MoveTypes.Physical, undefined, undefined);
    DEX["變硬"] = new Move("變硬", "使用全身的力量讓身體硬化，提高自己的防禦。", Types.Normal, MoveTypes.Status, 1, StatusTypes.Attack, false);                      // Done
    DEX["頭錘"] = new Move("頭錘", "將頭伸出，直直衝向對手進行攻擊。有時會讓對手畏縮。", Types.Normal, MoveTypes.Physical, 70, 100);
    DEX["角撞"] = new Move("角撞", "用尖銳的角攻擊對手。", Types.Normal, MoveTypes.Physical, 65, 100);
    DEX["角鑽"] = new Move("角鑽", "用旋轉的角刺進對手進行攻擊。只要命中就會一擊瀕死。", Types.Normal, MoveTypes.Physical, undefined, undefined);
    DEX["破壞光線"] = new Move("破壞光線", "向對手發射強烈的光線進行攻擊。下一回合自己將無法動彈。", Types.Normal, MoveTypes.Special, 150, 90);
    DEX["必殺門牙"] = new Move("必殺門牙", "用銳利的門牙牢牢咬住對手進行攻擊。有時會使對手畏縮。", Types.Normal, MoveTypes.Physical, 80, 90);
    DEX["瞪眼"] = new Move("瞪眼", "用犀利的眼神使對手害怕，降低對手的防禦。", Types.Normal, MoveTypes.Status, -1, StatusTypes.Defnese, true);                       // Done
    DEX["惡魔之吻"] = new Move("惡魔之吻", "用恐怖的臉強吻對手。能讓對手陷入睡眠狀態。", Types.Normal, MoveTypes.Status, undefined, 75);                               // 效果特殊
    DEX["百萬噸重踢"] = new Move("百萬噸重踢", "用灌注了巨大力量的重踢踢飛對手進行攻擊。", Types.Normal, MoveTypes.Physical, 120, 75);
    DEX["百萬噸重拳"] = new Move("百萬噸重拳", "用帶有強大力量的拳頭攻擊對手。", Types.Normal, MoveTypes.Physical, 80, 85);
    DEX["揮指"] = new Move("揮指", "揮動手指刺激自己的大腦，從全部的招式中隨機選出１招使出。", Types.Normal, MoveTypes.Status, undefined, undefined);                   // 效果特殊
    DEX["模仿"] = new Move("模仿", "在戰鬥期間，將對手最近一次使用的招式變成自己的招式。", Types.Normal, MoveTypes.Status, undefined, undefined);                      // 效果特殊
    DEX["變小"] = new Move("變小", "蜷縮身體使自己顯得很小，大幅提高自己的閃避率。", Types.Normal, MoveTypes.Status, 2, StatusTypes.EvasionRate, false);              // Half Done
    DEX["聚寶功"] = new Move("聚寶功", "往對手身上投擲金幣進行攻擊。戰鬥後可以得到錢。", Types.Normal, MoveTypes.Physical, 40, 100);
    DEX["拍擊"] = new Move("拍擊", "使用長長的尾巴或手等拍打對手進行攻擊。", Types.Normal, MoveTypes.Physical, 40, 100);
    DEX["電光一閃"] = new Move("電光一閃", "以迅雷不及掩耳之勢撲向對手。必定能夠發動先制攻擊。", Types.Normal, MoveTypes.Physical, 40, 100, 1);
    DEX["憤怒"] = new Move("憤怒", "在使用招式後受到攻擊時，會因憤怒的力量而提高自己的攻擊。", Types.Normal, MoveTypes.Physical, 20, 100);
    DEX["旋風刀"] = new Move("旋風刀", "製造出風之刃，在下一回合攻擊對手。容易擊中要害。", Types.Normal, MoveTypes.Special, 80, 100);
    DEX["自我再生"] = new Move("自我再生", "讓全身的細胞獲得再生，回復一半HP。", Types.Normal, MoveTypes.Status, undefined, undefined);                              // 效果特殊
    DEX["吼叫"] = new Move("吼叫", "趕走對手，強制讓後備寶可夢上場。對手為野生寶可夢時，戰鬥將直接結束。", Types.Normal, MoveTypes.Status, undefined, 100, -6);           // 效果特殊
    DEX["抓"] = new Move("抓", "用堅硬且無比鋒利的爪子抓對手進行攻擊。", Types.Normal, MoveTypes.Physical, 40, 100);
    DEX["刺耳聲"] = new Move("刺耳聲", "發出令人不由自主想要摀起耳朵的刺耳聲，大幅降低對手的防禦。", Types.Normal, MoveTypes.Status, -2, StatusTypes.Defnese, true);     // Done
    DEX["唱歌"] = new Move("唱歌", "唱出舒服美妙的歌聲，讓對手陷入睡眠狀態。", Types.Normal, MoveTypes.Status, undefined, 55);                                       // 效果特殊
    DEX["火箭頭錘"] = new Move("火箭頭錘", "使用後的第１回合把頭後縮，提高防禦。並於第２回合攻擊對手。", Types.Normal, MoveTypes.Physical, 130, 100);
    DEX["摔打"] = new Move("摔打", "將長長的尾巴或藤蔓等甩向對手進行攻擊。", Types.Normal, MoveTypes.Physical, 80, 75);
    DEX["劈開"] = new Move("劈開", "用爪子或鐮刀等劈開對手進行攻擊。容易擊中要害。", Types.Normal, MoveTypes.Physical, 70, 100);
    DEX["煙幕"] = new Move("煙幕", "向對手噴出煙霧或墨汁等，降低對手的命中率。", Types.Normal, MoveTypes.Status, -1, StatusTypes.Accuracy, true);                    // Done
    DEX["生蛋"] = new Move("生蛋", "回復自己最大ＨＰ的一半。", Types.Normal, MoveTypes.Status, undefined, undefined);                                             // 效果特殊
    DEX["音爆"] = new Move("音爆", "向對手發射衝擊波進行攻擊。固定給予２０的傷害。", Types.Normal, MoveTypes.Special, undefined, 90);
    DEX["尖刺加農炮"] = new Move("尖刺加農炮", "向對手發射銳利的針進行攻擊。可連續攻擊２～５次。", Types.Normal, MoveTypes.Physical, 20, 100);
    DEX["躍起"] = new Move("躍起", "不攻擊對手，只是蹦蹦跳跳的，什麼事也不會發生……", Types.Normal, MoveTypes.Status, 0, StatusTypes.Attack, false);                  // Done
    DEX["自爆"] = new Move("自爆", "引起爆炸，攻擊自己周圍所有的寶可夢。使用後自己會陷入瀕死。", Types.Normal, MoveTypes.Physical, 200, 100);
    DEX["稜角化"] = new Move("稜角化", "增加身體的稜角，變得方方正正，提高自己的攻擊。", Types.Normal, MoveTypes.Status, 1, StatusTypes.Attack, false);               // Done
    DEX["踩踏"] = new Move("踩踏", "用大腳踩踏對手進行攻擊。有時會讓對手畏縮。", Types.Normal, MoveTypes.Physical, 65, 100);
    DEX["怪力"] = new Move("怪力", "使出渾身力量毆打對手進行攻擊。", Types.Normal, MoveTypes.Physical, 80, 100);
    DEX["掙扎"] = new Move("掙扎", "在自己的ＰＰ耗盡時，努力掙扎攻擊對手。自己也會受到少許傷害。", Types.Normal, MoveTypes.Physical, 50, undefined);
    DEX["替身"] = new Move("替身", "消耗一些自己的ＨＰ，製造分身。分身將成為自己的替身。", Types.Normal, MoveTypes.Status, undefined, undefined);                     // 效果特殊
    DEX["憤怒門牙"] = new Move("憤怒門牙", "用銳利的門牙猛烈地咬住對手進行攻擊。對手的ＨＰ將會減半。", Types.Normal, MoveTypes.Physical, undefined, 90);
    DEX["大鬧一番"] = new Move("大鬧一番", "在２～３回合內瘋狂亂打對手進行攻擊。大鬧一番後自己會陷入混亂。", Types.Normal, MoveTypes.Physical, 120, 100);
    DEX["超音波"] = new Move("超音波", "從身上發出特殊的音波，讓對手陷入混亂狀態。", Types.Normal, MoveTypes.Status, undefined, 55);                                 // 效果特殊
    DEX["高速星星"] = new Move("高速星星", "發射星型光線攻擊對手。攻擊必定會命中。", Types.Normal, MoveTypes.Special, 60, undefined);
    DEX["劍舞"] = new Move("劍舞", "激烈地跳起戰舞提升氣勢。大幅提高自己的攻擊。", Types.Normal, MoveTypes.Status, 2, StatusTypes.Attack, false);                    // Done
    DEX["撞擊"] = new Move("撞擊", "用整個身體撞向對手進行攻擊。", Types.Normal, MoveTypes.Physical, 40, 100);
    DEX["變身"] = new Move("變身", "變身成對手寶可夢的樣子，能夠使用和對手完全相同的招式。", Types.Normal, MoveTypes.Status, undefined, undefined);                    // 效果特殊
    DEX["三重攻擊"] = new Move("三重攻擊", "用３種光線進行攻擊。有時會讓對手陷入麻痺、灼傷或冰凍的狀態。", Types.Normal, MoveTypes.Special, 80, 100);
    DEX["搖尾巴"] = new Move("搖尾巴", "可愛地左右搖晃尾巴，誘使對手疏忽大意。可降低對手的防禦。", Types.Normal, MoveTypes.Status, -1, StatusTypes.Defnese, true);      // Done
    DEX["猛撞"] = new Move("猛撞", "以驚人的氣勢撞向對手進行攻擊。自己也會受到少許傷害。", Types.Normal, MoveTypes.Physical, 90, 85);
    DEX["夾住"] = new Move("夾住", "從兩側夾住對手，給予傷害。", Types.Normal, MoveTypes.Physical, 55, 100);
    DEX["吹飛"] = new Move("吹飛", "吹飛對手，強制讓後備寶可夢上場。對手為野生寶可夢時，戰鬥將直接結束。", Types.Normal, MoveTypes.Status, undefined, 100, -6);           // 效果特殊
    DEX["緊束"] = new Move("緊束", "使用長長的身體或藤蔓等，在４～５回合內緊束對手進行攻擊。", Types.Normal, MoveTypes.Physical, 15, 90);

    // 初始化所有可用的「格鬥」屬性招式
    DEX["雙倍奉還"] = new Move("雙倍奉還", "將來自對手的物理攻擊傷害加倍後，返還給該對手。", Types.Fighting, MoveTypes.Physical, undefined, 100, -5);
    DEX["二連踢"] = new Move("二連踢", "用２隻腳踢飛對手進行攻擊。連續２次給予傷害。", Types.Fighting, MoveTypes.Physical, 30, 100);
    DEX["飛膝踢"] = new Move("飛膝踢", "跳起後用膝蓋踢擊對手。沒踢中對手時自己會受到傷害。", Types.Fighting, MoveTypes.Physical, 130, 90);
    DEX["飛踢"] = new Move("飛踢", "高高跳起之後使出飛踢攻擊對手。沒踢中對手時自己會受到傷害。", Types.Fighting, MoveTypes.Physical, 100, 95);
    DEX["空手劈"] = new Move("空手劈", "用鋒利的手刀劈向對手進行攻擊。容易擊中要害。", Types.Fighting, MoveTypes.Physical, 50, 100);
    DEX["踢倒"] = new Move("踢倒", "用力踢對手的腳，讓對手摔倒進行攻擊。對手越重，威力越大。", Types.Fighting, MoveTypes.Physical, undefined, 100);
    DEX["迴旋踢"] = new Move("迴旋踢", "一邊使身體快速旋轉，一邊踢飛對手進行攻擊。有時會使對手畏縮。", Types.Fighting, MoveTypes.Physical, 60, 85);
    DEX["地球上投"] = new Move("地球上投", "利用引力將對手甩飛出去。給予對手和自己等級相同的傷害。", Types.Fighting, MoveTypes.Physical, undefined, 100);
    DEX["地獄翻滾"] = new Move("地獄翻滾", "將對手連同自己一起摔向地面進行攻擊。自己也會受到少許傷害。", Types.Fighting, MoveTypes.Physical, 80, 80);

    // 初始化所有可用的「飛行」屬性招式
    DEX["翅膀攻擊"] = new Move("翅膀攻擊", "用大大伸展開來的美麗翅膀，撞向對手進行攻擊。", Types.Flying, MoveTypes.Physical, 60, 100);
    DEX["啄鑽"] = new Move("啄鑽", "一邊旋轉，一邊將尖喙刺進對手進行攻擊。", Types.Flying, MoveTypes.Physical, 80, 100);
    DEX["飛翔"] = new Move("飛翔", "使用後的第１回合飛上天空，並於第２回合攻擊對手。", Types.Flying, MoveTypes.Physical, 90, 95);
    DEX["起風"] = new Move("起風", "用翅膀刮起狂風，吹向對手進行攻擊。", Types.Flying, MoveTypes.Special, 40, 100);
    DEX["鸚鵡學舌"] = new Move("鸚鵡學舌", "模仿對手使用的招式，自己也使用相同招式。", Types.Flying, MoveTypes.Status, undefined, 100);
    DEX["啄"] = new Move("啄", "用尖銳的喙或角刺向對手進行攻擊。", Types.Flying, MoveTypes.Physical, 35, 100);
    DEX["神鳥猛擊"] = new Move("神鳥猛擊", "在使用後的下一回合進行攻擊。有時會使對手畏縮。且容易擊中要害。", Types.Flying, MoveTypes.Physical, 140, 90);

    // 初始化所有可用的「毒」屬性招式
    DEX["溶解液"] = new Move("溶解液", "將強酸潑向對手進行攻擊。有時會降低對手的特防。", Types.Poison, MoveTypes.Special, 40, 100);
    DEX["溶化"] = new Move("溶化", "藉由細胞的變化讓身體液化，大幅提高自己的防禦。", Types.Poison, MoveTypes.Status, undefined, undefined);
    DEX["毒瓦斯"] = new Move("毒瓦斯", "將毒瓦斯吹到對手的臉上，讓對手陷入中毒狀態。", Types.Poison, MoveTypes.Status, undefined, 80);
    DEX["毒針"] = new Move("毒針", "將有毒的針刺進對手進行攻擊。有時會讓對手陷入中毒狀態。", Types.Poison, MoveTypes.Physical, 15, 100);                                // 招式特殊
    DEX["毒粉"] = new Move("毒粉", "撒出大量的有毒粉末讓對手陷入中毒狀態。", Types.Poison, MoveTypes.Status, undefined, 75);
    DEX["污泥攻擊"] = new Move("污泥攻擊", "向對手投擲污泥進行攻擊。有時會讓對手陷入中毒狀態。", Types.Poison, MoveTypes.Special, 65, 100);
    DEX["濁霧"] = new Move("濁霧", "將骯髒的濃霧吹向對手進行攻擊。有時會讓對手陷入中毒狀態。", Types.Poison, MoveTypes.Special, 20, 70);
    DEX["劇毒"] = new Move("劇毒", "讓對手陷入劇毒狀態。中毒傷害會隨著回合的進行而增加。", Types.Poison, MoveTypes.Status, undefined, 90);

    // 初始化所有可用的「地面」屬性招式
    DEX["骨棒"] = new Move("骨棒", "用手中的骨頭毆打對手進行攻擊。有時會使對手畏縮。", Types.Ground, MoveTypes.Physical, 65, 85);
    DEX["骨頭回力鏢"] = new Move("骨頭回力鏢", "向對手投擲手中的骨頭，來回連續２次給予傷害。", Types.Ground, MoveTypes.Physical, 50, 90);
    DEX["挖洞"] = new Move("挖洞", "使用後的第１回合潛入地底，並於第２回合攻擊對手。", Types.Ground, MoveTypes.Physical, 80, 100);
    DEX["地震"] = new Move("地震", "用地震的衝擊，攻擊自己周圍所有的寶可夢。", Types.Ground, MoveTypes.Physical, 100, 100);
    DEX["地裂"] = new Move("地裂", "讓對手掉進地面的裂縫中進行攻擊。只要命中就會一擊瀕死。", Types.Ground, MoveTypes.Physical, undefined, 30);
    DEX["潑沙"] = new Move("潑沙", "向對手的臉上潑沙，降低對手的命中率。", Types.Ground, MoveTypes.Status, -1, StatusTypes.Accuracy, true);                         // Done

    // 初始化所有可用的「岩石」屬性招式
    DEX["岩崩"] = new Move("岩崩", "將大岩石猛烈地砸向對手進行攻擊。有時會讓對手畏縮。", Types.Rock, MoveTypes.Physical, 75, 90);
    DEX["落石"] = new Move("落石", "舉起小岩石，向對手投擲進行攻擊。", Types.Rock, MoveTypes.Physical, 50, 90);

    // 初始化所有可用的「蟲」屬性招式
    DEX["吸血"] = new Move("吸血", "吸取對手的血液進行攻擊。可以回復給予對手傷害的一半ＨＰ。", Types.Bug, MoveTypes.Physical, 80, 100);
    DEX["飛彈針"] = new Move("飛彈針", "向對手發射銳利的針進行攻擊。可連續攻擊２～５次。", Types.Bug, MoveTypes.Physical, 25, 95);
    DEX["吐絲"] = new Move("吐絲", "用口中吐出的絲纏繞對手，大幅降低對手的速度。", Types.Bug, MoveTypes.Status, -2, StatusTypes.Speed, true);                         // Done
    DEX["雙針"] = new Move("雙針", "將２根針刺進對手，連續２次給予傷害。有時會讓對手陷入中毒狀態。", Types.Bug, MoveTypes.Physical, 25, 100);

    // 初始化所有可用的「幽靈」屬性招式
    DEX["奇異之光"] = new Move("奇異之光", "讓對手看奇怪的光線擾亂對手。使對手混亂。", Types.Ghost, MoveTypes.Status, undefined, 100);
    DEX["舌舔"] = new Move("舌舔", "用長長的舌頭，舔遍對手進行攻擊。有時會讓對手陷入麻痺狀態。", Types.Ghost, MoveTypes.Physical, 30, 100);
    DEX["黑夜魔影"] = new Move("黑夜魔影", "讓對手看見恐怖幻影，給予對手和自己等級相同的傷害。", Types.Ghost, MoveTypes.Special, undefined, 100);

    // 初始化所有可用的「火」屬性招式
    DEX["火花"] = new Move("火花", "向對手發射小火焰進行攻擊。有時會讓對手陷入灼傷狀態。", Types.Fire, MoveTypes.Special, 40, 100);
    DEX["大字爆炎"] = new Move("大字爆炎", "用大字形狀的火焰燒盡對手。有時會讓對手陷入灼傷狀態。", Types.Fire, MoveTypes.Special, 110, 85);
    DEX["火焰拳"] = new Move("火焰拳", "用帶有火焰的拳頭攻擊對手。有時會讓對手陷入灼傷狀態。", Types.Fire, MoveTypes.Physical, 75, 100);
    DEX["火焰旋渦"] = new Move("火焰旋渦", "將對手困在熊熊燃燒的火焰旋渦中，在４～５回合內進行攻擊。", Types.Fire, MoveTypes.Special, 35, 85);
    DEX["噴射火焰"] = new Move("噴射火焰", "向對手發射強烈火焰進行攻擊。有時會讓對手陷入灼傷狀態。", Types.Fire, MoveTypes.Special, 90, 100);

    // 初始化所有可用的「水」屬性招式
    DEX["泡沫"] = new Move("泡沫", "將無數的泡泡吹向對手進行攻擊。有時會降低對手的速度。", Types.Water, MoveTypes.Special, 40, 100);
    DEX["泡沫光線"] = new Move("泡沫光線", "向對手猛烈地噴射泡沫進行攻擊。有時會降低對手的速度。", Types.Water, MoveTypes.Special, 65, 100);
    DEX["貝殼夾擊"] = new Move("貝殼夾擊", "用非常堅固且厚實的貝殼，在４～５回合內夾住對手進行攻擊。", Types.Water, MoveTypes.Physical, 35, 85);
    DEX["蟹鉗錘"] = new Move("蟹鉗錘", "用巨大的鉗子敲打對手進行攻擊。容易擊中要害。", Types.Water, MoveTypes.Physical, 100, 90);
    DEX["水炮"] = new Move("水炮", "向對手猛烈地噴射大量水流進行攻擊。", Types.Water, MoveTypes.Special, 110, 80);
    DEX["衝浪"] = new Move("衝浪", "使用大浪攻擊自己周圍所有的寶可夢。", Types.Water, MoveTypes.Special, 90, 100);
    DEX["水槍"] = new Move("水槍", "向對手噴射強烈水流進行攻擊。", Types.Water, MoveTypes.Special, 40, 100);
    DEX["縮入殼中"] = new Move("縮入殼中", "縮入殼中保護身體，提高自己的防禦。", Types.Water, MoveTypes.Status, undefined, undefined);
    DEX["攀瀑"] = new Move("攀瀑", "以驚人的氣勢撲向對手。有時會讓對手畏縮。", Types.Water, MoveTypes.Physical, 80, 100);

    // 初始化所有可用的「草」屬性招式
    DEX["吸取"] = new Move("吸取", "吸取對手的養分進行攻擊。可以回復給予對手傷害的一半ＨＰ。", Types.Grass, MoveTypes.Special, 20, 100);
    DEX["寄生種子"] = new Move("寄生種子", "在對手身上植入種子，每回合吸取對手少許的ＨＰ，用來回復自己的ＨＰ。", Types.Grass, MoveTypes.Status, undefined, 90);
    DEX["超級吸取"] = new Move("超級吸取", "吸取對手的養分進行攻擊。可以回復給予對手傷害的一半ＨＰ。", Types.Grass, MoveTypes.Special, 40, 100);
    DEX["花瓣舞"] = new Move("花瓣舞", "在２～３回合內不斷灑出花瓣攻擊對手。招式結束後自己會陷入混亂狀態。", Types.Grass, MoveTypes.Special, 120, 100);
    DEX["飛葉快刀"] = new Move("飛葉快刀", "飛射葉子，切斬對手進行攻擊。容易擊中要害。", Types.Grass, MoveTypes.Physical, 55, 95);
    DEX["催眠粉"] = new Move("催眠粉", "撒出大量令人想睡的粉末，讓對手陷入睡眠狀態。", Types.Grass, MoveTypes.Status, undefined, 75);
    DEX["日光束"] = new Move("日光束", "使用後的第１回合吸收大量日光，並於第２回合發射光束進行攻擊。", Types.Grass, MoveTypes.Special, 120, 100);
    DEX["蘑菇孢子"] = new Move("蘑菇孢子", "大把撒出有催眠效果的孢子，讓對手陷入睡眠狀態。", Types.Grass, MoveTypes.Status, undefined, 100);
    DEX["麻痺粉"] = new Move("麻痺粉", "撒出大量令人麻痺的粉末，讓對手陷入麻痺狀態。", Types.Grass, MoveTypes.Status, undefined, 75);
    DEX["藤鞭"] = new Move("藤鞭", "將如同鞭子般彎曲而細長的藤蔓甩向對手進行攻擊。", Types.Grass, MoveTypes.Physical, 35, 100);

    // 初始化所有可用的「電」屬性招式
    DEX["打雷"] = new Move("打雷", "向對手劈下暴雷進行攻擊。有時會讓對手陷入麻痺狀態。", Types.Electric, MoveTypes.Special, 110, 70);
    DEX["電磁波"] = new Move("電磁波", "放出微弱的電流。讓對手陷入麻痺狀態。", Types.Electric, MoveTypes.Status, undefined, 90);
    DEX["十萬伏特"] = new Move("十萬伏特", "向對手放出強力電流進行攻擊。有時會讓對手陷入麻痺狀態。", Types.Electric, MoveTypes.Special, 90, 100);
    DEX["雷電拳"] = new Move("雷電拳", "用帶有電流的拳頭攻擊對手。有時會讓對手陷入麻痺狀態。", Types.Electric, MoveTypes.Physical, 75, 100);
    DEX["電擊"] = new Move("電擊", "發出電流刺激對手進行攻擊。有時會讓對手陷入麻痺狀態。", Types.Electric, MoveTypes.Special, 40, 100);

    // 初始化所有可用的「超能力」屬性招式
    DEX["高速移動"] = new Move("高速移動", "放鬆身體，讓自己變得輕盈以進行高速移動。可大幅提高自己的速度。", Types.Phycsic, MoveTypes.Status, undefined, undefined);
    DEX["瞬間失憶"] = new Move("瞬間失憶", "將頭腦清空，藉由在一瞬間遺忘某些事大幅提高自己的特防。", Types.Phycsic, MoveTypes.Status, undefined, undefined);
    DEX["屏障"] = new Move("屏障", "製造堅固的屏障，大幅提高自己的防禦。", Types.Phycsic, MoveTypes.Status, undefined, undefined);
    DEX["念力"] = new Move("念力", "向對手發送微弱的念力進行攻擊。有時會使對手混亂。", Types.Phycsic, MoveTypes.Special, 50, 100);
    DEX["食夢"] = new Move("食夢", "吃掉熟睡中對手的夢進行攻擊。可以回復給予對手傷害的一半ＨＰ。", Types.Phycsic, MoveTypes.Special, 100, 100);
    DEX["催眠術"] = new Move("催眠術", "施加引發睡意的暗示，讓對手陷入睡眠狀態。", Types.Phycsic, MoveTypes.Status, undefined, 60);
    DEX["折彎湯匙"] = new Move("折彎湯匙", "折彎湯匙引起注意，降低對手的命中率。", Types.Phycsic, MoveTypes.Status, undefined, 80);
    DEX["光牆"] = new Move("光牆", "利用神奇的屏障，在５回合內減輕來自對手的特殊攻擊傷害。", Types.Phycsic, MoveTypes.Status, undefined, undefined);
    DEX["瑜伽姿勢"] = new Move("瑜伽姿勢", "喚醒身體深處沉睡的力量，提高自己的攻擊。", Types.Phycsic, MoveTypes.Status, undefined, undefined);
    DEX["幻象光線"] = new Move("幻象光線", "向對手發射神奇的光線進行攻擊。有時會使對手混亂。", Types.Phycsic, MoveTypes.Special, 65, 100);
    DEX["精神強念"] = new Move("精神強念", "向對手發送強大的念力進行攻擊。有時會降低對手的特防。", Types.Phycsic, MoveTypes.Special, 90, 100);
    DEX["精神波"] = new Move("精神波", "向對手發射神奇的念力波進行攻擊。每次給予的傷害都不同。", Types.Phycsic, MoveTypes.Special, undefined, 80);
    DEX["反射壁"] = new Move("反射壁", "利用神奇的屏障，在５回合內減輕來自對手的物理攻擊傷害。", Types.Phycsic, MoveTypes.Status, undefined, undefined);
    DEX["睡覺"] = new Move("睡覺", "連續睡２回合。回復自己的全部ＨＰ以及治癒所有異常狀態。", Types.Phycsic, MoveTypes.Status, undefined, undefined);
    DEX["瞬間移動"] = new Move("瞬間移動", "停止和野生寶可夢戰鬥並逃走。", Types.Phycsic, MoveTypes.Status, undefined, undefined);

    // 初始化所有可用的「冰」屬性招式
    DEX["極光束"] = new Move("極光束", "向對手發射七彩光束進行攻擊。有時會降低對手的攻擊。", Types.Ice, MoveTypes.Special, 65, 100);
    DEX["暴風雪"] = new Move("暴風雪", "將猛烈的暴風雪吹向對手進行攻擊。有時會讓對手陷入冰凍狀態。", Types.Ice, MoveTypes.Special, 110, 70);
    DEX["黑霧"] = new Move("黑霧", "放出黑霧，讓場上全體寶可夢的能力變化回到初始狀態。", Types.Ice, MoveTypes.Status, undefined, 100);
    DEX["冰凍光束"] = new Move("冰凍光束", "向對手發射冰凍光束進行攻擊。有時會讓對手陷入冰凍狀態。", Types.Ice, MoveTypes.Special, 90, 100);
    DEX["冰凍拳"] = new Move("冰凍拳", "用帶有寒氣的拳頭攻擊對手。有時會讓對手陷入冰凍狀態。", Types.Ice, MoveTypes.Physical, 75, 100);
    DEX["白霧"] = new Move("白霧", "用白霧覆蓋身體。在５回合內不會讓對手降低自己的能力。", Types.Ice, MoveTypes.Status, undefined, 100);

    // 初始化所有可用的「龍」屬性招式
    DEX["龍之怒"] = new Move("龍之怒", "向對手發射憤怒的衝擊波進行攻擊。固定給予４０的傷害。", Types.Dragon, MoveTypes.Special, undefined, 100);

})();