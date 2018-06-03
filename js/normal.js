if(typeof navigator.onLine !== "undefined")
    if(!navigator.onLine)
        alert("這是網頁，請確保開啟網路，不然會造成無法瀏覽操作說明")
var NawaNawa=NawaNawa||{};
/**
 * 尋找某元素的祖先
 *@argument oneQuery只包含#id 或 .className 或 tagname的單組選擇
 */
NawaNawa.ancestorSelector=function(oneQuery=".article",htmlElement)
{
    if(!htmlElement)
    {
        console.log("請填入htmlElement於第二個參數作為基準");
        return;
    }
    let type=oneQuery[0];
    let content="";
    htmlElement=htmlElement.parentElement;
    if(type=="."||type=="#")
         content=oneQuery.slice(1,oneQuery.length);
    else
   {
        content=oneQuery;
        type="";
    }
    if(type==".")//class
    { 
        for(;htmlElement!=document.body;htmlElement=htmlElement.parentElement)
            if(htmlElement.classList.contains(content))
                return htmlElement;
    }
    else if(type=="#")//id
    {
        for(;htmlElement!=document.body;htmlElement=htmlElement.parentElement)
            if(htmlElement.id==content)
                return htmlElement;
    }   
    else if(type=="")//tag
    {
        for(;htmlElement!=document.body;htmlElement=htmlElement.parentElement)
            if(htmlElement.tagName==content.toUpperCase())
                return htmlElement;
    }
    return undefined;

}
NawaNawa.nextPageListener=
function(e)
{
    if(this.classList.contains("disable"))
    return;
    let pages=this.parentElement.querySelector(".pages");
    let theOtherButton=this.parentElement.querySelector(".lastPageButton");
    let content=pages.querySelector(".pageContent");
    let button=this;
    let article=NawaNawa.ancestorSelector(".article",this);
    article.dataset.page++;
    $(pages).hide().load(content.dataset.nextpagesrc,function(){
        let content=this.querySelector(".pageContent");
        if(content)
        {
            if(!content.dataset.nextpagesrc)
                if(!button.classList.contains("disable"))
                    button.classList.add("disable");
            if(content.dataset.lastpagesrc)
                if(theOtherButton.classList.contains("disable"))
                    theOtherButton.classList.remove("disable");
            $(pages).fadeIn('500');
        }
    });
}
NawaNawa.lastPageListener=
function(e)
{
    if(this.classList.contains("disable"))
        return;
    let article=NawaNawa.ancestorSelector(".article",this);
        article.dataset.page--;
    let pages=this.parentElement.querySelector(".pages");
    let theOtherButton=this.parentElement.querySelector(".nextPageButton");
    let content=pages.querySelector(".pageContent");
    let button=this;
    $(pages).hide().load(content.dataset.lastpagesrc,function(){
        let content=this.querySelector(".pageContent");
        if(content)
        {
            if(!content.dataset.lastpagesrc)
                if(!button.classList.contains("disable"))
                    button.classList.add("disable");
            if(content.dataset.nextpagesrc)
                if(theOtherButton.classList.contains("disable"))
                theOtherButton.classList.remove("disable");
            $(pages).fadeIn('500');
        }
    })
}
$(".visibleBtn").on("click",function(){
    
    let visible=this.dataset.visible=="true";
    let contents=['>','<'];
    visible=!visible;
    $(this.parentElement.querySelectorAll(".webLinks")).toggle(visible);
    this.innerText=contents[visible|0];
    this.dataset.visible=visible.toString();
});
$(".nextPageButton").on("click",NawaNawa.nextPageListener);
$(".lastPageButton").on("click",NawaNawa.lastPageListener);
$(".webLinks.playHelp").on("click",function()
{
    $('.coverClose')[0].click();
    let article=document.querySelector('.coverContent.article');
    let next= document.querySelector(".nextPageButton");
   
    let last=document.querySelector(".lastPageButton");
    if(next.classList.contains("disable"))next.classList.remove("disable");
    if(!last.classList.contains("disable"))last.classList.add("disable");
    article.id="playHelp";
    article.dataset.page=0;
    
    $('.coverContent.article>.pages').load("https://nawanae.github.io/PokemonYellow/pages/playHelp/0.html",function(){$(this).fadeIn(200);}).hide();
})
$(".developer").on("click",function()
{
    $('.coverClose')[0].click();
    let article=document.querySelector('.coverContent.article');
    let next= document.querySelector(".nextPageButton");
   
    let last=document.querySelector(".lastPageButton");
    if(!next.classList.contains("disable"))next.classList.add("disable");
    if(!last.classList.contains("disable"))last.classList.add("disable");
    article.id="playHelp";
    article.dataset.page=0;
    
    $('.coverContent.article>.pages').load("https://nawanae.github.io/PokemonYellow/pages/developer/0.html",function(){$(this).fadeIn(200);}).hide();
})
$(".coverClose").on("click",function()
{
    $(NawaNawa.ancestorSelector(".coverBackground",this)).fadeToggle(200);
});
document.querySelector(".coverClose").click();
$(".removeRecords").on("click",function()
{
    if(confirm('Are you sure you want to delete all records?'))
        if(localStorage.records)
            localStorage.removeItem("records");
});
$(".zombieMode").on("click",function()
{
    var GS=GameSystem;if(!GS){console.log("請等待載入");return;}
    var level=Framework.Game._currentLevel;
    var mainChar=GS.protagonist;if(!mainChar){console.log("請等待主人公載入");return;}
    if(level.npcs)
        for(let npc of level.npcs)
            npc.walkTo(mainChar.position);
})
$(".debugDefine").on("click",function()
{
    var GS=GameSystem;if(!GS){console.log("請等待載入");return;}
    var Def=GS.debugDefine;if(!Def){console.log("尚未載入完成");return;}
    Def();
})
