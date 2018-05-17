GameSystem.Classes.PlotContents.CureAll=
class CureAll extends GameSystem.Classes.PlotContent
{
    constructor(option={name:"Cure",type:"CureAll"})
    {
        super(option);
    }
    start()
    {
        let pokemons=GameSystem.protagonist._pokemons;
        for(let pkm of pokemons)
        {
            pkm.updateAbilities();
            pkm.HP=pkm.maxHP;
        }
        this.next();
    }
}