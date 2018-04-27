//立即執行函式, 並封裝所有變數避免衝突
var loadGameEnd;
Load.css(define.cssPath + "HTMLObjectsContainer.css");
Load.js.import(
[
        { src: define.jsPath + 'displayInformation.js', lookFor: 'DisplayInformation' },
        { src: define.jsPath + 'gameSystem.js', lookFor: 'GameSystem' },
        { src: define.jsPath + 'animationItem.js', lookFor: 'GameSystem.Classes.AnimationItem' },
        { src: define.jsPath + 'animationList.js', lookFor: 'GameSystem.Classes.AnimationList' },
        { src: define.jsPath + 'image.js', lookFor: 'GameSystem.Classes.Image' },
        { src: define.jsPath + 'dialog.js', lookFor: 'GameSystem.Classes.Dialog' },
        { src: define.jsPath + 'options.js', lookFor: 'GameSystem.Classes.Options' },
        { src: define.jsPath + 'option.js', lookFor: 'GameSystem.Classes.Option' },
        { src: define.jsPath + 'yesNoDialog.js', lookFor: 'GameSystem.Classes.YesNoDialog' },
        { src: define.jsPath + 'HTMLObjectContainer.js', lookFor: 'GameSystem.Classes.HTMLObjectContainer' },
        { src: define.jsPath + 'hpBarContainer.js', lookFor: 'GameSystem.Classes.HPBarContainer' },
        { src: define.jsPath + 'pokemonListPad.js', lookFor: 'GameSystem.Classes.PokemonListPad' },
        { src: define.jsPath + 'pokemonInfoPad.js', lookFor: 'GameSystem.Classes.PokemonInfoPad' },
        { src: define.jsPath + 'battlePad.js', lookFor: 'GameSystem.Classes.BattlePad' },
        { src: define.jsPath + 'level.js', lookFor: 'GameSystem.Classes.Level' },
        { src: define.jsPath + 'mapWalker.js', lookFor: 'GameSystem.Classes.MapWalker' },
        { src: define.jsPath + 'character.js', lookFor: 'GameSystem.Classes.Character' },
        { src: define.jsPath + 'paragraph.js', lookFor: 'GameSystem.Classes.Paragraph' },
        { src: define.jsPath + 'plot.js', lookFor: 'GameSystem.Classes.Plot' },
        { src: define.jsPath + 'npc.js', lookFor: 'GameSystem.Classes.NPC' },

        { src: define.jsPath + 'standardStat.js', lookFor: 'GameSystem.Classes.StandardStat' },
        { src: define.jsPath + 'pokemonType.js', lookFor: 'GameSystem.Classes.PokemonType' },
        { src: define.jsPath + 'effortValue.js', lookFor: 'GameSystem.Classes.EffortValue' },
        { src: define.jsPath + 'individualValue.js', lookFor: 'GameSystem.Classes.IndividualValue' },
        { src: define.jsPath + 'move.js', lookFor: 'GameSystem.Classes.Move' },
        { src: define.jsPath + 'pokemon.js', lookFor: 'GameSystem.Classes.Pokemon' },

        { src: define.jsPath + 'protagonist.js', lookFor: 'GameSystem.Classes.Protagonist' },
        { src: define.jsPath + 'text.js', lookFor: 'GameSystem.Classes.Text' },
        { src: define.jsPath + 'mapPosition.js', lookFor: 'GameSystem.Classes.MapPosition' },
        { src: define.jsPath + 'connection.js', lookFor: 'GameSystem.Classes.Connection' },

        /** 測試用，若有問題可以暫時註解 */
        { src: define.jsPath + 'battleAnimation.js', lookFor: 'GameSystem.Classes.BattleAnimation' },

        { src: define.jsPath + 'gameSystemLoaded.js', lookFor: 'gameSystemLoaded' },
        { src: define.jsPath + 'myMenu.js', lookFor: 'MyMenu' },
        { src: define.jsPath + 'levelPalletTown.js', lookFor: 'PalletTown' },
        { src: define.jsPath + 'levelRoute01.js', lookFor: 'Route01' },
        { src: define.jsPath + 'battleLevel.js', lookFor: 'BattleLevel' },
        { src: define.jsPath+'mainGame.js' } //請最後載入mainGame
]);



    
