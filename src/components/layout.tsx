import Head from 'next/head';
import { Button, Flex, NavLink, NavLinkProps } from '@mantine/core';
import { IconHome2 } from '@tabler/icons-react';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';

interface Layout {
	title: string;
	favicon?: string;
}

const Layout = ({
	title,
	children,
	favicon = '/favicon.ico',
}: PropsWithChildren<Layout>) => {
	const router = useRouter();
	const menus = [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'About',
			href: '/about',
		},
	];

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link rel='icon' href={favicon} />
			</Head>
			<Flex align='center' gap='sm' justify='center' w='100%' py='md'>
				{menus.map(menu => (
					<Link href={menu.href} key={`menu-${menu.label}`}>
						<Button
							color='blue'
							variant={
								menu.href === router.pathname
									? 'filled'
									: 'outline'
							}
						>
							{menu.label}
						</Button>
					</Link>
				))}
			</Flex>
			<div>{children}</div>
		</>
	);
};

export default Layout;