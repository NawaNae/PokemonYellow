var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.Connection=
class Connection 
{
    constructor(mapPos1,mapPos2)
    {
        if(!mapPos1||!mapPos2)console.log('請確保初始化place或者之後設定place否則連接點會預設在地圖邊界');
            this.placeA=mapPos1||new GameSystem.Classes.MapPosition(name,mapPos1);
            this.placeB=mapPos2||new GameSystem.Classes.MapPosition(name,mapPos2);
    }
    isSameMapConnection()
    {
        return this.placeA.mapName==this.placeB.mapName;
    }
    findPlaceByMapName(name)
    {
        if(this.placeA.mapName==name)return this.placeA;
        if(this.placeB.mapName==name)return this.placeB;
        return undefined;
    }
    findAnotherPlaceByMapName(name)
    {
        if(this.placeA.mapName==name)return this.placeB;
        if(this.placeB.mapName==name)return this.placeA;
        return undefined;
    }
}