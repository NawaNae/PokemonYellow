GameSystem.Classes.AnimationList =
class AnimationList extends Array
{
    constructor()
    {
        super();
        this.index=0;
    }
    getEletmentByGroupName(name)
    {
        return this.find((element)=>{return element.group==name;});
    }
    getElementsByGroupName(name)
    {
        return this.filter((element)=>{return element.group==name;});
    }
}