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
       this.music= Load.audio( define.musicPath+"background/101 Opening.mp3");
        this.music.autoplay=false;
        this.music.loop=true;

        this.menu = new Framework.Sprite(define.imagePath+"Title.png");//"https://imgur.com/6vHYJUz.png");
        (()=>
        {
            var item=document.getElementById("loadItemText");
            item.innerText="";
            document.querySelector(".spinnerContianer").classList.add("hide");
        })();
    },

    initialize: function() {

        //this.music.play();
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
        this.rootScene.update(); 
    },

    draw: function(parentCtx) { 
        this.rootScene.draw(parentCtx);
        this.menu.draw(parentCtx);
        parentCtx.font = '15px Arial';
        parentCtx.fillStyle = 'black';
        parentCtx.textBaseline = 'top';
        parentCtx.textAlign = 'center';
        parentCtx.fillText('Press Any Key To Start', this.rectPosition.x , this.rectPosition.y, 100);
    },
    drawEmpty:function(ctx)
    {
        ctx.fillStyle="white";
        ctx.fillRect(0,0,Framework.Game._canvas.width,Framework.Game._canvas.height);
    },
    linkStart()
    {
        var GS=GameSystem,GM=GS.Manager;
        var RM=GM.Records,mainChar=GS.protagonist,rival=GS.rival;
        if(RM.records.length>0)
            Framework.Game.goToLevel('loadRecord');
        else
        {
            this.draw=this.drawEmpty;
            let name,rivalName;
            for(name=null;name===null;name=prompt("請輸入主角名字","小智障"));
            mainChar.name=name;
            mainChar.atMap="protagonistHome2F";
            for(rivalName=null;rivalName===null;rivalName=prompt("請輸入永遠的對手的名字","屁孩茂"));
            rival.name=rivalName;
            
        }
    }
    ,
    keydown:function(e)
    {
        this.linkStart();
    },
    mouseup: function(e) {
    },

    mousedown: function(e) {
        this.linkStart();
    },

    click:function(e){
        this.linkStart();
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
    },
    teardown : function()
    {
        this.music.pause();
    }
});