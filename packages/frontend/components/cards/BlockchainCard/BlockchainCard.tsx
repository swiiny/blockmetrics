import Image from 'next/image';
import React, { FC, useMemo } from 'react';
import Spacing from '../../../styles/layout/Spacing';
import Heading from '../../../styles/theme/components/Heading';
import Text from '../../../styles/theme/components/Text';
import { ESize, ETextType } from '../../../styles/theme/utils/enum';
import { BLOCKCHAINS_ARRAY } from '../../../utils/variables';
import { StyledBlockchainCard, StyledLogoContainer, StylesCardHeader } from './BlockchainCard.styles';
import { IBlockchainCard } from './BlockchainCard.type';

const BlockchainCard: FC<IBlockchainCard> = ({ data, emptyItem = false }) => {
	const {
		id,
		name,
		logoUrl,
		note,
		node_count,
		testnet_node_count,
		single_node_power_consumption,
		blockchain_power_consumption,
		hashrate,
		difficulty,
		time_between_blocks,
		token_count,
		transaction_count,
		gas_price,
		consensus
	} = data || {};

	const blockchainGradient = useMemo((): { start: string; end: string } => {
		let newGradient;

		let defaultGradient = {
			start: '',
			end: ''
		};

		if (id) {
			newGradient = BLOCKCHAINS_ARRAY.find((bc) => bc.id === id)?.colors?.gradient;
		}

		return newGradient || defaultGradient;
	}, [id]);

	if (emptyItem) {
		return <StyledBlockchainCard emptyItem />;
	}

	return (
		<StyledBlockchainCard gradientStart={blockchainGradient.start} gradientEnd={blockchainGradient.end}>
			<StylesCardHeader>
				<Heading type={ETextType.h4}>{name}</Heading>

				<StyledLogoContainer>
					<div>
						<Image src={logoUrl || ''} layout='fill' objectFit='contain' />
					</div>
				</StyledLogoContainer>
			</StylesCardHeader>

			<Spacing size={ESize.s} />

			<Text>{transaction_count}</Text>
		</StyledBlockchainCard>
	);
};

export { BlockchainCard };
