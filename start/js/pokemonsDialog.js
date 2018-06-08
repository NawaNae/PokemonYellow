var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.PokemonsDialog = 
class PokemonsDialog extends GameSystem.Classes.PokemonListPad
{
    constructor(name, level, maxHP, HP, image)
    {
        super(name,level,maxHP,HP,image);
        this._keyInput=(e)=>{this.keyInput(e)};
        this.keyInputMode=0;
        var Option=GameSystem.Classes.Option,Options= GameSystem.Classes.Options;
        this.selectOrWatchOptions=new Options();
        this.selectOrWatchOptions.appendTo(this.getHTMLElement())
        this.selectOrWatchOptions.push(new Option("選擇",function(){}));
        this.selectOrWatchOptions.push(new Option("觀看",function(){}));
        this.infoPad=new GameSystem.Classes.PokemonInfoPad();
        this.infoPad.index=0;
    
        this.infoPad.hide();
    }
    set pokemonsData(pokemons)
    {
        this.pokemons=pokemons;
        super.setPokemonsData(pokemons);
    }
    keyInput(e)
    {
        var key=GameSystem.Manager.Key.keyMapping[e.key];
        switch(this.keyInputMode)
        {
            case 0:
                this.listKeyInput(key);
                break;
            case 1:
                this.infoPadKeyInput(key);
                break;
        }
    }
    listKeyInput(key)
    {
   
        switch(key)
        {
            case 'Up':
                if(this.menuSelection>0)
                    this.setPokemonListCursor(--this.menuSelection);
            break;
            case 'Down':
                if(this.menuSelection<this.pokemonsCount-1)
                    this.setPokemonListCursor(++this.menuSelection);
            break;
            case 'A':
                this.selectOrWatchOptions.show();
                var selectOption=this.selectOrWatchOptions.find("選擇"),watchOption=this.selectOrWatchOptions.find("觀看");
                selectOption.selectSend=()=>
                {
                    this.selectOrWatchOptions.hide();
                    var selectPoke;
                    if(this.pokemons)
                        if((selectPoke=this.pokemons[this.menuSelection]))
                            if(selectPoke.HP!==0)
                             {
                                GameSystem.protagonist.selectPokemon=selectPoke;
                                this.pokemonsData=GameSystem.protagonist.pokemons||this.pokemons;
                             } 
                            else
                            {
                                alert("無法選擇血量=0的寶可夢");
                            }

                }
                watchOption.selectSend=()=>
                {
                    this.selectOrWatchOptions.hide();
                    if(this.pokemons)
                        if(this.pokemons[this.menuSelection])
                        {
                            this.infoPad.setInfo(this.pokemons[this.menuSelection]);
                            this.infoPad.show();
                            this.infoPad.showPart1();
                            this.keyInputMode=1;
                        }
                }
                
            break;
            case 'B':
                this.hide();
        }
    }
    infoPadKeyInput(key)
    {
        switch(this.infoPad.index)
        {
            case 0:
                this.infoPad.showPart2();
                this.infoPad.index=1;
                break;
            case 1:
                this.infoPad.hide();
                this.keyInputMode=0;
                this.infoPad.index=0;
                break;
        }
    }
    appendTo(father)
    {
        father.append(this.getHTMLElement());
        father.append(this.infoPad.getHTMLElement());
    }
    show()
    {
        super.show();
        this.lastKeyInput=GameSystem.Manager.Key.keyInput;
        GameSystem.Manager.Key.keyInput=this._keyInput;
    }
    hide()
    {
        super.hide();
        GameSystem.Manager.Key.keyInput=this.lastKeyInput||GameSystem.Manager.Key.keyInput;
        this.lastKeyInput=undefined;
    }
}
GameSystem.Classes.PokemonsSelectDialog = 
class PokemonsSelectDialog extends GameSystem.Classes.PokemonListPad
{
    constructor(prop,pokemons)
    {
        super();
        if(!pokemons)
            if(GameSystem.protagonist&&GameSystem.protagonist.pokemons)
            this.pokemonsData=GameSystem.protagonist.pokemons;
        this.prop=prop;
        this._keyInput=(e)=>{this.keyInput(e)};
        this.show();
    }
    set pokemonsData(pokemons)
    {
        this.pokemons=pokemons;
        super.setPokemonsData(pokemons);
    }
    keyInput(e)
    {
        var key=GameSystem.Manager.Key.keyMapping[e.key];
        switch(key)
        {
            case 'Up':
                if(this.menuSelection>0)
                    this.setPokemonListCursor(--this.menuSelection);
            break;
            case 'Down':
                if(this.menuSelection<this.pokemonsCount-1)
                    this.setPokemonListCursor(++this.menuSelection);
            break;
            case 'A':
                if(this.pokemons)
                    if(this.pokemons[this.menuSelection])
                    {
                        if(this.prop&&this.prop.use)
                        {
                            this.prop._use(this.pokemons[this.menuSelection]);
                            this.hide();
                        }
                        else
                            console.warn("please make sure the prop and prop.use are assigned.");
                    }    
            break;
            case 'B':
                this.hide();
        }
    }
    show()
    {
        super.show();
        this.appendTo();
        this.lastKeyInput=GameSystem.Manager.Key.keyInput;
        GameSystem.Manager.Key.keyInput=this._keyInput;
    }
    appendTo(father)
    {
        if(!father)
            father=GameSystem.HTMLObjectContainer;
        if(father.appendChild)
            father.appendChild(this.getHTMLElement());
        else if(father.append)
            father.append(this.getHTMLElement());
    }
    hide()
    {
        super.hide();
        GameSystem.Manager.Key.keyInput=this.lastKeyInput||GameSystem.Manager.Key.keyInput;
        this.lastKeyInput=undefined;
        this.remove();
    }
    remove()
    {
        this.getHTMLElement().remove();
    }
}