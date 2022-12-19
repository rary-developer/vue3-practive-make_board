<!-- 레이아웃 컴포넌트 나누기 -->
<template>
	<header>
		<nav class="navbar navbar-expand-sm navbar-dark bg-primary">
			<div class="container-fluid">
				<RouterLink class="navbar-brand" to="/">RaryKim</RouterLink>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto">
						<li class="nav-item">
							<!-- RouterLink -->
							<!-- 커스텀 컴포넌트 , 이를통해 페이지를 리로딩하지않고 url에 매핑된 페이지를 렌더링 -->
							<!-- a태그는 리렌더링 -->
							<RouterLink class="nav-link" active-class="active" to="/"
								>Home</RouterLink
							>
						</li>
						<li class="nav-item">
							<RouterLink class="nav-link" active-class="active" to="/about"
								>About</RouterLink
							>
						</li>
						<li class="nav-item">
							<RouterLink class="nav-link" active-class="active" to="/posts"
								>게시글</RouterLink
							>
						</li>
						<li class="nav-item">
							<RouterLink class="nav-link" active-class="active" to="/nested"
								>Nested</RouterLink
							>
						</li>
						<li class="nav-item">
							<RouterLink class="nav-link" active-class="active" to="/my"
								>MyPage</RouterLink
							>
						</li>
					</ul>
					<div class="d-flex" role="search">
						<button class="btn btn-outline-light" type="button" @click="goPage">
							글쓰기
						</button>
					</div>
				</div>
			</div>
		</nav>
	</header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goPage = () => {
	router.push({
		//페이지 이동(객체)
		name: 'PostCreate',
	});
};
</script>

<style lang="scss" scoped></style>
