import React, { FC } from 'react';
import Flex from '../../../../styles/layout/Flex';
import Spacing from '../../../../styles/layout/Spacing';
import BMIcon from '../../../../styles/theme/components/BMIcon';
import BMText from '../../../../styles/theme/components/BMText';
import { EFlex, EIcon, ESize } from '../../../../styles/theme/utils/enum';
import CompareBlockchainCard from '../CompareBlockchainCard';
import { ICompareBlockchains } from './CompareBlockchains.type';

const CompareBlockchains: FC<ICompareBlockchains> = ({ blockchains }) => {
	return (
		<>
			<Flex fullWidth vertical={EFlex.center} horizontal={EFlex.start}>
				<BMText size={ESize.xl}>Blockchains</BMText>

				<Spacing size={ESize['4xs']} />

				<BMIcon size={ESize.xs} type={EIcon.sortBottom} />
			</Flex>

			<Flex as='ul' direction={EFlex.column}>
				{blockchains.map((blockchain) => (
					<CompareBlockchainCard key={blockchain.id} {...blockchain} />
				))}
			</Flex>
		</>
	);
};

export { CompareBlockchains };
