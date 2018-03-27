GameSystem.Classes.MapPosition=
class MapPosition
{
    constructor(name,position)
    {
        this.mapName=name||"";
        this.isSubLevel=false;
        this.position=position||new GameSystem.Classes.Position();
        if(!name)console.log('請確保初始化Name或者之後設定mapName否則Connection地圖可能出錯');
        if(!position)console.log('請確保初始化Position或者之後設定position否則連接點會預設在地圖邊界');
    }
}