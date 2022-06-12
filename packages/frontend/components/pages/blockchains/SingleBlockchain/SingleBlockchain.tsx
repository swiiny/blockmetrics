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
	} = blockchain || {};

	const { subtitle, description } = metadata || {};

	return (
		<>
			<Meta title={name} />

			<Header title={name} subtitle={subtitle} image={logoUrl} />

			<Main></Main>
		</>
	);
};

export { SingleBlockchain };
