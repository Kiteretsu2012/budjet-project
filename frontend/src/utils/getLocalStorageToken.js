export const getLocalStorageToken = () => {
	const authToken = localStorage.getItem('AUTH_TOKEN');
	if (!authToken) {
		return null;
	} else {
		return authToken;
	}
};
