import { ethers } from 'ethers';

// fetch gasprice on chain
export async function getGasPrice(rpc) {
	const provider = new ethers.providers.JsonRpcProvider(rpc);
	const gasPrice = await provider.getGasPrice();
	return parseInt(gasPrice._hex, 16) / 10 ** 9;
}
