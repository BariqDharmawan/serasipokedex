import {
	useGetListPokemonQuery,
	useLazyGetSinglePokemonQuery,
} from '@/api/pokemonApi';
import { LIMIT_POKEMON, Pokemon } from '@/api/types';
import Layout from '@/components/layout';
import useScrollToBottom from '@/hooks/useScrollToBottom';
import { Box, Container, SimpleGrid, rem, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
	const [listDetailPokemon, setListDetailPokemon] = useState<Pokemon[]>([]);
	const [offsetPokemon, setOffsetPokemon] = useState(0);

	const [getSinglePokemon] = useLazyGetSinglePokemonQuery();
	const { data: listPokemon } = useGetListPokemonQuery({
		offset: offsetPokemon,
	});

	const isAtBottom = useScrollToBottom();

	useEffect(() => {
		const idsPokemon = listPokemon?.results.map(pokemon => {
			return Number(
				pokemon.url
					.replace('https://pokeapi.co/api/v2/pokemon/', '')
					.replace('/', '')
			);
		});

		const listDetail = () => {
			return idsPokemon?.map(async idPokemon => {
				const result = await getSinglePokemon({
					id: idPokemon,
				});

				if (result) {
					//@ts-ignore
					setListDetailPokemon(prevState => [
						...prevState,
						result.data,
					]);
				}
			});
		};

		listDetail();
	}, [getSinglePokemon, listPokemon]);

	useEffect(() => {
		if (isAtBottom) {
			const nextOffset = new URL(
				String(listPokemon?.next)
			).searchParams.get('offset');

			setOffsetPokemon(Number(nextOffset));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAtBottom]);

	return (
		<Layout title='Serasi Pokedex'>
			<main>
				<Container pb='lg'>
					<SimpleGrid
						cols={4}
						spacing='md'
						breakpoints={[{ maxWidth: '768px', cols: 1 }]}
					>
						{listDetailPokemon.map(pokemon => (
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
										src={pokemon.sprites.front_default}
										alt={pokemon.name}
										sizes='(max-width: 768px) 100%, (max-width: 1200px) 100%'
										draggable='false'
										priority
										fill
									/>
								</Box>
								<Text>{pokemon.name}</Text>

								<Text color='blue'>
									<Link href={`/pokemon/${pokemon.id}`}>
										See detail
									</Link>
								</Text>
							</Box>
						))}
					</SimpleGrid>
				</Container>
			</main>
		</Layout>
	);
}
