//立即執行函式, 並封裝所有變數避免衝突
var loadGameEnd;
Load.css(define.cssPath + "HTMLObjectsContainer.css");

Load.js.import(
[
        { src: define.jsPath + 'speak.js'},
        { src: define.jsPath + 'displayInformation.js'},
        { src: define.jsPath + 'gameSystem.js'}, 
        { src: define.jsPath + 'mapPosition.js' },
        { src: define.jsPath + 'connection.js'},
        { src: define.jsPath + 'gameObject.js', lookFor: 'GameSystem.Classes.GameObject' },
        { src: define.jsPath + 'image.js', lookFor: 'GameSystem.Classes.Image' },
        { src: define.jsPath + 'level.js'  },
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
        { src: define.jsPath + 'dialog.js', waitFor: 'DisplayInformation'   },
        { src: define.jsPath + 'options.js'  },
        { src: define.jsPath + 'option.js' },
        { src: define.jsPath + 'itemNumberDialog.js' },
        { src: define.jsPath + 'moneyDialog.js' },
        { src: define.jsPath + 'buySellDialog.js' },
        { src: define.jsPath + 'yesNoDialog.js'},
        { src: define.jsPath + 'illustration.js'},
        { src: define.jsPath + 'illustrationList.js'},
        { src: define.jsPath + 'HTMLObjectContainer.js', waitFor:
        [
                'GameSystem.Classes.Dialog',
                'GameSystem.Classes.Options',
                'GameSystem.Classes.Option',
                'GameSystem.Classes.ItemNumberDialog',
                'GameSystem.Classes.MoneyDialog' ,
                'GameSystem.Classes.BuySellDialog',
                'GameSystem.Classes.YesNoDialog',
                'GameSystem.Classes.Illustration',
                'GameSystem.Classes.IllustrationList'
        ],lookFor:'GameSystem.HTMLObjectContainer'  },
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
        { src: define.jsPath + 'plotContents.cureAll.js', waitFor: 'GameSystem.Classes.PlotContent' },
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

        { src: define.jsPath + 'myMenu.js' },
        { src: define.jsPath + 'levelPalletTown.js', waitFor:'GameSystem.Classes.Level'},
        { src: define.jsPath + 'levels.loadRecord.js', },
        { src: define.jsPath + 'levelRoute01.js'  },
        { src: define.jsPath + 'battleLevel.js'},
        { src: define.jsPath + 'gameSystemLoaded.js', waitFor:
        [
                'GameSystem.Classes.MapPosition',
                'GameSystem.Classes.Connection',
        ] },
        { src: define.jsPath + 'mainGame.js' ,waitFor:
        [     
                'MyMenu',
                'PalletTown' ,
                'Route01',
                'BattleLevel' ,
                'GameSystem.Classes.Levels.LoadRecord'
        ]}                                  //請最後載入mainGame
]);





    
