/**
 * @class Character
 * @abstract
 * @classdesc 一個角色必備的資料。
 * 
 * @prop {string} name 角色的名稱。
 * @prop {GameSystem.Classes.Position} position 角色所在地圖上的位置。
 * @prop {GameSystem.Classes.Image} image 角色的圖片。
 * @prop {GameSystem.Classes.Position{}} movePositionVector 角色的位移向量。
 * @prop {GameSystem.Classes.Character.Face} facing 角色的面向。
 */
GameSystem.Classes.Character = 
class Character {
    /**
     * @param {string} name 角色的姓名。
     * @param {GameSystem.Classes.Character.Face} face 角色的面朝方向
     * @param {GameSystem.Classes.Position} position 角色的位置
     * @param {GameSystem.Classes.Image} image 角色的圖片
     */
    constructor(name, face, position, image) {
        this._name = name;
        this._facing = face||GameSystem.Classes.Character.Face.Up;
        this._position = position || new GameSystem.Classes.Position(0, 0);
        this._update=()=>{this.update();};
        this.image = image;
        let aList=GameSystem.Classes.AnimationList;
        this.animationLists={
            Up:new aList,
            Down:new aList,
            Left:new aList,
            Right:new aList
        }
        this.newPosition;
        this.movePositionVector=GameSystem.Classes.Character.MovePositionVector;//地圖移動向量陣列
        this.MovePointVector=GameSystem.Classes.Character.MovePointVector;
    }
    update()
    {

    }
    move(moveKey)
    {
        let move=this.movePositionVector[moveKey];
        this.position.x+=move.x;
        this.position.y+=move.y;
    }
    updateImagePosition()
    {
        let protaScPos=GameSystem.protagonist._screenPosition.toPoint();
         let protaPos = GameSystem.protagonist.position.toPoint();
         let myPos=this.position.toPoint();
        if(this._image)
        {
            this.image.position.x=-protaPos.x+protaScPos.x+myPos.x;
            this.image.position.y=-protaPos.y+protaScPos.y+myPos.y;
        }
    }
    playListAnimation(list)
    {
        let period=GameSystem.Manager.Key.lockTime/2;
        this.playList=list;
        let timeFucn=()=>{
            list.index++;
            list.index%=list.length;
            this.image.copy(list[list.index]);
            if(list.index%2===0)
            {
                this.timeNumber=undefined;
                this.playList=undefined;
                this.playEndAnimation();
            }
            else
                this.timeNumber=setTimeout(timeFucn,period);
        }
        if(list.length===1)
            this.playEndAnimation();
        else
            timeFucn();
    }
    stopPlayAnimation()
    {
        if(this.timeNumber)
        {
            clearTimeout(this.timeNumber);
            this.image.src=this.playList[0];
            this.playList=undefined;
            this.timeNumber=undefined;
        }

    }
    playEndAnimation()
    {

    }
    set name(newName) { this._name = newName; }
    get name() { return this._name; }
    set position(newPosition) 
    {
         this._position = newPosition;
        // this.updateImagePosition();
     }
    get position() { return this._position; }
    set image(newImage) {
        if(newImage)
        {
            this._image = newImage; 
            //console.log(this._update);
            this.updateImagePosition();
            this._image.update=this._update;
            
        }
    }
    get image() { return this._image; }
    set facing(newDirection)
    {
        if(newDirection.constructor.name==="String")
            newDirection=GameSystem.Classes.Character.Face[newDirection];
        this._facing=newDirection;
        let returnVal;
        this.stopPlayAnimation();
        if(this.animationLists[this.facing].length>0)
            this.playListAnimation(this.animationLists[this.facing]);
    }
    get facing(){return this._facing.toString().replace(/Symbol\(/,"").replace(/\)/,"");}
    get facePosition(){
        let GS=GameSystem;
        let CS=GS.Classes;

        return new CS.Position(
            this.position.x+this.movePositionVector[this.facing].x,
            this.position.y+this.movePositionVector[this.facing].y
        );
    }
    get visible(){return this.animationLists.Up[0]?this.animationLists.Up[0].visible:this.animationLists.Down[0]?this.animationLists.Down[0].visible:this.animationLists.Left[0]?this.animationLists.Left[0].visible:this.animationLists.Right[0]?this.animationLists.Right[0].visible:this.image?this.image.visible:false;}
    set visible(val)
    {
        this.image.visible=val;
        var map=["Up","Down","Left","Right"];
        for(let direction of map)
            for(let aItem of this.animationLists[direction])
                aItem.visible=val;
    }
    show(){this.visible=true;}
    hide(){this.visible=false;}
};

/**
 * 列舉。表示角色的面朝方向。
 * @readonly
 * @enum {number}
 */
GameSystem.Classes.Character.Face = Object.freeze({
    /** 角色的面向為「上」 */
    Up: Symbol("Up"),

    /** 角色的面向為「右」 */
    Right: Symbol("Right"),

    /** 角色的面向為「下」 */
    Down: Symbol("Down"),

    /** 角色的面相為「左」 */
    Left: Symbol("Left")
});
GameSystem.Classes.Character.MovePositionVector=Object.freeze(
    {
        Up:new GameSystem.Classes.Position(0,-1),
        Down:new GameSystem.Classes.Position(0,+1),
        Right:new GameSystem.Classes.Position(+1,0),
        Left:new GameSystem.Classes.Position(-1,0),
    })
    GameSystem.Classes.Character.MovePointVector=Object.freeze(
        {
            Up:new GameSystem.Classes.Point(0,-1),
            Down:new GameSystem.Classes.Point(0,+1),
            Right:new GameSystem.Classes.Point(+1,0),
            Left:new GameSystem.Classes.Point(-1,0),
        })