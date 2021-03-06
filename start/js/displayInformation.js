var DisplayInformation = DisplayInformation || {};
/**
 * Html容器對應JS字串變數的類別外部UI的BaseClass
 * @class DisplayInformation
 */
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
    //事件 顯示或隱藏時被呼叫
    onShow()
    {}
    onHide()
    {}
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
        if(child._display&&child._display.__proto__&&child._display.__proto__.__proto__&&child._display.__proto__.__proto__.constructor.name==="HTMLElement")
            child=child._display; 
        if(this._display.append)
            this._display.append(child);
        else 
            this._display.appendChild(child);
    }
    prepend(child)
    {
        this._display.prepend(child);
    }
    appendTo(father)
    {
        if(father.append)
            father.append(this._display);
        if(father.appendChild)
            father.appendChild(this._display);
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
/**
 * Html容器對應數字變數的類別
 * @class Digit
 * @extends Text
 */
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
//輸出處理函數
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
/**
 * 提供遊戲輸入函數備份及覆蓋的UI Text baseclass
 * @class Text
 * @extends DisplayInformation.Text
 */
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
/**
 * 提供遊戲輸入函數備份及覆蓋的UI 數字的 baseclass
 * @class Digit
 * @extends DisplayInformation.Digit
 */
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
 //處理含變數的字串的處理含數
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