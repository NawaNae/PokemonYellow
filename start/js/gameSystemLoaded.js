GameSystem.loaded=function ()
{
    var GS=GameSystem;
    var CS=GS.Classes;
    GS.rival=new CS.Character("屁孩茂",CS.Character.Face.Down);
    GS.protagonist=new CS.Protagonist(
        "小智障", //name
        new CS.Position(4,4) //position
    );
    let protagonist=GS.protagonist;
    protagonist.initialize();
    protagonist.image.addToAllLevels();
    GameSystem.HTMLObjectContainer.options.find("角色資料").text="$MY_NAME";//強制更新清單內容 存檔之後放在載入後執行
}

GameSystem.loaded();