/**
 * @class Event
 * @description 地圖中到某地會觸發一個事件
 * @constructor 
 * @param {Rectangle|Position}pos
 * @param {Plot} plot
 */
GameSystem.Classes.Event=
class Event
{
    constructor(pos,plot)
    {
        var GS=GameSystem,CS=GS.Classes,GR=GS.Resource,Position=CS.Position,PC=CS.PlotContents;
        var Drama=GR.Drama,Plot=CS.Plot,Paragraph=CS.Paragraph,CureAll=PC.CureAll,Script=PC.Script,MoveCharacter=PC.MoveCharacter;
        var Rectangle=CS.Rectangle;
        if(pos.constructor.name==="Position")
            this.area=new Rectangle(pos,pos);
        else if(pos.constructor.name==="Rectangle")
            this.area=new Rectangle(pos.pos1,pos.pos2)
        else if(pos.x&&pos.y)
        {
            pos=new Position(pos);
            this.area=new Rectangle(pos,pos);
        }
        this._plotController=new GameSystem.Classes.PlotsController();
        var nplot=plot;
        if(plot.constructor.name==="Function")
            plot=new Plot("event",[new Script(plot)]);

        this._plotController.push(plot);
        
            
    }
    start()
    { this.plot.start();}
    get plots(){return this._plotController.plots;}
    set plots(val){this._plotController.plots=new Array(val)}
    set plot(newPlot) { this._plotController.plot=newPlot; }
    get plot() { return this._plotController.plot; }
}