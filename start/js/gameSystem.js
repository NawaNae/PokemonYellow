var GameSystem = 
{
    Classes:{},
    Manager:{},
    Resource:{}
};
GameSystem.Manager._KeyManagerClass=
class KeyManagerClass 
{
    constructor()
    {
        this.pressList=
        {
            W:false,
            A:false,
            S:false,
            D:false,
            Up:false,
            Left:false,
            Down:false,
            Right:false,
            Space:false,
            Enter:false,
            K:false,
            J:false,
            B:false
        };
        this.keyMapping=
        {
            W:"Up",
            Up:"Up",
            A:"Left",
            Left:"Left",
            S:"Down",
            Down:"Down",
            D:"Right",
            Right:"Right",
            Space:"Start",
            Enter:"A",
            K:"A",
            J:"B",
            B:"Start",
        };
        this.moveKeys=
        {
            W:"Up",
            Up:"Up",
            A:"Left",
            Left:"Left",
            S:"Down",
            Down:"Down",
            D:"Right",
            Right:"Right"
        };
 
        this.lockOneKeyEveryTime=true;
        this.lockTime=350;//按一次鍵延遲(ms)
        this.lockPressKey="";//延遲結束前的鍵
        this.nowPressKey="";//當
        window.addEventListener("keydown",this._keydown);
        window.addEventListener("keyup",this._keyup);
        this.keyInput=(e)=>{};
        this.keyInputEnd=(e)=>{};
    }
    isMoveKey(key)
    {
        return typeof this.moveKeys[key] !=='undefined';
    }
    isGameKey(key)
    {
        return typeof this.pressList[key] !=='undefined';
    }
    keyProcess(keyEvent)
    {
        var key=keyEvent.key;
        key=key.replace("Arrow","");
        if(key==" ")
            key="Space";
        else if(key.length==1)
            key=key.toUpperCase();
        return key;
    }
    _keyInput(e)
    {
        //console.log(e.pressList);
        this.keyInput(e);
    }
    _lockTimeOut()
    {
        var me=GameSystem.Manager.Key;
        me.lockPressKey="";
        if(me.nowPressKey!="")
        {
            let key=me.nowPressKey
            me.lockPressKey=key;
            me._keyInput({key:key,pressList:me.pressList});
            setTimeout(me._lockTimeOut,me.lockTime);
        }
    }
    _keydown(e)
    {
        var me=GameSystem.Manager.Key;
        var key=me.keyProcess(e);

        if(me.isGameKey(key))
        {
            
            me.nowPressKey=key;
            if(me.lockPressKey=="")    
            {
                me.lockPressKey=key;
                me._keyInput({key:key,pressList:e.pressList});
                setTimeout(me._lockTimeOut,me.lockTime);
            }
        }
        
        
    }
    _keyup(e)
    {
        var me=GameSystem.Manager.Key;
       
        var key=me.keyProcess(e);
        if(me.isGameKey(key))
            if(me.nowPressKey==key)
                me.nowPressKey="";

    }

};
GameSystem.Manager.Key=new  GameSystem.Manager._KeyManagerClass();
GameSystem.Classes.XYBase=
class XYBase
{
    constructor(x=0,y=0){this.assign(x,y);}
    get neg(){return this.mul(-1);}
    get len(){return Math.sqrt(this._x*this._x+this._y*this._y);}
    get abs(){return new this.constructor(this.x>=0?this.x:-this.x,this.y>=0?this.y:-this.y);}
    get normalize(){return this.div(this.len);}
    addi(a,b){this.assign(this.add(a,b));}
    subi(a,b){this.assign(this.sub(a,b));}
    muli(a,b){this.assign(this.mul(a,b));}
    divi(a,b){this.assign(this.div(a,b));}
    absi(){this.assign(this.abs());}
    negi(){this.assign(this.mul(-1));}
    assign(a,b)
    {
        if(typeof a !=="undefined"&&typeof a.x !=="undefined"&&typeof a.y !== "undefined"){this.x=a.xthis.y=a.y}
        if(typeof a === "number" && typeof b==="number"){this.x=a;this.y=b;}
        if(typeof a==="number"&& typeof b==="undefined"){this.x=a;this.y=a;}
    }
    add(a,b)
    {
        if(typeof a !=="undefined"&&typeof a.x !=="undefined"&&typeof a.y !== "undefined") return new this.constructor(this.x+a.x,this.y+a.y);
        if(typeof a === "number" && typeof b==="number")return new this.constructor(this.x+a,this.y+b);
        if(typeof a==="number"&& typeof b==="undefined")return new this.constructor(this.x+a,this.y+a);
    }
    sub(a,b)
    { 
        if(typeof a !=="undefined"&&typeof a.x !=="undefined"&&typeof a.y !== "undefined")return new this.constructor(this.x-a.x,this.y-a.y);
        if(typeof a === "number" && typeof b==="number")return new this.constructor(this.x-a,this.y-b);
        if(typeof a==="number"&& typeof b==="undefined")return new this.constructor(this.x-a,this.y-a);
     }
    mul(a,b)
    {
        if(typeof a !=="undefined"&&typeof a.x !=="undefined"&&typeof a.y !== "undefined")return new this.constructor(this.x*a.x,this.y*a.y);
        if(typeof a === "number" && typeof b==="number")return new this.constructor(this.x*a,this.y*b);
        if(typeof a==="number"&& typeof b==="undefined")return new this.constructor(this.x*a,this.y*a);
    }
    div(a,b)
    {
        if(b){  if(a&&typeof a==="number"&& typeof b ==="number")return this.mul(1/a,1/b);}    
        else if(a&&typeof a==="number")return this.mul(1/a);
        else if(a.x&&a.y&&a.x!==0&&a.y!==0)return this.mul(1/a.x,1/a.y);
    }
    set len(val){console.log("len of any coordinate class are read only getter");}
    set abs(useless){console.log("abs is a read only getter")}
    set normalize(useless){console.log("normaliize is a read only getter")}
    set neg(useless){console.log("neg is read only getter")}

    set x(value){this._x=value;}
    get x(){return this._x;}
    set y(value){this._y=value;}
    get y(){return this._y;}
}
GameSystem.Classes.Point=
class Point extends GameSystem.Classes.XYBase
{
   toPosition()
   {
       return new GameSystem.Classes.Position(this._x/16,this._y/16);
   }
   get copy()
   {
       return new Point(this._x,this._y);
   }
}
GameSystem.Classes.Position=
class Position  extends GameSystem.Classes.XYBase/*block 位置*/ 
{
    toPoint()
    {
        return new GameSystem.Classes.Point(this._x*16,this._y*16);
    }
    isIn(rectangle)
    {
        return rectangle.topLeftPos.x <= this._x &&rectangle.topLeftPos.y <= this._y &&rectangle.bottomRightPos.x >= this._x &&rectangle.bottomRightPos.y >= this._y ;
    }
    get copy()
    {
        return new Position(this._x,this._y);
    }
}
GameSystem.Classes.Rectangle=
class Rectangle
{
    constructor(pos1,pos2)
    {
        pos1=pos1|| new  GameSystem.Classes.Position(0,0);
        pos2=pos2|| new  GameSystem.Classes.Position(0,0);
        var topLeftPos=new  GameSystem.Classes.Position(Math.min(pos1.x,pos2.x),Math.min(pos1.y,pos2.y));
        var bottomRightPos = new  GameSystem.Classes.Position(Math.max(pos1.x,pos2.x),Math.max(pos1.y,pos2.y));
        this.pos1=topLeftPos;
        this.pos2=bottomRightPos;
    }
    set topLeftPos(value){this.pos1=value;}
    get topLeftPos(){return this.pos1;}
    set bottomRightPos(value){this.pos2=value;}
    get bottomRightPos(){return this.pos2;}
}
