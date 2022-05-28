import React, { useEffect, useRef, useState } from 'react';
import { StyledCollapse } from './Collapse.style';
import { ICollapse } from './Collapse.type';

const Collapse: React.FC<ICollapse> = ({ children, isOpen = false }) => {
	const [height, setHeight] = useState<number | undefined>(0);

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!height || !isOpen || !ref.current) {
			return undefined;
		}

		// @ts-ignore
		const resizeObserver = new ResizeObserver((el) => {
			setHeight(el[0].contentRect.height);
		});

		resizeObserver.observe(ref.current);

		return () => {
			resizeObserver.disconnect();
		};
	}, [height, isOpen]);

	useEffect(() => {
		if (isOpen) {
			setHeight(ref.current?.getBoundingClientRect().height);
		} else {
			setHeight(0);
		}
	}, [isOpen]);

	return (
		<StyledCollapse height={height}>
			<div ref={ref}>{children}</div>
		</StyledCollapse>
	);
};

export { Collapse };
