//立即執行函式, 並封裝所有變數避免衝突
var loadGameEnd;
Load.js.import(
[
        { src: define.jsPath + 'gameSystem.js', lookFor: 'GameSystem' },
        { src: define.jsPath + 'level.js', lookFor: 'GameSystem.Classes.Level' },
        { src: define.jsPath + 'mapWalker.js', lookFor: 'GameSystem.Classes.MapWalker' },
        { src: define.jsPath + 'character.js', lookFor: 'GameSystem.Classes.Character' },
        { src: define.jsPath + 'protagonist.js', lookFor: 'GameSystem.Classes.Protagonist' },
        { src: define.jsPath + 'text.js', lookFor: 'GameSystem.Classes.Text' },
        { src: define.jsPath + 'connection.js', lookFor: 'GameSystem.Classes.Connection' },
        { src: define.jsPath + 'gameSystemLoaded.js', lookFor: 'gameSystemLoaded' },
        { src: define.jsPath + 'myMenu.js', lookFor: 'MyMenu' },
        { src: define.jsPath + 'myGameLevelTest.js', lookFor: 'MyGameTest' },
        { src: define.jsPath+'mainGame.js' }//請最後載入mainGame
]);



    
