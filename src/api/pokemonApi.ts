import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon, PokemonList } from './types';

export const pokemonApi = createApi({
	reducerPath: 'pokemonApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://pokeapi.co/api/v2/',
	}),
	endpoints: builder => ({
		getListPokemon: builder.query<PokemonList, { offset: number }>({
			query: ({ offset }) => `pokemon?limit=20&offset=${offset}`,
		}),
		getPokemonByName: builder.query<Pokemon, string>({
			query: name => `pokemon/${name}`,
		}),
	}),
});

export const { useGetPokemonByNameQuery, useGetListPokemonQuery } = pokemonApi;