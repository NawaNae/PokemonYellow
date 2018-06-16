DEX = GameSystem.Classes.BattleAnimation.Dictionary.AttackTo;
//DEX = GameSystem.Classes.BattleAnimation.Dictionary.AttackedBy;
//DEX = GameSystem.Classes.BattleAnimation.Dictionary.PlayerEffect;
//DEX = GameSystem.Classes.BattleAnimation.Dictionary.OpponentEffect;
battleResult = new GameSystem.Classes.BattleResult();
battleResult.addBattleAnimation(DEX["綁緊"]);
Framework.Game._currentLevel.executeAnimationQueue(battleResult);