<template>
    <div>
        <span style="color:red;">{{name}}</span>
        <br>
        <slot></slot>
    </div>
</template>

<script>
	export default {
		name: 'inline-template-attribute-slot',
		props: {
			msg: String,
            obj: Object,
            arr: Array
		},
		data() {
			return {
				name: 'slot示例子组件'
			};
		}
	};
</script>
