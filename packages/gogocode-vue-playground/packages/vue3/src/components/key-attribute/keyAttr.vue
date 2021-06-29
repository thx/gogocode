<template>
  <div>
    <h1 v-if="version == '2.6.12'">don't have key attribute</h1>
    <h1 v-else>I don't have key attribute</h1>

    <div class="mt20">
      <p v-for="(opt, index) in options" :key="index">
        <span class="mr20">{{ index }}</span> <span>{{ opt }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'keyAttr',
  props: {
    version: String,
    options: Array,
  },
};
</script>

<style>
h1 {
  color: #64b587;
}
</style>
