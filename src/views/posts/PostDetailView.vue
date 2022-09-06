<template>
	<AppLoading v-if="loading" />
	<AppError v-else-if="error" :message="error.message" />
	<div v-else>
		<h2>{{ post.title }}</h2>
		<p>id: {{ props.id }}, isOdd: {{ isOdd }}</p>
		<p>{{ post.content }}</p>
		<p class="text-muted">
			{{ $dayjs(post.createdAt).format('YYYY.MM.DD HH:mm:ss') }}
		</p>
		<hr class="my-4" />
		<AppError v-if="removeError" :message="removeError.message" />
		<div class="row g-2">
			<div class="col-auto">
				<button class="btn btn-outline-dark">이전글</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-dark">다음글</button>
			</div>
			<div class="col-auto me-auto"></div>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="goListPage">목록</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" @click="goEditPage">
					수정
				</button>
			</div>
			<div class="col-auto">
				<button
					class="btn btn-outline-danger"
					@click="remove"
					:disabled="removeLoading"
				>
					<template v-if="removeLoading">
						<span
							class="spinner-grow spinner-grow-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else>삭제</template>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
//import { ref } from 'vue';
import { computed, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '../../composables/alert';
import { useNumber } from '../../composables/number';
//import { deletePost } from '../../api/posts';
import { useAxios } from '../../hooks/useAxios';

const props = defineProps({
	id: [String, Number],
});

//const route = useRoute();
const router = useRouter();
//const idRef = toRef(props, 'id');
const { id: idRef } = toRefs(props);
const { isOdd } = useNumber(idRef);
//const id = route.params.id;
/*
 * ref
 * 장) 객체 할당 가능, 일관성
 * 단) form.value.title, form.value.content
 *
 * reactive
 * 장) form.title, form.content
 * 단) 객체 할당 불가능
 */
//let form = reactive({});
//reactive
//console.log('post:', getPostById(id));
const { vAlert, vSuccess } = useAlert();
const url = computed(() => `/posts/${props.id}`);
const { error, loading, data: post } = useAxios(url);

const {
	error: removeError,
	loading: removeLoading,
	execute,
} = useAxios(
	`/posts/${props.id}`,
	{ method: 'delete' },
	{
		immediate: false,
		onSuccess: () => {
			vSuccess('삭제가 완료되었습니다.');
			router.push({ name: 'PostList' });
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

// const fetchPost = async () => {
// 	try {
// 		loading.value = true;
// 		const { data } = await getPostById(props.id);
// 		setPost(data);
// 		//form.title = data.title;
// 		//form.content = data.content;
// 	} catch (err) {
// 		error.value = err.message;
// 	} finally {
// 		loading.value = false;
// 	}
// };

// const setPost = ({ title, content, createdAt }) => {
// 	post.value.title = title;
// 	post.value.content = content;
// 	post.value.createdAt = createdAt;
// };

// fetchPost();

// const removeError = ref(null);
// const removeLoading = ref(false);

const remove = async () => {
	//try {
	//	removeLoading.value = true;
	if (confirm('삭제 하시겠습니까?') === false) {
		return;
	}
	execute();
	// 		await deletePost(props.id);
	// 		router.push({ name: 'PostList' });
	// 	}
	// } catch (err) {
	// 	console.error(err);
	// 	removeError.value = err.message;
	// } finally {
	// 	removeLoading.value = false;
	// }
};
const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
	router.push({ name: 'PostEdit', params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
