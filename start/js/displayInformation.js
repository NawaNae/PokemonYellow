var DisplayInformation = DisplayInformation || {};

DisplayInformation.Text = class Text
{
    constructor(text = "", prefixString = "", postfixString = "", displayHTMLClass, createElementTypeString = "span", father, textOutputProcessFunction = DisplayInformation.Text.OutputFunctions.Normal)
    {
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
    get text()
    {
        return this._text;
    }
    set text(text)
    {
        this._text = text;
        this._display.innerText = this._prefixString + this._displayProcessFunction(this._text) + this._postfixString;
    }
    show()
    {
        this._display.style.display = "block";
    }
    hide()
    {
        this._display.style.display = "none";
    }
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
    constructor(value = 0, prefixString = "", postfixString = "", displayHTMLClass , createElementTypeString = "span",father, textOutputProcessFunction = DisplayInformation.Digit.OutputFunctions.Normal)
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