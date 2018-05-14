GameSystem.loaded=function ()
{
    var GS=GameSystem,CS=GS.Classes,Image=CS.Image;
    var x;
    GS.protagonist=new CS.Protagonist();
    GS.rival=new CS.Character(x,x,x,new Image(define.characterImagePath+"rival.png"),10);
    let protagonist=GS.protagonist;
    protagonist.initialize();
    protagonist.image.addToAllLevels();


}

GameSystem.loaded();
(()=>
{
    var item=document.getElementById("loadItemText");
    item.innerText="";
    document.querySelector(".spinnerContianer").classList.add("hide");
})();
