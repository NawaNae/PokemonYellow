GameSystem.Classes.Occurrence =
class Occurrence {
    constructor(pokemonType, probabilty) {
        this._pokemonType = pokemonType;
        if (probabilty <= 0 || probabilty > 100) {
            throw new Error("Occurrence constructor: parameter 'probabilty' must larger than 0 and not exceed 100.");
        }
        this._probabilty = probabilty;
    }

    get pokemonType() { return this._pokemonType; }
    set pokemonType(newPokemonType) { this._pokemonType = newPokemonType; }
    
    get probabilty() { return this._probabilty; }
    set probabilty(newProbabilty) {
        if (probabilty <= 0 || probabilty > 100)
            throw new Error("Occurrence setter: parameter 'newProbabilty' must larger than 0 and not exceed 100.");
        else                               
            this._probabilty = newProbabilty;
    }
};