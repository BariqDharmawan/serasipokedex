import { PokemonUtilities } from "@/api/types";
import { createSlice } from "@reduxjs/toolkit";

interface PokemonState {
  listPokemon: PokemonUtilities[];
}

const initPokemon: PokemonState = {
  listPokemon: [],
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: initPokemon,
  reducers: {},
});

export default pokemonSlice.reducer;
