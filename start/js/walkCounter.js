var GameSystem=GameSystem||{};
GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.OneBlockCount=
class OneBlockCount
{
    constructor()
    {
        this.enable=false;
        this.reset();
    }
    reset()
    {
        this._count=0;
        this.step=1;
        this.blockWidth=16;
        this.finished=false;
    }
    
    set count(value)
    {
        if(!this.enable)
            return;
        this._count=value;
        if(this._count>=this.blockWidth)
        {
            this.finished;
            this.enable=false;
        }
    }
    get count()
    {
        return this._count;
    }
}