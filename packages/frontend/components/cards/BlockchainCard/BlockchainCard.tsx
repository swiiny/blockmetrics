import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useMemo } from 'react';
import Flex from '../../../styles/layout/Flex';
import Spacing from '../../../styles/layout/Spacing';
import Heading from '../../../styles/theme/components/Heading';
import Text from '../../../styles/theme/components/Text';
import { EFlex, ESize, ETextType } from '../../../styles/theme/utils/enum';
import { BLOCKCHAINS_ARRAY } from '../../../utils/variables';
import { NAVBAR_LINKS } from '../../Navbar/Navbar';
import {
	StyledBlockchainCard,
	StyledExtendedLink,
	StyledLogoContainer,
	StylesCardHeader
} from './BlockchainCard.styles';
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

	const linkTo = useMemo(() => {
		try {
			let formattedName = name?.toLowerCase().replace(/\s/g, '-');

			return NAVBAR_LINKS.blockchains.href + '/' + formattedName;
		} catch {
			return '#';
		}
	}, [name]);

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

			<Flex as='ul' fullWidth direction={EFlex.column}>
				<Flex as='li' fullWidth horizontal={EFlex.between}>
					<Text type={ETextType.p}>Rank</Text>
					<Text type={ETextType.p}>{note}</Text>
				</Flex>
				<Flex as='li' fullWidth horizontal={EFlex.between}>
					<Text type={ETextType.p}>Tokens</Text>
					<Text type={ETextType.p}>{token_count}</Text>
				</Flex>
				<Flex as='li' fullWidth horizontal={EFlex.between}>
					<Text type={ETextType.p}>Gas price</Text>
					<Text type={ETextType.p}>{gas_price}</Text>
				</Flex>
				<Flex as='li' fullWidth horizontal={EFlex.between}>
					<Text type={ETextType.p}>Nodes</Text>
					<Text type={ETextType.p}>{node_count}</Text>
				</Flex>
			</Flex>

			<Spacing size={ESize.s} />

			<Link href={linkTo}>
				<a href={linkTo}>
					<Flex as='span' vertical={EFlex.center} horizontal={EFlex.end}>
						<Text size={ESize.s} type={ETextType.span} inheritStyle={false}>
							Show more
						</Text>
					</Flex>
					<StyledExtendedLink />
				</a>
			</Link>
		</StyledBlockchainCard>
	);
};

export { BlockchainCard };
