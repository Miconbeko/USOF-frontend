import axios from "axios";

const API_URL = `http://localhost:14880/api`;

const api = axios.create({
	baseURL: API_URL,
});

api.routes = {
	register: `/auth/register`,
	login: `/auth/login`,
	allPosts: `/posts`,
	postById: (id) => `/posts/${id}`,
	commentsToPost: (id) => `/posts/${id}/comments`,
	userByLogin: (login) => `/users/${login}`,
};

api.catcher = (err, fn = console.error) => {
	if (err.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		fn(err.response.data.message);
		// console.log(err.response.data);
		// console.log(err.response.status);
		// console.log(err.response.headers);
	} else if (err.request) {
		// The request was made but no response was received
		// `err.request` is an instance of XMLHttpRequest in the browser and an instance of
		// http.ClientRequest in node.js
		fn(`Server didn't respond`);
		// console.log(err.request);
	} else {
		// Something happened in setting up the request that triggered an Error
		fn(`Internal server error`);
		// console.log('Error', err.message);
	}
	// console.log(err.config);
};

export default api;
