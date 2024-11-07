import mongoose from 'mongoose';
import logger from '../utils/loggerUtils.js';
const MONGODB_URI =
	process.env.NODE_ENV === 'production'
		? process.env.MONGODB_URI
		: 'mongodb://localhost:27017/linuxmint';

export const connectToMongoDB = async () => {
	try {
		mongoose.connect(MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			autoCreate: true,
		});
		logger.info('MongoDB database connection established successfully');
	} catch (error) {
		logger.error(error.message);
		logger.info('MongoDB connection error. Please make sure MongoDB is running.');
		process.exit(1);
	}
};
