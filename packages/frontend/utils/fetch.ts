import axios from 'axios';
import { axiosRest } from './variables';

export const getBlockchainById = async (id: string): Promise<void | TBlockchain | null> => {
	try {
		//const { data } = await axiosRest.get(`/get/blockchain?id=${id}`);

		const res = await fetch(process.env.API_URL + '/v1/api/rest/get/blockchain?id=' + id);

		console.log('res: ', res);

		return res.json();
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('getBlockchainById', error);
		} else {
			console.error('getBlockchainById', error);
		}

		return null;
	}
};
