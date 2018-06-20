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
        import (jsConf,loadFuncName="load")
        {
            var loadScript=()=>
            {
                this[loadFuncName](jsConf[0].src);
                this.waitForScriptLoading(jsConf[0].lookFor, () => 
                {
                    jsConf.splice(0, 1);//將陣列第一個去掉
                    if (jsConf.length > 0)
                        this.import(jsConf);
                });
            }
            //console.log(jsConf[0].src);
            if(typeof jsConf[0].waitFor!=="undefined")
                this.waitForScriptLoading(jsConf[0].waitFor,loadScript);
            else 
                loadScript();
        }
        reimport (jsConf)
        {
            this.import(jsConf,"reload");
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
        waitForScriptLoading  (find, callback,firstTime=false)
        {
            var intervalFunc=() => 
            {
                if (typeof find === 'undefined')
                    find = '';
                if (find === '') {
                    clearInterval(interval);
                    callback();
                    return true;
                }
                else if(find.constructor.name==='Array')
                {
                    for(let i=0;i<find.length;i++)
                        if(eval("typeof "+ find[i] )!=='undefined')
                            find.splice(i,1);
                    if(find.length===0)
                    {
                        clearInterval(interval);
                        callback();
                        return true;
                    }    
                }
                else if (eval("typeof " + find) !== 'undefined') 
                {
                    clearInterval(interval);
                    callback();
                    return true;
                }
                return false;
            };
            let result;
            if(firstTime)
            {
                result= intervalFunc();//成功返回True
            }
            if(!result)//未設定 或 失敗 則檢查
                var interval = setInterval(intervalFunc, 50);
        }
    })();
    Load.js.import(
    [
       { src: 'start/js/define.js', lookFor: 'define' },
       { src: 'start/js/load.js'.replace(/.js$/,'2.js')}
    ]);//先載入定義檔 取得其他路徑
