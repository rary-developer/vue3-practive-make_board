<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<!-- 
			<div v-for="post in posts" :key="post.id" class="col-4" >
				<PostItem
					:title="post.title"
					:content="post.content"
					:created-at="post.createdAt"
					@click="goPage(post.id)"
				>
				</PostItem>
			</div> 
		-->
		<PostFilter
			v-model:title="params.title_like"
			:limit="params._limit"
			@update:limit="changeLimit"
		></PostFilter>

		<hr class="my-4" />

		<AppLoading v-if="loading" />

		<AppError v-else-if="error" :message="error.message" />

		<template v-else-if="!isExists">
			<p class="text-center py-5">No Results</p>
		</template>

		<template v-else>
			<AppGrid :items="posts" col-class="col-12 col-sm-6 col-md-4 col-lg-3">
				<template v-slot="{ item }">
					<PostItem
						:title="item.title"
						:content="item.content"
						:created-at="item.createdAt"
						@click="goPage(item.id)"
						@modal="openModal(item)"
						@preview="selectPreview(item.id)"
					></PostItem>
				</template>
			</AppGrid>
			<AppPagination
				:current-page="params._page"
				:page-count="pageCount"
				@page="page => (params._page = page)"
			/>
		</template>
		<Teleport to="#modal">
			<PostModal
				v-model="show"
				:title="modalTitle"
				:content="modalContent"
				:createdAt="modalCreatedAt"
			/>
		</Teleport>

		<template v-if="previewId">
			<hr class="my-5" />
			<AppCard>
				<PostDetailView :id="previewId"></PostDetailView>
			</AppCard>
		</template>
	</div>
</template>

<script setup>
import { ref } from 'vue';
//import { getPosts } from '@/api/posts';
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostFilter from '../../components/posts/PostFilter.vue';
import PostModal from '../../components/posts/PostModal.vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useAxios } from '../../hooks/useAxios';

const router = useRouter();

const previewId = ref(null);
const selectPreview = id => (previewId.value = id);

const params = ref({
	//sort => 정렬순서
	_sort: 'createdAt',
	_order: 'desc',
	_limit: 6,
	_page: 1,
	title_like: '',
});

const changeLimit = value => {
	params.value._limit = value;
	params.value._page = 1;
};

const {
	data: posts,
	error,
	loading,
	response,
} = useAxios('/posts', { params });

const isExists = computed(() => posts.value && posts.value.length > 0);

//pagination
//totalCount = 출력갯수
const totalCount = computed(() => response.value.headers['x-total-count']);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

// async await => promise 대신 사용하는 객체(읽기쉬운 문법)

// const fetchPosts = async () => {
// 	try {
// 		loading.value = true;
// 		const { data, headers } = await getPosts(params.value);
// 		posts.value = data;
// 		totalCount.value = headers['x-total-count'];
// 	} catch (err) {
// 		error.value = err;
// 	} finally {
// 		loading.value = false;
// 	}
// };

//fetchPosts(); //최초 한번
//watchEffect(fetchPosts); //반응형 데이터 변경시

const goPage = id => {
	//router.push(`/posts/${id}`);
	//data 는 params에 넣는다(객체)
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
	});
};

//modal
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');
const openModal = ({ title, content, createdAt }) => {
	show.value = true;
	modalTitle.value = title;
	modalContent.value = content;
	modalCreatedAt.value = createdAt;
};
</script>

<style lang="scss" scoped></style>
