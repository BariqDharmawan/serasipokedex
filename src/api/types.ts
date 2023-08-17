export type PokemonUtilities = {
	name: string;
	url: string;
};

export type PokemonAbilities = {
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
	['official-artwork']: {
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
	base_experience: number;
	id: number;
	name: string;
	types: TypesPokemon[];
	weight: number;
	height: number;
	moves: MovePokemon[];
	stats: PokemonStats[];
	sprites: PokemonSprites;
};

export type PokemonByAbility = {
	is_hidden: boolean;
	pokemon: PokemonUtilities;
	slot: number;
};

export type Abilities = {
	effect_changes: [];
	effect_entries: [];
	flavor_text_entries: [];
	generation: PokemonUtilities;
	id: number;
	is_main_series: boolean;
	name: string;
	names: [];
	pokemon: PokemonByAbility[];
};

export const LIMIT_POKEMON = 30;
