export const CHAINS = {
	ethereum: {
		id: 'ethereum',
		name: 'Ethereum',
		chartPrefix: 'https://etherscan.io/chart',
		coingeckoId: 'ethereum',
		rpc: process.env.RPC_ETHEREUM
	},
	bsc: {
		id: 'binance-smart-chain',
		name: 'Binance SC',
		chartPrefix: 'https://bscscan.com/chart',
		coingeckoId: 'binance-smart-chain',
		rpc: process.env.RPC_BSC
	},
	polygon: {
		id: 'polygon',
		name: 'Polygon',
		chartPrefix: 'https://polygonscan.com/chart',
		coingeckoId: 'polygon-pos',
		rpc: process.env.RPC_POLYGON
	},
	bitcoin: {
		id: 'bitcoin',
		name: 'Bitcoin',
		chartPrefix: 'https://api.blockchain.info/charts',
		coingeckoId: 'bitcoin'
	},
	avalanche: {
		id: 'avalanche',
		name: 'Avalanche',
		chartPrefix: 'https://snowtrace.io/chart',
		coingeckoId: 'avalanche',
		rpc: process.env.RPC_AVALANCHE
	},
	fantom: {
		id: 'fantom',
		name: 'Fantom',
		chartPrefix: 'https://ftmscan.com/chart',
		coingeckoId: 'fantom',
		rpc: process.env.RPC_FANTOM
	}
};

export const CHAINS_ARRAY = Object.values(CHAINS);
