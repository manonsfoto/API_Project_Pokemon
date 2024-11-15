export interface IPokeAPI {
    count:    number;
    next:     string;
    previous: null;
    results:  IPokemon[];
}

export interface IPokemon {
    name: string;
    url:  string;
}

// =================================
export interface IPokemonType {
    game_indices:          GameIndex[];
    generation:            IPokemon;
    id:                    number;
    move_damage_class:     IPokemon;
    moves:                 IPokemon[];
    name:                  string;
    names:                 Name[];
    past_damage_relations: any[];
    pokemon:               IPokemonPokemon[];
}

export interface IPokemon {
    name: string;
    url:  string;
}

export interface GameIndex {
    game_index: number;
    generation: IPokemon;
}

export interface Name {
    language: IPokemon;
    name:     string;
}

export interface IPokemonPokemon {
    pokemon: IPokemon;
    slot:    number;
}

