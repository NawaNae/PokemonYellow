//ref: http://blog.darkthread.net/blogs/darkthreadtw/archive/2009/01/15/4061.aspx
var _isTestMode = false;
var _isRecordMode = false;

var Load=new (
class Loader
{
    audio(src,callback)
    {
        var audio=new Audio(src);
        if(callback&&callback.constructor.name==="Function")
            audio.onload=()=>callback(audio);
        if(callback&&callback.constructor.name==="String")
            audio.onload=()=>eval(callback);
        return audio;
    }
    image(src,callback)
    {
        var image=new Image();
        image.src=src;
        if(callback&&callback.constructor.name==="Function")
            image.onload=()=> callback(image);
        if(callback&&callback.constructor.name==="String")
            image.onload=()=> eval(callback);
        return image;
    }
    css(src)
    {
        if (!document.querySelector('link[href*="' + src + '"]'))
            document.head.innerHTML += "<link rel='stylesheet' href='" + src + "' type='text/css' >";
    }
})();
Load.js=new (
class JsLoader
{
    import (jsConf)
    {
        this.load(jsConf[0].src);
        this.waitForScriptLoading(jsConf, () => 
        {
            jsConf.splice(0, 1);//將陣列第一個去掉
            if (jsConf.length > 0)
                this.import(jsConf);
        });
    }
    reimport (jsConf)
    {
        Load.js.reload(jsConf[0].src);
        Load.js.waitForScriptLoading(jsConf, () => {
            jsConf.splice(0, 1);//將陣列第一個去掉
            if (jsConf.length > 0)
                Load.js.import(jsConf);
        });
    }
    load (url, location) 
    {
        location = location || document.head;
        var scriptTag = document.createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.src = url;
        location.appendChild(scriptTag);
    };
    reload(url) 
    {
        var oldJS = document.querySelector("script[src='" + url + "']");
        if (oldJS != null)
            oldJS.remove();
        this.load(url);
    }
    waitForScriptLoading  (jsConf, callback)
    {
        var interval = setInterval(() => 
        {
            if (typeof jsConf[0].lookFor === 'undefined')
                jsConf[0].lookFor = '';
            if (jsConf[0].lookFor === '') {
                clearInterval(interval);
                callback();
            }
            else if (eval("typeof " + jsConf[0].lookFor) !== 'undefined') {
                clearInterval(interval);
                callback();
            }
        }, 50);
    }
})();
Load.js.import(
    [
       { src: 'start/js/define.js', lookFor: 'define' },
       { src: 'start/js/load.js'.replace(/.js$/,'2.js'), lookFor: '' }
    ]);//先載入定義檔 取得其他路徑






    
