/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { ESubscribeType } from '../../styles/theme/utils/enum';
import { IMessage, IUseWebsocket } from './useWebsocket.type';

let ws: W3CWebSocket | null;

const waitForWsReady = async (ws: W3CWebSocket | null) => {
	if (!ws) {
		return;
	}

	while (ws.readyState !== 1) {
		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	// prevent ws from crashing
	await new Promise((resolve) => setTimeout(resolve, 100));
};

const useWebsocket = (): IUseWebsocket => {
	if (typeof window === 'undefined') {
		return {
			subscribeTo: () => {},
			unsubscribeFrom: () => {},
			wsConnected: false,
			loading: false
		};
	}

	const [loading, setLoading] = useState<boolean>(true);
	const [wsConnected, setWsConnected] = useState<boolean>(false);
	const [message, setMessage] = useState<IMessage | undefined>(undefined);

	const initWebsocket = useCallback(async () => {
		setLoading(true);

		let type;
		let strToRemove;

		// if process.env.WS_URL start with http then replace it by ws
		if ((process.env.WS_URL as string).startsWith('http://')) {
			type = 'ws';
			strToRemove = 'http://';
		} else {
			type = 'wss';
			strToRemove = 'https://';
		}

		const removed = process.env.WS_URL?.replace(strToRemove, '');

		ws = new W3CWebSocket(`${type}://${removed}/`);

		ws.onopen = () => {
			setLoading(false);
			setWsConnected(true);
		};

		ws.onmessage = (e: any) => {
			const res = JSON.parse(e.data);

			if (res?.data === 'ping') {
				// used to check if user is connected
				ws?.send('pong');
			} else {
				setMessage(res);
			}
		};

		ws.onerror = (e: any) => {
			console.error('socket error', e);
		};

		ws.onclose = () => {
			setWsConnected(false);
		};
	}, []);

	const subscribeTo = useCallback(async (channel: ESubscribeType) => {
		await waitForWsReady(ws);
		try {
			ws?.send(
				JSON.stringify({
					type: 'subscribe',
					channel
				})
			);
		} catch (err) {
			console.error('subscribeTo', err);
		}
	}, []);

	const unsubscribeFrom = useCallback(async (channel: ESubscribeType) => {
		await waitForWsReady(ws);
		try {
			ws?.send(
				JSON.stringify({
					type: 'unsubscribe',
					channel
				})
			);
		} catch (err) {
			console.error('unsubscribeFrom', err);
		}
	}, []);

	useEffect(() => {
		initWebsocket();
	}, [initWebsocket]);

	useEffect(() => {
		return () => {
			if (ws?.readyState === 1) {
				ws?.close();
			}
		};
	}, []);

	return {
		subscribeTo,
		unsubscribeFrom,
		message,
		wsConnected,
		loading
	};
};

export { useWebsocket };
