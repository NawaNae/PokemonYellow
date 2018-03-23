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
     * @param {object} option 可選參數 初始化一個{}內部填入想要填入的參數名稱冒號參數即可。
     * object 內有
     * position : {x:int, y:int} 左上角位置，
     * displaySize : {w:int, h:int} 最終顯示像素大小，
     * cutStartPosition : {x:int, y:int} 切割圖片左上角的位置，
     * cutSize : {w:int, h:int} 切割圖片的寬與高。
     */
    constructor(src,option={position:{x:0,y:0},displaySize:{w:0,h:0},cutStartPosition:{x:0,y:0},cutSize:{w:0,h:0}})
    {
        this._position=option.position||{x:0,y:0};
        this._displaySize=option.displaySize;
        this._cutStartPosition=option.cutStartPosition;
        this._cutSize=option.cutSize;
        this.src=src;
        Framework.ResourceManager.loadImage({id:src, url:src});
        Framework.Game._currentLevel._allGameElement.push(this);//視為遊戲物件
    }
    load()
    {}
    initialize()
    {
        
    }
    update()
    {

    }
    get picture()
    {
        return Framework.ResourceManager.getResource(src);
    }
   // set picture(value){}
    draw(context)
    {
        if(this._cutStartPosition&&this._cutSize)
            if(this._displaySize)
                context.drawImage(
                    this.picture,
                    this._cutStartPosition.x,this._cutStartPosition.y,
                    this._cutSize.w,this._cutSize.h,
                    this._position.x,this._position.y,
                    this._displaySize.w,this._displaySize.h
                );
            else
                context.drawImage(
                    this.picture,
                    this._cutStartPosition.x,this._cutStartPosition.y,
                    this._cutSize.w,this._cutSize.h,
                    this._position.x,this._position.y,
                    this.picture.width,this.picture.height
                );
        else if(this._displaySize)
            context.drawImage(
                this.picture,
                this._position.x,this._position.y,
                this._displaySize.w,this._displaySize.h
            );
        else
            context.drawImage(
                this.picture,
                this._position.x,this._position.y,
            );
    }
    
    get x(){return this._position.x;}
    set x(value){this._position.x=value;}
    get y(){return this._position.y;}
    set y(value){this._position.y=value;}
}