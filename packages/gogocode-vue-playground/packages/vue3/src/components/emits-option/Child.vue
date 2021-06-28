<template>
  <div>
	<button v-on:click="$emit('click')">OK</button>
  </div>
</template>

<script>
	export default {
		name: 'emits child',
		props: {
			msg: String,
            obj: Object,
            arr: Array
		},
        emits: ['accepted'],
		data() {
			return {
				name: 'emits Child'
			};
		}
	};
</script>
