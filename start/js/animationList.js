GameSystem.Classes.AnimationList =
class AnimationList extends Array
{
    constructor()
    {
        super();
        this.index=0;
    }
    copyFrom(list)
    {
        var Item=GameSystem.Classes.AnimationItem;
        if(list.length===0)return;
        this.index=list.index||this.index;
        if(this.length!==list.length)
            this.length=list.length;
        for(let i=0;i<list.length; i++)
            this[i]=new Item(list[i]);
        
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