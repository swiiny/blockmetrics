import { clients } from '../server.js';
import { getBlockchains } from '../utils/fetch.js';
import { subscribeType } from '../utils/variables.js';

export let isBlockchainsActivated = false;

export async function fetchAndSendBlockchains(pool) {
	let con = await pool.getConnection();
	const channel = subscribeType.blockchains;

	isBlockchainsActivated = true;
	let channelClient = [...clients.keys()].filter((client) => client?.subscriptions?.includes(channel));

	while (channelClient?.length) {
		channelClient = [...clients.keys()].filter((client) => client?.subscriptions?.includes(channel));

		const res = await getBlockchains(con, {
			sortBy: 'score',
			desc: true,
			limit: 30
		});

		if (res?.length) {
			const result = {
				channel,
				data: res[0]
			};

			const outbound = JSON.stringify(result);

			channelClient.forEach((client) => {
				client.send(outbound);
			});
		}

		// wait 3 seconds
		await new Promise((resolve) => setTimeout(resolve, 3 * 1000));
	}

	isBlockchainsActivated = false;

	await con.release();
	con = null;

	return 0;
}

export async function fetchAndSendBlockchainsToClient(con, client) {
	const channel = subscribeType.blockchains;

	const res = await getBlockchains(con, {
		sortBy: 'score',
		desc: true,
		limit: 30
	});

	if (res?.length) {
		const result = {
			channel,
			data: res[0]
		};

		const outbound = JSON.stringify(result);

		client.send(outbound);
	}
}
