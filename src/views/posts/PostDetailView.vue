<template>
	<div>
		<h2>{{ post.title }}</h2>
		<p>{{ post.content }}</p>
		<p class="text-muted">{{ post.createdAt }}</p>
		<hr class="my-4" />
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
				<button class="btn btn-outline-danger" @click="remove">삭제</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getPostById, deletePost } from '../../api/posts';

const props = defineProps({
	id: [String, Number],
});

//const route = useRoute();
const router = useRouter();

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
const post = ref({});
//let form = reactive({});
//reactive
//console.log('post:', getPostById(id));

const fetchPost = async () => {
	try {
		const { data } = await getPostById(props.id);
		setPost(data);
		//form.title = data.title;
		//form.content = data.content;
	} catch (error) {
		console.error(error);
	}
};

const setPost = ({ title, content, createdAt }) => {
	post.value.title = title;
	post.value.content = content;
	post.value.createdAt = createdAt;
};

fetchPost();
const remove = async () => {
	try {
		if (confirm('삭제 하시겠습니까?')) {
			await deletePost(props.id);
			router.push({ name: 'PostList' });
		}
	} catch (error) {
		console.error(error);
	}
};
const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
	router.push({ name: 'PostEdit', params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
