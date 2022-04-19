import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import {
	getAvalancheNodeCount,
	getBitcoinNodeCount,
	getBscNodeCount,
	getEthNodeCount,
	getPolygonNodeCount
} from "./utils/fetch/nodeCount.js";
import { createDbPool } from "./utils/pool/pool.js";
import { updateDbNodeCount } from "./utils/update/nodeCount.js";
import { getBscGasPrice, getEthGasPrice, getPolygonGasPrice } from "./utils/fetch/gasPrice.js";
import { updateDbGasPrice } from "./utils/update/gasPrice.js";

// API v1 url prefix
const BASE_URL_V1 = "/v1/server";

// chain uuid in the database
const chainId = {
	ethereum: "387123e4-6a73-44aa-b57e-79b5ed1246d4",
	bsc: "0bb6df38-231e-47d3-b427-88d16a65580e",
	polygon: "4df0b4ad-2165-4543-a74b-7cdf46f9c5e3",
	bitcoin: "1daa2a79-98cc-49a5-970a-0ad620a8b0d9",
	avalanche: "7fc003e2-680f-4e69-9741-b00c18d2e6dc"
};

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

// fetch blockchains node count and update the database
async function updateNodeCount() {
	try {
		const pool = await createDbPool();
		const con = await pool.getConnection();

		if (!con) {
			return 1;
		}

		const promises = [
			getEthNodeCount()
				.then((res) => {
					updateDbNodeCount(con, chainId.ethereum, res);
					return {
						count: res,
						id: chainId.ethereum
					};
				})
				.catch((err) => null),
			getBscNodeCount()
				.then((res) => {
					updateDbNodeCount(con, chainId.bsc, res);
					return {
						count: res,
						id: chainId.bsc
					};
				})
				.catch((err) => null),
			getPolygonNodeCount()
				.then((res) => {
					updateDbNodeCount(con, chainId.polygon, res);
					return {
						count: res,
						id: chainId.polygon
					};
				})
				.catch((err) => null),
			getAvalancheNodeCount()
				.then((res) => {
					updateDbNodeCount(con, chainId.avalanche, res);
					return {
						count: res,
						id: chainId.avalanche
					};
				})
				.catch((err) => null),
			getBitcoinNodeCount()
				.then((res) => {
					updateDbNodeCount(con, chainId.bitcoin, res);
					return {
						count: res,
						id: chainId.bitcoin
					};
				})
				.catch((err) => null)
		].filter((res) => res !== null);

		/*
  const resolvedPromises = await Promise.all(promises);
	console.log("nodecount", resolvedPromises);
  */

		con.release();

		return 0;
	} catch {
		console.error("updateNodeCount", err);
		return 2;
	}
}

// fetch blockchains gas price and update the database
async function updateGasPrice() {
	try {
		const pool = await createDbPool();
		const con = await pool.getConnection();

		if (!con) {
			return 1;
		}

		const promises = [
			getEthGasPrice()
				.then((res) => {
					updateDbGasPrice(con, chainId.ethereum, res);
					return {
						count: res,
						id: chainId.ethereum
					};
				})
				.catch((err) => null),
			getBscGasPrice()
				.then((res) => {
					updateDbGasPrice(con, chainId.bsc, res);
					return {
						count: res,
						id: chainId.bsc
					};
				})
				.catch((err) => null),
			getPolygonGasPrice()
				.then((res) => {
					updateDbGasPrice(con, chainId.polygon, res);
					return {
						count: res,
						id: chainId.polygon
					};
				})
				.catch((err) => null)
		].filter((res) => res !== null);

		/*
  const resolvedPromises = await Promise.all(promises);
	console.log("nodecount", resolvedPromises);
  */

		con.release();

		return 0;
	} catch (err) {
		console.error("updateGasPrice", err);
		return 2;
	}
}

app.get(`${BASE_URL_V1}/ping`, async (req, res) => {
	res.send("pong");
});

app.listen(process.env.SERVER_PORT, async () => {
	console.log(`Server listening on port ${process.env.SERVER_PORT}`);

	// run on first launch
	updateNodeCount();
	updateGasPrice();

	// update every minutes
	// TODO : when production, increase the interval
	setInterval(() => {
		updateNodeCount();
		updateGasPrice();
	}, 60 * 1000);
});
