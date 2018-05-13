var GameSystem=GameSystem || {};
/**
 * 警告 請勿將draw複寫(overwrite)
 * @class GameSystem.Classes.Image
 * @property _position : {x: int ,y: int} 儲存圖片左上座標
 * @property _cutStartPosition : {x: int ,y: int} 儲存切割開始點
 * @property _cutSize : {x: int ,y: int} 儲存切割大小
 * @property src : str 儲存圖片網址 作為下載 及 儲存名稱
 */
GameSystem.Classes.Image=class GameImage
{
    /**
     * 
     * @param {string} src 
     * @param {stbject} option 可選參數 初始化一個{}內部填入想要填入的參數名稱冒號參數即可。
     * object 內有
     * position : {x:int, y:int} 左上角位置，
     * displaySize : {x:int, y:int} 最終顯示像素大小，
     * cutStartPosition : {x:int, y:int} 切割圖片左上角的位置，
     * cutSize : {x:int, y:int} 切割圖片的寬與高。
     */
    constructor(src,option={position:undefined,displaySize:undefined,cutStartPosition:undefined,cutSize:undefined})
    {
        this.position=option.position||{x:0,y:0};
        this.displaySize=option.displaySize?option.displaySize.constructor.name=="Position"?option.displaySize.toPoint():option.displaySize:undefined;
        this.cutStartPosition=option.cutStartPosition?option.cutStartPosition.constructor.name=="Position"?option.cutStartPosition.toPoint():option.cutStartPosition:undefined;
        this.cutSize=option.cutSize?option.cutSize.constructor.name=="Position"?option.cutSize.toPoint():option.cutSize:undefined;
        this._src=src;
        this.image=Load.image(src);
        this.visible=true;
      //  Framework.Game._currentLevel._allGameElement.push(this);//視為遊戲物件
    }
    addToLevelByLevelName(name)
    {
        let level=Framework.Game._findLevel(name);
        level._allGameElement.push(this);
    }
    addToCurrentLevel()
    {
        Framework.Game._currentLevel._allGameElement.push(this);
    }
    addToAllLevels()
    {
        Framework.Game._levels.forEach((ele)=>
        {
            ele.level._allGameElement.push(this);
        });
    }
    load()
    {
        if(this.image)
            Framework.Game._currentLevel.rootScene.attach(this.image);
    }
    initialize()
    {
        
    }
    update()
    {

    }
    copy(image)
    {
        if(!image)
            return;
        var Point=GameSystem.Classes.Point;
        if(image.src)
            this.src=image.src||image._src;
       if(image.cutSize)
            this.cutSize=new Point(image.cutSize);
        if(image.cutStartPosition)
            this.cutStartPosition=new Point(image.cutStartPosition);
       if((image.scale&&image.scale.x&&image.scale.x!==1&&image.scale.y&&image.scale.y!==1)||(image.scale&&image.scale._x&&image.scale._x!==1&&image.scale._y&&image.scale._y!==1))
            this.scale=(new Point(image.scale));
        if(image.position)
            this.position=new Point(image.position);
        if(image.visible)
            this.visible=image.visible;
        if(image.displaySize)
            this.displaySize=new Point(image.displaySize);
    }
    show(){this.visible=true;}
    hide(){this.visible=false;}
   get src(){return this._src}
   set src(value){
    if(value!=this._src)   
    {
        this._src=value;
        this.image=Load.image(value);
    }   
       
}
   get scale()
   {
       if(!this.displaySize)return {x:1,y:1};
       return {x:this.displaySize.x/(this.image.width||1),y:this.displaySize.y/(this.image.height||1)};
   }
   set scale(value)
   {
        if(typeof value==='number')
            value={x:value,y:value};
        this.displaySize.x=this.image.width*value.x;
        this.displaySize.y=this.image.height*value.y;
   }
   clearDirtyFlag()
   {

   }
    draw(context)
    {
        if(!this.visible)return ;
        if(this.cutStartPosition&&this.cutSize)
            if(this.displaySize)
                context.drawImage(
                    this.image,
                    this.cutStartPosition.x,this.cutStartPosition.y,
                    this.cutSize.x,this.cutSize.y,
                    this.position.x,this.position.y,
                    this.scale.x*this.cutSize.x,this.scale.x*this.cutSize.y
                );
            else
                context.drawImage(
                    this.image,
                    this.cutStartPosition.x,this.cutStartPosition.y,
                    this.cutSize.x,this.cutSize.y,
                    this.position.x,this.position.y,
                    this.cutSize.x,this.cutSize.y
                );
        else if(this.displaySize)
            context.drawImage(
                this.image,
                this.position.x,this.position.y,
                this.displaySize.x,this.displaySize.y
            );
        else
            context.drawImage(
                this.image,
                this.position.x,this.position.y,
            );
    }
    
    get x(){return this.position.x;}
    set x(value){this.position.x=value;}
    get y(){return this.position.y;}
    set y(value){this.position.y=value;}
}