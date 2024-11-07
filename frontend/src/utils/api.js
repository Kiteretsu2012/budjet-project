import ky from 'ky';

const isInProduction = import.meta.env.PROD;

const prefixUrl = isInProduction ? 'https://api.budjet.me' : 'http://localhost:5000';

const kyInstance = ky.create({
	hooks: {
		beforeRequest: [
			async (req) => {
				if (!req.url.endsWith('/user/auth')) {
					req.headers.set('Authorization', localStorage.getItem('AUTH_TOKEN'));
				}
			},
		],
	},
	credentials: 'include',
	prefixUrl,
});

const api = {
	...kyInstance,
	/**
	 * @param path {String}
	 */
	post: (path, body) => {
		const input = path[0] === '/' ? path.slice(1) : path;
		return kyInstance.post(input, { json: body }).json();
	},
};

export default api;
