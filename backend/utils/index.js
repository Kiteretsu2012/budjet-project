export { default as logger } from './loggerUtils.js';
export * from './verifyRequest.js';
export * from './S3ClientUploader.js';

export const slugify = (text) =>
	text
		.toLowerCase()
		.replace(/[^a-zA-Z0-9\s]/g, '')
		.trim()
		.replace(/\s+/g, '-');
