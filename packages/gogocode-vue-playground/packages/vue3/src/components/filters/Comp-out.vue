<template>
  <div class="audio-player" @mousedown.stop>
    <div
      class="audio-player-control"
      :class="{ 'is-playing': playing }"
      @click="toggle"
    ></div>
    <div class="audio-player-progress">
      <el-slider
        ref="slider"
        :step="0.01"
        v-model="progress"
        :show-tooltip="false"
        @change="handleDragEnd"
        size="mini"
      ></el-slider>
    </div>
    <div
      class="audio-player-time"
      :type="
        duration_filter(
          $filters.parseTime(row.timestamp, '{y}-{m}-{d} {h}:{i}')
        )
      "
    >
      {{ duration_filter(3 || false) }}/{{
        $filters.date(duration_filter(duration * 1000))
      }}
      {{ $filters.parseTime(row.timestamp, '{y}-{m}-{d} {h}:{i}') }}
    </div>
    <audio
      :src="src"
      hidden
      ref="audio"
      preload="metadata"
      @playing="handlePlaying"
      @pause="handlePause"
      @ended="handlePause"
      @timeupdate="handleTimeUpdate"
      @durationchange="handleDurationChange"
    ></audio>
  </div>
</template>

<script>
import * as Vue from 'vue'
Vue.filter('ff')('ss')
export default {
  props: ['src'],
  data() {
    return {
      playing: false,
      progress: 0,
      duration: 0,
    }
  },
  computed: {
    displayTime() {
      return (this.progress / 100) * this.duration
    },
    dragging() {
      return this.$refs.slider.dragging
    },
  },
  methods: {
    duration_filter(ms) {
      if (!ms) {
        return '00:00'
      }
      const v = (ms / 1000).toFixed(0)
      const ss = v % 60
      const mm = parseInt(v / 60) % 60
      const hh = parseInt(v / 60 / 60)
      return [hh, mm, ss]
        .map((item) => String(item).padStart(2, '0'))
        .join(':')
        .replace(/^0+:/, '')
    },
    play() {
      this.$refs.audio.play()
    },
    pause() {
      this.$refs.audio.pause()
    },
    toggle() {
      if (this.playing) {
        this.pause()
      } else {
        this.play()
      }
    },
    handlePause() {
      this.playing = false
    },
    handlePlaying() {
      this.playing = true
    },
    handleTimeUpdate(e) {
      if (this.dragging) {
        return
      }
      this.progress = (e.target.currentTime / this.duration) * 100
    },
    handleDurationChange(e) {
      this.duration = e.target.duration
    },
    handleDragEnd() {
      const currentTime = (this.progress / 100) * this.duration
      this.$refs.audio.currentTime = currentTime
    },
  },
}
</script>

<style scoped>
h1 {
  color: #64b587;
}
</style>
