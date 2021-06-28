<template>
  <span>这是一个子组件{{name}}</span>
</template>

<script>
	export default {
		name: 'inline-template-attribute',
		props: {
			msg: String,
            obj: Object,
            arr: Array
		},
		data() {
			return {
				name: 'inline-template-attribute子组件'
			};
		}
	};
</script>
