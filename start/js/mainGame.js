//當有要加關卡時, 可以使用addNewLevel
//第一個被加進來的Level就是啟動點, 所以一開始遊戲就進入MyMenu
var list = {};
list['menu'] = new MyMenu();
Framework.Game.addNewLevel({ menu: list['menu'] });

Framework.Game.addNewLevel({levelTest: new MyGameTest()});
Framework.Game.addNewLevel({level1: new MyGame()});

//讓Game開始運行
Framework.Game.start();