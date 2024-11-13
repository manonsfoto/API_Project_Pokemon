export interface IPokeAPI {
  count: number;
  next: string;
  previous: null;
  results: IPokemon[];
}

export interface IPokemon {
  name: string;
  url: string;
}
// ^=====================================
export interface IPokemonType {
  damage_relations: DamageRelations;
  game_indices: any[];
  generation: IPokemon;
  id: number;
  move_damage_class: MoveDamageClass;
  moves: any[];
  name: string;
  names: any[];
  past_damage_relations: any[];
  pokemon: IPokemonPokemon[];
  sprites: Sprites;
}

export interface DamageRelations {
  double_damage_from: IPokemon[];
  double_damage_to: any[];
  half_damage_from: any[];
  half_damage_to: any[];
  no_damage_from: any[];
  no_damage_to: any[];
}

export interface MoveDamageClass {}

export interface IPokemonPokemon {
  pokemon: IPokemon;
  slot: number;
}

export interface Sprites {
  "generation-iii": GenerationIii;
  "generation-iv": GenerationIv;
  "generation-ix": GenerationIx;
  "generation-v": GenerationV;
  "generation-vi": { [key: string]: Colosseum };
  "generation-vii": GenerationVii;
  "generation-viii": GenerationViii;
}

export interface GenerationIii {
  colosseum: Colosseum;
  emerald: Colosseum;
  "firered-leafgreen": Colosseum;
  "ruby-saphire": Colosseum;
  xd: Colosseum;
}

export interface Colosseum {
  name_icon: string;
}

export interface GenerationIv {
  "diamond-pearl": Colosseum;
  "heartgold-soulsilver": Colosseum;
  platinum: Colosseum;
}

export interface GenerationIx {
  "scarlet-violet": Colosseum;
}

export interface GenerationV {
  "black-2-white-2": Colosseum;
  "black-white": Colosseum;
}

export interface GenerationVii {
  "lets-go-pikachu-lets-go-eevee": Colosseum;
  "sun-moon": Colosseum;
  "ultra-sun-ultra-moon": Colosseum;
}

export interface GenerationViii {
  "brilliant-diamond-and-shining-pearl": Colosseum;
  "legends-arceus": Colosseum;
  "sword-shield": Colosseum;
}
