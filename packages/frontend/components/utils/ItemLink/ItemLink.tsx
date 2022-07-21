import Link from 'next/link';
import React, { FC } from 'react';
import { StyledLink } from './ItemLink.styles';
import { IItemLink } from './ItemLink.type';

// link that covers the whole relative parent element
const ItemLink: FC<IItemLink> = ({ href, internal = false }) => {
	return (
		<Link href={href} passHref>
			<StyledLink target={internal ? undefined : '_blank'} rel={internal ? undefined : 'noopener noreferrer'} />
		</Link>
	);
};

export { ItemLink };
