import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { createDbPool } from "./pools/dbPool";
import { getBlockchains } from "./functions";

const BASE_URL_V1 = "/v1/api";

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
	const { sortBy, desc, offset = 0, limit = 30 } = req.query;

	try {
		const params = parseParams(sortBy, desc, offset, limit);

		if (params.error) {
			res.status(500).send(params.error);
			return;
		}

		const result = await getBlockchains(pool, params);

		if (result) {
			res.send(result);
			return;
		} else {
			throw new Error("getBlockchains failed");
		}
	} catch (err) {
		console.error("/get/blockchains", err);
		res.status(500).send("Error fetching blockchains data");
		return;
	}
});

// test endpoint, should respond the string "pong"
app.get(`${BASE_URL_V1}/ping`, async (req, res) => {
	res.send("pong");
});

app.listen(process.env.API_PORT, async () => {
	console.log(`Server listening on port ${process.env.API_PORT}`);

	pool = await createDbPool();
});
