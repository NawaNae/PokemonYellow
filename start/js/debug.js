
GameSystem.debugDefine=function()
{
    GS=GameSystem;
    CS=GS.Classes;
    mainChar=GS.protagonist;
    level=()=> Framework.Game._currentLevel;
    Point=CS.Point;
    Position=CS.Position;
    container=GS.HTMLContainer;
    GM=GS.Manager;
    RM=GM.Records;
    KM=GM.Key;
    GR=GS.Resource;
    PropDict=GR.PropDictionary;
    DEX = GameSystem.Classes.PokemonType.Dictionary;  
    Pokemon=CS.Pokemon;
}