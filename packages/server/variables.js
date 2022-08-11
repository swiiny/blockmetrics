export const CHAINS = {
	ethereum: {
		id: 'ethereum',
		name: 'Ethereum',
		type: 'EVM',
		consensus: 'POW',
		chartPrefix: 'https://etherscan.io/chart',
		coingeckoId: 'ethereum',
		defiLamaId: 'ethereum',
		rpc: process.env.RPC_ETHEREUM,
		rpcWs: process.env.RPC_ETHEREUM_WS
	},
	bsc: {
		id: 'binance-smart-chain',
		name: 'Binance SC',
		type: 'EVM',
		chartPrefix: 'https://bscscan.com/chart',
		coingeckoId: 'binance-smart-chain',
		defiLamaId: 'binancecoin',
		rpc: process.env.RPC_BSC,
		rpcWs: process.env.RPC_BSC_WS
	},
	polygon: {
		id: 'polygon',
		name: 'Polygon',
		type: 'EVM',
		chartPrefix: 'https://polygonscan.com/chart',
		coingeckoId: 'polygon-pos',
		defiLamaId: 'matic-network',
		rpc: process.env.RPC_POLYGON,
		rpcWs: process.env.RPC_POLYGON_WS
	},
	bitcoin: {
		id: 'bitcoin',
		name: 'Bitcoin',
		consensus: 'POW',
		chartPrefix: 'https://api.blockchain.info/charts',
		coingeckoId: 'bitcoin',
		rpcWs: 'wss://ws.blockchain.info/inv' // process.env.RPC_BITCOIN_WS
	},
	avalanche: {
		id: 'avalanche',
		name: 'Avalanche',
		type: 'EVM',
		chartPrefix: 'https://snowtrace.io/chart',
		coingeckoId: 'avalanche',
		defiLamaId: 'avalanche-2',
		rpc: process.env.RPC_AVALANCHE,
		rpcWs: process.env.RPC_AVALANCHE_WS
	},
	fantom: {
		id: 'fantom',
		name: 'Fantom',
		type: 'EVM',
		chartPrefix: 'https://ftmscan.com/chart',
		coingeckoId: 'fantom',
		defiLamaId: 'fantom',
		rpc: process.env.RPC_FANTOM,
		rpcWs: process.env.RPC_FANTOM_WS
	}
};

export const CHAINS_ARRAY = Object.values(CHAINS);

// create an object with the chain id as the key and the rpc as the value
export const CHAINS_RPC = CHAINS_ARRAY.reduce((acc, chain) => {
	acc[chain.id] = {
		rpc: chain.rpc,
		rpcWs: chain.rpcWs
	};
	return acc;
}, {});
