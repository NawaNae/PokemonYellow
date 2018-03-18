/*
By NawaNawa
使用前
1請在loadGame.js新增載入levelJS檔案
    ex
    Load.js.import(
    [
        { src: define.jsPath + 'myMenu.js', lookFor: 'MyMenu' },
        .
        .
        .
        { src: define.jsPath + 'gameLevelTemplate.js', lookFor: 'GameLevelN' },
        .
        .
        .
        { src: define.jsPath+'mainGame.js' }//請最後載入mainGame
    ]);
2請在mainGame.js加入關卡
    ex
    Framework.Game.addNewLevel({levelN: new GameLevelN()});
 */
class GameLevelN extends Framework.Level
{
    load ()
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
       
	}

    initialize() {
       
       
    }
    update() {
   /*bug 去除 */ 
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
        
    }

    draw (parentCtx) 
    {
        
    }

    keydown(e, list)
    {
        //GameSystem.Manager.Key.pressList[e.key]=true;
    }
    keyup(e,list)
    {
        //GameSystem.Manager.Key.pressList[e.key]=false;
    }
    


    touchstart(e) {
        //為了要讓Mouse和Touch都有一樣的事件
        //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
        this.click({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
    
    click (e) {  

        if (!this.rectPosition) {
            return;
        }  
        
    }
}
