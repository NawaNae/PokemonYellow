var GameSystem=GameSystem || {};
GameSystem.Classes.Image=class GameImage
{
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