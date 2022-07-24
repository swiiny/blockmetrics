import { getBlockchainById } from '../utils/fetch.js';
import { clients } from '../server.js';

export let blockchainActivated = {};

export async function fetchSingleBlockchain(pool, channel) {
	let con = await pool.getConnection();

	blockchainActivated[channel] = true;

	let channelClient = [...clients.keys()].filter((client) => client?.subscriptions?.includes(channel));

	while (channelClient?.length) {
		channelClient = [...clients.keys()].filter((client) => client?.subscriptions?.includes(channel));

		const res = await getBlockchainById(con, {
			id: channel
		});

		if (res?.length) {
			const result = {
				channel,
				data: res[0][0]
			};

			const outbound = JSON.stringify(result);

			channelClient.forEach((client) => {
				client.send(outbound);
			});
		}

		// wait 3 seconds
		await new Promise((resolve) => setTimeout(resolve, 3 * 1000));
	}

	blockchainActivated[channel] = false;

	await con.release();
	con = null;

	return 0;
}

export async function fetchAndSendSingleBlockchainToClient(con, client, channel) {
	const res = await getBlockchainById(con, {
		id: channel
	});

	if (res?.length) {
		const result = {
			channel,
			data: res[0][0]
		};

		const outbound = JSON.stringify(result);

		client.send(outbound);
	}
}
