import { Pokemon } from '@/api/types';
import Layout from '@/components/layout';
import { Box, Container, Flex, Grid, Title, Text, rem } from '@mantine/core';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import {
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart,
	ResponsiveContainer,
} from 'recharts';

const DetailPokemon = ({ pokemon }: { pokemon: Pokemon }) => {
	console.log(pokemon);

	const radarData = pokemon.stats.map(stat => {
		return {
			subject: stat.stat.name,
			A: stat.effort,
			fullMark: stat.base_stat,
		};
	});

	return (
		<Layout title='Detail'>
			<Container>
				<Grid
					key={`each-pokemon-${pokemon.name.replace(' ', '-')}`}
					sx={{
						borderRadius: rem(10),
						padding: rem(10),
						border: '1px solid #198fa1',
					}}
				>
					<Grid.Col span={3}>
						<Box
							pos='relative'
							h={rem(200)}
							sx={{
								'& .first-img:hover': {
									opacity: 0,
									visibility: 'hidden',

									'& + .second-img': {
										visibility: 'visible',
										opacity: 1,
										transform: 'scaleX(1)',
									},
								},
								'& .second-img': {
									opacity: 0,
									visibility: 'hidden',
									transform: 'scaleX(-1)',
								},
							}}
						>
							<Image
								src={pokemon.sprites.front_default}
								alt={`front ${pokemon.name}`}
								className='first-img'
								style={{
									cursor: 'pointer',
								}}
								fill
							/>
							<Image
								src={pokemon.sprites.back_default}
								alt={`back ${pokemon.name}`}
								className='second-img'
								style={{
									cursor: 'pointer',
								}}
								fill
							/>
						</Box>
					</Grid.Col>
					<Grid.Col span={9}>
						<Title transform='capitalize' mb='lg'>
							{pokemon.name}
						</Title>

						<Box>
							<ResponsiveContainer width='50%' height={200}>
								<RadarChart
									cx='50%'
									cy='50%'
									outerRadius='80%'
									data={radarData}
								>
									<PolarGrid />
									<PolarAngleAxis dataKey='subject' />
									<PolarRadiusAxis />
									<Radar
										name='Mike'
										dataKey='A'
										stroke='#8884d8'
										fill='#8884d8'
										fillOpacity={0.6}
									/>
								</RadarChart>
							</ResponsiveContainer>
						</Box>
					</Grid.Col>
				</Grid>
			</Container>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps<{
	pokemon: Pokemon;
}> = async ctx => {
	const { params } = ctx;
	const id = params!.id;

	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

	return {
		props: {
			pokemon: await res.json(),
		},
	};
};

export default DetailPokemon;
