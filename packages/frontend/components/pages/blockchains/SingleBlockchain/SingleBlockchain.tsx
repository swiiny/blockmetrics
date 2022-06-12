import React, { useEffect, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { getBlockchainById } from '../../../../utils/fetch';
import { BLOCKCHAINS_ARRAY } from '../../../../utils/variables';
import Meta from '../../../utils/Meta';
import Header from '../../../Header';
import Main from '../../../../styles/layout/Main';
import { ISingleBlockchain } from './SingleBlockchain.type';

const SingleBlockchain: NextPage<ISingleBlockchain> = ({ blockchain, metadata }) => {
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

export { SingleBlockchain };
