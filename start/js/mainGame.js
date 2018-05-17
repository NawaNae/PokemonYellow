//當有要加關卡時, 可以使用addNewLevel
//第一個被加進來的Level就是啟動點, 所以一開始遊戲就進入MyMenu
var list = {};
list['menu'] = new MyMenu();

// // !DEBUG!
// GameSystem.protagonist.atMap = "palletTown";
// GameSystem.protagonist.addPokemon(GameSystem.Resource.Debug.pikachu);
// GameSystem.Bridges.BattleData.opponent = GameSystem.Resource.Debug.rattata;
// GameSystem.Bridges.BattleData.selectPokemon = GameSystem.Resource.Debug.pikachu;
// GameSystem.protagonist.addPropItem(new GameSystem.Classes.PropItem("藥水", 2));
// GameSystem.protagonist.addPropItem(new GameSystem.Classes.PropItem("寶可夢球", 1));
// Framework.Game.addNewLevel({'battleLevel': new BattleLevel()});
// // !DEBUG!

Framework.Game.addNewLevel({ menu: list['menu'] });
Framework.Game.addNewLevel({loadRecord: new GameSystem.Classes.Levels.LoadRecord()});
Framework.Game.addNewLevel({palletTown: new PalletTown({x:26,y:23})});
Framework.Game.addNewLevel({route01: new Route01()});
Framework.Game.addNewLevel({'battleLevel': new BattleLevel()});

//Framework.Game.addNewLevel({level1: new MyGame()});

//讓Game開始運行
Framework.Game.start();