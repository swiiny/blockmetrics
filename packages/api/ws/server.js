'use strict';

import { WebSocketServer } from 'ws';
import { createDbPool } from './utils/pool.js';
import {
	fetchAndSendBlockchains,
	fetchAndSendBlockchainsToClient,
	isBlockchainsActivated
} from './subscriptions/blockchains.js';
import { blockchainId, blockchainTotal, subscribeType } from './utils/variables.js';
import {
	blockchainActivated,
	fetchAndSendSingleBlockchainToClient,
	fetchSingleBlockchain
} from './subscriptions/blockchain.js';
import {
	blockchainsTotalActivated,
	fetchBlockchainTotal,
	fetchBlockchainTotalToClient
} from './subscriptions/blockchainsTotal.js';
import {
	fetchAndSendBlockchainCards,
	fetchAndSendBlockchainCardToClient,
	isBlockchainCardsActivated
} from './subscriptions/blockchainCards.js';

// connection pool
let pool;

const wss = new WebSocketServer({
	port: process.env.WS_PORT,
	perMessageDeflate: false
});

// user connected to the websocket
export const clients = new Map();

function checkSubscriptions(con, client, channelToCheck) {
	if (channelToCheck === subscribeType.blockchains) {
		if (!isBlockchainsActivated) {
			fetchAndSendBlockchains(pool);
		} else {
			// send data to clients without delay
			fetchAndSendBlockchainsToClient(con, client);
		}

		return;
	}

	if (channelToCheck === subscribeType.blockchainCards) {
		if (!isBlockchainCardsActivated) {
			fetchAndSendBlockchainCards(pool);
		} else {
			// send data to clients without delay
			fetchAndSendBlockchainCardToClient(con, client);
		}

		return;
	}

	if (blockchainId[channelToCheck]) {
		Object.values(blockchainId)
			.filter((id) => id === channelToCheck)
			.map((id) => {
				console.log('=> fetching blockchain: ', id);
				if (!blockchainActivated[id]) {
					fetchSingleBlockchain(pool, id);
				} else {
					fetchAndSendSingleBlockchainToClient(con, client, id);
				}
			});

		return;
	}

	if (blockchainTotal[channelToCheck]) {
		Object.values(blockchainTotal)
			.filter((channel) => channel === channelToCheck)
			.map((channel) => {
				if (!blockchainsTotalActivated[channel]) {
					fetchBlockchainTotal(pool, channel);
				} else {
					fetchBlockchainTotalToClient(con, client, channel);
				}
			});

		return;
	}
}

async function startWebsocketServer() {
	const con = await pool.getConnection();
	// heartbeat detect and delete dead connection
	setInterval(() => {
		wss.clients.forEach(function each(ws) {
			if (ws.isAlive === false) return ws.terminate();

			ws.isAlive = false;
			ws.send(JSON.stringify({ data: 'ping' }));
		});
	}, 30000);

	wss.on('connection', (ws) => {
		ws.isAlive = true;

		ws.on('message', (message) => {
			const strMessage = message?.toString();

			if (!strMessage) {
				return;
			}

			if (strMessage === 'pong') {
				ws.isAlive = true;
				return;
			}

			const data = JSON.parse(strMessage);

			if (data?.type === 'subscribe') {
				if (!ws.subscriptions) {
					ws.subscriptions = [];
				}

				ws.subscriptions.push(data.channel);

				checkSubscriptions(con, ws, data.channel);
			} else if (data?.type === 'unsubscribe') {
				if (!ws.subscriptions) {
					return;
				}

				ws.subscriptions = ws.subscriptions.filter((sub) => sub !== data.channel);
			}
		});

		clients.set(ws);

		console.log('current clients: ', clients.size);

		ws.on('close', () => {
			clients.delete(ws);

			console.log('current clients: ', clients.size);

			if (clients.size === 0) {
				console.log('=> streaming stopped');
			}
		});
	});
}

async function init() {
	pool = await createDbPool();

	startWebsocketServer();
}

init();

const res = {
	result: 4099,
	methodName: 'AddNode',
	source: 'JEL',
	error:
		'The [ jem passwd set ] operation has failed: Container return error message: /.jelenv: line 8: unexpected EOF while looking for matching `"\'\n/.jelenv: line 18: syntax error: unexpected end of file',
	params: {
		params: {
			cluster: false,
			diskLimit: 50000,
			deferCheckQuotas: null,
			extipv6: 0,
			hx_lang: 'fr',
			fakeId: '30a677ca-f865-49d5-a3b5-6621ed4d0247',
			startServiceOnCreation: true,
			scalingMode: 'STATELESS',
			flexibleCloudlets: 6,
			nodeType: 'mysql',
			env: {
				PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
				MYSQL_DATABASE: 'dns-db',
				MYSQL_PASSWORD: 'nd-evxIOiP6',
				PHPMYADMIN_VERSION: '5.2.0',
				MYSQL_USER: '2v32t_dns',
				ADMINPANEL_ENABLED: 'true',
				JELASTIC_AUTOCONFIG: 'true',
				JELASTIC_EXPOSE: 'false',
				STACK_VERSION: '8.0.30',
				MAX_OOM_REDUCE_CYCLES: '5',
				OOM_ADJUSTMENT: '10%',
				STACK_USER: 'mysql',
				MYSQL_VERSION: '8.0.30',
				MYSQL_ROOT_PASSWORD: 'ergr514564ç*%¢* "*c54rg4654684*c64%5sf',
				OOM_DETECTION_DELTA: '10',
				ON_ENV_INSTALL:
					'https://raw.githubusercontent.com/jelastic-jps/mysql-cluster/master/addons/auto-clustering/auto-cluster.jps'
			},
			convertDisk: false,
			nodeGroup: 'sqldb',
			nodeGroupData: { cluster: { enabled: false } },
			extip: 0,
			dockerEnvVars: {
				PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
				MYSQL_DATABASE: 'dns-db',
				MYSQL_PASSWORD: 'nd-evxIOiP6',
				PHPMYADMIN_VERSION: '5.2.0',
				MYSQL_USER: '2v32t_dns',
				ADMINPANEL_ENABLED: 'true',
				JELASTIC_AUTOCONFIG: 'true',
				JELASTIC_EXPOSE: 'false',
				STACK_VERSION: '8.0.30',
				MAX_OOM_REDUCE_CYCLES: '5',
				OOM_ADJUSTMENT: '10%',
				STACK_USER: 'mysql',
				MYSQL_VERSION: '8.0.30',
				MYSQL_ROOT_PASSWORD: 'ergr514564ç*%¢* "*c54rg4654684*c64%5sf',
				OOM_DETECTION_DELTA: '10',
				ON_ENV_INSTALL:
					'https://raw.githubusercontent.com/jelastic-jps/mysql-cluster/master/addons/auto-clustering/auto-cluster.jps'
			},
			startService: 0,
			actionkey: '1661696198962;changetopology;9b9d429ab6d9ba679e060a7a8c0f28f6;dogenameservice-app;5886',
			restartDelay: 30,
			__prepareNode__: 1,
			tag: '8.0.30',
			fixedCloudlets: 4,
			targetAppid: '9b9d429ab6d9ba679e060a7a8c0f28f6'
		},
		script: 'AddNode',
		clearUnknown: true
	},
	__info: {
		params: {
			envName: 'dogenameservice-app',
			session: '********',
			actionkey: '********',
			env: '{"region":"user2_hn_group","sslstate":false,"ishaenabled":false}',
			nodes:
				'[{"nodeType":"nginx-dockerized","nodeGroup":"bl","count":1,"restartDelay":30,"tag":"1.22.0","fixedCloudlets":1,"flexibleCloudlets":4},{"nodeType":"docker","nodeGroup":"cp","count":2,"restartDelay":300,"tag":"latest","fixedCloudlets":1,"flexibleCloudlets":16,"image":"blockmetrics/dogenameservice-app:latest","mission":"cp"},{"nodeType":"mysql","nodeGroup":"sqldb","count":1,"restartDelay":30,"diskLimit":50,"extip":0,"extipv6":0,"scalingMode":"STATELESS","cluster":false,"tag":"8.0.30","fixedCloudlets":4,"flexibleCloudlets":6,"env":{"MYSQL_USER":"2v32t_dns","MYSQL_ROOT_PASSWORD":"********","MYSQL_PASSWORD":"********","MYSQL_DATABASE":"dns-db","ADMINPANEL_ENABLED":"true","JELASTIC_AUTOCONFIG":"true","JELASTIC_EXPOSE":"false","MAX_OOM_REDUCE_CYCLES":"5","MYSQL_VERSION":"8.0.30","ON_ENV_INSTALL":"https://raw.githubusercontent.com/jelastic-jps/mysql-cluster/master/addons/auto-clustering/auto-cluster.jps","OOM_ADJUSTMENT":"10%","OOM_DETECTION_DELTA":"10","PATH":"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","PHPMYADMIN_VERSION":"5.2.0","STACK_USER":"mysql","STACK_VERSION":"8.0.30"}},{"nodeType":"docker","nodeGroup":"docker2","count":1,"restartDelay":30,"tag":"latest","fixedCloudlets":1,"flexibleCloudlets":8,"image":"blockmetrics/dns-twitter-bot:latest","order":22,"mission":"docker"},{"nodeType":"docker","nodeGroup":"docker4","count":1,"restartDelay":0,"tag":"latest","fixedCloudlets":1,"flexibleCloudlets":16,"image":"blockmetrics/dns-ws-api:latest","order":23,"mission":"docker"},{"nodeType":"docker","nodeGroup":"docker3","count":1,"restartDelay":0,"tag":"latest","fixedCloudlets":1,"flexibleCloudlets":16,"image":"blockmetrics/dns-rest-api:latest","order":24,"mission":"docker"}]',
			charset: 'UTF-8',
			hx_lang: 'fr',
			ruk: '021ed767-3e89-4a5c-842b-tab31669',
			debug: {
				startTime: 1661696198962,
				duration: 217498,
				headers: {
					'x-xss-protection': '1; mode=block',
					'x-content-type-options': 'nosniff',
					'strict-transport-security': 'max-age=15811200',
					server: 'openresty',
					pragma: 'no-cache',
					expires: 'Sun, 28 Aug 2022 14:20:15 GMT',
					date: 'Sun, 28 Aug 2022 14:20:16 GMT',
					'content-language': 'fr-FR',
					'cache-control': 'no-cache',
					'access-control-allow-origin': '*'
				},
				userAgent:
					'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36',
				cookieEnabled: true,
				browserLang: 'fr-FR',
				timezoneOffset: -120,
				tabId: 'tab31669',
				requestCount: 2959,
				initiator:
					'Error\n    at constructor.onBeforeRequest (https://app.jpc.infomaniak.com/optimum/js/84e1eb9a7a58699ad104a6fa7689193d.out.js:1606:70445)\n    at h.Event.fire (https://app.jpc.infomaniak.com/optimum/js/84e1eb9a7a58699ad104a6fa7689193d.out.js:1598:6183)\n    at constructor.fireEvent (https://app.jpc.infomaniak.com/optimum/js/84e1eb9a7a58699ad104a6fa7689193d.out.js:14:687)\n    at constructor.request (https://app.jpc.infomaniak.com/optimum/js/84e1eb9a7a58699ad104a6fa7689193d.out.js:1566:23230)\n   ...',
				app: { host: 'app.jpc.infomaniak.com', lang: 'fr', locale: 'fr-fr', version: '7.2.1' },
				user: { uid: 5886, status: 1, group: 'billing' },
				method: 'POST',
				retriesCount: 0,
				requestId: 2585,
				httpStatus: 200,
				statusText: 'n/a',
				responseText:
					'{"result":0,"response":{"result":4099,"methodName":"AddNode","source":"JEL","error":"The [ jem passwd set ] operation has failed: Container return error message: /.jelenv: line 8: unexpected EOF while looking for matching `\\"\'\\n/.jelenv: line 18: syntax error: unexpected end of file","params":{"params":{"cluster":false,"diskLimit":50000,"deferCheckQuotas":null,"extipv6":0,"hx_lang":"fr","fakeId":"30a677ca-f865-49d5-a3b5-6621ed4d0247","startServiceOnCreation":true,"scalingMode":"STATELESS","flexibleCloudlets":6,"nodeType":"mysql","env":{"PATH":"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","MYSQL_DATABASE":"dns-db","MYSQL_PASSWORD":"********","PHPMYADMIN_VERSION":"5.2.0","MYSQL_USER":"2v32t_dns","ADMINPANEL_ENABLED":"true","JELASTIC_AUTOCONFIG":"true","JELASTIC_EXPOSE":"false","STACK_VERSION":"8.0.30","MAX_OOM_REDUCE_CYCLES":"5","OOM_ADJUSTMENT":"10%","STACK_USER":"mysql","MYSQL_VERSION":"8.0.30","MYSQL_ROOT_PASSWORD":"********","OOM_DETECTION_DELTA":"10","ON_ENV_INSTALL":"https://raw.githubusercontent.com/jelastic-jps/mysql-cluster/master/addons/auto-clustering/auto-cluster.jps"},"convertDisk":false,"nodeGroup":"sqldb","nodeGroupData":{"cluster":{"enabled":false}},"extip":0,"dockerEnvVars":{"PATH":"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","MYSQL_DATABASE":"dns-db","MYSQL_PASSWORD":"********","PHPMYADMIN_VERSION":"5.2.0","MYSQL_USER":"2v32t_dns","ADMINPANEL_ENABLED":"true","JELASTIC_AUTOCONFIG":"true","JELASTIC_EXPOSE":"false","STACK_VERSION":"8.0.30","MAX_OOM_REDUCE_CYCLES":"5","OOM_ADJUSTMENT":"10%","STACK_USER":"mysql","MYSQL_VERSION":"8.0.30","MYSQL_ROOT_PASSWORD":"********","OOM_DETECTION_DELTA":"10","ON_ENV_INSTALL":"https://raw.githubusercontent.com/jelastic-jps/mysql-cluster/master/addons/auto-clustering/auto-cluster.jps"},"startService":0,"actionkey":"********","restartDelay":30,"__prepareNode__":1,"tag":"8.0.30","fixedCloudlets":4,"targetAppid":"9b9d429ab6d9ba679e060a7a8c0f28f6"},"script":"AddNode"}}}',
				aborted: false,
				timedout: false
			}
		},
		url: '/JElastic/env/control/rest/changetopology',
		startTime: 1661696198962,
		duration: 217498,
		headers: {
			'x-xss-protection': '1; mode=block',
			'x-content-type-options': 'nosniff',
			'strict-transport-security': 'max-age=15811200',
			server: 'openresty',
			pragma: 'no-cache',
			expires: 'Sun, 28 Aug 2022 14:20:15 GMT',
			date: 'Sun, 28 Aug 2022 14:20:16 GMT',
			'content-language': 'fr-FR',
			'cache-control': 'no-cache',
			'access-control-allow-origin': '*'
		}
	}
};
