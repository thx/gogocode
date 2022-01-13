<template>
  	<input type="text" :value="text" />
</template>
<script>
export default {
  	name: "ChildValComp",
  	props: [value],
  	data: function () {
    	return {
      	text: "",
    	};
  	},
  	methods: {
    	handleInput: function (e) {
      	const { value } = this;
      	const val = this.value;
      	this.$emit("input", e.target.value);
    	},
  	},
  	watch: {
		value: {
			handler(val, oldVal) {},
		},
  	},
};
</script>
