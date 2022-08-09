'use strict';

import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import {
	getBlockchainById,
	getBlockchains,
	getChartByIdAndType,
	getChartGlobalByType,
	getGlobalDataByType,
	getMetadataAndScoreById,
	getMetadataById
} from './utils/fetch.js';
import { createDbPool } from './utils/pool.js';
import { EDailyData, EDailyGlobalData, EGlobalData } from './utils/variables.js';

// connection pool
let pool;

const limiter = rateLimit({
	windowMs: 1000,
	max: 50,
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

const corsOptions = {
	origin: [
		process.env.FRONTEND_URL,
		'https://blockmetrics.jcloud-ver-jpc.ik-server.com',
		'https://blockmetrics.jcloud-ver-jpc.ik-server.com/',
		'https://block-metrics.io',
		'https://block-metrics.io/',
		'https://www.block-metrics.io',
		'https://www.block-metrics.io/',
		'https://block-metrics.com',
		'https://block-metrics.com/',
		'https://www.block-metrics.com',
		'https://www.block-metrics.com/',
		'https://app.swaggerhub.com/'
	],
	methods: ['GET'],
	optionsSuccessStatus: 200
};

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);

// returns blockchains sorted by default by rank
// query parameters could be
// - sortBy: string
// - desc: boolean
// - offset: unsigned number less than limit
// - limit: unsigned number greater than offset
app.get(`/blockchains`, async (req, res) => {
	const { sortBy = 'score', desc = true, offset = 0, limit = 30 } = req.query;

	try {
		const params = {
			sortBy,
			desc,
			offset,
			limit
		};

		const result = await getBlockchains(pool, params);

		if (result[0].length) {
			res.send(result[0]);
			return;
		} else {
			throw new Error('getBlockchains failed');
		}
	} catch (err) {
		console.error('/blockchains', err);

		res.status(500).send('Error fetching blockchains data');
		return;
	}
});

app.get(`/blockchain`, async (req, res) => {
	const { id } = req.query;

	try {
		if (!id) {
			res.status(400).send('Missing id');
			return;
		}

		const result = await getBlockchainById(pool, id);

		if (result[0][0]) {
			res.send(result[0][0]);
			return;
		} else {
			throw new Error('getBlockchain failed');
		}
	} catch (err) {
		console.error('/blockchain', err);

		res.status(500).send('Error fetching blockchain data where id is ' + id);
		return;
	}
});

app.get(`/blockchain/metadata`, async (req, res) => {
	const { id, language } = req.query;

	try {
		if (!id) {
			res.status(400).send('Missing id');
			return;
		}

		const result = await getMetadataById(pool, id, language || 'en');

		if (result[0][0]) {
			res.send(result[0][0]);
			return;
		} else {
			throw new Error('get metadata failed');
		}
	} catch (err) {
		console.error('/blockchain', err);

		res.status(500).send('Error fetching metadata data where id is ' + id + ' and language is ' + language);
		return;
	}
});

app.get(`/blockchain/metadataAndScore`, async (req, res) => {
	const { id, language } = req.query;

	try {
		if (!id) {
			res.status(400).send('Missing id');
			return;
		}

		const result = await getMetadataAndScoreById(pool, id, language || 'en');

		if (result[0][0]) {
			res.send(result[0][0]);
			return;
		} else {
			throw new Error('get metadata failed');
		}
	} catch (err) {
		console.error('/blockchain', err);

		res.status(500).send('Error fetching metadata and score data where id is ' + id + ' and language is ' + language);
		return;
	}
});

app.get(`/blockchain/all`, async (req, res) => {
	const { id, language } = req.query;

	try {
		if (!id) {
			res.status(400).send('Missing id');
			return;
		}

		const blockchainData = await getBlockchainById(pool, id);
		const metadata = await getMetadataById(pool, id, language || 'en');

		if (blockchainData[0][0] && metadata[0][0]) {
			const formattedResult = {
				blockchain: blockchainData[0][0],
				metadata: metadata[0][0]
			};

			res.send(formattedResult);
			return;
		} else {
			throw new Error('get metadata failed');
		}
	} catch (err) {
		console.error('/blockchain', err);

		res
			.status(500)
			.send('Error fetching blockchain and metadata data where id is ' + id + ' and language is ' + language);
		return;
	}
});

app.get(`/blockchain/chart`, async (req, res) => {
	const { id, type } = req.query;

	try {
		if (!id) {
			res.status(400).send('Missing id');
			return;
		}

		if (!type) {
			res.status(400).send('Missing type');
			return;
		} else {
			const isValidType = Object.values(EDailyData).includes(type);

			if (!isValidType) {
				res.status(400).send('Invalid type');
				return;
			}
		}

		const result = await getChartByIdAndType(pool, id, type);

		if (result.length) {
			res.send(result);
			return;
		} else {
			throw new Error('get blockchain chart failed');
		}
	} catch (err) {
		console.error('/blockchain/chart?type=X&id=Y', err);

		res.status(500).send('Error fetching blockchain chart data where id is ' + id + ' and type is ' + type);
		return;
	}
});

app.get(`/blockchains/chart`, async (req, res) => {
	const { type } = req.query;

	try {
		if (!type) {
			res.status(400).send('Missing type');
			return;
		} else {
			const isValidType = Object.values(EDailyGlobalData).includes(type);

			if (!isValidType) {
				res.status(400).send('Invalid type');
				return;
			}
		}

		//const result = await getChartByIdAndType(pool, id, type);
		const result = await getChartGlobalByType(pool, type);

		if (result?.length) {
			res.send(result);
			return;
		} else {
			throw new Error('get blockchain chart failed');
		}
	} catch (err) {
		console.error('/blockchains/chart', err);

		res.status(500).send('Error fetching blockchain chart data where type is ' + type);
		return;
	}
});

app.get(`/blockchains/total`, async (req, res) => {
	const { type } = req.query;

	try {
		if (!type) {
			res.status(400).send('Missing type');
			return;
		} else {
			const isValidType = Object.values(EGlobalData).includes(type);

			if (!isValidType) {
				res.status(400).send('Invalid type');
				return;
			}
		}

		//const result = await getChartByIdAndType(pool, id, type);
		const result = await getGlobalDataByType(pool, type);

		if (result) {
			res.send(result);
			return;
		} else {
			throw new Error('get blockchains total failed');
		}
	} catch (err) {
		console.error('/blockchains/total', err);

		res.status(500).send('Error fetching blockchain chart data where type is ' + type);
		return;
	}
});

app.get(`/ping`, async (req, res) => {
	res.send('pong');
});

app.listen(process.env.API_PORT, async () => {
	console.log(`Server listening on port ${process.env.API_PORT}`);

	pool = await createDbPool();
});
