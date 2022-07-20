import Link from 'next/link';
import React, { FC } from 'react';
import { StyledLink } from './ItemLink.styles';
import { IItemLink } from './ItemLink.type';

// link that covers the whole relative parent element
const ItemLink: FC<IItemLink> = ({ href }) => {
	return (
		<Link href={href} passHref>
			<StyledLink target='_blank' rel='noopener noreferrer' />
		</Link>
	);
};

export { ItemLink };
