import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { getBlockchainById, getBlockchains, getMetadataById } from './utils/fetch.js';
import { createDbPool } from './utils/pool.js';

const BASE_URL_V1 = '/v1/api/rest';

// connection pool
let pool;

const limiter = rateLimit({
	windowMs: 1000,
	max: 50,
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

const corsOptions = {
	origin: process.env.FRONTEND_URL,
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
app.get(`${BASE_URL_V1}/get/blockchains`, async (req, res) => {
	const { sortBy = 'blockchain_power_consumption', desc = false, offset = 0, limit = 30 } = req.query;

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
		console.error('/get/blockchains', err);

		res.status(500).send('Error fetching blockchains data');
		return;
	}
});

app.get(`${BASE_URL_V1}/get/blockchain`, async (req, res) => {
	const { id } = req.query;

	try {
		if (!id) {
			res.status(500).send('Missing id');
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
		console.error('/get/blockchain', err);

		res.status(500).send('Error fetching blockchain data where id is ' + id);
		return;
	}
});

app.get(`${BASE_URL_V1}/get/blockchain/metadata`, async (req, res) => {
	const { id, language } = req.query;

	try {
		if (!id) {
			res.status(500).send('Missing id');
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
		console.error('/get/blockchain', err);

		res.status(500).send('Error fetching metadata data where id is ' + id + ' and language is ' + language);
		return;
	}
});

app.get(`${BASE_URL_V1}/get/blockchain/all`, async (req, res) => {
	const { id, language } = req.query;

	try {
		if (!id) {
			res.status(500).send('Missing id');
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
		console.error('/get/blockchain', err);

		res.status(500).send('Error fetching metadata data where id is ' + id + ' and language is ' + language);
		return;
	}
});

// test endpoint, should respond the string "pong"
app.get(`${BASE_URL_V1}/ping`, async (req, res) => {
	res.send('pong');
});

app.listen(process.env.API_PORT, async () => {
	console.log(`Server listening on port ${process.env.API_PORT}`);

	pool = await createDbPool();
});
