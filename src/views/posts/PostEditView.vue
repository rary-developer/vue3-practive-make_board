<template>
	<AppLoading v-if="loading" />
	<AppError v-else-if="error" :message="error.message" />

	<div v-else>
		<h2>게시글 수정</h2>
		<hr class="my-4" />
		<AppError v-if="editError" :message="editError.message" />
		<PostForm
			@submit.prevent="edit"
			v-model:title="form.title"
			v-model:content="form.content"
		>
			<template #actions>
				<button
					type="button"
					class="btn btn-outline-danger"
					@click="goDetailPage"
				>
					취소
				</button>
				<button class="btn btn-primary" :disabled="editLoading">
					<template v-if="editLoading">
						<span
							class="spinner-grow spinner-grow-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else>수정</template>
				</button>
			</template>
		</PostForm>
		<!-- <AppAlert :show="showAlert" :message="alertMessage" :type="alertType" /> -->
	</div>
</template>

<script setup>
//import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
//import { updatePost } from '@/api/posts';
import PostForm from './PostForm.vue';
import { useAlert } from '../../composables/alert';
import { useAxios } from '../../hooks/useAxios';

const { vAlert, vSuccess } = useAlert();

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const { error, loading, data: form } = useAxios(`/posts/${id}`);

const {
	error: editError,
	loading: editLoading,
	execute,
} = useAxios(
	`/posts/${id}`,
	{ method: 'patch' },
	{
		immediate: false,
		onSuccess: () => {
			router.push({ name: 'PostDetail', params: { id } });
			vSuccess('수정이 완료되었습니다.');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const edit = () => {
	execute({
		...form.value,
	});
};

// const fetchPost = async () => {
// 	try {
// 		loading.value = true;
// 		const { data } = await getPostById(id);
// 		setForm(data);
// 	} catch (err) {
// 		error.value = err.message;
// 	} finally {
// 		loading.value = false;
// 	}
// };

// const setForm = ({ title, content }) => {
// 	form.value.title = title;
// 	form.value.content = content;
// };
// fetchPost();

// const editError = ref(null);
// const editLoading = ref(false);

// const edit = async () => {
// 	try {
// 		editLoading.value = true;
// 		await updatePost(id, { ...form.value });
// 		router.push({ name: 'PostDetail', params: { id } });
// 		vSuccess('수정이 완료되었습니다.');
// 	} catch (err) {
// 		vAlert(err.message);
// 		editError.value = err.message;
// 	} finally {
// 		editLoading.value = false;
// 	}
// };

const goDetailPage = () => {
	router.push({ name: 'PostDetail', params: { id } });
};
</script>

<style lang="scss" scoped></style>
