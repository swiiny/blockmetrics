import { GetStaticPaths } from 'next';
import { getBlockchainById } from '../../utils/fetch';
import { BLOCKCHAINS_ARRAY } from '../../utils/variables';

export { SingleBlockchain as default } from '../../components/pages/blockchains/SingleBlockchain/SingleBlockchain';

export const getStaticProps = async ({ params }: { params: { name: string } }) => {
	const blockchainId = BLOCKCHAINS_ARRAY.find((bc) => bc.name.toLowerCase().replace(/\s/g, '-') === params.name)?.id;

	console.log('blockchainId', blockchainId);

	const blockchain = await getBlockchainById(blockchainId || '');
	// const metadata = await getBlockchainMetadataById(blockchainId);
	const metadata = {
		subtitle: 'subtitle',
		description:
			'Ethereum was conceived in 2013 by programmer Vitalik Buterin.[4] Additional founders of Ethereum included Gavin Wood, Charles Hoskinson, Anthony Di Iorio and Joseph Lubin.[5] In 2014, development work began and was crowdfunded, and the network went live on 30 July 2015.[6] Ethereum allows anyone to deploy permanent and immutable decentralized applications onto it, with which users can interact.[7] Decentralized finance (DeFi) applications provide a broad array of financial services without the need for typical financial intermediaries like brokerages, exchanges, or banks, such as allowing cryptocurrency users to borrow against their holdings or lend them out for interest.[8][9] Ethereum also allows users to create and exchange NFTs, which are unique tokens representing ownership of an associated asset or privilege, as recognized by any number of institutions. Additionally, many other cryptocurrencies utilize the ERC-20 token standard on top of the Ethereum blockchain and have utilized the platform for initial coin offerings.'
	};

	console.log('blockchain', blockchain);

	if (!blockchain && !metadata) {
		return {
			notFound: true
		};
	}

	return {
		props: {
			blockchain: blockchain,
			metadata: metadata
		},
		revalidate: 1800
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = BLOCKCHAINS_ARRAY.map((bc) => ({
		params: {
			name: bc.name?.toLowerCase().replace(/\s/g, '-')
		}
	}));

	console.log('paths', paths);

	return {
		paths: paths,
		fallback: true
	};
};
