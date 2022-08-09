import Link from 'next/link';
import React, { FC } from 'react';
import { StyledLink } from './ItemLink.styles';
import { IItemLink } from './ItemLink.type';

// link that covers the whole relative parent element
const ItemLink: FC<IItemLink> = ({ href, isInternal = false, ariaLabel }) => {
	return (
		<Link href={href} passHref>
			<StyledLink
				target={isInternal ? undefined : '_blank'}
				rel={isInternal ? undefined : 'noopener noreferrer'}
				aria-label={ariaLabel}
			/>
		</Link>
	);
};

export { ItemLink };
