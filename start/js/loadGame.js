//立即執行函式, 並封裝所有變數避免衝突
var loadGameEnd;
Load.css(define.cssPath + "HTMLObjectsContainer.css");
Load.js.import(
[
       { src: define.jsPath + 'displayInformation.js', lookFor: 'DisplayInformation' },
        { src: define.jsPath + 'gameSystem.js', lookFor: 'GameSystem' }, 
        { src: define.jsPath + 'mapPosition.js', lookFor: 'GameSystem.Classes.MapPosition' },
        { src: define.jsPath + 'connection.js', lookFor: 'GameSystem.Classes.Connection' },
        { src: define.jsPath + 'image.js', lookFor: 'GameSystem.Classes.Image' },
        { src: define.jsPath + 'level.js', lookFor: 'GameSystem.Classes.Level' },
        
        { src: define.jsPath + 'standardStat.js', lookFor: 'GameSystem.Classes.StandardStat'},
        { src: define.jsPath + 'move.js', lookFor: 'GameSystem.Classes.Move'},
        { src: define.jsPath + 'gradingMove.js', lookFor:'GameSystem.Classes.GradingMove'},
        { src: define.jsPath + 'occurrence.js', lookFor: 'GameSystem.Classes.Occurrence'},
        { src: define.jsPath + 'pokemonType.js', lookFor: 'GameSystem.Classes.PokemonType' },
        { src: define.jsPath + 'animationItem.js', lookFor: 'GameSystem.Classes.AnimationItem' },
        { src: define.jsPath + 'animationList.js', lookFor: 'GameSystem.Classes.AnimationList' },
        { src: define.jsPath + 'illustration.js',lookFor:'GameSystem.Classes.Illustration'},
        { src: define.jsPath + 'illustrationList.js',lookFor:'GameSystem.Classes.IllustrationList'},
        { src: define.jsPath + 'dialog.js', lookFor: 'GameSystem.Classes.Dialog' },
        { src: define.jsPath + 'options.js', lookFor: 'GameSystem.Classes.Options' },
        { src: define.jsPath + 'option.js', lookFor: 'GameSystem.Classes.Option' },
        { src: define.jsPath + 'itemNumberDialog.js', lookFor: 'GameSystem.Classes.ItemNumberDialog' },
        { src: define.jsPath + 'moneyDialog.js', lookFor: 'GameSystem.Classes.MoneyDialog' },
        { src: define.jsPath + 'buySellDialog.js', lookFor: 'GameSystem.Classes.BuySellDialog' },
        { src: define.jsPath + 'yesNoDialog.js', lookFor: 'GameSystem.Classes.YesNoDialog' },
        { src: define.jsPath + 'HTMLObjectContainer.js', lookFor: 'GameSystem.Classes.HTMLObjectContainer' },
        { src: define.jsPath + 'signBoard.js', lookFor: 'GameSystem.Classes.SignBoard' },
        { src: define.jsPath + 'mapWalker.js', lookFor: 'GameSystem.Classes.MapWalker' },
        { src: define.jsPath + 'character.js', lookFor: 'GameSystem.Classes.Character' },
        { src: define.jsPath + 'plotContent.js', lookFor: 'GameSystem.Classes.PlotContent' },
        { src: define.jsPath + 'plotContents.cureAll.js', lookFor: 'GameSystem.Classes.PlotContents.CureAll' },
        { src: define.jsPath + 'plotContents.script.js', lookFor: 'GameSystem.Classes.PlotContents.Script' },
        { src: define.jsPath + 'plotContents.moveCharacter.js', lookFor: 'GameSystem.Classes.PlotContents.MoveCharacter' },
        { src: define.jsPath + 'paragraph.js', lookFor: 'GameSystem.Classes.Paragraph' },
        { src: define.jsPath + 'plot.js', lookFor: 'GameSystem.Classes.Plot' },
        { src: define.jsPath + 'plotsController.js', lookFor: 'GameSystem.Classes.PlotsController' },
        { src: define.jsPath + 'npc.js', lookFor: 'GameSystem.Classes.NPC' },

        { src: define.jsPath + 'protagonist.js', lookFor: 'GameSystem.Classes.Protagonist' },
      /*  { src: define.jsPath + 'text.js', lookFor: 'GameSystem.Classes.Text' },*/


        { src: define.jsPath + 'gameSystemLoaded.js', lookFor: '' },
        { src: define.jsPath + 'myMenu.js', lookFor: 'MyMenu' },
        { src: define.jsPath + 'levelPalletTown.js', lookFor: 'PalletTown' },
        { src: define.jsPath + 'levelRoute01.js', lookFor: 'Route01' },
        { src: define.jsPath+'mainGame.js' }//請最後載入mainGame
]);



    
