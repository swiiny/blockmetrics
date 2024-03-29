import { clients } from '../server.js';
import { getBlockchainCards } from '../utils/fetch.js';
import { subscribeType } from '../utils/variables.js';

export let isBlockchainCardsActivated = false;

export async function fetchAndSendBlockchainCards(pool) {
	let con = await pool.getConnection();
	const channel = subscribeType.blockchainCards;

	isBlockchainCardsActivated = true;
	let channelClient = [...clients.keys()].filter((client) => client?.subscriptions?.includes(channel));

	while (channelClient?.length) {
		channelClient = [...clients.keys()].filter((client) => client?.subscriptions?.includes(channel));

		const res = await getBlockchainCards(con, {
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

	isBlockchainCardsActivated = false;

	await con.release();
	con = null;

	return 0;
}

export async function fetchAndSendBlockchainCardToClient(con, client) {
	const channel = subscribeType.blockchainCards;

	const res = await getBlockchainCards(con, {
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
