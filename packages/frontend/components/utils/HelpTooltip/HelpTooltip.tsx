import React, { FC } from 'react';
import Spacing from '../../../styles/layout/Spacing';
import BMIcon from '../../../styles/theme/components/BMIcon';
import { EIcon, ESize } from '../../../styles/theme/utils/enum';
import { StyledTooltip } from './HelpTooltip.styles';
import ElementTooltip from '../ElementTooltip';

const HelpTooltip: FC<{ content: string }> = ({ content }) => {
	return (
		<ElementTooltip content={content}>
			<StyledTooltip>
				<Spacing size={ESize['4xs']} />

				<BMIcon
					type={EIcon.help}
					size={ESize['2xs']}
					backgroundVisible
					backgroundSize={ESize['5xs']}
					backgroundRadius={ESize.xl}
				/>
			</StyledTooltip>
		</ElementTooltip>
	);
};

export { HelpTooltip };
