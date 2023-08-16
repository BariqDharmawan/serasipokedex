import { useEffect, useState } from 'react';

const useScrollToBottom = (): boolean => {
	const [isAtBottom, setIsAtBottom] = useState<boolean>(false);

	useEffect(() => {
		const handleScroll = (): void => {
			const scrollTop: number =
				window.scrollY || document.documentElement.scrollTop;
			const windowHeight: number = window.innerHeight;
			const documentHeight: number = Math.max(
				document.body.scrollHeight,
				document.body.offsetHeight,
				document.documentElement.clientHeight,
				document.documentElement.scrollHeight,
				document.documentElement.offsetHeight
			);

			if (scrollTop + windowHeight >= documentHeight - 50) {
				setIsAtBottom(true);
			} else {
				setIsAtBottom(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return isAtBottom;
};

export default useScrollToBottom;
