var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
/**
 * 劇情的控制器，可以找出符合情況的劇情
 * @class PlotsController
 */
GameSystem.Classes.PlotsController=
class PlotsController
{
    constructor(items,npc)
    {
        if(items&&items.constructor.name==="PlotsController")
        {
            npc=items.npc;
            items=items.plots;
        }    
        this._npc=npc;
        this.plots=items;
    }
    set plots(items)
    {
        if(typeof items ==="undefined")
            this._plots=Array();
        else if(items.constructor.name==="Array")
            this._plots=items;
        else
            this._plots=Array(items);
        for(let item of this._plots)
            item.npc=this.npc;
    }
    get plots(){return this._plots;}
    get plot()
    {
        for(let p of this.plots)
            if(!p.condition||p.condition())
                return p;
    }
    set plot(val){val.npc=this.npc;this.plots.splice(this.indexOf(this.plot),1,val);}
    get plotNow(){return this.plot;}
    set plotNow(val){console.log("plotNow is read only getter");}
    set npc(npc)
    {
        this._npc=npc;
        for(let item of this._plots)
            item.npc=npc;
    }
    get npc(){return this._npc;}
    push(plot){plot.npc=this.npc;this.plots.push(plot)}
    unshift(plot){plot.npc=this.npc;this.plots.unshift(plot)}
    indexOf(plot)
    {
        var index;
        if(typeof plot==="undefined")return;
        if(plot.constructor.name==="Number")
           index=plot;
        else if(plot.constructor.name==="String")
            index=this.plots.indexOf(this.plots.find(ele=>ele.name===plot));
        else
            index=this.plots.indexOf(plot);
        return index;
    }
    remove(plot)
    {
        var index=this.indexOf(plot);
        return this.plots.splice(index, 1)[0];
    }
}