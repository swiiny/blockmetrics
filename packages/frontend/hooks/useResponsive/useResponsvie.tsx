import { useEffect, useState } from 'react';
import { IUseResponsive } from './useResponsive.type';

function getResponsive(): number {
	if (typeof window === 'undefined') {
		return 1200;
	}

	const { innerWidth: width } = window;

	return width;
}

const useResponsive = (): IUseResponsive => {
	const mqSm: number = 660;
	const mqMd: number = 900;
	const mqLg: number = 1200;
	const mqXl: number = 1600;

	const [screenWidth, setScreenWidth] = useState(getResponsive());
	const [isSmallerThanSm, setIsSmallerThanSm] = useState<boolean>(false);
	const [isSmallerThanMd, setIsSmallerThanMd] = useState<boolean>(false);
	const [isSmallerThanLg, setIsSmallerThanLg] = useState<boolean>(false);
	const [isSmallerThanXl, setIsSmallerThanXl] = useState<boolean>(false);

	useEffect(() => {
		setIsSmallerThanSm(screenWidth < mqSm);
		setIsSmallerThanMd(screenWidth < mqMd);
		setIsSmallerThanLg(screenWidth < mqLg);
		setIsSmallerThanXl(screenWidth < mqXl);
	}, [screenWidth]);

	useEffect(() => {
		function handleResize() {
			setScreenWidth(getResponsive());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return {
		screenWidth,
		isSmallerThanSm,
		isSmallerThanMd,
		isSmallerThanLg,
		isSmallerThanXl
	};
};

export { useResponsive };
