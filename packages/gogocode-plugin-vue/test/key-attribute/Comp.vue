<template>
  <div>
    <transition v-if="condition1" key="a" name="slide">
      <div class="z-10">z10</div>
    </transition>

    <transition v-else-if="condition2" key="b" name="menina-nav-fade" appear>
      <div class="z-20">z20</div>
    </transition>

    <transition v-else key="c" name="" appear>
      <div class="z-30">z30</div>
    </transition>

    <template v-for="(subject, j) in o" a="czzz">
      <v-card class="my-4" :key="componentid + 'psubject' + j">
        <v-card-text class="ma-2">
          <p-d-jsonld
            :jsonld="subject"
            v-bind.sync="displayProperties"
          ></p-d-jsonld>
        </v-card-text>
      </v-card>
    </template>

    <template b="ddd" v-for="(subject, j) in o">
      <v-card class="my-4" v-bind:key="componentid + 'new' + j">
        <v-card-text class="ma-2">
          <p-d-jsonld
            :jsonld="subject"
            v-bind.sync="displayProperties"
          ></p-d-jsonld>
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>
<script>
export default {
  name: "key attribute",  
  methods: {    
  },
};
</script>

<style scoped>
</style>
