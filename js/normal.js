document.querySelector(".visibleBtn").addEventListener("click",function(){
    let linkIcon=document.querySelector(".webLink");
    let visible=this.dataset.visible=="true";
    let contents=['>','<'];
    visible=!visible;
    linkIcon.hidden=!visible;
    this.innerText=contents[visible|0];
    this.dataset.visible=visible.toString();
})