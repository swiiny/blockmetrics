import axios from 'axios';
import { EIcon } from '../styles/theme/utils/enum';

export const BLOCKCHAINS = {
	fantom: {
		id: 'fantom',
		name: 'Fantom',
		estimatedTimeBetweenBlocks: 3,
		icon: EIcon.fantom,
		colors: {
			gradient: {
				start: '#13B5EC80',
				end: '#13B5EC20'
			}
		}
	},
	bsc: {
		id: 'binance-smart-chain',
		name: 'Binance SC',
		estimatedTimeBetweenBlocks: 4,
		icon: EIcon.bsc,
		colors: {
			gradient: {
				start: '#F3BA2F80',
				end: '#F3BA2F20'
			}
		}
	},
	avalanche: {
		id: 'avalanche',
		name: 'Avalanche',
		estimatedTimeBetweenBlocks: 3,
		icon: EIcon.avalanche,
		colors: {
			gradient: {
				start: '#E8414280',
				end: '#E8414220'
			}
		}
	},
	polygon: {
		id: 'polygon',
		name: 'Polygon',
		estimatedTimeBetweenBlocks: 3,
		icon: EIcon.polygon,
		colors: {
			gradient: {
				start: '#8247E580',
				end: '#8247E520'
			}
		}
	},
	ethereum: {
		id: 'ethereum',
		name: 'Ethereum',
		estimatedTimeBetweenBlocks: 20,
		icon: EIcon.ethereum,
		colors: {
			gradient: {
				start: '#454A7580',
				end: '#8A92B220'
			}
		}
	},

	bitcoin: {
		id: 'bitcoin',
		name: 'Bitcoin',
		estimatedTimeBetweenBlocks: 600,
		icon: EIcon.bitcoin,
		colors: {
			gradient: {
				start: '#F7931A80',
				end: '#F7931A20'
			}
		}
	}
};

export const BLOCKCHAINS_ARRAY = Object.values(BLOCKCHAINS);

// Object with blockchain id as key and icon as value
export const BLOCKCHAINS_ICONS = BLOCKCHAINS_ARRAY.reduce((acc, blockchain) => {
	// @ts-ignore
	acc[blockchain.id] = blockchain.icon;
	return acc;
}, {});

export const axiosServer = axios.create({
	baseURL: process.env.SERVER_URL
});

export const axiosRest = axios.create({
	baseURL: process.env.API_URL || 'https://api-rest.block-metrics.io',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	}
});

export const axiosWs = axios.create({
	baseURL: process.env.WS_URL || 'https://api-ws.block-metrics.io'
});
