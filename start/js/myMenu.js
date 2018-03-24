var MyMenu = Framework.exClass(Framework.GameMainMenu , {
            //初始化loadingProgress需要用到的圖片
    initializeProgressResource: function() {
        this.loading = new Framework.Sprite(define.imagePath + 'loading.jpg');
        this.loading.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};

        //為了或得到this.loading這個Sprite的絕對位置, 故需要先計算一次(在Game Loop執行時, 則會自動計算, 但因為loadingProgress只支援draw故需要自行計算)                  
    },

    //在initialize時會觸發的事件
    loadingProgress: function(ctx, requestInfo) {
        //console.log(Framework.ResourceManager.getFinishedRequestPercent())
        this.loading.draw(ctx);
        ctx.font ='20px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText(Math.round(requestInfo.percent) + '%' , ctx.canvas.width / 2 , ctx.canvas.height / 2 + 50);
    },

    load: function () {
        this.menu = new Framework.Sprite(define.imagePath+"Title.png");//"https://imgur.com/6vHYJUz.png");
        Framework.Game._canvasContainer.classList.add('visualNovel');
      /*  this.vn = new VisualNovel(Framework.Game._canvasContainer, {
            content: '[[{"type":"character","url":"http://www.cc.ntut.edu.tw/~t105590029/pages/VisualNovelTest/HIBIKI1.png","name":"導覽員-喵喵","id":"喵喵"},{"type":"talk","text":"主人團子想要與您結婚"},{"type":"talk","text":"您意下如何"},{"type":"hide","object":"character"},{"type":"character","url":"http://www.cc.ntut.edu.tw/~t105590029/Images/tanko.png","name":"團子"},{"type":"select","option":[{"text":"嫑，我喜歡的是你R喵喵","tag":"NEXT_STEP"},{"text":"好","tag":"good"}]},{"type":"show","object":"text"},{"type":"text","text":"團子向你發動攻擊，請守護您的貞操"},{"type":"hide","object":"text"},{"type":"show","object":"character"},{"type":"talk","text":"敬酒不ㄘㄘ法酒"},{"type":"evalAndRemove","text":"Framework.Game.goToNextLevel();"},{"type":"jump","tag":"end"},{"type":"tag","tag":"good"},{"type":"show","object":"character"},{"type":"talk","text":"親愛的結婚吧"},{"type":"hide","object":"character"},{"type":"background","url":"https://imgur.com/LQcVEir.png"},{"type":"talk","text":"你被團子壓死ㄌ"},{"type":"tag","tag":"end"}]]'
        });
        this.vn.gameLevel = this;*/


    },

    initialize: function() {


        //為了讓之後的位置較好操控, new出一個位於中心點且可以黏貼任何東西的容器
        //注意, Position都是用中心點
        this.menu.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: Framework.Game.getCanvasHeight() / 2
        };
        
        this.rootScene.attach(this.menu);

        this.rectPosition = { 
            x: Framework.Game.getCanvasWidth() / 2 ,
            y: Framework.Game.getCanvasHeight() / 2+40
        };
    },

    update:function(){     
        //this.rootScene.update();一定要在第一行
        this.rootScene.update(); 

        //目前的Framework, 當任何一個GameObject不做attach時, 則必須要自行update
    },

    draw: function(parentCtx) { 
        //this.rootScene.draw();一定要在第一行
        this.rootScene.draw(parentCtx);
        this.menu.draw(parentCtx);
        //this.rootScene.draw();
        //可支援畫各種單純的圖形和字
        parentCtx.font = '15px Arial';
        parentCtx.fillStyle = 'black';
        parentCtx.textBaseline = 'top';
        parentCtx.textAlign = 'center';
        parentCtx.fillText('Press Any Key To Start', this.rectPosition.x , this.rectPosition.y, 100);
    },
    keydown:function(e)
    {
        Framework.Game.goToNextLevel();
    },
    mouseup: function(e) {
    },

    mousedown: function(e) {
        //console.log為Browser提供的function, 可以在debugger的console內看到被印出的訊息                    
       /* this.vn.appendTo();
    this.vn.start();*/
        Framework.Game.goToNextLevel();
    },

    click:function(e){      
        Framework.Game.goToNextLevel();
/*
        this.vn.appendTo();
        this.vn.start();*/
    },

    mousemove: function(e) {               
    },

    mouseup: function(e) {
        this.isTouchArrow = false;
    },

    touchstart: function (e) {
        //為了要讓Mouse和Touch都有一樣的事件
        //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
        this.mousedown(e[0]);
    },

    touchend: function (e) {
        this.mouseup();
    },
    
    touchmove: function (e) {
        this.mousemove(e[0]);
    }
});