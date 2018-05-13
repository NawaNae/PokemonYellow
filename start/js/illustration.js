GameSystem.Classes.Illustration=
class Illustration extends DisplayInformation.AutoKeyInput.Text
{
    constructor()
    {
        super("","","","illustration");
        this.initBasicInfo();
        this.initImage();
        this.initBasicInfoRight();
        this.initName();
        this.initNumber();
        this.initDescription();
        this.keyInput=(e)=>{this._keyInput(e);}
    }
    _keyInput(e)
    {
        this.hide();
    }
    initBasicInfo()
    {
        this.basicInfo=new DisplayInformation.Text("","","","basicInfo");
        this.basicInfo.appendTo(this._display);
    }
    initImage()
    {
        this.image=new Image();
        this.image.classList.add("image");
        this.basicInfo._display.append(this.image);
    }
    initBasicInfoRight()
    {
        this.basicInfoRight=new DisplayInformation.Text("","","","basicInfoRight");
        this.basicInfoRight.appendTo(this.basicInfo._display);
    }
    initName()
    {
        this.name=new DisplayInformation.Text("","","","name");
        this.name.appendTo(this.basicInfoRight);
    }
    initNumber()
    {
        this.number=new DisplayInformation.Digit(0,"No.","","number");
        this.number.appendTo(this.basicInfoRight);
    }
    initDescription()
    {
        this.description=new DisplayInformation.Text("","","","description");
        this.description.appendTo(this._display);
        
    }
    set setInfo(pokemonTypeObj)
    {
        this.name.text=pokemonTypeObj.name;
        this.number.value=pokemonTypeObj.id;
        this.description.text=pokemonTypeObj.description||"";
        this.image.src=pokemonTypeObj.image.src;//第一層為gameImage 第二層為HTML image
    }
}