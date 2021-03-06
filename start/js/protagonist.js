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
var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
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
        let DEX = GameSystem.Classes.PokemonType.Dictionary;
        let pikachu=new GameSystem.Classes.Pokemon("皮卡丘",DEX["皮卡丘"]);
        pikachu.level=5;
        pikachu.updateAbilities();
        pikachu.HP=pikachu.maxHP;
        // *** FOR TESTING *** //
       /*let lada=new GameSystem.Classes.Pokemon("小拉達",DEX["小拉達"]);
        lada.level=5;
        lada.updateAbilities();
        lada.HP=lada.maxHP;
        let pikC = new GameSystem.Classes.Pokemon("皮可西",DEX["皮可西"]);
        pikC.level=200;
        pikC.HP=0;
        let nineTails = new GameSystem.Classes.Pokemon("九尾",DEX["九尾"]);
        nineTails.HP=0;
        let fatD = new GameSystem.Classes.Pokemon("胖丁",DEX["胖丁"]);
        fatD.HP=0;
        let sixTails=new GameSystem.Classes.Pokemon("六尾",DEX["六尾"]);
        sixTails.level=15;
        sixTails.updateAbilities();
        sixTails.HP=lada.maxHP;
        let fatKeD = new GameSystem.Classes.Pokemon("胖可丁",DEX["胖可丁"]);
        fatKeD.HP=0;*/
        // ******************* //
        this._pokemons = [pikachu/*,pikC ,lada,nineTails,fatD,sixTails*/];   // lada for TESTING
        this._props = [new GameSystem.Classes.PropItem(GameSystem.Resource.PropDictionary['女僕咖啡廳的紅藥水'])];
        this._money = 3000;
        this.metPokemons=[pikachu.name];
        this._screenPosition=GameSystem.Classes.Protagonist.ScreenPosition;
        this.mapMoveVector=//地圖移動向量陣列
        {
            Up:new GameSystem.Classes.Point(0,+1),
            Down:new GameSystem.Classes.Point(0,-1),
            Right:new GameSystem.Classes.Point(-1,0),
            Left:new GameSystem.Classes.Point(+1,0),
        }
        this.addProp('女僕咖啡廳的紅藥水');
        this.addProp('寶可夢球'); this.addProp('寶可夢球'); this.addProp('寶可夢球');
    }
    rearrangePokemons()
    {
        var diePokes=[];
        for(var i =0;i<this.pokemons.length;)
        {
            var poke=this.pokemons[i];
            if(poke.HP===0)
            {
                diePokes.push(poke);
                this.pokemons.splice(i,1);
            }
            else
                i++;    
        }
        this.pokemons=this.pokemons.concat(diePokes);
    }
    set selectPokemon(pokemon)
    {
        var find,index;
        if(pokemon.constructor.name==="Pokemon")
        {   
             if((find=this.pokemons.find(pok=>pok===pokemon)))
                ;
            else if((find=this.pokemons.find(pok=>pok.name===pokemon.name)))
                ;
        }
        else if(pokemon.constructor.name==="String")
        {
            find=this.pokemons.find(pok=>pok.name===pokemon)
        }
        else if(pokemon.constructor.name==="Number")
        {
            find=this.pokemons[pokemon];
        }
        if(find.HP===0)
        {
            console.warn("選擇了血量為0的寶可夢");return;
        }
        index=this.pokemons.indexOf(find);
        this.pokemons[index]=this.pokemons[0];
        this.pokemons[0]=find;
        this.rearrangePokemons();
    }
    get selectPokemon()
    {
        return this.pokemons[0];
    }
    meetPokemon(pokemon)
    {
        if(pokemon.constructor.name==="Pokemon")
        {
            if(!this.metPokemons.find(name=>pokemon.name===name))
                this.metPokemons.push(pokemon.name);
        }
        else if(pokemon.constructor.name==="String")
        {
            if(!this.metPokemons.find(name=>pokemon===name))
                this.metPokemons.push(pokemon);
        }
        else if(pokemon.constructor.name==="Array")
        {
            var pokemons=pokemon;
            for(pokemon of pokemons)
                this.meetPokemon(pokemon);
        }
        else if(pokemon.pokemons)
            this.meetPokemon(pokemon.pokemons);
    }
     /**
     * 新增道具至角色上。
     * @param {GameSystem.Classes.PropItem} prop 新的道具。
     * @param {String} prop 新的道具的名稱
     */
    addProp(prop)
    {
        var Prop=GameSystem.Classes.PropItem;
        var GR=GameSystem.Resource,Dictionary=GR.PropDictionary;
        if(prop.constructor.name==="String")
            prop=Dictionary[prop];
        var findItem=this.props.find(item=>prop.name===item.name)
        if(!findItem)
        {
            this.props.push(new Prop(prop));
        }
        else
        {
            findItem.count+=prop.count;
        }
    }
    copyFrom(mainChar)
    {
        super.copyFrom(mainChar);
        if(!mainChar)return;
        this.storyLineIndex=mainChar.storyLineIndex||this.storyLineIndex;
        this.atMap=mainChar._atMap||mainChar.atMap||this.atMap;
        this._props=mainChar._props||mainChar.props||this._props;
        var props=mainChar._props||mainChar.props;
        var Prop=GameSystem.Classes.PropItem;
        var GR=GameSystem.Resource,Dict=GR.PropDictionary;
        if(props.length>0)
        {
            this._props=[];
            for(var prop of props)
            {
                var np=new Prop(Dict[prop._name||prop.name]);
                np.copy(prop);
                this._props.push(np);
            }
        }    
        this.money=mainChar._money||mainChar.money||this._money;
        var Pokemon=GameSystem.Classes.Pokemon;
        this.metPokemons=mainChar.metPokemons;
        var pokemons=mainChar.pokemons||mainChar._pokemons;
        if(pokemons.length>0)    
        {
            this._pokemons=[];
            for(var i=0;i<pokemons.length;i++)
            {
                this.pokemons.push(new Pokemon(pokemons[i]));
            }    
        }   
        this.metPokemons=mainChar.metPokemons;
    }
    walk(moveKey,end=()=>{},options={walkSpeed:1,blockWidth:16})
    {
        var GS=GameSystem,CS=GS.Classes,Position= CS.Position;
        var level,levelName;
        var waitForWalk=()=>{if(this.isWalk)setTimeout(waitForWalk,100);else
            {
                level = Framework.Game._currentLevel;levelName=Framework.Game._findLevelNameByLevel(level);
                if(moveKey.constructor.name=="Position")
                {
                    if(this.position.sub(moveKey).len===1)
                        moveKey=this.getSingleDirection(moveKey);
                    else
                        {console.log("You cannot input a position is without normalized, or try to using 'Up', 'Down', 'Left', 'Right' to replace it.");return;}
                }
            var map=Framework.Game._currentLevel.map;if(!map){console.warn("無法取得map");return;}
            let move=this.movePositionVector[moveKey],mapMoveVector = this.mapMoveVector[moveKey];
            this.facing=moveKey;
            if (!level) {
                this.position.addi(move);
            }
            else
            {
                var newPos = this.position.add(move) ;
                var gate = undefined;
                if((gate = level.isGateAtThenGetGate(newPos)))
                {
                    let anotherPlace=gate.findAnotherPlaceByMapName(levelName);
                   this.position=anotherPlace.position;
                   this.atMap=(anotherPlace.mapName);
                   return;
                }
                if(!level.isWalkableAt(newPos))
                    return;
                console.log(newPos);
                var event;
                if((event=level.getEventAreaAt(newPos)))
                    event.start();
                var field,wildPoke;
                if((field=level.getBattleFieldAt(newPos))&&typeof this.avoidFight === "undefined")
                    if((wildPoke=field.trigger()))
                    {
                        var BD=GameSystem.Bridges.BattleData;
                        //this.meetPokemon(wildPoke);
                        BD.opponent=wildPoke;
                        BD.selectPokemon=GameSystem.protagonist.pokemons[0];
                        Framework.Game.goToLevel('battleLevel');
                    }
                this.isWalk=true;
                this.position=newPos;
                var lockTime=GameSystem.Manager.Key.lockTime||300;
                var period=Math.floor(0.8*(lockTime/options.blockWidth));
                var mapMovePoint=this.mapMoveVector[moveKey];
                var count=0;
                var timeout=()=>
                {
                    map.position.x+=mapMovePoint.x;
                    map.position.y+=mapMovePoint.y;
                    count++;
                    if(count<16)
                        setTimeout(timeout,period);
                    else
                    { 
                            end();
                            this.updateImagePosition();
                            this.isWalk=false;
                    }
                }
                timeout();
            }
            }
        }
        waitForWalk();
    }
    initialize()
    {
       //this.initAnimationImages();
       this.initializeAnimationLists10PbySrc();
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
    get pokemons() { return this._pokemons; }
    set pokemons(val){this._pokemons=val;}
    get props() { return this._props; }
    set atMap(newMap) { 
        this._atMap = newMap 
        Framework.Game.goToLevel(newMap);
    }
    get atMap() { return this._atMap; }
    set position(np){super.position=np;this.updateImagePosition();}
    get position(){return super.position;}
    set money(newMoney) { this._money = newMoney; if(this._money<0)this._money=0; }
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
     * @return {boolean} 是否增加金額成功。
     */
    earnMoney(money) {
        this._money += money;
        return true;
    }
    get x() { return this.point.x; }
    set x(val) {
        var Point = GameSystem.Classes.Point,screenPoint = this._screenPosition.toPoint(),mapPos=(Framework&&Framework.Game&&Framework.Game._currentLevel&&Framework.Game._currentLevel.map)?Framework.Game._currentLevel.map.position:undefined;
        if(!mapPos) { 
            /*console.log("無法取得Map以至於無法設定座標");*/return ;
        }
        mapPos.x = -val + screenPoint.x;
    }
    get y() { return this.point.y; }
    set y(val) {
        var Point=GameSystem.Classes.Point,screenPoint=this._screenPosition.toPoint(),mapPos=(Framework&&Framework.Game&&Framework.Game._currentLevel&&Framework.Game._currentLevel.map)?Framework.Game._currentLevel.map.position:undefined;
        if(!mapPos) { 
            /*console.log("無法取得Map以至於無法設定座標");*/return ;
        }
        mapPos.y=-val+screenPoint.y;
    }
    get point() {
        var Point=GameSystem.Classes.Point,screenPoint=this._screenPosition.toPoint(),mapPos=(Framework&&Framework.Game&&Framework.Game._currentLevel&&Framework.Game._currentLevel.map)?Framework.Game._currentLevel.map.position:undefined;
        if(!mapPos) { 
            console.log("無法取得Map以至於算不出主角座標點位置");
            return this.position.toPoint();
        }
        return new Point(screenPoint.x-mapPos.x,screenPoint.y-mapPos.y);
    }
    set point(val) {
        var Point=GameSystem.Classes.Point,screenPoint=this._screenPosition.toPoint(),map=Framework.Game._currentLevel.map;
        val = val.constructor.name === "Position" ? val.toPoint() : val;
        map.x = -val.x + screenPoint.x;
        map.y = -val.y + screenPoint.y;
    }
    /**
     * 新增一個新的寶可夢至主人公上。
     * @param {GameSystem.Classes.Pokemon} newPokemon 新的寶可夢。
     */
    addPokemon(newPokemon) {
        this._pokemons.push(newPokemon);
    }
    /**
     * 減少指定道具的堆疊數量。
     * @param {GameSystem.Classes.PropItem | number} specify 指定要減少的道具。
     * @return {boolean} 是否成功減少。
     */
    decreaseSpecifiedPropItem(specify,number=1) {
        if (typeof specify == 'number') {
            let propItem = this._props[specify];
            // 若指定要刪除的道具存在
            if (propItem) {
                propItem.count -= number;
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
                specify.count -= number;
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
    /**
     * 取得可戰鬥的寶可夢數量。
     * @return {number} 可戰鬥的寶可夢數量。
     */
    getAlivePokemonCount() {
        return this._pokemons.reduce((count, pokemon) => count + (pokemon.HP > 0 ? 1 : 0), 0);
    }
    /**
     * 取得昏厥的寶可夢數量。
     * @return {number} 昏厥的寶可夢數量。
     */
    getFaintPokemonCount() {
        return this._pokemons.reduce((count, pokemon) => count + (pokemon.HP <= 0 ? 1 : 0), 0);
    }
}
GameSystem.Classes.Protagonist.ScreenPosition= Object.freeze(new GameSystem.Classes.Position(4,4));
