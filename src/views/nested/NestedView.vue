<template>
	<div>
		<ul class="nav nav-pills">
			<li class="nav-item">
				<!-- 
					router.replace - history따라서 찾아간다 
					대체..
				-->
				<RouterLink
					class="nav-link"
					active-class="active"
					:to="{ name: 'NestedOne', replace: true }"
					>Nested One</RouterLink
				>
			</li>
			<li class="nav-item">
				<RouterLink
					class="nav-link"
					active-class="active"
					:to="{ name: 'NestedTwo', replace: true }"
					>Nested Two</RouterLink
				>
			</li>
		</ul>
		<hr />
		<RouterView></RouterView>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
