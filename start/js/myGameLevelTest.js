var MyGameTest = Framework.Class(Framework.Level, {
    a: 20,
    load: function ()
    {
        /*bug 去除 */ 
        this.nullSprite = new Framework.Sprite(define.imagePath + 'null.png');//去除draw bug用的
        this.nullSprite.position = { x: 0, y: 0 };
        this.rootScene.attach(this.nullSprite);
        /*bug 去除 */ 

        this.map = new Framework.Sprite(define.imagePath + 'palletTown.png');
        this.rootScene.attach(this.map);
	},

    initialize: function () {
       
       
    },
    update: function() {
        /*bug 去除 */ 
        this.rootScene.update();
        this.nullSprite.position.x++;
        if (this.nullSprite.position.x > 1)
            this.nullSprite.position.x = 0;
        /*bug 去除 */ 
        var mappos=this.map.position;
        mappos.x -= GameSystem.Manager.Key.pressList.Right;
        mappos.x += GameSystem.Manager.Key.pressList.Left;
        mappos.y -= GameSystem.Manager.Key.pressList.Down;
        mappos.y += GameSystem.Manager.Key.pressList.Up;
        this.map.update();
    },

    draw: function (parentCtx) {
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
