<template>
	<!--
		404 not found 페이지
		(잘못된 경로)
	-->
	<div class="text-center py-4">
		<h1>Ooops!</h1>
		<h2>404 Not Found</h2>
		<div class="text-muted">요청한 페이지를 찾을 수 없습니다.</div>
		<div class="mt-4">
			<!-- home으로 이동 -->
			<RouterLink to="/">
				<button class="btn btn-primary">Home</button>
			</RouterLink>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
