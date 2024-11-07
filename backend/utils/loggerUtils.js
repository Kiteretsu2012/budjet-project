import winston from 'winston';
const { createLogger, format, transports } = winston;

const customFormat = format.printf(({ level, message, timestamp, ...meta }) => {
	const serializedMetadata = JSON.stringify(meta, null, 4);
	const firstParam = typeof message === 'string' ? message : JSON.stringify(message, null, 2);
	return `${timestamp} [${level}] ${typeof message === 'string' ? message : '\n' + firstParam} ${
		serializedMetadata !== '{}' ? ' : ' + serializedMetadata : ''
	}`;
});

const logger = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp({
			format: 'DD-MM-YY HH:mm',
		}),
		format.json(),
		customFormat
	),
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize(),
				format.simple(),
				format.timestamp({
					format: 'DD-MM-YY HH:mm',
				}),
				format.json(),
				customFormat
			),
		}),
	],
});

// ************* //
// Example Usage //
// ************* //

// logger.info("Email sent");
// logger.error("Email not sent", {
// 	email: "email",
// 	useragent: "hahah",
// });

export default logger;
