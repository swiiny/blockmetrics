import { GetStaticPaths, GetStaticProps } from 'next';
import { EIcon, ESubscribeType } from '../../styles/theme/utils/enum';
import { getEnumFromValue } from '../../styles/theme/utils/functions';
import { BLOCKCHAINS_ARRAY } from '../../utils/variables';

export { SingleBlockchainPage as default } from '../../components/pages/blockchains/SingleBlockchainPage/SingleBlockchainPage';

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { name } = ctx.params || { name: '' };

	try {
		const blockchain = BLOCKCHAINS_ARRAY.find((bc) => bc.name.toLowerCase().replace(/\s/g, '-') === name);

		if (!blockchain) {
			return {
				notFound: true
			};
		}

		const { id } = blockchain;

		return {
			props: {
				chainId: id,
				name: blockchain.name,
				chainLogo: getEnumFromValue(id, EIcon),
				blockchainChannel: getEnumFromValue(id, ESubscribeType)
			},
			revalidate: process.env.NODE_ENV === 'production' ? 30 * 60 : 10 // 1800
		};
	} catch {
		return {
			notFound: true
		};
	}
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = BLOCKCHAINS_ARRAY.map(({ name }) => ({
		params: {
			name: name.toLowerCase().replace(/\s/g, '-')
		}
	}));

	return {
		paths: paths,
		fallback: true
	};
};
