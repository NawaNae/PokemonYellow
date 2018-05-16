var DisplayInformation = DisplayInformation || {};

DisplayInformation.Text = class Text
{
    constructor(text = "", prefixString = "", postfixString = "", displayHTMLClass, createElementTypeString = "div", father, textOutputProcessFunction = DisplayInformation.Text.OutputFunctions.Normal)
    {
        this.displayClassName=['hide','show'];
        this._prefixString = prefixString;
        this._postfixString = postfixString;
        this._displayProcessFunction = textOutputProcessFunction ;
        this._display = document.createElement(createElementTypeString);
        if (displayHTMLClass)
            this._display.classList.add(displayHTMLClass);
        if (father)
            this.appendTo(father);
        this.text = text;
        this.updateWhenShow=false;
        this._onShow=()=>{this.onShow();}
        this._onHide=()=>{this.onHide();}
    }
    onShow()
    {

    }
    onHide()
    {
        
    }
    updateText()
    {this._display.innerText = DisplayInformation.gameTextProcess(this._prefixString + this._displayProcessFunction(this._text) + this._postfixString);}
    set prefixString(str)
    {
        this._prefixString=str;
        this.text=this.text;
    }
    get prefixString()
    {return this._prefixString;}
    set postfixString(str)
    {
        this._postfixString=str;
        this.text=this.text;
    }
    get postfixString()
    {return this._postfixString;}
    get text()
    {
        return DisplayInformation.gameTextProcess(this._text);
    }
    set text(text)
    {
        this._text = text;
        this.updateText();
    }
    get visible()
    {return !this._display.classList.contains(this.displayClassName[0]);}
    set visible(value)
    {
        if(value|0)this.onShow();else this.onHide();
        if(this.updateWhenShow&&value)
            this.updateText();
        this._display.classList.add(this.displayClassName[value|0]);
        this._display.classList.remove(this.displayClassName[(!value)|0]);
    }
    show()
    {this.visible=true;}
    hide()
    {this.visible=false}
    remove()
    {
        this._display.remove(this._display);
    }
    append(child)
    {
        this._display.appendChild(child);
    }
    prepend(child)
    {
        this._display.prepend(child);
    }
    appendTo(father)
    {
        father.append(this._display);
    }
    prependTo(father)
    {
        father.prepend(this._display);
    }
};
DisplayInformation.Text.OutputFunctions =
    {
        Normal: (text) => { return text }
    };

DisplayInformation.Digit = class Digit extends DisplayInformation.Text
{
    constructor(value = 0, prefixString = "", postfixString = "", displayHTMLClass , createElementTypeString = "div",father, textOutputProcessFunction = DisplayInformation.Digit.OutputFunctions.Normal)
    {
        super("", prefixString, postfixString, displayHTMLClass ,createElementTypeString,father, textOutputProcessFunction);
        this.digitOutputProcessFunction = DisplayInformation.Digit.OutputFunctions.Normal;
        this.value = value;
        
    }
    get value()
    {
        return this._value;
    }
    set value(value)
    {
        this._value = value;
        this.text = this.digitOutputProcessFunction(this._value);
    }
};
DisplayInformation.Digit.OutputFunctions =
    {
        Normal: (value) => { return value },
        Round: (value) => { return Math.round(value); },
        Floor: (value) => { return Math.floor(value); },
        Ceil: (value) => { return Math.ceil(value); },
        Absolute: (value) => { return Math.abs(value); },
        roundNthDigitAfterPoint: (digits) => { return (value) => { return parseFloat(value).toFixed(digits); }; }
    };
DisplayInformation.AutoKeyInput={};
DisplayInformation.AutoKeyInput.Text=
class Text extends DisplayInformation.Text
{
    constructor(text = "", prefixString = "", postfixString = "", displayHTMLClass, createElementTypeString = "div", father, textOutputProcessFunction = DisplayInformation.Text.OutputFunctions.Normal)
    {
        super(text, prefixString , postfixString, displayHTMLClass, createElementTypeString , father, textOutputProcessFunction );
        this.autoKeyInput=true;
    }
    get visible(){return super.visible;}
    set visible(val)
    {
        super.visible=val;
        if(val)
        {
            if(this.keyInput&&this.autoKeyInput)
            {
                this.lastKeyInput=GameSystem.Manager.Key.keyInput;
                GameSystem.Manager.Key.keyInput=this.keyInput;
            }
        }
        else
        {
            if(this.keyInput&&this.autoKeyInput)
            {
                if(this.lastKeyInput)
                    GameSystem.Manager.Key.keyInput=this.lastKeyInput;
                else if(Framework.Game&&Framework.Game._currentLevel&&Framework.Game._currentLevel.keyInput)
                GameSystem.Manager.Key.keyInput=Framework.Game._currentLevel.keyInput;
                this.lastKeyInput=undefined;
            }
        }
    }
}
 DisplayInformation.AutoKeyInput.Digit=
 class Digit extends DisplayInformation.Digit
 {
    get visible(){return super.visible;}
    set visible(val)
    {
        super.visible=val;
        if(val)
        {
            if(this.keyInput)
            {
                this.lastKeyInput=GameSystem.Manager.Key.keyInput;
                GameSystem.Manager.Key.keyInput=this.keyInput;
            }
        }
        else
        {
            if(this.keyInput)
            {
                GameSystem.Manager.Key.keyInput=this.lastKeyInput;
                this.lastKeyInput=undefined;
            }
        }
    }
 }
 DisplayInformation.gameTextMappping={};
DisplayInformation.gameTextProcess=function(text)
{
    if(!GameSystem||!GameSystem.protagonist)
        return text;
    DisplayInformation.gameTextMappping=
    {
        "\\$MY_NAME":GameSystem.protagonist.name,
        "\\$RIVAL_NAME":GameSystem.rival.name
    };
    let map=DisplayInformation.gameTextMappping;
    for(let key in map)
    {
        var re = new RegExp(key, 'g');
        text=text.replace(re,map[key]);
    }
    return text;
}