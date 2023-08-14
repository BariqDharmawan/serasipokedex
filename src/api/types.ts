export type PokemonUtilities = {
  name: string;
  url: string;
};

type PokemonAbilities = {
  ability: PokemonUtilities;
  is_hidden: boolean;
  slot: number;
};

export type PokemonList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonUtilities[];
};

type TypesPokemon = {
  slot: number;
  type: PokemonUtilities;
};

type PokemonStats = {
  base_stat: number;
  effort: number;
  stat: PokemonUtilities;
};

export type MovePokemon = {
  move: PokemonUtilities;
  version_group_details: any;
};

type Maybe = string | null;

type SpritesOther = {
  dream_world: {
    front_default: string;
    front_female: Maybe;
  };
  home: {
    front_default: string;
    front_female: Maybe;
    front_shiny: Maybe;
    front_shiny_female: Maybe;
  };
  ["official-artwork"]: {
    front_default: string;
    front_shiny: Maybe;
  };
};

type PokemonSprites = {
  back_default: string;
  back_female: Maybe;
  back_shiny: Maybe;
  back_shiny_female: Maybe;
  front_default: string;
  front_female: Maybe;
  front_shiny: Maybe;
  front_shiny_female: Maybe;
  other: SpritesOther;
};

export type Pokemon = {
  abilities: PokemonAbilities[];
  id: number;
  name: string;
  images: string;
  types: TypesPokemon[];
  weight: number;
  height: number;
  moves: MovePokemon[];
  stats: PokemonStats[];
  sprites: PokemonSprites;
};
