var GameSystem = GameSystem || {};
GameSystem.Manager=GameSystem.Manager||{};
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
        this.lockTime=300;//按一次鍵延遲(ms)
        this.lockPressKey="";//延遲結束前的鍵
        this.nowPressKey="";//當前按下
        window.addEventListener("keydown",this.keydown);
        window.addEventListener("keyup",this.keyup);
    }
    keyProcess(keyEvent)
    {
        var key=keyEvent.key;
        key=key.replace("Arrow","");
        if(key.length==1)
            key=key.toUpperCase();
        return key;
    }
    _lockTimeOut()
    {
        var me=GameSystem.Manager.Key;
        console.log(me.lockPressKey);
        if(me.nowPressKey==me.lockPressKey)//持續按住同個鍵
            setTimeout(me._lockTimeOut,me.lockTime);
        else if(me.nowPressKey=="")//放開了
        {    
            me.pressList[me.lockPressKey]=false;//更新清單
            me.lockPressKey="";
        }
        else if(me.nowPressKey!=me.lockPressKey)//中途放開並換鍵
        {
            me.pressList[me.lockPressKey]=false;
            me.lockPressKey=me.nowPressKey;
            me.pressList[me.lockPressKey]=true;
            setTimeout(me._lockTimeOut,me.lockTime);
        }
    }
    keydown(e)
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
    keyup(e)
    {
        var me=GameSystem.Manager.Key;
        var key=me.keyProcess(e);
        me.nowPressKey="";

    }

};
GameSystem.Manager.Key=new  GameSystem.Manager._KeyManagerClass();