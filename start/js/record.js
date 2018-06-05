var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.Record=
class Record
{
    constructor(name,atMap,position,storyLineIndex,pokemons,props,money,rivalName)
    {
        this.rivalName=rivalName||name.rivalName;//overload Record(Protagonist,Protagonist.rivalName)
        if(!this.rivalName&&GameSystem&&GameSystem.rival)
            this.rivalName=rivalName;//overload Record(Protagonist,Rival)
        if(!this.rivalName&&name.name&&atMap)
            this.rivalName=(atMap.name)?atMap.name:atMap;//overload Record(Protagonist,Rival) / overload Record(Protagonist,string rivalName)
        atMap=(atMap.name)?undefined:atMap;
        if(!(name||position||atMap||storyLineIndex||pokemons||props||money)&&GameSystem.protagonist)
            this.assign(GameSystem.protagonist);
        else
            this.assign({name:name,atMap:atMap,position:position,storyLineIndex:storyLineIndex,pokemons:pokemons,props:props,money:money});
    }
    assign(char)
    {
        this.atMap=char.atMap||char._atMap||char.name.atMap||char.name._atMap||this.atMap;
        this.position=char.position||char._position||char.name.position||char.name._position||this.position;
        this.pokemons=char.pokemons||char._pokemons||char.name.pokemons||char.name._pokemons||this.pokemons;
        this.props=char.props||char._props||char.name.props||char.name._props||this.props;
        this.storyLineIndex=char.storyLineIndex||char._storyLineIndex||char.name.storyLineIndex||char.name._storyLineIndex||this.storyLineIndex||0;
        this.money=char.money||char._money||char.name.money||char.name._money||this.money||0;
        this.name=char.name.name||char.name||this.name;
        this.metPokemons=char.metPokemons||char.name.metPokemons;
    }
}