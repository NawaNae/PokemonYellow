//立即執行函式, 並封裝所有變數避免衝突
var loadGameEnd;
Load.js.import(
    [
        { src: define.jsPath + 'VisualNovel.js', lookFor: 'VisualNovel' },
        { src: define.jsPath + 'myMenu.js', lookFor: 'MyMenu' },
        { src: define.jsPath + 'text.js', lookFor: 'FText' },
        { src: define.jsPath + 'gameSystem.js', lookFor: 'GameSystem' },
        { src: define.jsPath + 'map.js', lookFor: 'Map' },
        { src: define.jsPath + 'myGameLevelTest.js', lookFor: 'MyGameTest' },
        { src: define.jsPath + 'myGameLevel1.js', lookFor: 'MyGame' },
        { src: define.jsPath + 'displayInformation.js', lookFor: 'DisplayInformation' },
        { src: define.jsPath + 'timer.js', lookFor: 'Timer' },
        { src: define.jsPath + 'informationBar.js', lookFor: 'Information' },
        { src: define.jsPath + 'monster.js', lookFor: 'Monster' },
        { src: define.jsPath+'mainGame.js' }//請最後載入mainGame
]);



    
