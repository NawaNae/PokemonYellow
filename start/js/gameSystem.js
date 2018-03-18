var GameSystem = 
{
    Classes:{},
    Manager:{},
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
        };
        this.lockOneKeyEveryTime=true;
        this.timeOutCount=0;
        this.lockTime=1;//按一次鍵延遲(ms)
        this.lockPressKey="";//延遲結束前的鍵
        this.nowPressKey="";//當前按下
        window.addEventListener("keydown",this._keydown);
        window.addEventListener("keyup",this._keyup);
    }
    
    keyProcess(keyEvent)
    {
        var key=keyEvent.key;
        key=key.replace("Arrow","");
        if(key.length==1)
            key=key.toUpperCase();
        return key;
    }
    keyInput(e)
    {

    }
    keyInputEnd(e)
    {

    }
    _lockTimeOut()
    {
        this.timeOutCount++;
        var me=GameSystem.Manager.Key;
        if(me.nowPressKey==me.lockPressKey)//持續按住同個鍵
       {
            setTimeout(me._lockTimeOut,me.lockTime);
            me.keyInput({key:me.lockPressKey,keyPressList:me.pressList});
        }
        else if(me.nowPressKey=="")//放開了
        {    
            me.pressList[me.lockPressKey]=false;//更新清單
            me.timeOutCount=0;
            me.keyInputEnd({Key:me.lockPressKey,keyPressList:me.pressList});
            me.lockPressKey="";
  
        }
        else if(me.nowPressKey!=me.lockPressKey)//中途放開並換鍵
        {
            me.pressList[me.lockPressKey]=false;
            me.keyInputEnd({Key:methis.lockPressKey,keyPressList:me.pressList});
            me.lockPressKey=me.nowPressKey;
            me.pressList[me.lockPressKey]=true;
            setTimeout(me._lockTimeOut,me.lockTime);
        }
    }
    _keydown(e)
    {

        var me=GameSystem.Manager.Key;
        var key=me.keyProcess(e);

        me.nowPressKey=key;
        if(!me.lockOneKeyEveryTime) 
        {
            me.pressList[key]=true;
        }
        else  if(me.lockPressKey=="")//new lock a key
        {
            me.pressList[key]=true;
            me.lockPressKey=key;
            setTimeout(me._lockTimeOut,me.lockTime);
        }
        else // lockOneKey and Pressed a key now
        {
            
        }
       
        
        
    }
    _keyup(e)
    {
        var me=GameSystem.Manager.Key;
        var key=me.keyProcess(e);
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
        
    }
    get copy()
    {
        return new Position(this._x,this._y);
    }
}
GameSystem.Classes.Rectangle=
class Rectangle
{
    constructor(pos1=new GameSystem.Classes.Position(0,0),pos2=new GameSystem.Classes.Position(0,0))
    {
        var topLeftPos=new  GameSystem.Classes.Position(Math.min(pos1.x,pos2.x),Math.min(pos1.y,pos2.y));
        var bottomRightPos = new  GameSystem.Classes.Position(Math.max(pos1.x,pos2.x),Math.max(pos1.y,pos2.y));
        this.pos1=this.topLeftPos=topLeftPos;
        this.pos2=this.bottomRightPos=bottomRightPos;
    }
}