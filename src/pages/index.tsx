import { useGetListPokemonQuery } from '@/api/pokemonApi';
import Layout from '@/components/layout';
import { Box, Container, SimpleGrid, rem } from '@mantine/core';
import Image from 'next/image';

export default function Home() {
	const { data: listPokemon, isLoading } = useGetListPokemonQuery({
		offset: 0,
	});

	return (
		<Layout title='Serasi Pokedex'>
			<main>
				<Container>
					<SimpleGrid
						cols={4}
						spacing='md'
						breakpoints={[{ maxWidth: '768px', cols: 1 }]}
					>
						{listPokemon?.results.map(pokemon => (
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
								{pokemon.name}
							</Box>
						))}
					</SimpleGrid>
				</Container>
			</main>
		</Layout>
	);
}
