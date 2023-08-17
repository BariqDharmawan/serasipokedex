import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	Abilities,
	LIMIT_POKEMON,
	Pokemon,
	PokemonByAbility,
	PokemonList,
} from './types';
import { HYDRATE } from 'next-redux-wrapper';

export const pokemonApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://pokeapi.co/api/v2/',
	}),
	reducerPath: 'pokemonApi',
	endpoints: builder => ({
		getListPokemon: builder.query<PokemonList, { offset: number }>({
			query: ({ offset }) =>
				`pokemon?offset=${offset}&limit=${LIMIT_POKEMON}`,
			providesTags: ['LIST_POKEMON'],
		}),
		getSinglePokemon: builder.query<Pokemon, { id: number }>({
			query: ({ id }) => `pokemon/${id}`,
			providesTags: ['DETAIL_POKEMON'],
		}),
		getPokemonByAbility: builder.query<any, { ability: string }>({
			query: ({ ability }) => `ability/${ability}`,
			providesTags: ['LIST_POKEMON'],
			transformResponse: (res: {
				data: { pokemon: PokemonByAbility[] };
			}) => res.data.pokemon,
		}),
	}),
	tagTypes: ['LIST_POKEMON', 'DETAIL_POKEMON'],
});

export const {
	useGetListPokemonQuery,
	useLazyGetSinglePokemonQuery,
	useLazyGetPokemonByAbilityQuery,
} = pokemonApi;
