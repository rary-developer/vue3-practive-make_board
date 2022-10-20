import axios from 'axios';

//axios =>서버와 통신하기 위한 비동기 통신 모듈
function create(baseURL, options) {
	const instance = axios.create(Object.assign({ baseURL }, options));

	return instance;
}

export const posts = create(`${import.meta.env.VITE_APP_API_URL}posts/`);
// development : http://localhost:5000/posts/
// production : http://localhost:5001/posts/
