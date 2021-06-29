<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>


	<div>
		<p>{{text}}</p>
		<p v-html="htmlText">
		</p>
		<p>
			{{comMethod}}
		</p>
		<Child v-on:accepted="emitAccepted"></Child>
  	</div>
  </div>
</template>

<script>
	import Vue from 'vue';
	import Child from './Child';
  /* 迁移指南: https://v3.cn.vuejs.org/guide/migration/emits-option.html */
	export default {
		name: 'emits Option',
		props: {
			msg: String,
		},
		data() {
			return {
				name: 'emits Option',
				text: 'emits Option',
				htmlText: `<span style="color:red">emits Option</span>`,
        		version: Vue.version
			};
		},
		computed: {
			comMethod() {
				return this.name + this.text
			}
		},
		components: {
			Child
		},
		methods: {
			emitAccepted() {
				alert('child ok clicked')
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    color: #64b587;
  }
</style>
