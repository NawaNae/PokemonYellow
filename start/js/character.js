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
    getDirection(posCmp)
    {
        let position=this.position;
        let pos=new GameSystem.Classes.Position(posCmp.x,posCmp.y);
        let dir=this.getSingleDirection(posCmp)
        if(dir)dir=[dir];
        return dir||pos.x<position.x&&pos.y<position.y?["Up","Left"]:pos.x<position.x&&pos.y>position.y?["Down","Left"]:pos.x>position.x&&pos.y<position.y?["Up","Right"]:pos.x>position.x&&pos.y>position.y?["Down","Right"]:undefined;
    }
    getSingleDirection(posCmp)
    {
        let position=this.position;
        let pos=new GameSystem.Classes.Position(posCmp.x,posCmp.y);
        return pos.x===position.x&&pos.y<position.y?"Up":pos.x===position.x&&pos.y>position.y?"Down":pos.x<position.x&&pos.y===position.y?"Left":pos.x>position.x&&pos.y===position.y?"Right":undefined;
    }
    walk(moveKey)
    {
        var level = Framework.Game._currentLevel, Position = GameSystem.Classes.Position;
            if(moveKey.constructor.name=="Position")
            {
                var diff=new Position(this.position.x-moveKey.x,this.position.y-moveKey.y);
                if(diff.abs==1)
                    moveKey=this.getSingleDirection(moveKey);
                    else
                    {console.log("You cannot input a position is without normalized, or try to using 'Up', 'Down', 'Left', 'Right' to replace it.");return;}
            }
           
        let move = this.movePositionVector[moveKey];
        this.facing=moveKey;
        if (!level) {
            this.position.x += move.x;
            this.position.y += move.y;
        }
        else
        {
            var newPos = new Position(this.position.x + move.x, this.position.y + move.y);
            var period=GameSystem.Manager.Key.lockTime/16||300/16;
            var movePoint=this.MovePointVector[moveKey];
            var count=0;
            var timeout=()=>
            {
                this.x+=movePoint.x;
                this.y+=movePoint.y;
                count++;
                if(count<16)
                    setTimeout(timeout,period);
                else
                  { 
                        this.position.x += move.x;
                        this.position.y += move.y;
                }
            }
            timeout();

        }
    }
    walkTo(position){this.moveTo(position);}
    moveTo(position)
    {
        position = position.constructor.name === "Point" ? position.toPosition() : position;
        var road=this.findRoad(position);
        var timeout=()=>
        {
            this.walk(road.pop());
            if(road.length>0)
                setTimeout(timeout,800);
        }
        timeout();
    }
    findRoad( to,from=this.position)
    {
        var GS = GameSystem, CS = GS.Classes, Position = CS.Position, gameLevel = Framework.Game._currentLevel;
        var size={x:gameLevel.size.pos2.x+1,y:gameLevel.size.pos2.y+1};
        var map=new Array(size.x);
        /**
         * @prop {number} X - 不能走 
         * @prop {number} R - Road 
         * @prop {number} S - start 
         * @prop {number} E - End
         */
        const Enum={"X":-2,"R":-1,"S":0,"E":-3};
        for(let x=0;x<size.x;x++)
            {
                map[x]=new Array(size.y)
                for(let i=0;i<size.y;i++)
                    map[x][i]={t:Enum.R,visit:false};
            }
            
            
        for(var i of gameLevel.obstacles)
            for(var x=i.pos1.x;x<=i.pos2.x;x++)
                for(var y=i.pos1.y;y<=i.pos2.y;y++)
                    map[x][y]={t:Enum.X,visit:false};
        map[from.x][from.y]={t:Enum.S,visit:false};
        map[to.x][to.y]={t:Enum.E,visit:false};
        var headPos = from;
        var vectors = [new Position(0, -1), new Position(0, 1), new Position(-1, 0), new Position(1, 0)];
        var add=(a, b) => new Position(a.x + b.x, a.y + b.y),equ=(a, b) => (a.x===b.x)&&(a.y===b.y);;
        function BFS()
        {     
            var nowPos=new Position(from.x,from.y),node,end,head=map[headPos.x][headPos.y];
            head.level=0;
            for (var que = [headPos]; que.length != 0; )
            {
                nowPos = que.shift();
                node=map[nowPos.x][nowPos.y];//取出
                node.visit=true;
                if (node.t===Enum.E)
                    return (end = nowPos);
                for (var i of vectors)
                {
                    var childPos=add(nowPos,i);
                    var child=map[childPos.x][childPos.y];
                    if(!child||child.visit||child.t===Enum.X)
                        continue;
                    child.level=node.level+1;
                    que.push(childPos);
                }
            }
        }
        function reduce(nowPos=BFS())
        {
            var road=[];
            for (; !equ(nowPos, headPos);)
            {
                road.push(nowPos);
                for (var i of vectors)
                {
                    var chPos=add(nowPos,i),ch=map[chPos.x][chPos.y];
                    var now=map[nowPos.x][nowPos.y];
                        if (ch.level === now.level - 1)
                        {
                            nowPos = chPos;
                            break;
                        }
                }
            }
            return road;
        }
        return reduce();
    }
    updateImagePosition()
    {
        let protaScPos=GameSystem.protagonist._screenPosition.toPoint();
        let protaPos = GameSystem.protagonist.point;
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
    set point(point) {
        point = (point.constructor.name === "Position") ? point.toPoint() : point;
        var Point = GameSystem.Classes.Point, mapPos = Framework.Game._currentLevel.map.position;
        this._image.position.x = -mapPos.x + point.x;
        this._image.position.y = -mapPos.y + point.y;
    }
    get point() {
        var Point = GameSystem.Classes.Point, mapPos = Framework.Game._currentLevel.map.position;
        return new Point(this._image.position.x + mapPos.x, this._image.y + mapPos.y);
    }
    set x(val) {
        var Point = GameSystem.Classes.Point, mapPos = Framework.Game._currentLevel.map.position;
        this._image.position.x = -mapPos.x + val;
    }
    get x() { return this.point.x; }
    set y(val) {
        var Point = GameSystem.Classes.Point, mapPos = Framework.Game._currentLevel.map.position;
        this._image.position.y = -mapPos.y + val;
    }
    get y() { return this.point.y;}
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
        
        if(this.animationLists[this.facing]&&this.animationLists[this.facing].length>0)
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