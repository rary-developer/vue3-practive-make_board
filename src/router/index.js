import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NestedView from '@/views/nested/NestedView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';
import MyPage from '@/views/MyPage.vue';

// url에 따라 어떤 페이지를 보여줄지 매핑해주는 라이브러리
const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'About',
		component: AboutView,
	},
	{
		path: '/posts',
		name: 'PostList',
		component: PostListView,
	},
	{
		path: '/posts/create',
		name: 'PostCreate',
		component: PostCreateView,
	},
	{
		path: '/posts/:id',
		name: 'PostDetail',
		//파라미터가 해당페이지에 props로 전달
		props: true,
		//객체 함수로도 전달가능
		// props: route => {
		// 	return {
		// 		id: parseInt(route.params.id),
		//		other: (querty, hash...)
		// 	};
		// },
		component: PostDetailView,
	},
	{
		path: '/posts/:id/edit',
		name: 'PostEdit',
		component: PostEditView,
	},
	{
		//정규식 표현을 사용하여 404페이지 출력(not found)
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFoundView,
	},
	{
		path: '/nested',
		name: 'Nested',
		component: NestedView,
		//중첩된 route속성
		children: [
			{
				path: '', //home 빈값
				name: 'NestedHome',
				component: NestedHomeView,
			},
			{
				//절대경로라 '/' 사용 불가 -> 사용시 404
				path: 'one',
				name: 'NestedOne',
				component: NestedOneView,
			},
			{
				path: 'two',
				name: 'NestedTwo',
				component: NestedTwoView,
			},
		],
	},
	{
		path: '/my',
		name: 'MyPage',
		component: MyPage,
		//beforeEnter: (to, from) => {
		//console.log('to :', to);
		//console.log('from :', from);
		//return false;
		//return { name: 'Home' };
		//removeQueryString
		//},
		beforeEnter: [removeQueryString],
	},
];

function removeQueryString(to) {
	if (Object.keys(to.query).length > 0) {
		return { path: to.path, query: {} };
	}
}

const router = createRouter({
	//vue router를 통해 URL로 페이지를 전환할 때
	//히스토리 관리 기법을 해시형으로 쓸수있게 해줌
	history: createWebHistory('/'),
	//history: createWebHashHistory(), //hash Mode
	routes,
});

// router.beforeEach((to, from) => {
// 	console.log('to :', to);
// 	console.log('from :', from);
// 	if (to.name === 'MyPage') {
// 		//router.push({name: 'Home'});
// 		//return false;
// 		//return { name: 'Home' };
// 		return '/posts';
// 	}
// });

export default router;
