/** @typedef IllustrationSet
 * @prop {HTMLImageElement} imgPokemon 寶可夢的圖片。
 * @prop {HTMLSpanElement} spanNumber 寶可夢的編號。
 */
//
/** @typedef StatusParts
 * @description 儲存「寶可夢狀態」版面中的所有HTML物件。
 * @prop {HTMLDivElement} pokemonStatusPad 「寶可夢狀態」面板的HTML物件。
 * @prop {HTMLSpanElement} pokemonName 寶可夢的名稱。
 * @prop {StatusPart1} part1 第一部分的「寶可夢狀態」面板之集合。
 * @prop {StatusPart2} part2 第二部分的「寶可夢狀態」面板之集合。
 */
/** @interface StatusPart1
 * @prop {HTMLDivElement} divPart1 第一部分的「寶可夢狀態」面板的HTML元件。做為以下物件的容器。
 * @prop {HTMLSpanElement} spanLevel 寶可夢的等級。
 * @prop {HTMLLabelElement} labelHP 文字「HP:」。
 * @prop {GameSystem.Classes.HPBarContainer} HPBar 寶可夢的生命條。
 * @prop {HTMLSpanElement} spanHPValue 寶可夢的生命值。
 * @prop {HTMLSpanElement} spanStatus 寶可夢的狀態。
 */
/** @interface StatusPart2
 * @prop {HTMLDivElement} divPart2 第二部分的「寶可夢狀態」面板的HTML元件。做為以下物件的容器。
 * @prop {HTMLLabelElement} labelExp 文字「經驗值點數」。
 * @prop {HTMLSpanElement} spanExp 寶可夢的經驗數值。
 * @prop {HTMLLabelElement} labelLevelUp 文字「等級升級」。
 * @prop {HTMLSpanElement} spanLevelUp 寶可夢的升級資訊。
 */
//
/** @typedef StatValueSet
 * @description 「寶可夢基本能力值」面板之下的所有HTML物件之集合。
 * @prop {HTMLDivElement} statValuePad 「寶可夢基本能力值」面板的HTML元件。作為以下物件的容器。
 * @prop {HTMLLabelElement} labelAttack 文字「ATTACK」。
 * @prop {HTMLLabelElement} labelDefense 文字「DEFENSE」。
 * @prop {HTMLLabelElement} labelSpeed 文字「SPEED」。
 * @prop {HTMLLabelElement} labelSpecial 文字「SPECIAL」。
 * @prop {HTMLSpanElement} spanAttack 寶可夢的攻擊力數值。
 * @prop {HTMLSpanElement} spanDefense 寶可夢的防禦力數值。
 * @prop {HTMLSpanElement} spanSpeed 寶可夢的速度值數值。
 * @prop {HTMLSpanElement} spanSpecial 寶可夢的特殊值數值。
 */
//
/** @typedef TypeInfoSet
 * @description 「寶可夢屬性」面板的所有HTML元件集合。
 * @prop {HTMLDivElement} typeInfoPad 「寶可夢屬性」面板的HTML元件。作為以下物件的容器。
 * @prop {HTMLLabelElement} labelType1 文字「TYPE1/」
 * @prop {HTMLLabelElement} labelType2 文字「TYPE2/」
 * @prop {HTMLLabelElement} labelIDNo 文字「IDNo/」
 * @prop {HTMLLabelElement} labelOT 文字「OT/」
 * @prop {HTMLSpanElement} spanType1 屬性1的名稱
 * @prop {HTMLSpanElement} spanType2 屬性2的名稱
 * @prop {HTMLSpanElement} spanIDNo IDNo
 * @prop {HTMLSpanElement} spanOT 擁有者名稱
 */
//
/** @typedef MoveListSet
 * @description 「招式清單」版面的所有HTML元件之集合。
 * @prop {HTMLDivElement} moveListPad 「招式清單」版面的HTML元件。作為以下物件的容器。
 * @prop {HTMLSpanElement[]} moveNames 第一至第四招式的名稱。
 * @prop {HTMLSpanElement[]} movePPs 第一至第四招式的PP。
 */
//

/**
 * @class PokemonInfoPad
 * @classdesc 寶可夢資訊介面的控制。
 * 
 * @prop {HTMLDivElement} pokemonInfoPad 寶可夢資訊介面的HTML物件。
 * @prop {IllustrationSet} illustrationSet 寶可夢圖畫與編號的集合之HTML物件。
 * @prop {StatusParts} statusParts 「寶可夢狀態」面板之下的子HTML物件。
 * @prop {StatValueSet} statValueSet 「寶可夢基本能力值」面板的所有HTML物件。
 * @prop {TypeInfoSet} typeInfoSet 「寶可夢屬性」面板的所有HTML物件。
 * @prop {MoveListSet} moveListSet 「招式清單」面板的所有HTML物件。
 */
var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.PokemonInfoPad =
class PokemonInfoPad {
    constructor() {
        this.pokemonInfoPad = document.createElement('div');
        this.pokemonInfoPad.classList.add('pokemon-info-pad');
        this.pokemonInfoPad.appendChild(this.initIllustration());
        this.pokemonInfoPad.appendChild(this.initPokemonStatusPad());
        this.pokemonInfoPad.appendChild(this.initStatValuePad());
        this.pokemonInfoPad.appendChild(this.initTypeInfoPad());
        this.pokemonInfoPad.appendChild(this.initMoveListPad());

        this.statusParts.part2.divPart2.classList.add('hide');
        this.moveListSet.moveListPad.classList.add('hide');
    }

    //#region 初始化所用的函式
    /**
     * 新增「寶可夢圖畫與編號」，並初始化其中的物件。
     * 有: 「寶可夢圖像」與「編號」。
     * 並將其加入至 this.illustration 中。
     * @return {HTMLDivElement} 將「寶可夢圖畫與編號」的HTML物件回傳。
     */
    initIllustration() {
        let illustration = document.createElement('div');
        illustration.classList.add('pokemon-illustration');
        // 寶可夢圖片
        let imgPokemon = document.createElement('img');
        // 編號
        let spanNumber = document.createElement('span');
        spanNumber.innerText = 'No. 025';
        spanNumber.classList.add('pokemon-number');

        this.illustrationSet = {illustration, imgPokemon, spanNumber};
        illustration.appendChild(imgPokemon);
        illustration.appendChild(spanNumber);
        return illustration;
    }

    /**
     * 新增「寶可夢狀態」版面，並初始化其中的物件。
     * 可以分兩部分:
     * 1. 顯示等級、生命值、狀態
     * 2. 顯示經驗點數、升等數值
     * 以上無論是哪個部分，皆會有寶可夢名稱。
     * 建立完後，將其HTML元件加入至 this.pokemonStatusPad 中。
     * @return {HTMLDivElement} 「寶可夢狀態」版面的HTML元件。
     */
    initPokemonStatusPad() {
        this.statusParts = this.statusParts || {};
        this.statusParts.pokemonStatusPad = document.createElement('div');
        this.statusParts.pokemonStatusPad.classList.add('pokemon-status-pad');
        // 建立「寶可夢名稱」
        this.statusParts.pokemonName = document.createElement('span');
        this.statusParts.pokemonName.innerText = 'Pokemon\' Name';
        this.statusParts.pokemonName.classList.add('pokemon-name');

        this.statusParts.pokemonStatusPad.appendChild(this.statusParts.pokemonName);
        this.statusParts.pokemonStatusPad.appendChild(this.initPokemonStatusPad_Part1());
        this.statusParts.pokemonStatusPad.appendChild(this.initPokemonStatusPad_Part2());
        return this.statusParts.pokemonStatusPad;
    }

    /**
     * 初始化「寶可夢狀態」版面中的第一部分。
     * @return {HTMLDivElement} 「第一部分」的HTML元件。
     */
    initPokemonStatusPad_Part1() {
        let divPart1 = document.createElement('div');
        divPart1.classList.add('pokemmon-status-part1');
        // 等級
        let spanLevel = document.createElement('span');
        spanLevel.innerText = ':L 99';
        spanLevel.classList.add('level');
        // 文字「HP:」
        let labelHP = document.createElement('label');
        labelHP.innerText = 'HP:';
        labelHP.classList.add('hp-text');
        // 生命條
        let HPBar = new GameSystem.Classes.HPBarContainer(20, 20);
        // 生命值數值
        let spanHPValue = document.createElement('span');
        spanHPValue.innerText = '20/ 20';
        spanHPValue.classList.add('player-hp-value');
        // 狀態
        let spanStatus = document.createElement('span');
        spanStatus.innerText = 'STATUS/ OK';
        spanStatus.classList.add('status');
        
        this.statusParts = this.statusParts || {};
        this.statusParts.part1 = {divPart1, spanLevel, labelHP, HPBar, spanHPValue, spanStatus};

        divPart1.appendChild(spanLevel);
        divPart1.appendChild(labelHP);
        divPart1.appendChild(HPBar.getHTMLElement());
        divPart1.appendChild(spanHPValue);
        divPart1.appendChild(spanStatus);
        return divPart1;
    }

    /**
     * 初始化「寶可夢狀態」版面中的第二部分。
     * @return {HTMLDivElement} 「第二部分」的HTML元件。
     */
    initPokemonStatusPad_Part2() {
        let divPart2 = document.createElement('div');
        divPart2.classList.add('pokemmon-status-part2');
        // 文字「經驗值點數」
        let labelExp = document.createElement('label');
        labelExp.classList.add('text-experience');
        labelExp.innerText = '經驗值點數';
        // 經驗值點數
        let spanExp = document.createElement('span');
        spanExp.classList.add('experience');
        spanExp.innerText = '36767';
        // 文字「等級升級」
        let labelLevelUp = document.createElement('label');
        labelLevelUp.classList.add('text-levelup');
        labelLevelUp.innerText = '等級升級';
        // 升級資訊
        let spanLevelUp = document.createElement('span');
        spanLevelUp.classList.add('levelup');
        spanLevelUp.innerText = '65535 to :L12';

        this.statusParts = this.statusParts || {};
        this.statusParts.part2 = {divPart2, labelExp, spanExp, labelLevelUp, spanLevelUp};

        divPart2.appendChild(labelExp);
        divPart2.appendChild(spanExp);
        divPart2.appendChild(labelLevelUp);
        divPart2.appendChild(spanLevelUp);
        return divPart2;
    }

    /**
     * 新增「寶可夢數值能力」版面，並初始化其中的物件。
     * 有: 攻擊力、防禦力、速度值、特殊值。
     * 最後將元件加入至 this.statValuePad 中。
     * @return {HTMLDivElement} 「寶可夢數值能力」版面的HTML元件。
     */
    initStatValuePad() {
        let statValuePad = document.createElement('div');
        statValuePad.classList.add('stat-value-pad');
        // 文字「ATTACK」、文字「DEFENSE」、文字「SPEED」、文字「SPECIAL」
        let labelAttack = document.createElement('label'), labelDefense = document.createElement('label'), labelSpeed = document.createElement('span'), labelSpecial = document.createElement('span');
        labelAttack.classList.add('text-stat');     labelAttack.innerText = 'ATTACK';
        labelDefense.classList.add('text-stat');    labelDefense.innerText = 'DEFENSE';
        labelSpeed.classList.add('text-stat');      labelSpeed.innerText = 'SPEED';
        labelSpecial.classList.add('text-stat');    labelSpecial.innerText = 'SPECIAL';
        // 攻擊力數值、防禦力數值、速度值數值、特殊值數值
        let spanAttack = document.createElement('span'), spanDefense = document.createElement('span'), spanSpeed = document.createElement('span'), spanSpecial = document.createElement('span');
        spanAttack.classList.add('stat');       spanAttack.innerText = '14';
        spanDefense.classList.add('stat');      spanDefense.innerText = '10';
        spanSpeed.classList.add('stat');        spanSpeed.innerText = '19';
        spanSpecial.classList.add('stat');      spanSpecial.innerText = '13';

        this.statValueSet = {statValuePad, labelAttack, spanAttack, labelDefense, spanDefense, labelSpeed, spanSpeed, labelSpecial, spanSpecial};
        statValuePad.appendChild(labelAttack);      statValuePad.appendChild(spanAttack);
        statValuePad.appendChild(labelDefense);     statValuePad.appendChild(spanDefense);
        statValuePad.appendChild(labelSpeed);       statValuePad.appendChild(spanSpeed);
        statValuePad.appendChild(labelSpecial);     statValuePad.appendChild(spanSpecial);
        return statValuePad;
    }

    /**
     * 新增「寶可夢屬性」版面，並初始化其中的物件。
     * 有: 屬性1、屬性2、IDNo、OT
     * 最後將元件加入至 this.typeInfoPad 中。
     * @return {HTMLDivElement} 「寶可夢屬性」版面的HTML元件。
     */
    initTypeInfoPad() {
        let typeInfoPad = document.createElement('div');
        typeInfoPad.classList.add('type-info-pad');
        // 文字「TYPE1/」
        let labelType1 = document.createElement('label');
        labelType1.classList.add('text-type1');
        labelType1.innerText = "TYPE1/";
        // 屬性1
        let spanType1 = document.createElement('span');
        spanType1.classList.add('type1');
        spanType1.innerText = "ELECTRIC";
        // 文字「TYPE2/」
        let labelType2 = document.createElement('label');
        labelType2.classList.add('text-type2');
        labelType2.innerText = "TYPE2/";
        // 屬性2
        let spanType2 = document.createElement('span');
        spanType2.classList.add('type2');
        spanType2.innerText = "FIRE";
        // 文字「IDNo/」
        let labelIDNo = document.createElement('label');
        labelIDNo.classList.add('text-idno');
        labelIDNo.innerText = "IDNo/";
        // ID編號
        let spanIDNo = document.createElement('span');
        spanIDNo.classList.add('idno');
        spanIDNo.innerText = "38081";
        // 文字「OT/」
        let labelOT = document.createElement('label');
        labelOT.classList.add('text-ot');
        labelOT.innerText = "OT/";
        // 擁有者名稱
        let spanOT = document.createElement('span');
        spanOT.classList.add('ot');
        spanOT.innerText = "NAME";

        this.typeInfoSet = {typeInfoPad, labelType1, spanType1, labelType2, spanType2, labelIDNo, spanIDNo, labelOT, spanOT};
        typeInfoPad.appendChild(labelType1);    typeInfoPad.appendChild(spanType1);
        typeInfoPad.appendChild(labelType2);    typeInfoPad.appendChild(spanType2);
        typeInfoPad.appendChild(labelIDNo);     typeInfoPad.appendChild(spanIDNo);
        typeInfoPad.appendChild(labelOT);       typeInfoPad.appendChild(spanOT);
        return typeInfoPad;
    }

    /**
     * 新增「招式清單」版面，並初始化其中的物件。
     * 有: 招式1~4 與 PP1~4
     * 最後加所有元件加入至 this.moveListPad 中。
     * @return {HTMLDivElement} 「招式清單」版面的HTML屬性。
     */
    initMoveListPad() {
        let moveListPad = document.createElement('div');
        moveListPad.classList.add('move-list-pad');
        // 四個招式名稱
        let moveNames = [document.createElement('span'), document.createElement('span'), document.createElement('span'), document.createElement('span')];
        moveNames.forEach((element, index) => {
            element.classList.add('move-name');
            element.style.order = index * 2;
            element.innerText = "Move's Name " + (index + 1);
            moveListPad.appendChild(element);
        });
        // 四個招式的PP
        let movePPs = [document.createElement('span'), document.createElement('span'), document.createElement('span'), document.createElement('span')];
        movePPs.forEach((element, index) => {
            element.classList.add('move-pp');
            element.style.order = index * 2 + 1;
            element.innerText = "PP 30/30";
            moveListPad.appendChild(element);
        });
        
        this.moveListSet = {moveListPad, moveNames, movePPs};
        return moveListPad;
    }
    //#endregion 初始化所用的函式

    /** 
     * 以寶可夢的資料來設定。
     * @param {GameSystem.Classes.Pokemon} pokemon 目標寶可夢。
     */
    setInfo(pokemon) {
        let number = pokemon.getNumber();
        // 圖片 & 圖鑑編號
        this.illustrationSet.imgPokemon.src = pokemon.getImageSrc();
        if (number / 100 >= 1)
            this.illustrationSet.spanNumber.innerText = "No. " + number;
        else if (number / 10 >= 1)
            this.illustrationSet.spanNumber.innerText = "No. 0" + number;
        else
            this.illustrationSet.spanNumber.innerText = "No. 00" + number;
        // 寶可夢狀態區
        this.statusParts.pokemonName.innerText = pokemon.name;
        this.statusParts.part1.spanLevel.innerText = ":L " + pokemon.level;
        this.statusParts.part1.HPBar.updateHP(pokemon.HP, pokemon.maxHP);
        this.statusParts.part1.spanHPValue.innerText = pokemon.HP + "/ " + pokemon.maxHP;
        this.statusParts.part1.spanStatus.innerText = "STATUS/ OK";     // ! 尚未實裝 !
        this.statusParts.part2.spanExp.innerText = pokemon.exp;
        if (pokemon.level < 100) {
            let nextLevelExp = GameSystem.Classes.PokemonType.ExperienceTable[pokemon.getPokemonType().expType][pokemon.level + 1];
            this.statusParts.part2.spanLevelUp.innerText = (nextLevelExp - pokemon.exp) + " to :L" + (pokemon.level + 1);
        }
        else {
            this.statusParts.part2.spanLevelUp.innerText = "TOP LEVELED!"
        }
        // 基本能力值區
        this.statValueSet.spanAttack.innerText = pokemon.attack;
        this.statValueSet.spanDefense.innerText = pokemon.defense;
        this.statValueSet.spanSpeed.innerText = pokemon.speed;
        this.statValueSet.spanSpecial.innerText = pokemon.special;
        // 寶可夢屬性區
        this.typeInfoSet.spanType1.innerText = GameSystem.Classes.StandardStat.TypeName[pokemon.typeA].toUpperCase();
        this.typeInfoSet.labelType2.innerText = pokemon.typeB ? "TYPE2/" : "-";
        this.typeInfoSet.spanType2.innerText = pokemon.typeB ? GameSystem.Classes.StandardStat.TypeName[pokemon.typeB].toUpperCase() : "--";
        this.typeInfoSet.spanIDNo.innerText = "32767";   // ! 尚未實裝 !
        this.typeInfoSet.spanOT.innerText = "OWNER";     // ! 尚未實裝 !
        // 招式清單
        let moveList = pokemon.getMoves();
        for (let i = 0; i < 4; i++) {
            let move = moveList[i];
            this.moveListSet.moveNames[i].innerText = move ? move.name : "-";
            this.moveListSet.movePPs[i].innerText = move ? "PP 30/30" : "--";  // ! 尚未實裝 !
        }
    }

    /**
     * 顯示第一部分的資訊。
     */
    showPart1() {
        this.statusParts.part1.divPart1.classList.remove('hide');
        this.statusParts.part2.divPart2.classList.add('hide');
        this.statValueSet.statValuePad.classList.remove('hide');
        this.typeInfoSet.typeInfoPad.classList.remove('hide');
        this.moveListSet.moveListPad.classList.add('hide');
    }

    /**
     * 顯示第二部分的資訊。
     */
    showPart2() {
        this.statusParts.part1.divPart1.classList.add('hide');
        this.statusParts.part2.divPart2.classList.remove('hide');
        this.statValueSet.statValuePad.classList.add('hide');
        this.typeInfoSet.typeInfoPad.classList.add('hide');
        this.moveListSet.moveListPad.classList.remove('hide');
    }

    /**
     * 顯示此「寶可夢資訊」版面。
     */
    show() { 
        this.pokemonInfoPad.classList.remove('hide');
    }

    /**
     * 隱藏此「寶可夢資訊」版面。
     */
    hide() {
        this.pokemonInfoPad.classList.add('hide');
    }

    /**
     * 取得此物件所在管理的HTML標籤物件。
     * @return {HTMLDivElement} 「寶可夢資訊」版面的HTML元件。
     */
    getHTMLElement() {
        return this.pokemonInfoPad;
    }
}