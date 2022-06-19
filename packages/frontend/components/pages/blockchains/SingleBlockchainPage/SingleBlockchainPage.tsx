import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import Meta from '../../../utils/Meta';
import Header from '../../../Header';
import Main from '../../../../styles/layout/Main';
import { ISingleBlockchainPage } from './SingleBlockchainPage.type';
import { getBlockchainAndMetadataById } from '../../../../utils/fetch';
import { useRouter } from 'next/router';
import { BLOCKCHAINS_ARRAY } from '../../../../utils/variables';
import { EFlex, ELanguage, ESize, ETextColor } from '../../../../styles/theme/utils/enum';
import Column from '../../../../styles/layout/Column';
import Text from '../../../../styles/theme/components/Text';
import Flex from '../../../../styles/layout/Flex';
import { DataText } from '../../../texts/DataText/DataText';

const SingleBlockchainPage: NextPage<ISingleBlockchainPage> = () => {
	const [blockchain, setBlockchain] = useState<TBlockchain>();
	const [metadata, setMetadata] = useState<TBlockchainMetadata>();

	const { query } = useRouter();
	const { name } = query;

	const initData = useCallback(async () => {
		const blockchainId = BLOCKCHAINS_ARRAY.find((bc) => bc.name.toLowerCase().replace(/\s/g, '-') === name)?.id;

		const result = await getBlockchainAndMetadataById(blockchainId || '', ELanguage.en);

		const { blockchain: fetchedBlockchain, metadata: fetchMetadata } = result || {};

		setBlockchain(fetchedBlockchain);
		setMetadata(fetchMetadata);
	}, [name]);

	const formattedGasPrice = useMemo(() => {
		if (blockchain?.gas_price) {
			const value = (blockchain?.gas_price || 0) * 10 ** -9;
			return Math.floor(value);
		}

		return null;
	}, [blockchain?.gas_price]);

	const selectedData = useMemo(() => {
		const result = [];

		console.log('blockchain', blockchain);

		const { gas_price, token_count, hashrate, last_block_timestamp } = blockchain || {};

		if (gas_price) {
			result.push({
				value: Math.floor(gas_price * 10 ** -9),
				unit: 'Gwei',
				isAnimated: true,
				label: 'Gas Price'
			});
		}

		if (token_count) {
			result.push({
				value: token_count,
				isAnimated: true,
				label: 'Tokens'
			});
		}

		if (hashrate) {
			result.push({
				value: hashrate,
				unit: 'TH/s',
				isAnimated: true,
				label: 'Hashrate'
			});
		}

		if (last_block_timestamp) {
			result.push({
				value: last_block_timestamp,
				unit: 's',
				isTimer: true,
				label: 'Time from last block'
			});
		}

		return result;
	}, [blockchain]);

	useEffect(() => {
		initData();
	}, [name]);

	return (
		<>
			<Meta title={blockchain?.name || ''} />

			<Header
				title={blockchain?.name || ''}
				subtitle={metadata?.tagline || ''}
				image={`/assets/images/blockchains/${blockchain?.id}.svg`}
			/>

			<Main paddingTop={ESize.unset} noMarginTop>
				<Column columns={8} md={12} lg={8}>
					<Flex as='ul' horizontal={EFlex.between} wrapItems paddingY={ESize['3xl']}>
						{selectedData.map(({ value, label, unit, isAnimated, isTimer }) => (
							<DataText
								key={label}
								as='li'
								value={value}
								label={label}
								unit={unit}
								isAnimated={isAnimated}
								isTimer={isTimer}
							/>
						))}
					</Flex>
				</Column>
				<Column columns={6} md={12} lg={8}>
					<Text textColor={ETextColor.light}>{metadata?.description || ''}</Text>
				</Column>
			</Main>
		</>
	);
};

export { SingleBlockchainPage };
