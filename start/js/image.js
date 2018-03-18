var GameSystem=GameSystem || {};
GameSystem.Image=class GameImage
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
    set picture(value){}
    draw(context)
    {
        
    }
    
    get x()
    {
        return this._position.x;
    }
}