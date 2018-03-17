var MyGame = Framework.Class(Framework.Level, {
    a: 20,
    load: function ()
    {

        this.isStop = false;
        this.isPlayed = false;
        this.nullSprite = new Framework.Sprite(define.imagePath + 'tanko.png');//去除draw bug用的
        this.nullSprite.position = { x: 0, y: 0 };
        this.rootScene.attach(this.nullSprite);
        this.map =new Map.Map(
            [
                [Map.enum.Start, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road],
                [Map.enum.Wall, Map.enum.Wall, Map.enum.Wall, Map.enum.Wall, Map.enum.Wall, Map.enum.Wall, Map.enum.Wall, Map.enum.Wall, Map.enum.Wall, Map.enum.Wall, Map.enum.Wall, Map.enum.Road],
                [Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road],
                [Map.enum.Road, Map.enum.Wall, Map.enum.Wall, Map.enum.Wall, Map.enum.Wall, Map.enum.Wall, Map.enum.Wall, Map.enum.Wall, Map.enum.Wall, Map.enum.Wall, Map.enum.Wall, Map.enum.Wall],
                [Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.Road, Map.enum.End]
            ]);
        this.monster = new Monster.Base(define.imagePath + 'tanko.png');
        this.monster.picture.position = this.map.start.center;
        this.rootScene.attach(this.monster.picture);
        this.testText=new FText("Hello復古點陣字\n及文字顯示測試",{color:"black"});
        this.testText.position={x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};
        this.centerP=new Framework.Point;

        this.centerP={x:this.testText.position.x,y:this.testText.position.y};
      //  console.log(this.centerP);
        this.rootScene.attach(this.testText);
        this.information = new Information();
        this.information.prependTo(Framework.Game._canvasContainer);
        this.information.timer.start();
	},

    initialize: function () {
        //this.timer.initialize();
       
       
    },

    update: function() {
        this.rootScene.update();
        var game = this;
        this.nullSprite.position.x++;
        if (this.nullSprite.position.x > 1)
            this.nullSprite.position.x = 0;
        this.monster.walk(this.map.route);
        
        if(this.testText.position.x>= this.centerP.x+100)
            this.testText.position.x=this.centerP.x-100;
        this.testText.position.x++;
        this.testText.update();
    },

    draw: function (parentCtx) {
        this.rootScene.draw(parentCtx);
        this.map.draw(parentCtx);
        this.monster.picture.draw();
        this.testText.draw(parentCtx);
    },

    keydown:function(e, list){
        Framework.DebugInfo.Log.warning(e.key);
        
    },
    keyup:function(e,list)
    {
        console.log("keyup"+e.key);
    }
    ,
    keypress:function(e,list)
    {
        console.log("keypress"+e.key);
    },

    touchstart: function (e) {
        //為了要讓Mouse和Touch都有一樣的事件
        //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
        this.click({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    },
    
    click: function (e) {  

        console.log(e.x, e.y);
        if (!this.rectPosition) {
            return;
        }  
        
    },
});
