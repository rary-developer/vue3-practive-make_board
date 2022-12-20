<template>
	<div class="card">
		<!-- slot 사용 -->
		<!-- $slots 없을경우 안나옴 -->
		<div v-if="$slots.header" class="card-header">
			<!-- 이름이 있는 slot -->
			<slot name="header"></slot>
		</div>
		<div v-if="$slots.default" class="card-body">
			<!-- default slot -->
			<slot></slot>
		</div>
		<div v-if="$slots.footer" class="card-footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>
