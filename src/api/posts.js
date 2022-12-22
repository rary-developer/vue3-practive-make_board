import { posts } from 'axios';

//json data 조회하는 페이지

// ./api/index.js
export function getPosts(params) {
	//return axios.get('http://localhost:5000/posts');
	return posts.get('/', { params });
}

export function getPostById(id) {
	return posts.get(`/${id}`);
}

export function createPost(data) {
	return posts.post('', data);
}

//전체를 변경할때(put)
// export function updatePost(id, data) {
// 	return posts.put(`/${id}`, data);
// }

//일부를 수정할때(patch)
export function updatePost(id, data) {
	return posts.patch(`/${id}`, data);
}

export function deletePost(id) {
	return posts.delete(`/${id}`);
}
