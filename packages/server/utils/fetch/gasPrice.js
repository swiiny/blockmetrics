import { ethers } from 'ethers';

// fetch gasprice on chain and convert it in Gwei
export async function getGasPrice(rpc) {
	const provider = new ethers.providers.JsonRpcProvider(rpc);
	const gasPrice = await provider.getGasPrice();
	return parseInt(gasPrice._hex, 16) / 10 ** 9;
}
