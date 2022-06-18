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
import CountUp from 'react-countup';

const BlockchainCard: FC<IBlockchainCard> = ({ data, emptyItem = false }) => {
	const {
		id,
		name,
		note,
		node_count,
		testnet_node_count,
		single_node_power_consumption,
		blockchain_power_consumption,
		hashrate,
		difficulty,
		last_block_timestamp,
		token_count,
		transaction_count,
		gas_price,
		consensus,
		address_count,
		today_address_count,
		today_transaction_count
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

	const gweiGasPrice = useMemo(() => {
		if (gas_price) {
			return Math.floor(gas_price / 1000000000);
		}

		return null;
	}, [gas_price]);

	if (emptyItem) {
		return <StyledBlockchainCard emptyItem />;
	}

	return (
		<StyledBlockchainCard gradientStart={blockchainGradient.start} gradientEnd={blockchainGradient.end}>
			<StylesCardHeader>
				<Heading type={ETextType.h4}>{name}</Heading>

				<StyledLogoContainer>
					<div>
						<Image src={`/assets/images/blockchains/${id}.svg` || ''} layout='fill' objectFit='contain' />
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
					<Text type={ETextType.p}>{gweiGasPrice}</Text>
				</Flex>
				<Flex as='li' fullWidth horizontal={EFlex.between}>
					<Text type={ETextType.p}>Nodes</Text>
					<Text type={ETextType.p}>{node_count}</Text>
				</Flex>
				<Flex as='li' fullWidth horizontal={EFlex.between}>
					<Text type={ETextType.p}>Today transactions</Text>
					<Text type={ETextType.p}>
						<CountUp
							preserveValue
							end={today_transaction_count || 0}
							duration={3}
							separator=','
							style={{ color: 'inherit' }}
						/>
					</Text>
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
