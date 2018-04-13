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
    constructor(x,y)
    {
        this._x=x||0;
        this._y=y||0;
    }
    set x(value)
    {
        this._x=value;
    }
    get x()
    {
        return this._x;
    }
    set y(value)
    {
        this._y=value;
    }
    get y()
    {
        return this._y;
    }

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
