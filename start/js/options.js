GameSystem.Classes.Options=
class Options 
{
    constructor()
    {
        this.options=new Array();
        this.inputMode=GameSystem.Classes.Level.InputModes.options;
        this._display=document.createElement("div");
        this._display.classList.add("options");
        this.displayClassName=['hide','show'];
        this.autoChangeInputMode=false;
        this._lastInputMode;
        this.visible=false;
        this.optionsLoop=false;
    }
    set lastInputMode(value)
    {
        this.autoChangeInputMode=true;
        this._lastInputMode=value;    
    }
    get lastInputMode()
    {
        return this._lastInputMode;
    }
    push(option)
    {
        option.appendTo(this._display);
        this.options.push(option);
    }
    selectLast()
    {
        let lastEle=(!this.optionsLoop)?this.options[0]:this.options[this.options.length-1];
        for(let ele of this.options)
        {
            if(ele.select)
            {
                ele.select=false;
                lastEle.select=true;
                break;
            }
            lastEle=ele;
        }
    }
    find(text)
    {
        return this.options.find((option)=>{return option.name==text});
    }
    appendTo(father)
    {
        father.append(this._display);
    }
    prependTo(father)
    {
        father.prepend(this._display);
    }
    selectSend()
    {
        this.select.selectSend();
    }
    selectNext()
    {
        let nextEle=this.options[0];
        let ele=this.options[0];
        let i;
        for(i=0 ;i<this.options.length;i++)
        {
            ele=this.options[i];
            nextEle=this.options[i+1];
            if(ele.select)
                break;
        }
        if(i==this.options.length-1)
        {
            if(this.optionsLoop)
                nextEle=this.options[0];        
            else
                nextEle=this.options[i];
        }
        ele.select=false;
        nextEle.select=true;
    }
    get select()
    {
        for(let item of this.options)
            if(item.select)
                return item;
    }
    set select(item)
    {
        if(item.constructor.name=="Option")
            for(let obj of this.options)
                if(obj==item)
                    obj.select=true;
        else if(item.constructor.name=="String")
            for(let obj of this.options)
                if(obj.text==item)
                    obj.select=true;
        else if(item.constructor.name=="Number")
            this.options[i].select=true;
    }
    get visible()
    {return !this._display.classList.contains(this.displayClassName[0]);}
    set visible(value)
    {
        if(this.autoChangeInputMode)
        if(Framework.Game&&Framework.Game._currentLevel&&Framework.Game._currentLevel.inputMode)
            if(value)
            {
                this.lastInputMode=Framework.Game._currentLevel.inputMode;
                Framework.Game._currentLevel.inputMode=this.inputMode;
            }
            else
            {
                Framework.Game._currentLevel.inputMode=this.lastInputMode;
                this.lastInputMode=undefined;
            }
        this._display.classList.add(this.displayClassName[value|0]);
        this._display.classList.remove(this.displayClassName[(!value)|0]);
    }
    show()
    {this.visible=true;}
    hide()
    {this.visible=false}
}