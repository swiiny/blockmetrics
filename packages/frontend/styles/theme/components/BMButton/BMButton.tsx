import React, { FC } from 'react';
import { ESize, ETextType, ETextWeight } from '../../utils/enum';
import BMText from '../BMText';
import { StyledButton } from './BMButton.styles';
import { IBMButton } from './BMButton.type';

const BMButton: FC<IBMButton> = ({
	children,
	onClick,
	disabled = false,
	size = ESize.m,
	ariaLabel,
	secondary = false,
	fullWidth = false,
	...otherProps
}) => {
	return (
		<StyledButton
			onClick={!disabled ? onClick : () => {}}
			disabled={disabled}
			fullWidth={fullWidth}
			size={size}
			secondary={secondary}
			aria-label={ariaLabel || (typeof children === 'string' ? children : '')}
			{...otherProps}
		>
			<BMText type={ETextType.span} weight={ETextWeight.bold} size={size} inheritStyle={false}>
				{children}
			</BMText>
		</StyledButton>
	);
};

export { BMButton };
