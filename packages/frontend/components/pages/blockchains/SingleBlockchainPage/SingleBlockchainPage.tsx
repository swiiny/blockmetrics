import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import Meta from '../../../utils/Meta';
import Header from '../../../Header';
import Main from '../../../../styles/layout/Main';
import { ISingleBlockchainPage } from './SingleBlockchainPage.type';
import { EIcon, ESize } from '../../../../styles/theme/utils/enum';
import { DataCard } from '../../../texts/DataCard/DataCard';
import Spacing from '../../../../styles/layout/Spacing';
import useWebsocket from '../../../../hooks/useWebsocket';
import { IDataCard } from '../../../texts/DataCard/DataCard.type';
import { StyledList } from './SingleBlockchainPage.styles';
import { getEngNotation } from '../../../../utils/convert';
import InformationCard from '../InformationCard';
import BlockchainData from '../BlockchainData';
import { TBlockchain } from '../../../../types/blockchain';

const SingleBlockchainPage: NextPage<ISingleBlockchainPage> = ({ chainId, chainLogo, name, blockchainChannel }) => {
	const [blockchain, setBlockchain] = useState<TBlockchain>();
	const [tagline, setTagline] = useState<string>('');

	const { subscribeTo, message, wsConnected } = useWebsocket();

	const selectedData = useMemo<IDataCard[]>(() => {
		const result = [];

		const { gas_price, token_count, hashrate, last_block_timestamp, blockchain_power_consumption } = blockchain || {};

		if (token_count) {
			result.push({
				value: token_count,
				isAnimated: true,
				label: token_count <= 1 ? 'Token' : 'Tokens',
				icon: EIcon.token,
				colorAnimationOnUpdate: true,
				reverseColor: true,
				helpText: 'The number of tokens available in the blockchain, a token is a crypto currency'
			});
		}

		if (blockchain_power_consumption) {
			const { value, unit, fullToString } = getEngNotation(blockchain_power_consumption, 'Wh');

			result.push({
				value: value,
				unit: unit,
				isAnimated: true,
				label: '24H Power Consumption',
				icon: EIcon.energy,
				colorAnimationOnUpdate: true,
				reverseColor: true,
				helpText: 'The last 24 hours power consumption of the blockchain',
				fullValue: unit !== ' Wh' ? fullToString : undefined
			});
		}

		if (gas_price) {
			result.push({
				value: Math.floor(gas_price * 10 ** -9),
				unit: 'Gwei',
				label: 'Gas Price',
				icon: EIcon.gas,
				colorAnimationOnUpdate: true,
				helpText:
					'The current gas price of the blockchain, the gas price is used to calculate the fee paid to the miners/validators to execute a transaction.',
				fullValue: gas_price.toString() + ' wei'
			});
		}

		if (last_block_timestamp) {
			result.push({
				value: last_block_timestamp,
				unit: 's',
				isTimer: true,
				label: 'Time from last block',
				icon: EIcon.timer,
				colorAnimationOnUpdate: true,
				reverseColor: true,
				helpText: 'The time since the last block was mined'
			});
		}

		if (hashrate) {
			const { value, unit, hasDecimals, fullToString } = getEngNotation(hashrate * 10 ** 12, 'H/s');

			result.push({
				value: value,
				unit: unit,
				isAnimated: true,
				valueHasDecimals: hasDecimals,
				label: 'Hashrate',
				icon: EIcon.chart,
				colorAnimationOnUpdate: true,
				helpText:
					'The hashrate of the blockchain, a speed of 1 hash per second means that each second a new attempt to validate a block is made',
				fullValue: unit !== 'H/s' ? fullToString : undefined
			});
		}

		return result.slice(0, 4);
	}, [blockchain]);

	useEffect(() => {
		if (blockchainChannel && message?.channel === blockchainChannel) {
			setBlockchain(message?.data);
		}
	}, [message, blockchainChannel]);

	useEffect(() => {
		if (wsConnected && blockchainChannel) {
			subscribeTo(blockchainChannel);
		}
	}, [wsConnected, blockchainChannel, subscribeTo]);

	return (
		<>
			<Meta title={name || ''} />

			<Header title={name || ''} subtitle={tagline} icon={chainLogo} subtitleLoading={!tagline} />

			<Main paddingTop={ESize.unset} noMarginTop>
				<StyledList>
					{selectedData.map((data: IDataCard, i: number) => (
						<DataCard key={data.label} as='li' index={i + 1} {...data} />
					))}
				</StyledList>

				<Spacing size={ESize.xl} />

				<InformationCard chainId={chainId} onGetTagline={(tagline) => setTagline(tagline)} />

				<Spacing size={ESize.xl} />

				<BlockchainData chainId={chainId} />
			</Main>
		</>
	);
};

export { SingleBlockchainPage };
