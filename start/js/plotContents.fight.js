GameSystem.Classes.PlotContents.Fight=
class Fight extends GameSystem.Classes.PlotContent
{
    constructor(opponent,options={name:"fight",type:"fight"})
    {
        super(options);
        this.opponent=opponent;
    }
    start()
    {
        var BD=GameSystem.Bridges.BattleData;
        BD.opponent=this.opponent;
        BD.selectPokemon=GameSystem.protagonist.pokemons[0];
        this.plot.end();
        Framework.Game.goToLevel('battleLevel');
    }
}