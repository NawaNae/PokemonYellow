/**
 * @class PlotContent
 * @description Plot內容的Base Class 劇情的基本單位
 * @prop name 
 * @prop fatherPlot/plot 自己容器的指標
 * @event start 需要被overwirride 開始時由容器呼叫
 * @event (optional) end 如果有在結束時會被觸發 需要新增
 */
GameSystem.Classes.PlotContent=
class PlotContent
{
    constructor(options={name:"PlotBase",type:"PlotBase"})
    {
        this.name=options.name;
        this.type=options.type;
        this.fatherPlot;
    }
    start()
    {
        
    }
    get plot()
    {
        return this.fatherPlot;
    }
    set plot(fatherPlot)
    {
        this.fatherPlot=fatherPlot;
    }

}
GameSystem.Classes.PlotContents={};
GameSystem.Classes.PlotContents.Base=GameSystem.Classes.PlotContent;