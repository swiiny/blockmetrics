import axios from 'axios';

export const BLOCKCHAINS = {
	ethereum: {
		id: 'ethereum',
		name: 'Ethereum',
		colors: {
			gradient: {
				start: '#454A7580',
				end: '#8A92B220'
			}
		}
	},
	bsc: {
		id: 'binance-smart-chain',
		name: 'Binance SC',
		colors: {
			gradient: {
				start: '#F3BA2F80',
				end: '#F3BA2F20'
			}
		}
	},
	polygon: {
		id: 'polygon',
		name: 'Polygon',
		colors: {
			gradient: {
				start: '#8247E580',
				end: '#8247E520'
			}
		}
	},
	bitcoin: {
		id: 'bitcoin',
		name: 'Bitcoin',
		colors: {
			gradient: {
				start: '#F7931A80',
				end: '#F7931A20'
			}
		}
	},
	avalanche: {
		id: 'avalanche',
		name: 'Avalanche',
		colors: {
			gradient: {
				start: '#E8414280',
				end: '#E8414220'
			}
		}
	},
	fantom: {
		id: 'fantom',
		name: 'Fantom',
		colors: {
			gradient: {
				start: '#13B5EC80',
				end: '#13B5EC20'
			}
		}
	}
};

export const BLOCKCHAINS_ARRAY = Object.values(BLOCKCHAINS);

export const axiosServer = axios.create({
	baseURL: process.env.SERVER_URL + '/v1/server'
});

export const axiosRest = axios.create({
	baseURL: process.env.API_URL + '/v1/api/rest'
});

export const axiosWs = axios.create({
	baseURL: process.env.WS_URL
});