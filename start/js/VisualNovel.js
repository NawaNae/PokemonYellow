/*
if (typeof novelList == "undefined")//新增小說列表
    var novelList = new Array();

$(document).ready(function () {
    VisualNovel.initialize();
});//html完全載入
*/

Load.css(define.cssPath + 'VisualNovel.css');
class VisualNovel {
    constructor(father, contentObject = { src: undefined, content: undefined }) {
        this.gameLevel;
        this._content = new Object();//JSON故事內容
        this._background = document.createElement("div");//背景
        this._background.classList.add("background");
        this._chap = 0;//章節計數
        this._cmd = 0;//指令計數
        this._screenCover = document.createElement("div");//螢幕覆蓋
        this._screenCover.classList.add("screenCover");
        this._screenChapter = document.createElement("div");//章節覆蓋
        this._screenChapter.classList.add("screenChapter");
        this._screenChapter.onclick = () => { this.hideScreenChapter() };//點一次就隱藏
        this.character = new VisualNovel.Character ();//角色物件
        this.dialog = document.createElement("div");
        this.dialog.classList.add("dialog")//對話框
        this.spinner = document.createElement("div");//點擊提示
        this.spinner.classList.add("visualNovelSpinner");
        this.voiceOver = document.createElement("div");
        this.voiceOver.classList.add("voiceOver");//旁白
        this.options=document.createElement("div")//選項
        this.options.classList.add("options");
        this.father = father;
        if (contentObject.src)
            this.contentSrc = contentObject.src;
        if (contentObject.content)
            this.content = contentObject.content;
        this.htmlObjectList = [
            this._background,
            this._screenCover,
            this._screenChapter,
            this.dialog,
            this.spinner,
            this.voiceOver
        ];
        this.htmlObjectList=this.htmlObjectList.concat(this.character.htmlObjectList);
    }
    isWaitingCmd(cmd) {
        return cmd.type == "text" || cmd.type == "talk"  || cmd.type == "select";
    }
    next() {
        var end = false;
        do {
            if (this._cmd >= this._content[this._chap].length)//章節結束 
            {
                this._cmd = 0, this._chap++;
                this.showScreenChapter("第" + (this._chap) + "章");
                if (this._chap >= this._content.length)//故事結束
                {
                    end = true;
                    this.hideScreenChapter();
                }
                break;
            }
            var cmd = this._content[this._chap][this._cmd];

            this.parseCmd(cmd);//執行當前指令

            this._cmd++;//下一步驟
            
        } while (!this.isWaitingCmd(cmd))//如果該步驟不需要等待使用者觀看 則繼續
        if (end)//若故事結束呼叫end()
            this.end();
        else//非結束時結尾
            this.showSpinner();//顯示點擊提示
    }   
    end() {
        this.fatherClickOff();//關閉有效範圍的點擊事件
        this.screenCoverText = "End";
        this.showScreenCover();
    }
    start() {
        this.reset();
    }
    reset()
    {
        this._chap = 0;
        this._cmd = 0;
        this.character.reset();
        this.hideOptions();//隱藏選項
        this.voiceOverText = "";//清空旁白
        this.hideVoiceOver();//隱藏旁白
        this.showCharacter();//顯示角色
        this.showDialog("");//清空並顯示對話框
        this.hideScreenChapter();//隱藏章節
        this.backgroundImage = "";
        this.hideScreenCover();//開始時隱藏遮蔽
        this.fatherClickOn();//開啟有效範圍的點擊事件

    }
    jump(tag)
    {
        if(tag!="NEXT_STEP")//下一步保留字
            for (var ch = 0, cmd = 0; ch < this._content.length; ch++)
                for (cmd = 0; cmd < this._content[ch].length; cmd++)
                    if (this._content[ch][cmd].type == "tag")
                        if (this._content[ch][cmd].tag == tag)
                        {
                            this._chap = ch, this._cmd = cmd;//將搜尋到的章節與指令設置為當前指令
                            ch = this._content.length;//外迴圈跳脫
                            break;
                        }
        //找不到不變更
    }
    select(cmd)
    {
        this.fatherClickOff();
        this.showOptions("");//顯示並清空選項框
        if (typeof cmd.text != "undefined")
            this.optionsText = cmd.text;
        var that = this;
        var list = document.createElement("ul");
        this.options.appendChild(list);//插入選項列表外層
        cmd.option.forEach((ele, index) =>
        {
            var item = document.createElement("li");
            item.classList.add("option");
            item.innerText = ele.text;
            //選項點擊事件
            item.onclick = () =>
            {
                
                that.jump(ele.tag);//跳躍至選項tag
                list.remove();//list移除
                that.fatherClickOn();//感應再開
                that.hideOptions();//隱藏選項
                
            }
            list.appendChild(item);//插入外層
        });
    }
    parseCmd(cmd) {
        switch (cmd.type) {
            case "background":
                this.backgroundImage = cmd.url;
                break;
            case "character":
                this.character.imageUrl = cmd.url;
                this.character.name = cmd.name;
                break;
            case "talk":
                this.dialogText = cmd.text;
                break;
            case "text":
                this.voiceOverText = cmd.text;
                break;
            case "jump":
                this.jump(cmd.tag);
                break;
            case "select":
                this.select(cmd);
                break;
            case "evalAndRemove":
                eval(cmd.text);
            case "remove":
                this.remove();
                break;
            case "show":
                switch (cmd.object) {
                    case "character":
                        this.showCharacter();
                        break;
                    case "background":
                        this.showBackground();
                        break;
                    case "talk":
                        this.showDialog();
                        break;
                    case "text":
                        this.showVoiceOver();
                        break;
                }
                break;
            case "eval":
                eval(cmd.text);
                break;
            case "hide":
                switch (cmd.object) {
                    case "character":
                        this.hideCharacter();
                        break;
                    case "talk":
                        this.hideDialog();
                        break;
                    case "text":
                        this.hideVoiceOver();
                        break;
                    case "background":
                        this.hideBackground();
                        break;
                }
        }
    }
    set contentSrc(url) {
        var that = this;
        $.getJSON(url, data => {
            that._content = data;
        });
    }
    set content(JSONstr) {
        this._content = JSON.parse(JSONstr);
    }
    get content()
    {
        return this._content;
    }
    set backgroundImage(url) {
        var str = "url('" + url + "')";
        this._background.style.backgroundImage = str ;
    }
    set screenCoverText(text)
    {
        this._screenCover.innerText = text;
    }
    get screenCoverText()
    {
        return this._screenCover.innerText;
    }
    get backgroundImage() {
        return window.getComputeStyle(this._background).getPropertyValue("background-image");
    }
    set dialogText(text) {
        this.dialog.innerText = text;
    }
    get dialogText() {
        return this.dialog.innerText;
    }
    set voiceOverText(text) {
        this.voiceOver.innerText = text;
    }
    get voiceOverText() {
        return this.voiceOver.innerText;
    }
    set screenChapterText(text) {
        this._screenChapter.innerText = text;
    }
    get screenChapterText() {
        return this._screenChapter.innerText;
    }
    set optionsText(text) {
        this.options.innerText = text;
    }
    get screenChapterText() {
        return this.options.innerText;
    }
    fatherClickOn()
    {
        var that = this;
        this.father.onclick = () => { that.hideSpinner(); that.next(); };//增加點擊事件
    }
    fatherClickOff()
    {
        this.father.onclick = null;//清除事件
    }
    showBackground()
    {
        this.show(this._background);
    }
    hideBackground() {
        this.hide(this._background);
    }
    showScreenCover(text)
    {
        if (typeof text != "undefined")
            this.screenCoverText = text;
        this.show(this._screenCover);
    }
    hideScreenCover()
    {
        this.hide(this._screenCover);
    }
    showScreenChapter(text) {
        if (typeof text != "undefined")//讓text成為可選
            this.screenChapterText = text;
        this.show(this._screenChapter);
    }
    hideScreenChapter() {
        this.hide(this._screenChapter);
    }
    showVoiceOver(text) {
        if (typeof text != "undefined")
            this.voiceOverText = text;
        this.show(this.voiceOver);
    }
    hideVoiceOver() {
        this.hide(this.voiceOver);
    }
    showDialog(text) {
        if (typeof text != "undefined")
            this.dialogText = text;
        this.show(this.dialog);
    }
    hideDialog() {
        this.hide(this.dialog);
    }
    showCharacter() {
        this.character.show();
    }
    hideCharacter() {
        this.character.hide();
    }
    showSpinner() {
        this.show(this.spinner);
    }
    hideSpinner() {
        this.hide(this.spinner);
    }
    showOptions(text)
    {
        if (typeof text != "undefined")
            this.optionsText = text;
        this.show(this.options);
    }
    hideOptions()
    {
        this.hide(this.options);
    }
    show(htmElement)
    {
        htmElement.style.display = "block";
    }
    hide(htmElement) {
        htmElement.style.display = "none";
    }
    appendTo(father)
    {
        this.father = father || this.father;
        console.log(this.father);
        this.character.appendTo(this.father);
        this.father.appendChild(this._background);
        this.father.appendChild(this.dialog);
        this.father.appendChild(this.voiceOver);
        this.father.appendChild(this.spinner);
        this.father.appendChild(this._screenChapter);
        this.father.appendChild(this.options);
        this.father.appendChild(this._screenCover);
    }
    remove()
    {
        Array.from(this.htmlObjectList).forEach((iter) =>
        {
            iter.remove();
        });
        this.fatherClickOff();
    }
}

VisualNovel.Character = class Character
{
    constructor()
    {
        this._image = document.createElement("img");
        this._image.classList.add("characterImage");
        this._name = "";
        this._nameBox = document.createElement("div");
        this._nameBox.classList.add("nameBox");
        this.htmlObjectList = [
            this._image,
            this._nameBox
        ];
    }
    appendTo(father) {
        father.append(this._image);
        father.append(this._nameBox);
    }
    reset()
    {
        this.imageUrl = null;
        this.name = "";
    }
    set imageUrl(src)
    {
        this._image.src=src;
    }
    get imageUrl()
    {
        return this._image.src;
    }
    set nameBox(name)
    {
        this._nameBox.innerText=name;
    }
    get nameBox()
    {
        return this._nameBox;    
    }
    set name(name)
    {
        this._name = name;
        this._nameBox.innerText = name;
    }
    get name()
    {
        return this._name;
    }
    show()
    {
        this._image.style.display="block";
        this._nameBox.style.display="block";
    }
    hide()
    {
        this._image.style.display="none";
        this._nameBox.style.display="none";
    }
}
VisualNovel.initialize = function initialVisualNovel() {
    novelList.forEach(ele => { if (typeof ele.father != "undefined") ele.father.innerHTML = ""; });
    novelList = [];//清空
    Array.from(document.querySelectorAll(".visualNovel")).forEach
        (ele => {
            Novel = new VisualNovel();
            var startBtn = document.createElement("button");
            startBtn.innerText = "START";

            startBtn.dataset.index = novelList.length;
            startBtn.onclick = () => { novelList[parseInt(startBtn.dataset.index)].start(); }
            ele.appendChild(startBtn);
            novelList.push(Novel);
            if (typeof ele.dataset.src != "undefined")
                Novel.contentSrc = ele.dataset.src;
            if (typeof ele.dataset.content != "undefined")
                Novel.content = ele.dataset.content;
            Novel.appendTo(ele);
        });

} //替換標籤函數