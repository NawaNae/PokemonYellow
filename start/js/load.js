//ref: http://blog.darkthread.net/blogs/darkthreadtw/archive/2009/01/15/4061.aspx
var _isTestMode = false;
var _isRecordMode = false;
var Load = Load || {};
Load.definePath = 'start/js/define.js';
Load.defineLookFor = 'define';
Load.loadPath = 'start/js/load.js';
Load.audio = function(src,callback)
{
    var audio=new Audio(src);
    //return image;
    if(callback)
        audio.onload=()=>
        {
            callback(audio);
        }
    return audio;
}
Load.image = function(src,callback)
{
    var image=new Image();
    image.src=src;
    //return image;
    if(callback)
        image.onload=()=>
        {
            callback(image);
        }
    return image;
}
Load.css = function (src)
{
    if (!document.querySelector('link[href*="' + src + '"]'))
        document.head.innerHTML += "<link rel='stylesheet' href='" + src + "' type='text/css' >";
}
Load.js = Load.js || {};
Load.js.import = (jsConf, callback, lookFor) => {
    Load.js.load(jsConf[0].src);
    Load.js.waitForScriptLoading(jsConf, () => {
        jsConf.splice(0, 1);//將陣列第一個去掉
        if (jsConf.length > 0)
            Load.js.import(jsConf, lookFor);
    });
}
Load.js.reimport = (jsConf, callback, lookFor) => {
    Load.js.reload(jsConf[0].src);
    Load.js.waitForScriptLoading(jsConf, () => {
        jsConf.splice(0, 1);//將陣列第一個去掉
        if (jsConf.length > 0)
            Load.js.import(jsConf, lookFor);
    });
}
Load.js.waitForScriptLoading = (jsConf, callback) => {
    var interval = setInterval(() => {
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
Load.js.load = function (url, location) {
    location = location || document.head;
    var scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.src = url;
    location.appendChild(scriptTag);
};
Load.js.reload = function reloadJS(url) {
    var oldJS = document.querySelector("script[src='" + url + "']");
    if (oldJS != null)
        oldJS.remove();
    Load.js.load(url);
}

Load.js.import(
    [
       { src: Load.definePath, lookFor: Load.js.defineLookFor },
       { src: Load.loadPath.replace(/.js$/,'2.js'), lookFor: '' }
    ]);//先載入定義檔 取得其他路徑






    
