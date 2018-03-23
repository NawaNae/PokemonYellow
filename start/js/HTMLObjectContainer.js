
GameSystem.Classes.HTMLObjectContainer=
class HTMLObjectContainer
{
    constructor()
    {
        this.container=document.createElement("div");
        this.container.classList.add("HTMLObjectContainer");
        this.displayCssProperty=["none","block"];
        document.body.append(this.container);
        this.resizeCanvas=(width,height)=>
        {
            this.container.style.width=width;
            this.container.style.height=height;   
        }
        Framework.Game.resizeCanvas=this.resizeCanvas;
    }
    get visible()
    {return !this.container.classList.contains('hide');}
    set visible(value)
    {this.container.style.display=this.displayCssProperty[value|0];}
}

GameSystem.HTMLObjectContainer=new GameSystem.Classes.HTMLObjectContainer;
