var Monster = Monster || {};
Monster.enum = { Base: -1 };
Monster.WALK_PIXEL = 1;
Monster.FULL_HP = 100;
Monster.HPBar = class HPBar
{
    constructor()
    {
        this._hp;
        this.picture = new Framework.Sprite(define.imagePath + 'HPBar.png');
    }
    get hp()
    {

    }
    set hp(value)
    {

    }
};
Monster.Base = class Base
{
    constructor(imageSrc)
    {
        this._hp = Monster.FULL_HP;
        this.type = Monster.enum.Base;
        this.src = imageSrc;
        this.picture = new Framework.Sprite(imageSrc);
        this.step = 0;
        this.walkPixel = Monster.WALK_PIXEL;
    }
    get hp()
    {
        return this._hp;
    }
    set hp(value)
    {
        this._hp = value;
    }
    initialize()
    {}
    draw(context)
    {}
    update()
    {}
    walk(mapRoute)
    {
        if (this.step < mapRoute.length - 1)
        {
            var xdiff = mapRoute[this.step + 1].center.x - this.picture.position.x;
            var ydiff = mapRoute[this.step + 1].center.y - this.picture.position.y;
            this.picture.position.x += (xdiff==0) ?0:(xdiff>0)? this.walkPixel : - this.walkPixel;
            this.picture.position.y += (ydiff == 0) ? 0 : (ydiff > 0) ? this.walkPixel : - this.walkPixel;
            if (mapRoute[this.step + 1].center.x == this.picture.position.x && mapRoute[this.step + 1].center.y == this.picture.position.y)
                this.step++;
        }
    }
};
