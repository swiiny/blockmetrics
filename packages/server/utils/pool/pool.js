import mysql from "mysql2";

async function createDBPoolPromise(params) {
	const pool = mysql.createPool(params);

	pool.getConnection((err, con) => {
		if (err) {
			console.log(err);
			throw err;
		}
	});

	const poolPromise = pool.promise();

	return poolPromise;
}

export async function createDbPool() {
	const params = {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		port: process.env.DB_PORT,
		connectionLimit: 50,
	};
	const poolPromise = await createDBPoolPromise(params);
	return poolPromise;
}
