/**
 * @description 顯示在下方的對話框
 * @class GameSystem.Classes.HTMLObjectContainer
 * @property {bollean} visible 要不要顯示
 * @method show 顯示
 * @method hide 隱藏
 * @event resizeCanvas 在Canvas被變更時觸發
 */
GameSystem.Classes.HTMLObjectContainer=
class HTMLObjectContainer
{
    constructor(visible)
    {
        this.container=document.createElement("div");
        this.container.classList.add("HTMLObjectContainer");
        this.displayClassName=["hide","show"];
        this.visible=visible||false;//初始化可不可視
        this.dialog=new GameSystem.Classes.Dialog();
        this.childrenList=[];
        this.addChild(this.dialog);
        document.body.append(this.container);
        this.resizeCanvas=(width,height)=>
        {
            this.container.style.width=width;
            this.container.style.height=height;   
        }
        Framework.Game.resizeCanvas=this.resizeCanvas;
    }
    get visible()
    {return !this.container.classList.contains(this.displayClassName[0]);}
    set visible(value)
    {
        this.container.classList.add(this.displayClassName[value|0]);
        this.container.classList.remove(this.displayClassName[(!value)|0]);
    }
    addChild(child)
    {
        this.childrenList.push(child);
        child.appendTo(this.container);
    }
    show()
    {this.visible=true;}
    hide()
    {this.visible=false}
    remove()
    {this._display.remove(this._display);}
    append(child)
    {this._display.append(child);}
    prepend(child)
    {this._display.prepend(child);}
    appendTo(father)
    {father.append(this._display);}
    prependTo(father)
    {father.prepend(this._display);}
}

GameSystem.HTMLObjectContainer=new GameSystem.Classes.HTMLObjectContainer;
