<template>
  <div>
	<button v-on:click="$emit('accepted')">OK</button>
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
		data() {
			return {
				name: 'emits Child'
			};
		}
	};
</script>
