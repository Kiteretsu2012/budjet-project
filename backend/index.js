import { connectToMongoDB } from '#config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import apiRouter from '#routes';
import { logger } from '#utils';

const PORT = process.env.PORT || 5000;
const app = express();

const main = async () => {
	await connectToMongoDB();
	app.use(
		cors({
			credentials: true,
			origin: ['http://localhost:3000', 'https://budjet.me', 'https://api.budjet.me'],
		})
	);

	app.use(express.json({ limit: '50mb' }));
	app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 5000 }));
	// app.use(express.static(path.resolve('../', 'frontend', 'dist')));
	app.use(
		helmet({
			referrerPolicy: {
				policy: 'no-referrer-when-downgrade',
			},
		})
	);
	app.use(
		compression({
			level: 9,
		})
	);

	app.use('/', apiRouter);

	app.listen(PORT, () => {
		logger.info(`Running at PORT: ${PORT}`);
	});
};

main();
