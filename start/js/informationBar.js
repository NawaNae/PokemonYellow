Load.css(define.cssPath + 'informationBar.css');
var Information = class InformationBar extends DisplayInformation.Text
{
    constructor()
    {
        super("", "", "", "informationBar","div" );
        this.timer = new Timer;
        this.timer.appendTo(this._display);
        this.score = new Information.Score();
        this.score.appendTo(this._display);
        this.hp = new Information.HP();
        this.hp.appendTo(this._display);
    }
};
Information.Score = class Score extends DisplayInformation.Digit
{
    constructor()
    {
        super(0, "Score : ", "", "score", "span");
    }
}
Information.HP = class HP extends DisplayInformation.Digit
{
    constructor()
    {
        super(0, "HP : ", "", "HP", "span");
        this._max;
    }
    get value()
    {
        return super.value;
    }
    set value(value)
    {
        super.value = value;
    }
}
