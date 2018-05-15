GameSystem.Classes.GameObject=
class GameObject
{
    constructor(option={point:undefined,position:undefined})
    {
        var GS=GameSystem,CS=GS.Classes,Point=CS.Point,Position=CS.Position;
        this.position=(option.point)?new Point(option.point):new Point(0,0);
        if(option.position)
            this.position=option.position.toPoint();
        this.visible=true;
    }
    load(){}
    initialize(){}
    update(){}
    clearDirtyFlag(){}
    draw(ctx){}
    get point(){return this.position;}
    set point(val){this.position=val.constructor.name==="Position"?val.toPoint():new GameSystem.Classes.Point(val);}
    get x(){return this.position.x;}
    set x(value){this.position.x=value;}
    get y(){return this.position.y;}
    set y(value){this.position.y=value;}
    addToLevelByLevelName(name)
    {
        let level=Framework.Game._findLevel(name);
        level._allGameElement.push(this);
    }
    addToCurrentLevel()
    {
        Framework.Game._currentLevel._allGameElement.push(this);
    }
    addToAllLevels()
    {
        Framework.Game._levels.forEach((ele)=>
        {
            ele.level._allGameElement.push(this);
        });
    }
}