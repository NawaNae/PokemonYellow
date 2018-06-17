//立即執行函式, 並封裝所有變數避免衝突
var loadGameEnd;
Load.css(define.cssPath + "HTMLObjectsContainer.css");
Load.js.import(
[
        { src: define.jsPath + 'speak.js'},
        { src: define.jsPath + 'gameSystem.js'}, 
        { src: define.jsPath + 'standardStat.js'}, //1
        { src: define.jsPath + 'gameObject.js' },//2
        { src: define.jsPath + 'displayInformation.js'},//3
        { src: define.jsPath + 'HTMLObjectContainer.js'  },
        { src: define.jsPath + 'mapPosition.js' },
        { src: define.jsPath + 'connection.js'},
        { src: define.jsPath + 'animationItem.js' },
        { src: define.jsPath + 'animationList.js' },
        { src: define.jsPath + 'effortValue.js', waitFor:'GameSystem.Classes.StandardStat'  },//1
        { src: define.jsPath + 'image.js', waitFor: 'GameSystem.Classes.GameObject' },//2
        { src: define.jsPath + 'options.js'  ,waitFor:'DisplayInformation'},//3 4
        { src: define.jsPath + 'individualValue.js' },
        { src: define.jsPath + 'move.js'},
        { src: define.jsPath + 'level.js'  },//8
        { src: define.jsPath + 'gradingMove.js'},
        { src: define.jsPath + 'occurrence.js'},
        { src: define.jsPath + 'dialog.js' },//3
        { src: define.jsPath + 'itemNumberDialog.js' },//9
        { src: define.jsPath + 'moneyDialog.js' },
        { src: define.jsPath + 'illustration.js'},
        { src: define.jsPath + 'illustrationList.js'},
        { src: define.jsPath + 'option.js' },
        { src: define.jsPath + 'battleField.js'},
        { src: define.jsPath + 'pokemonType.js', waitFor: 'GameSystem.Classes.Image'},//2
        { src: define.jsPath + 'plotContent.js' },//6
        { src: define.jsPath + 'signBoard.js'},
        { src: define.jsPath + 'pokemon.js'},
        { src: define.jsPath + 'hpBarContainer.js'  },
        { src: define.jsPath + 'pokemonListPad.js' },
        { src: define.jsPath + 'pokemonInfoPad.js' },
        { src: define.jsPath + 'mapWalker.js' },
        { src: define.jsPath + 'character.js'},//6
        { src: define.jsPath + 'buySellDialog.js' ,waitFor:'GameSystem.Classes.Options'},//4 
        { src: define.jsPath + 'yesNoDialog.js'},
        { src: define.jsPath + 'paragraph.js', waitFor: 'GameSystem.Classes.PlotContent' },//5 7
        { src: define.jsPath + 'plotContents.cureAll.js'  },
        { src: define.jsPath + 'plotContents.script.js' },
        { src: define.jsPath + 'plotContents.addNpc.js' },
        { src: define.jsPath + 'plotContents.removeNpc.js' },
        { src: define.jsPath + 'plotContents.moveCharacter.js'},
        { src: define.jsPath + 'plotContents.fight.js'},//9
        { src: define.jsPath + 'itemNumberDialogSell.js' },
        { src: define.jsPath + 'plotContents.giveProp.js',waitFor: 'GameSystem.Classes.Paragraph'},//7
        { src: define.jsPath + 'battlePad.js'  },
        { src: define.jsPath + 'propItem.js' },
        { src: define.jsPath + 'event.js' },
        { src: define.jsPath + 'npc.js' ,waitFor:"GameSystem.Classes.Character"},//6
        { src: define.jsPath + 'protagonist.js' },
        { src: define.jsPath + 'plotsController.js'},
        { src: define.jsPath + 'record.js' },
        { src: define.jsPath + 'manager.save.js'  },  
        { src: define.jsPath + 'debug.js'},
        { src: define.jsPath + 'battleInfo.js' },
        { src: define.jsPath + 'battleStage.js'  },
        { src: define.jsPath + 'battleResult.js' },
        { src: define.jsPath + 'pokemonsDialog.js' },
        { src: define.jsPath + 'battleAnimation.js' },
        { src: define.jsPath + 'myMenu.js' },
        { src: define.jsPath + 'plot.js'  },
        { src: define.jsPath + 'levels.palletTown.js', waitFor:'GameSystem.Classes.Level'},//8
        { src: define.jsPath + 'levels.hospital.js'},
        { src: define.jsPath + 'levels.mart.js'},
        { src: define.jsPath + 'levels.loadRecord.js', },
        { src: define.jsPath + 'levels.route01.js'  },
        { src: define.jsPath + 'levels.route02.js'  },
        { src: define.jsPath + 'levels.final.js'},
        { src: define.jsPath + 'battleLevel.js'},

        { src: define.jsPath + 'levels.viridianCity.js',waitFor:['GameSystem.Classes.Levels.Hospital','GameSystem.Classes.Levels.Mart']},
        { src: define.jsPath + 'levels.pewterCity.js'},
        { src: define.jsPath + 'gameSystemLoaded.js', waitFor:
        [
                'GameSystem.Classes.Dialog',
                'GameSystem.Classes.Options',
                'GameSystem.Classes.Option',
                'GameSystem.Classes.ItemNumberDialog',
                'GameSystem.Classes.MoneyDialog' ,
                'GameSystem.Classes.BuySellDialog',
                'GameSystem.Classes.YesNoDialog',
                'GameSystem.Classes.Illustration',
                'GameSystem.Classes.IllustrationList',
                'GameSystem.Classes.BattleInfo' ,
                'GameSystem.Classes.Record',
                'GameSystem.Classes.Records',
                'GameSystem.Classes.Plot',
                'GameSystem.Classes.BattleStage',
                'GameSystem.Classes.BattleResult' ,
                'GameSystem.Classes.BattleAnimation' ,
                'GameSystem.Classes.PropItem',
                'GameSystem.Classes.MapWalker',
                'GameSystem.Classes.HTMLObjectContainer',
                'GameSystem.Classes.SignBoard' ,
                'GameSystem.Classes.NPC',
                'GameSystem.Classes.Event',
                'GameSystem.Classes.PlotContents.Script' ,
                'GameSystem.Classes.PlotContents.GiveProp',
                'GameSystem.Classes.PlotContents.AddNpc' ,
                'GameSystem.Classes.PlotContents.RemoveNpc',
                'GameSystem.Classes.PlotContents.MoveCharacter',
                'GameSystem.Classes.PlotContents.Fight',
                'GameSystem.Classes.EffortValue',
                'GameSystem.Classes.IndividualValue',
                'GameSystem.Classes.Move',
                'GameSystem.Classes.GradingMove',
                'GameSystem.Classes.Occurrence',
                'GameSystem.Classes.BattleField',
                'GameSystem.Classes.PokemonType',
                'GameSystem.Classes.Pokemon',
                'GameSystem.Classes.AnimationItem',
                'GameSystem.Classes.AnimationList',
                'GameSystem.Classes.ItemNumberDialogSell',
                'GameSystem.Classes.MapPosition',
                'GameSystem.Classes.Connection',
                'GameSystem.Classes.Protagonist',
                'GameSystem.Classes.PlotsController' ,
                'GameSystem.Classes.HPBarContainer',
                'GameSystem.Classes.PokemonListPad' ,
                'GameSystem.Classes.PokemonInfoPad',
                'GameSystem.Classes.PokemonsDialog',
                'GameSystem.Classes.BattlePad',
                'GameSystem.Classes.Levels.ViridianCity',
                'GameSystem.Classes.Levels.PewterCity',
                'GameSystem.Classes.Levels.PalletTown' ,
                'GameSystem.Classes.Levels.Route01',
                'GameSystem.Classes.Levels.Route02',
                'GameSystem.Classes.Levels.Final',
                'GameSystem.Classes.Levels.LoadRecord',
                'BattleLevel' ,
                'MyMenu',
        ] },
        { src: define.jsPath + 'mainGame.js' ,waitFor:
        [     
                'GameSystem.Classes.Levels.LoadRecord'
        ]}                                  //請最後載入mainGame
]);





    
