GameSystem.Classes.PlotContents.Script=
class Script extends GameSystem.Classes.PlotContent
{
    constructor(script,options={name:"script",type:"script",autoNext:true})
    {
        super(options);
        this.autoNext=options.autoNext;
        this.script=script.constructor.name==="Function"?script:()=>{eval(script)};
    }
    start()
    {
        this.script();
        if(this.autoNext)
            this.next();
    }
}