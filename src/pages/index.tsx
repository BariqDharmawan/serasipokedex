import {
	useGetListPokemonQuery,
	useLazyGetPokemonByAbilityQuery,
	useLazyGetSinglePokemonQuery,
} from '@/api/pokemonApi';
import { Pokemon } from '@/api/types';
import Layout from '@/components/layout';
import useScrollToBottom from '@/hooks/useScrollToBottom';
import {
	Box,
	Container,
	SimpleGrid,
	rem,
	Text,
	MultiSelect,
	Loader,
	Flex,
} from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import _ from 'lodash';

export default function Home() {
	const [listDetailPokemon, setListDetailPokemon] = useState<Pokemon[]>([]);
	const [offsetPokemon, setOffsetPokemon] = useState(0);
	const [filterAbilities, setFilterAbilities] = useState([]);
	const [idsPokemon, setIdsPokemon] = useState<number[] | undefined>([]);
	const [selectedAbilities, setSelectedAbilities] = useState<string[]>([]);
	const [noNeedInfiniteScroll, setNoNeedInfiniteScroll] = useState(false);

	const [getSinglePokemon] = useLazyGetSinglePokemonQuery();
	const [getFilteredAbility] = useLazyGetPokemonByAbilityQuery();

	const [isLoadingAllSingle, setIsLoadingAllSingle] = useState<boolean[]>([]);

	const {
		data: listPokemon,
		isLoading,
		refetch: refetchListPokemon,
	} = useGetListPokemonQuery({
		offset: offsetPokemon,
	});

	const isAtBottom = useScrollToBottom();

	useEffect(() => {
		setIdsPokemon(
			listPokemon?.results.map(pokemon => {
				return Number(
					pokemon.url
						.replace('https://pokeapi.co/api/v2/pokemon/', '')
						.replace('/', '')
				);
			})
		);
	}, [listPokemon]);

	useEffect(() => {
		const listDetail = () => {
			idsPokemon && setIsLoadingAllSingle(idsPokemon.map(_ => true));
			return idsPokemon?.map(async idPokemon => {
				const result = await getSinglePokemon({
					id: idPokemon,
				});

				setIsLoadingAllSingle(prevLoadingState =>
					prevLoadingState.map((isLoading, index) =>
						index === idsPokemon.indexOf(idPokemon)
							? false
							: isLoading
					)
				);

				if (result) {
					//@ts-ignore
					setListDetailPokemon(prevState => [
						...prevState,
						result.data,
					]);

					result.data?.abilities.map(ability => {
						//@ts-ignore
						setFilterAbilities(pevState =>
							_.uniq([...pevState, ability.ability.name])
						);
					});
				}
			});
		};

		listDetail();
	}, [idsPokemon, getSinglePokemon]);

	useEffect(() => {
		if (isAtBottom && !noNeedInfiniteScroll) {
			if (selectedAbilities.length > 0) {
				filterPokemon(selectedAbilities);
			} else {
				const nextOffset = new URL(
					String(listPokemon?.next)
				).searchParams.get('offset');

				setOffsetPokemon(Number(nextOffset));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAtBottom, selectedAbilities]);

	const [searchAbility, setSearchAbility] = useState('');

	const filterPokemon = (selectedAbility: string[]) => {
		setOffsetPokemon(0);
		setListDetailPokemon([]);

		if (selectedAbility.length > 0) {
			selectedAbility.map(async ability => {
				const { data } = await getFilteredAbility({
					ability: ability,
				});

				setNoNeedInfiniteScroll(true);

				setIdsPokemon(
					data?.pokemon.map(pokemon => {
						return Number(
							pokemon.pokemon.url
								.replace(
									'https://pokeapi.co/api/v2/pokemon/',
									''
								)
								.replace('/', '')
						);
					})
				);
			});
		} else {
			setNoNeedInfiniteScroll(false);

			refetchListPokemon();
			setIdsPokemon(
				listPokemon?.results.map(pokemon => {
					return Number(
						pokemon.url
							.replace('https://pokeapi.co/api/v2/pokemon/', '')
							.replace('/', '')
					);
				})
			);
			// setListDetailPokemon(prevState => [...prevState, listPokemon?.results]);
		}
	};

	return (
		<Layout title='Serasi Pokedex'>
			<main>
				<Container pb='lg'>
					<MultiSelect
						data={filterAbilities}
						label='Filter By Ability'
						placeholder='Pick the ability'
						mb='xl'
						maxDropdownHeight={200}
						onSearchChange={val => {
							setSearchAbility(val);
						}}
						onChange={selectedAbility => {
							setSelectedAbilities(selectedAbility);
							filterPokemon(selectedAbility);
						}}
						nothingFound={
							<>
								Couldnt found ability <b>{searchAbility}</b>
							</>
						}
						searchable
						clearable
					/>

					<SimpleGrid
						cols={4}
						spacing='md'
						breakpoints={[{ maxWidth: '768px', cols: 1 }]}
					>
						{listDetailPokemon && listDetailPokemon.length > 0
							? listDetailPokemon.map(pokemon => (
									<Box
										key={`each-pokemon-${pokemon.name.replace(
											' ',
											'-'
										)}`}
										sx={{
											borderRadius: rem(10),
											padding: rem(10),
											border: '1px solid #198fa1',
										}}
									>
										<Box pos='relative' h={100}>
											<Image
												src={
													pokemon.sprites
														.front_default
												}
												alt={pokemon.name}
												sizes='(max-width: 768px) 100%, (max-width: 1200px) 100%'
												draggable='false'
												priority
												fill
											/>
										</Box>
										<Text>{pokemon.name}</Text>

										<Text color='blue'>
											<Link
												href={`/pokemon/${pokemon.id}`}
											>
												See detail
											</Link>
										</Text>
									</Box>
							  ))
							: []}
					</SimpleGrid>

					{isLoadingAllSingle.some(_ => true) && (
						<Flex justify='center' mt='lg'>
							<Loader />
						</Flex>
					)}
				</Container>
			</main>
		</Layout>
	);
}
