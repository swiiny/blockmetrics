import React, { FC } from 'react';
import { StyledButton } from './ItemButton.styles';
import { IItemButton } from './ItemButton.type';

// button that covers the whole relative parent element
const ItemButton: FC<IItemButton> = ({ onClick, ariaLabel }) => {
	return <StyledButton type='button' aria-label={ariaLabel} aria-hidden={ariaLabel ? false : true} onClick={onClick} />;
};

export { ItemButton };
