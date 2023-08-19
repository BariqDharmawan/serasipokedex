import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Abilities, LIMIT_POKEMON, Pokemon, PokemonList } from './types';

export const pokemonApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://pokeapi.co/api/v2/',
	}),
	reducerPath: 'pokemonApi',
	tagTypes: ['LIST_POKEMON', 'DETAIL_POKEMON', 'ABILITIES'],
	endpoints: builder => ({
		getListPokemon: builder.query<PokemonList, { offset: number }>({
			query: ({ offset }) =>
				`pokemon?offset=${offset}&limit=${LIMIT_POKEMON}`,
			providesTags: ['LIST_POKEMON'],
		}),
		getSinglePokemon: builder.query<Pokemon, { id: number }>({
			query: ({ id }) => `pokemon/${id}`,
			providesTags: (result, error, { id }) => [
				{ type: 'LIST_POKEMON', id },
			],
		}),
		getPokemonByAbility: builder.query<Abilities, { ability: string }>({
			query: ({ ability }) => `ability/${ability}`,
			providesTags: (result, error, { ability }) => [
				{ type: 'ABILITIES', id: ability },
			],
		}),
	}),
});

export const {
	useGetListPokemonQuery,
	useLazyGetSinglePokemonQuery,
	useLazyGetPokemonByAbilityQuery,
} = pokemonApi;
