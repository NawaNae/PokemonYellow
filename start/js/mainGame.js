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

// // !DEBUG!

Framework.Game.addNewLevel({ menu: list['menu'] });
Framework.Game.addNewLevel({loadRecord: new GameSystem.Classes.Levels.LoadRecord()});
Framework.Game.addNewLevel({palletTown: new GameSystem.Classes.Levels.PalletTown()});
Framework.Game.addNewLevel({route01: new GameSystem.Classes.Levels.Route01()});
Framework.Game.addNewLevel({viridianCity: new GameSystem.Classes.Levels.ViridianCity()});
Framework.Game.addNewLevel({pewterCity: new GameSystem.Classes.Levels.PewterCity()});
Framework.Game.addNewLevel({route02: new GameSystem.Classes.Levels.Route02()});
Framework.Game.addNewLevel({'battleLevel': new BattleLevel()});
//Framework.Game.addNewLevel({level1: new MyGame()});

//讓Game開始運行
Framework.Game.start();