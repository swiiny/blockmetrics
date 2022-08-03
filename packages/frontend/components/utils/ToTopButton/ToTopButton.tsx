import React, { FC, useCallback, useEffect, useState } from 'react';
import BMIcon from '../../../styles/theme/components/BMIcon';
import { EIcon, ESize } from '../../../styles/theme/utils/enum';
import ItemButton from '../ItemButton';
import Portal from '../Portal';
import { BMCardContainerEx } from './ToTopButton.styles';

const ToTopButton: FC = () => {
	const [isVisible, setIsVisible] = useState(false);

	const handleScroll = useCallback(() => {
		if (window.scrollY > window.innerHeight) {
			setIsVisible(true);
			return;
		}

		setIsVisible(false);
	}, []);

	const scrollToTop = useCallback(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return (
		<Portal>
			<BMCardContainerEx
				clickable
				isHighlighted
				borderRadius={ESize['xs']}
				paddingY={ESize['2xs']}
				paddingX={ESize['xs']}
				isVisible={isVisible}
			>
				<BMIcon type={EIcon.arrowTop} size={ESize.s} />

				<ItemButton onClick={scrollToTop} ariaLabel='Scroll to the top of the page' />
			</BMCardContainerEx>
		</Portal>
	);
};

export { ToTopButton };
