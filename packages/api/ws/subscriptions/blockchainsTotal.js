import { getBlockchainsTotalForProperty } from '../utils/fetch.js';
import { clients } from '../server.js';
import { blockchainTotalToColumnName } from '../utils/variables.js';

export let blockchainsTotalActivated = {};

export async function fetchBlockchainTotal(pool, channel) {
	let con = await pool.getConnection();

	blockchainsTotalActivated[channel] = true;

	let channelClient = [...clients.keys()].filter((client) => client?.subscriptions?.includes(channel));

	const property = blockchainTotalToColumnName[channel];

	while (channelClient?.length) {
		channelClient = [...clients.keys()].filter((client) => client?.subscriptions?.includes(channel));

		const res = await getBlockchainsTotalForProperty(con, {
			property
		});

		if (res?.length) {
			const result = {
				channel,
				data: res[0][0].value
			};

			const outbound = JSON.stringify(result);

			channelClient.forEach((client) => {
				client.send(outbound);
			});
		}

		// wait 3 seconds
		await new Promise((resolve) => setTimeout(resolve, 3 * 1000));
	}

	blockchainsTotalActivated[channel] = false;

	await con.release();
	con = null;

	return 0;
}

export async function fetchBlockchainTotalToClient(con, client, channel) {
	const property = blockchainTotalToColumnName[channel];

	const res = await getBlockchainsTotalForProperty(con, {
		property
	});

	if (res?.length) {
		const result = {
			channel,
			data: res[0][0].value
		};

		const outbound = JSON.stringify(result);

		client.send(outbound);
	}
}
