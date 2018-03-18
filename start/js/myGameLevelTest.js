var MyGameTest = Framework.Class(Framework.Level, {
    load: function ()
    {
        /*bug 去除 */ 
        this.nullSprite = new Framework.Sprite(define.imagePath + 'null.png');//去除draw bug用的
        this.nullSprite.position = { x: 0, y: 0 };
        this.rootScene.attach(this.nullSprite);
        /*bug 去除 */ 

        this.map = new Framework.Sprite(define.imagePath + 'palletTown.png');
        this.oneStepCount=new GameSystem.Classes.OneBlockCount();
        this.oneStepCount.lastTimeOutCount=0;
        this.rootScene.attach(this.map);

	},

    initialize: function () {
        
        this.map.waitForInitialized();
        this.count=0;
    },
    update: function() {
        /*bug 去除 */ 
       // this.rootScene.update();
       this.nullSprite.position.x++;
       if (this.nullSprite.position.x > 1)
           this.nullSprite.position.x = 0;
       /*bug 去除 */
        var mappos=this.map.position;

        var key=GameSystem.Manager.Key;

     
       
            
            

        mappos.x -=  key.pressList.Right;
            mappos.x += key.pressList.Left;
            mappos.y -= key.pressList.Down;
            mappos.y += key.pressList.Up;
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
    },

    draw: function (parentCtx) {

        

        if( this.count==0) 
            this.lastTime=Date.now();
       
        if(this.count==59)
            console.log(Date.now()-this.lastTime);
        this.count=(this.count+1)%60;
        parentCtx.fillStyle="black";
        parentCtx.fillRect(0,0,Framework.Game.getCanvasWidth(),Framework.Game.getCanvasHeight());
       this.rootScene.draw(parentCtx);
        
       // this.map.draw(parentCtx)
    },

    keydown:function(e, list)
    {
        //GameSystem.Manager.Key.pressList[e.key]=true;
    },
    keyup:function(e,list)
    {
        //GameSystem.Manager.Key.pressList[e.key]=false;
    }
    ,


    touchstart: function (e) {
        //為了要讓Mouse和Touch都有一樣的事件
        //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
        this.click({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    },
    
    click: function (e) {  

        if (!this.rectPosition) {
            return;
        }  
        
    },
});
