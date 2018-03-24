//立即執行函式, 並封裝所有變數避免衝突
var loadGameEnd;
Load.css(define.cssPath + "HTMLObjectsContainer.css");
Load.js.import(
[
        { src: define.jsPath + 'displayInformation.js', lookFor: 'DisplayInformation' },
        { src: define.jsPath + 'gameSystem.js', lookFor: 'GameSystem' },
        { src: define.jsPath + 'Dialog.js', lookFor: 'GameSystem.Classes.Dialog' },
        { src: define.jsPath + 'HTMLObjectContainer.js', lookFor: 'GameSystem.Classes.HTMLObjectContainer' },
        { src: define.jsPath + 'level.js', lookFor: 'GameSystem.Classes.Level' },
        { src: define.jsPath + 'mapWalker.js', lookFor: 'GameSystem.Classes.MapWalker' },
        { src: define.jsPath + 'character.js', lookFor: 'GameSystem.Classes.Character' },
        { src: define.jsPath + 'protagonist.js', lookFor: 'GameSystem.Classes.Protagonist' },
        { src: define.jsPath + 'text.js', lookFor: 'GameSystem.Classes.Text' },
        { src: define.jsPath + 'mapPosition.js', lookFor: 'GameSystem.Classes.MapPosition' },
        { src: define.jsPath + 'connection.js', lookFor: 'GameSystem.Classes.Connection' },

        { src: define.jsPath + 'gameSystemLoaded.js', lookFor: 'gameSystemLoaded' },
        { src: define.jsPath + 'myMenu.js', lookFor: 'MyMenu' },
        { src: define.jsPath + 'levelPalletTown.js', lookFor: 'PalletTown' },
        { src: define.jsPath + 'levelRoute01.js', lookFor: 'Route01' },
        { src: define.jsPath+'mainGame.js' }//請最後載入mainGame
]);



    
