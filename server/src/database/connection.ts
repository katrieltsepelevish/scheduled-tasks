import mongoose from 'mongoose';

import { config } from './../config';

export const databaseClient = () => {
	const options = { keepAlive: 1, useNewUrlParser: true };
	mongoose.connect(
		config.mongoURL as string,
		options as mongoose.MongooseOptions,
	);

	return mongoose.connection;
};
