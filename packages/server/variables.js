export const CHAINS = {
	ethereum: {
		id: 'ethereum',
		name: 'Ethereum',
		type: 'EVM',
		consensus: 'POW',
		chartPrefix: 'https://etherscan.io/chart',
		coingeckoId: 'ethereum',
		rpc: process.env.RPC_ETHEREUM,
		rpcWs: process.env.RPC_ETHEREUM_WS
	},
	bsc: {
		id: 'binance-smart-chain',
		name: 'Binance SC',
		type: 'EVM',
		chartPrefix: 'https://bscscan.com/chart',
		coingeckoId: 'binance-smart-chain',
		rpc: process.env.RPC_BSC,
		rpcWs: process.env.RPC_BSC_WS
	},
	polygon: {
		id: 'polygon',
		name: 'Polygon',
		type: 'EVM',
		chartPrefix: 'https://polygonscan.com/chart',
		coingeckoId: 'polygon-pos',
		rpc: process.env.RPC_POLYGON,
		rpcWs: process.env.RPC_POLYGON_WS
	},
	bitcoin: {
		id: 'bitcoin',
		name: 'Bitcoin',
		consensus: 'POW',
		chartPrefix: 'https://api.blockchain.info/charts',
		coingeckoId: 'bitcoin'
	},
	avalanche: {
		id: 'avalanche',
		name: 'Avalanche',
		type: 'EVM',
		chartPrefix: 'https://snowtrace.io/chart',
		coingeckoId: 'avalanche',
		rpc: process.env.RPC_AVALANCHE,
		rpcWs: process.env.RPC_AVALANCHE_WS
	},
	fantom: {
		id: 'fantom',
		name: 'Fantom',
		type: 'EVM',
		chartPrefix: 'https://ftmscan.com/chart',
		coingeckoId: 'fantom',
		rpc: process.env.RPC_FANTOM,
		rpcWs: process.env.RPC_FANTOM_WS
	}
};

export const CHAINS_ARRAY = Object.values(CHAINS);
