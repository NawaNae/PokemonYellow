function speak(s,lang="zh-tw") {
    var protocol=location.protocol;
    s=((protocol==="http:"?"http:":protocol==="https:"||protocol==="file:"?"https:":protocol)+"//translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=32&client=tw-ob&q="+encodeURI(s)+"&tl="+lang);
    var a=new Audio(s);
    a.autoplay=true;
    return a;
}