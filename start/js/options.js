var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.Options=
class Options extends DisplayInformation.AutoKeyInput.Text
{
    constructor(option={className:"options"})
    {
        super();
        this.options=new Array();
        this._display=document.createElement("div");
        this._display.classList.add(option.className);
        this.displayClassName=['hide','show'];
        this.autoChangeInputMode=false;
        this._lastInputMode;
        this.visible=false;
        this.optionsLoop=false;
        this.keyInput=(e)=>{this._keyInput(e);};
        this.closeWithContainer=false;
    }
    _keyInput(e)
    {
            var options=this;
            let GS=GameSystem;
            let KM=GS.Manager.Key;
            let container=GameSystem.HTMLObjectContainer;
            switch(KM.keyMapping[e.key])
            {
                case "Up":
                options.selectLast();
                break;
                case "Down":
                options.selectNext();
                break;
                case "A":
                options.selectSend();
                break;
                case "B":
                if(this.closeWithContainer)
                    container.visible=false;
                options.visible=false;
                break;
            }
          
    }
    clear()
    {
        this._display.innerHTML="";
        this.options.length=0;
    }
    push(option)
    {
        if(this.options.length==0)
            option.select=true;
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
                lastEle._display.scrollIntoViewIfNeeded();
                break;
            }
            lastEle=ele;
        }
    }
    find(text)
    {
        return this.options.find((option)=>{return option.text==text});
    }
    /**
     * 移除自己或者options內容
     * @param 不填||null||undefined -- 移除自己
     * @param item Option -- 移除該項
     * @param item Number -- 移除index為item的項目
     * @param item String -- 移除text為item的項目
     */
    remove(item)
    {
        if(!item)
            this._display.remove();
        else if(item.constructor.name=="Option")
            this.options=this.options.slice(this.options.findIndex(ele=>ele==item));
        else if(item.constructor.name=="Number")
            this.options=this.options.slice(item);
        else if(item.constructor.name=="String")
            this.options=this.options.slice(this.options.findIndex(ele=>item.text==ele.text));
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
        nextEle._display.scrollIntoViewIfNeeded();
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
                {
                    obj.select=true;
                    obj._display.scrollIntoViewIfNeeded();
                }
        else if(item.constructor.name=="String")
            for(let obj of this.options)
                if(obj.text==item)
                {
                    obj.select=true;

                    obj._display.scrollIntoViewIfNeeded();
                }
        else if(item.constructor.name=="Number")
        {
             this.options[i].select=true;
             obj._display.focus();
        }   
    }

}