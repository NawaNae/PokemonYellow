//立即執行函式, 並封裝所有變數避免衝突
var loadGameEnd;
Load.js.import(
[
        { src: define.jsPath + 'myMenu.js', lookFor: 'MyMenu' },
        { src: define.jsPath + 'text.js', lookFor: 'FText' },
        { src: define.jsPath + 'walkCounter.js', lookFor: 'GameSystem.Classes.OneBlockCount' },
        { src: define.jsPath + 'gameSystem.js', lookFor: 'GameSystem' },
        { src: define.jsPath + 'myGameLevelTest.js', lookFor: 'MyGameTest' },
        { src: define.jsPath+'mainGame.js' }//請最後載入mainGame
]);



    
