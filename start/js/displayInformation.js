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
    }
    
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
        return this._text;
    }
    set text(text)
    {
        this._text = text;
        this._display.innerText = this._prefixString + this._displayProcessFunction(this._text) + this._postfixString;
    }
    get visible()
    {return !this._display.classList.contains(this.displayClassName[0]);}
    set visible(value)
    {
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
        this._display.append(child);
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
 DisplayInformation.AutoKeyInput.Digit=
 class Digit extends DisplayInformation.Digit
 {
    get visible(){return super.visible;}
    set visible(val)
    {
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
