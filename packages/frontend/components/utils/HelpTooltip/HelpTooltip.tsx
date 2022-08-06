import React, { FC, useCallback, useMemo, useState } from 'react';
import Spacing from '../../../styles/layout/Spacing';
import BMIcon from '../../../styles/theme/components/BMIcon';
import BMText from '../../../styles/theme/components/BMText';
import { EIcon, ESize } from '../../../styles/theme/utils/enum';
import { StyledHelpTooltipContainer, StyledTooltip } from './HelpTooltip.styles';
import Portal from '../Portal';
import { v4 as uuidV4 } from 'uuid';
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
