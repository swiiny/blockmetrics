import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useMemo, useState } from 'react';
import Flex from '../../../styles/layout/Flex';
import Spacing from '../../../styles/layout/Spacing';
import BMHeading from '../../../styles/theme/components/BMHeading';
import BMText from '../../../styles/theme/components/BMText';
import { EFlex, EIcon, ESize, ETextType } from '../../../styles/theme/utils/enum';
import { BLOCKCHAINS_ARRAY } from '../../../utils/variables';
import { NAVBAR_LINKS } from '../../Navbar/Navbar';
import { IBlockchainCard } from './BlockchainCard.type';
import CountUp from 'react-countup';
import BMCardContainer from '../../../styles/theme/components/BMCardContainer';
import BMIcon from '../../../styles/theme/components/BMIcon';

const BlockchainCard: FC<IBlockchainCard> = ({ data, emptyItem = false }) => {
	if (emptyItem) {
		return <li className='empty' />;
	}

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

	const blockchain = useMemo((): {
		estimatedTimeBetweenBlocks: number;
		icon: EIcon;
	} => {
		let newBlockchain;

		let defaultBlockchain = {
			estimatedTimeBetweenBlocks: 0,
			icon: EIcon.none
		};

		if (id) {
			newBlockchain = BLOCKCHAINS_ARRAY.find((bc) => bc.id === id);
		}

		return newBlockchain || defaultBlockchain;
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

	const [initTodayTransactionCount, setInitTodayTransactionCount] = useState(today_transaction_count);
	const [initTodayAddressCount, setInitTodayAddressCount] = useState(today_address_count);

	return (
		<BMCardContainer>
			<Flex horizontal={EFlex.between}>
				<BMIcon type={blockchain.icon} />
			</Flex>
		</BMCardContainer>
	);
};

export { BlockchainCard };
