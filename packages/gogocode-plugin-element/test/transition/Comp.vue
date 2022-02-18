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
 
  </div>
</template>
<script>
export default {
  name: "过渡类名",  
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
