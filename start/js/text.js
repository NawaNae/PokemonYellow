GameSystem.Classes.Text=
class FText extends Framework.GameObject
{
    constructor(txt="",font={size:"90pt",family:"UD Digi Kyokasho NK-R",color:"white"},textAlign="center",maxWidth)
    {
        super();
        this._txt=txt;
        this._fontSize=font.size||"90pt";
        this._fontFamily=font.family||"MBitmapSquareHK";
        this._fontColor=font.color||"white";
        this._textAlign=textAlign;
        if(typeof width!=='undefined')
            this._maxWidth=width;
    }
    draw(context)
    {
        context.font =this._fontSize+" '"+this._fontFamily+"'";
        context.textAlign = this.textAlign;
        context.fillStyle =this._fontColor;
        if(!this._maxWidth)
            context.fillText(this._txt, this.position.x, this.position.y);
        else
            context.fillText(this._txt, this.position.x, this.position.y,this._maxWidth);
    }
}