import React from 'react';
import type { NextPage } from 'next';
import Meta from '../components/utils/Meta';
import Main from '../styles/layout/Main';
import Header from '../components/Header';
import axios from 'axios';

const HeaderData = {
	title: 'Lorem ipsum',
	subtitle:
		'Lorem ipsu dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
};

const axiosServer = axios.create({
	baseURL: process.env.SERVER_URL
});

const deactivateFetchingData = async (): Promise<void> => {
	console.log('deactivateFetchingData');
	const res = await axiosServer.get('/v1/server/fetch/stop');

	console.log('res', res);
};

const activateFetchingData = async (): Promise<void> => {
	console.log('activateFetchingData');
	const res = await axiosServer.get('/v1/server/fetch/start');

	console.log('res', res);
};

const Home: NextPage = () => {
	return (
		<>
			<Meta title='Block metrics' />

			<Header title={HeaderData.title} subtitle={HeaderData.subtitle} />

			<Main>
				<button onClick={() => deactivateFetchingData()}>stop server</button>
				<button onClick={() => activateFetchingData()}>start server</button>
			</Main>
		</>
	);
};

export default Home;
