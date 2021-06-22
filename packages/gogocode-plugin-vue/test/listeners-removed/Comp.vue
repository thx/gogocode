<template>
  <div>    
    <div class="mt20 text-left">
      <div>
        space:<input
          v-bind="$attrs"
          v-on="$listeners"
          type="text"
          @keyup.space="keys('space')"
        />
      </div>
      <div>
        space:<input
          v-on="$listeners"
          type="text"
          @keyup.32="keys('keycode 32 space')"
        />
      </div>
      <div>f2:<input type="text" @keyup.113="keys('keycode 32 space')" /></div>
      <div>
        space:<input
          type="text"
          @keyup.customSpace="keys('keycode 32 space')"
        />
      </div>
    </div>

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
      <v-card
        class="my-4"       
        :key="componentid + 'psubject' + j"
      >
        <v-card-text class="ma-2">
          <p-d-jsonld
            :jsonld="subject"
            v-bind.sync="displayProperties"
          ></p-d-jsonld>
        </v-card-text>
      </v-card>     
    </template>

    <template b="ddd" v-for="(subject, j) in o">
      <v-card
        class="my-4"       
        v-bind:key="componentid + 'new' + j"
      >
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
import Vue from "vue";
Vue.config.keyCodes = {
  customSpace: 32,
  customDelete: 46,
};
Vue.config.keyCodes.f1 = 112;
Vue.config.keyCodes.myDelete = 46;

export default {
  name: "按键修饰符",
  render(h) {
    return h("div");
  },
  methods: {
    keys(key) {
      alert("您按下的是" + key);
    },
  },
};
</script>


<style scoped>
.slide-enter-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}
.slide-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
.slide-enter-to,
.slide-leave {
  max-height: 200px;
  overflow: hidden;
}
.slide-enter {
  overflow: hidden;
  max-height: 0;
}
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
.menina-nav-fade-enter-active {
  transition: all 2s;
}
.menina-nav-fade-enter,
.menina-nav-fade-leave-to {
  opacity: 0;
}
</style>
