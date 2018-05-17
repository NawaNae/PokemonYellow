GameSystem.Classes.PlotContents.Script=
class Script extends GameSystem.Classes.PlotContent
{
    constructor(script,options={name:"script",type:"script"})
    {
        super(options);
        this.script=script.constructor.name==="Function"?script:()=>{eval(script)};
    }
    start()
    {
        this.script();
        this.next();
    }
    
}