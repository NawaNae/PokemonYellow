//立即執行函式, 並封裝所有變數避免衝突
var loadGameEnd;
Load.css(define.cssPath + "HTMLObjectsContainer.css");

Load.js.import(
[
        { src: define.jsPath + 'speak.js', lookFor: 'speak' },
       { src: define.jsPath + 'displayInformation.js', lookFor: 'DisplayInformation' },
        { src: define.jsPath + 'gameSystem.js', lookFor: 'GameSystem' }, 
        { src: define.jsPath + 'mapPosition.js', lookFor: 'GameSystem.Classes.MapPosition' },
        { src: define.jsPath + 'connection.js', lookFor: 'GameSystem.Classes.Connection' },
        { src: define.jsPath + 'gameObject.js', lookFor: 'GameSystem.Classes.GameObject' },
        { src: define.jsPath + 'image.js', lookFor: 'GameSystem.Classes.Image' },
        { src: define.jsPath + 'level.js', lookFor: 'GameSystem.Classes.Level' },
        
        { src: define.jsPath + 'standardStat.js', lookFor: 'GameSystem.Classes.StandardStat'},
        { src: define.jsPath + 'effortValue.js', lookFor: 'GameSystem.Classes.EffortValue' },
        { src: define.jsPath + 'individualValue.js', lookFor: 'GameSystem.Classes.IndividualValue' },
        { src: define.jsPath + 'move.js', lookFor: 'GameSystem.Classes.Move'},
        { src: define.jsPath + 'gradingMove.js', lookFor:'GameSystem.Classes.GradingMove'},
        { src: define.jsPath + 'occurrence.js', lookFor: 'GameSystem.Classes.Occurrence'},
        { src: define.jsPath + 'battleField.js', lookFor: 'GameSystem.Classes.BattleField'},
        { src: define.jsPath + 'pokemonType.js', lookFor: 'GameSystem.Classes.PokemonType' },
        { src: define.jsPath + 'pokemon.js', lookFor:'GameSystem.Classes.Pokemon'},
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
        { src: define.jsPath + 'hpBarContainer.js', lookFor: 'GameSystem.Classes.HPBarContainer' },
        { src: define.jsPath + 'pokemonListPad.js', lookFor: 'GameSystem.Classes.PokemonListPad' },
        { src: define.jsPath + 'pokemonInfoPad.js', lookFor: 'GameSystem.Classes.PokemonInfoPad' },
        { src: define.jsPath + 'battlePad.js', lookFor: 'GameSystem.Classes.BattlePad' },
        { src: define.jsPath + 'mapWalker.js', lookFor: 'GameSystem.Classes.MapWalker' },
        { src: define.jsPath + 'propItem.js', lookFor: 'GameSystem.Classes.PropItem' },
        { src: define.jsPath + 'character.js', lookFor: 'GameSystem.Classes.Character' },
        { src: define.jsPath + 'plotContent.js', lookFor: 'GameSystem.Classes.PlotContent' },
        { src: define.jsPath + 'paragraph.js', lookFor: 'GameSystem.Classes.Paragraph' },
        { src: define.jsPath + 'plotContents.cureAll.js', lookFor: 'GameSystem.Classes.PlotContents.CureAll' },
        { src: define.jsPath + 'plotContents.script.js', lookFor: 'GameSystem.Classes.PlotContents.Script' },
        { src: define.jsPath + 'plotContents.giveProp.js', lookFor: 'GameSystem.Classes.PlotContents.GiveProp' },
        { src: define.jsPath + 'plotContents.addNpc.js', lookFor: 'GameSystem.Classes.PlotContents.AddNpc' },
        { src: define.jsPath + 'plotContents.removeNpc.js', lookFor: 'GameSystem.Classes.PlotContents.RemoveNpc' },
        { src: define.jsPath + 'plotContents.moveCharacter.js', lookFor: 'GameSystem.Classes.PlotContents.MoveCharacter' },
        { src: define.jsPath + 'npc.js', lookFor: 'GameSystem.Classes.NPC' },
        { src: define.jsPath + 'plot.js', lookFor: 'GameSystem.Classes.Plot' },
        { src: define.jsPath + 'plotsController.js', lookFor: 'GameSystem.Classes.PlotsController' },
        { src: define.jsPath + 'event.js', lookFor: 'GameSystem.Classes.Event' },

        { src: define.jsPath + 'protagonist.js', lookFor: 'GameSystem.Classes.Protagonist' },
        /*  { src: define.jsPath + 'text.js', lookFor: 'GameSystem.Classes.Text' },*/
        { src: define.jsPath + 'record.js', lookFor: 'GameSystem.Classes.Record' },
        { src: define.jsPath + 'manager.save.js', lookFor: 'GameSystem.Classes.Records' },  
        { src: define.jsPath + 'debug.js'},

        { src: define.jsPath + 'battleInfo.js', lookFor: 'GameSystem.Classes.BattleInfo' },
        { src: define.jsPath + 'battleStage.js', lookFor: 'GameSystem.Classes.BattleStage' },
        { src: define.jsPath + 'battleResult.js', lookFor: 'GameSystem.Classes.BattleResult' },
        { src: define.jsPath + 'battleAnimation.js', lookFor: 'GameSystem.Classes.BattleAnimation' },

        { src: define.jsPath + 'myMenu.js', lookFor: 'MyMenu' },
        { src: define.jsPath + 'levelPalletTown.js', lookFor: 'PalletTown' },
        { src: define.jsPath + 'levels.loadRecord.js', lookFor: 'GameSystem.Classes.Levels.LoadRecord' },
        { src: define.jsPath + 'levelRoute01.js', lookFor: 'Route01' },
        { src: define.jsPath + 'battleLevel.js', lookFor: 'BattleLevel' },
        { src: define.jsPath + 'gameSystemLoaded.js', lookFor: '' },
        { src: define.jsPath + 'mainGame.js' }                                  //請最後載入mainGame
]);



    
