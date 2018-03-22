function gameSystemLoaded()
{
    var GS=GameSystem;
    var CL=GS.Classes;
    GS.protagonist=new CL.Protagonist("小智障(於GameLoaded)");
    GS.protagonist.position=new CL.Position(4,4);
}
gameSystemLoaded();