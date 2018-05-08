GameSystem.Classes.PlotContents.Script=
class MoveCharacter extends GameSystem.Classes.PlotContent
{
    constructor(script,options={name:"script",type:"script"})
    {
        super(options);
        autoBind(this);
        this.script=typeof script==="function"?script:()=>{eval(script)};
    }
    start()
    {
        this.script();
        this.next();
    }
    
}