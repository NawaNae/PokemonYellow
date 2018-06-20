var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
/**
 * 儲存地圖與座標
 * @class MapPosition
 */
GameSystem.Classes.MapPosition=
class MapPosition
{
    constructor(name,position,config={parentName:undefined,isParentLevel:undefined})
    {
        this.mapName=name||"";
        this.isSubLevel=false;
        this.isParentLevel=config.isParentLevel;
        this._parentName="";
        this.parentName=config.parentName||"";
        this.position=position||new GameSystem.Classes.Position();
        if(!name)console.log('請確保初始化Name或者之後設定mapName否則Connection地圖可能出錯');
        if(!position)console.log('請確保初始化Position或者之後設定position否則連接點會預設在地圖邊界');
    }
    set parentName(value){this.isSubLevel=true;this._parentName=value;}
    get parentName(){return this._parentName;}
    isSubLevelOf(parentName)
    {
        if(this.isSubLevel)
            return this._parentName==parentName;
        return false;
    }
}