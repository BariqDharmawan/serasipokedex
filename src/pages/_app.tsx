import { store } from '@/api/store';
import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<MantineProvider
				theme={{
					colorScheme: 'light',
					fontFamily:
						'Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
				}}
				withGlobalStyles
				withNormalizeCSS
			>
				<Component {...pageProps} />
			</MantineProvider>
		</Provider>
	);
}
