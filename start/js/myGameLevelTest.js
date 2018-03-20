class MyGameTest extends GameSystem.Classes.Level
{
    load ()
    {
        /*bug 去除 */ 
        this.nullSprite = new Framework.Sprite(define.imagePath + 'null.png');//去除draw bug用的
        this.nullSprite.position = { x: -1, y: -1 };
        this.rootScene.attach(this.nullSprite);
        /*bug 去除 */ 

        this.map = new Framework.Sprite(define.imagePath + 'palletTown.png');
        
        this.rootScene.attach(this.map);
        this.walker=new GameSystem.Classes.MapWalker({mapRef:this.map});
        this.keyInput=(e)=>
        {
            this.walker.keyInput(e);
        };
        GameSystem.Manager.Key.keyInput=this.keyInput;
    }
    initialize() {
        this.map.waitForInitialized();
        this.count=0;
    }
    update() {
        /*bug 去除 */ 
       // this.rootScene.update();
       //console.log(this.nullSprite.position.x);
       this.nullSprite.position.x--;
       if (this.nullSprite.position.x < -2)
           this.nullSprite.position.x =-1;
       /*bug 去除 */
      
        /*
        if(this.oneStepCount.enable)
        {
            this.oneStepCount.count++;
            
        }
        else
            if((key.lockPressKey!="" && key.timeOutCount==0) ||(this.oneStepCount.lastTimeOutCount !=key.timeOutCount) )
            {

                this.oneStepCount.reset();
                this.oneStepCount.enable=true;
            }
       
        this.oneStepCount.lastTimeOutCount=key.timeOutCount;*/
    }

    draw(parentCtx) {

        

        if( this.count==0) 
            this.lastTime=Date.now();
       
        if(this.count==59)
            //console.log(Date.now()-this.lastTime);
        this.count=(this.count+1)%60;
        parentCtx.fillStyle="black";
        parentCtx.fillRect(0,0,Framework.Game.getCanvasWidth(),Framework.Game.getCanvasHeight());
       this.rootScene.draw(parentCtx);
        
       // this.map.draw(parentCtx)
    }

    keydown(e, list) 
    {
        //GameSystem.Manager.Key.pressList[e.key]=true;
    }
    keyup(e, list) 
    {
        //GameSystem.Manager.Key.pressList[e.key]=false;
    }
    


    touchstart(e) {
        //為了要讓Mouse和Touch都有一樣的事件
        //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
        this.click({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
    
    click(e) {  

        if (!this.rectPosition) {
            return;
        }  
        
    }
}
