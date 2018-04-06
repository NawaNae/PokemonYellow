
GameSystem.Classes.AnimationItem=
class AnimationItem 
{
    constructor(src,option={position:undefined,displaySize:{x:16,y:16},cutStartPosition:undefined,cutSize:undefined,scale:undefined,group:undefined})
    {
        this.src=src;
        if(option.cutStartPosition&&option.cutStartPosition.constructor.name=="Position")
            option.cutStartPosition=option.cutStartPosition.toPoint();
        this.cutStartPosition=option.cutStartPosition;
        if(option.cutSize&&option.cutSize.constructor.name=="Position")
            option.cutSize=option.cutSize.toPoint();
        this.cutSize=option.cutSize;
        if(option.displaySize&&option.displaySize.constructor.name=="Position")
            option.displaySize=option.displaySize.toPoint();
        
        this.displaySize=option.displaySize;
        if(!this.displaySize&&option.scale)
            if(option.scale.constructor.name=="Position")
                option.scale=option.scale.toPoint();
        this.scale=option.scale;
        this.group=option.group;
    }

}