import React from 'react';
import type { NextPage } from 'next';
import Meta from '../../../utils/Meta';
import Header from '../../../Header';
import Main from '../../../../styles/layout/Main';
import { ISingleBlockchainPage } from './SingleBlockchainPage.type';

const SingleBlockchainPage: NextPage<ISingleBlockchainPage> = ({ blockchain, metadata }) => {
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
	} = blockchain || {};

	return (
		<>
			<Meta title={name} />

			<Header title={name} subtitle={'fetch data'} image={`assets/images/blockchains/${id}.svg`} />

			<Main></Main>
		</>
	);
};

export { SingleBlockchainPage };
