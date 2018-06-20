/**
 * @class Paragraph
 * @extends PlotContent
 * @classdesc 作為對話框系列動作的劇情文字內容
 * @prop {string} content 段落的內容。
 */
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